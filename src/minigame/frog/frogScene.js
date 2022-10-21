class FrogScene extends Scene
{

    fruitSpawnRateMin = 1;
    fruitSpawnRateMax = 2;
    fruitSpawnTimer = 0;

    fruitSpawnChance = .2;

    fruits = [];
    fruitPool = [];
    eatenFruit = [];

    gameSpeed = 1;

    constructor (x, y, width, height, displayMode = 0)
    {
        super(x, y, width, height, displayMode);

        this.fruitSpawnTimer = this.fruitSpawnRateMax;
    }

    update (deltaTime)
    {
        super.update(deltaTime);

        this.spawnFruits(deltaTime);
    }

    increaseDifficulty ()
    {
        this.gameSpeed += .1;

        if (this.fruitSpawnRateMax > .1)
        {
            this.fruitSpawnRateMax -= .2;
        }
        else if (this.fruitSpawnRateMax == .2)
        {
            this.fruitSpawnRateMax = .1;
        }
        if (this.fruitSpawnRateMin > 0)
        {
            this.fruitSpawnRateMin -= .2;
        }
    }


    spawnFruits (deltaTime)
    {
        this.fruitSpawnTimer -= deltaTime;
        if (this.fruitSpawnTimer < this.fruitSpawnRateMin) 
        {
            if (this.shouldSpawn() || this.fruitSpawnTimer < 0)
            {
                let fruit = this.getFromFruitPoolOrCreate();
                fruit.collider.enabled = true;
                fruit.speed = Math.randomRange(10, 20);
                fruit.transform.position = this.getRandomVectorPosition();
                this.setRandomSubImage(fruit);
                this.fruits.push(fruit);

                this.fruitSpawnTimer = this.fruitSpawnRateMax;
            }
        }
    }

    consumeFruit (fruit)
    {
        let currFruit = { scaleX: .5, scaleY: .5, image: fruit.renderer.subImage };
        this.eatenFruit.push(currFruit);

        new TWEEN.Tween(currFruit)
            .to({ scaleX: 1, scaleY: 1 }, 400)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();

        this.destroyFruit(fruit);

        this.increaseDifficulty();
    }

    destroyFruit (fruit)
    {
        if (this.fruits.contains(fruit))
        {
            this.fruits.remove(fruit);
            this.fruitPool.push(fruit);
            fruit.transform.position.x = 50000;
        }
    }

    getFromFruitPoolOrCreate ()
    {
        return this.fruitPool.length > 0 ? this.fruitPool.pop() : this.addObject(new Fruit(0, 0, this.game.images.fruit, 0));
    }

    setRandomSubImage (fruit)
    {
        fruit.renderer.subImage = Math.floor(Math.randomRange(0, fruit.renderer.sprite.subImages));
    }

    draw ()
    {
        super.draw();

        if (this.eatenFruit.length > 0)
        {
            let offX = this.game.images.fruit.width;
            let offY = this.game.images.fruit.height;

            let startingX = this.real_position.x - offX / 2;
            let startingY = this.real_position.y - offY / 2;

            let maxPerXAxis = Math.ceil(this.real_size.x / offX) + 1;
            let xAxisCount = 0;

            let maxPerYAxis = Math.ceil(this.real_size.y / offY) + 1;
            let yAxisCount = 0;

            let currentPos = new vector(startingX, startingY);

            for (let i = 0; i < this.eatenFruit.length; i++)
            {
                //draw (scene, dx, dy, dw, dh, rotation, mirrorX, mirrorY, alpha, subImage)

                this.game.images.fruit.draw(this.parentScene,
                    currentPos.x, currentPos.y,
                    offX * this.eatenFruit[i].scaleX, offY * this.eatenFruit[i].scaleY,
                    0, 0, 0, 1, this.eatenFruit[i].image);

                console.log(this.eatenFruit[i].scaleX);

                if (xAxisCount < maxPerXAxis)
                {
                    xAxisCount++;
                    currentPos = currentPos.add(new vector(offX, 0));
                }
                else if (yAxisCount < maxPerYAxis)
                {
                    yAxisCount++;
                    currentPos = currentPos.add(new vector(0, offY));
                }
                else if (xAxisCount < maxPerXAxis * 2)
                {
                    xAxisCount++;
                    currentPos = currentPos.subtract(new vector(offX, 0));
                }
                else if (yAxisCount < maxPerYAxis * 2)
                {
                    yAxisCount++;
                    currentPos = currentPos.subtract(new vector(0, offY));
                }


            }
        }
    }

    getRandomVectorPosition ()
    {
        return new vector
            (
                Math.floor(Math.randomRange(0, this.real_size.x)),
                0
            );
    }

    shouldSpawn ()
    {
        return Math.random() < this.fruitSpawnChance;
    }
}