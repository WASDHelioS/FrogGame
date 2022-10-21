
/*
 * Start File:
 * ./src/backgroundScene.js
 */ 
class BackgroundScene extends Scene
{
    drawn = false;

    constructor (x, y, width, height, displayMode = 0)
    {
        super(x, y, width, height, displayMode);
    }

    draw ()
    {
        if (!this.drawn)
        {
            super.draw();
            this.drawn = true;
        }
    }
}
/*
 * End File:
 * ./src/backgroundScene.js
 */ 

/*
 * Start File:
 * ./src/chaoBehaviour/base/chaoBehaviour.js
 */ 
class ChaoBehaviour
{
    constructor ()
    {

    }

    startBehaviour ()
    {
        //override this to allow the Chao to start this behaviour
    }

    update (deltaTime)
    {

    }

    endBehaviour ()
    {
        //make sure to call this so the Chao knows it can queue up another thing.
        Chao.Instance.endBehaviour();
    }
}
/*
 * End File:
 * ./src/chaoBehaviour/base/chaoBehaviour.js
 */ 

/*
 * Start File:
 * ./src/chaoBehaviour/sneeze.js
 */ 
class BehaviourSneeze extends ChaoBehaviour
{
    startBehaviour ()
    {
        Chao.Instance.renderer.setAnimation("sneeze");
    }

    update (deltaTime)
    {
        if (Chao.Instance.renderer.currentAnimationName != "sneeze")
            this.endBehaviour();
    }
} 
/*
 * End File:
 * ./src/chaoBehaviour/sneeze.js
 */ 

/*
 * Start File:
 * ./src/chaoBehaviour/wander.js
 */ 
class BehaviourWander extends ChaoBehaviour
{
    startBehaviour ()
    {
        Chao.Instance.walkToPosition(new vector(Math.randomRange(0, Chao.Instance.scene.real_size.x), Math.randomRange(0, Chao.Instance.scene.real_size.y)));
    }

    update (deltaTime)
    {
        if (!Chao.Instance.walking)
            this.endBehaviour();
    }
} 
/*
 * End File:
 * ./src/chaoBehaviour/wander.js
 */ 

/*
 * Start File:
 * ./src/game.js
 */ 
console.log("Game started!");
var game = new Game();
game.chaoImages = [];

window.onload = function ()
{

    game.preloadImagesThenStart(
        [
            { name: "arrow", url: "images/arrow.png", subImgTotal: 4, perRow: 2 },
            { name: "gem", url: "images/gems.png", subImgTotal: 72, perRow: 6 },
            { name: "ball", url: "images/ball.png", subImgTotal: 4, perRow: 4 },
            { name: "grass_dark", url: "images/grass_dark.png" },
            { name: "grass_light", url: "images/grass_light.png" },
            { name: "frog_basic", url: "images/character/frog/frog_basic.png", subImgTotal: 4, perRow: 4 },
            { name: "frog_tongue_base", url: "images/character/frog/frog_tongue_base.png" },
            { name: "frog_tongue_tip", url: "images/character/frog/frog_tongue_tip.png" },
            { name: "chao_default", url: "images/character/chao/default.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_blue", url: "images/character/chao/blue.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_cyan", url: "images/character/chao/cyan.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_dark", url: "images/character/chao/dark.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_darkgreen", url: "images/character/chao/darkgreen.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_green", url: "images/character/chao/green.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_lightgreen", url: "images/character/chao/lightgreen.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_hero", url: "images/character/chao/hero.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_orange", url: "images/character/chao/orange.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_pink", url: "images/character/chao/pink.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_purple", url: "images/character/chao/purple.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_red", url: "images/character/chao/red.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_white", url: "images/character/chao/white.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_yellow", url: "images/character/chao/yellow.png", subImgTotal: 67, perRow: 9 },
            { name: "tile_floor_brown", url: "images/tile/tile_floor_brown.png" },
            { name: "tile_floor_explosion", url: "images/tile/tile_floor_explosion_anim.png", subImgTotal: 10, perRow: 5 },
            { name: "fruit", url: "images/object/fruit.png", subImgTotal: 15, perRow: 8 }
        ]
        , function ()
        {
            game.images.frog_basic.addAnimationCycle("walk", [0, 1, 2, 1], true);
            game.images.tile_floor_explosion.addAnimationCycle("destroy", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], false);
            this.setupChaoAnimations(game.images.chao_default);
            this.setupChaoAnimations(game.images.chao_blue);
            this.setupChaoAnimations(game.images.chao_cyan);
            this.setupChaoAnimations(game.images.chao_dark);
            this.setupChaoAnimations(game.images.chao_darkgreen);
            this.setupChaoAnimations(game.images.chao_green);
            this.setupChaoAnimations(game.images.chao_lightgreen);
            this.setupChaoAnimations(game.images.chao_hero);
            this.setupChaoAnimations(game.images.chao_orange);
            this.setupChaoAnimations(game.images.chao_pink);
            this.setupChaoAnimations(game.images.chao_purple);
            this.setupChaoAnimations(game.images.chao_red);
            this.setupChaoAnimations(game.images.chao_white);
            this.setupChaoAnimations(game.images.chao_yellow);

            this.createMainScene(game);
        });
};

function setupChaoAnimations (image)
{
    game.chaoImages.push(image);
    image.addAnimationCycle("walkDown", [0, 1, 0, 2], true);
    image.addAnimationCycle("walkLeft", [3, 4, 3, 5], true);
    image.addAnimationCycle("walkUp", [6, 7, 6, 8], true);

    image.addAnimationCycle("standDown", [0]);
    image.addAnimationCycle("standLeft", [3]);
    image.addAnimationCycle("standUp", [6]);

    image.addAnimationCycle("flyDown", [9, 10, 11, 10], true);
    image.addAnimationCycle("flyLeft", [12, 13, 14, 13], true);
    image.addAnimationCycle("flyUp", [15, 16, 17, 16], true);

    image.addAnimationCycle("tripDown", [18, 19, 20]);
    image.addAnimationCycle("tripLeft", [21, 22, 23]);
    image.addAnimationCycle("tripUp", [24, 25, 26]);

    image.addAnimationCycle("sitDown", [27]);
    image.addAnimationCycle("sitLeft", [28]);

    image.addAnimationCycle("tantrum", [29, 30, 29, 31, 32, 33]);

    image.addAnimationCycle("swimStruggle", [34, 35], true);
    image.addAnimationCycle("eatStart", [36, 37, 38], false, "eat");
    image.addAnimationCycle("eat", [37, 38], true);

    image.addAnimationCycle("cheer", [39, 40], true);
    image.addAnimationCycle("wave", [41, 42]);

    image.addAnimationCycle("hungry", [43, 44], true);

    image.addAnimationCycle("no", [45, 46, 45, 47], true);
    image.addAnimationCycle("think", [48]);
    image.addAnimationCycle("happy", [49, 50, 49, 51], true);
    image.addAnimationCycle("sad", [52]);
    image.addAnimationCycle("sleep", [53, 54], true);

    image.addAnimationCycle("swim", [55, 56, 57], true);
    image.addAnimationCycle("eatBig", [58, 59], true);
    image.addAnimationCycle("sneeze", [60, 61, 62, 63], false, "standDown");
    image.addAnimationCycle("cry", [64, 65], true);
    image.addAnimationCycle("think2", [66]);
}

createMainScene = function (game)
{
    var background = new BackgroundScene(0, 0, 1, 1, Scene.DisplayModes.relativeToParent);
    var scene = new Scene(0, 0, 1, 1, Scene.DisplayModes.relativeToParent);
    scene.renderBackground = false;

    game.loadScene(background);
    game.loadScene(scene);

    background.addObject(new GrassTiler(50, 50, game.images.arrow, 0));
    chao = new Chao(60, 60, game.images.chao_default, 0);
    scene.addObject(chao);

    createSubScene(scene);
};

createSubScene = function (scene) 
{
    var subScene = new FrogScene(200, 200, 416, 512, Scene.DisplayModes.absolute);

    subScene.gameSpeed = 1;

    scene.loadChildScene(subScene);

    frog = new Frog(60, subScene.real_size.y - 50, game.images.frog_basic, 0);
    for (tx = 10; tx < subScene.real_size.x - 10; tx += 15) 
    {
        subScene.addObject(new FloorTile(tx, subScene.real_size.y - 30, game.images.tile_floor_brown, 0));
    }
    subScene.addObject(frog);
};
/*
 * End File:
 * ./src/game.js
 */ 

/*
 * Start File:
 * ./src/minigame/frog/floorTile.js
 */ 
class FloorTile extends GameObject
{

    constructor (x, y, sprite, layer) 
    {
        super(x, y, sprite, layer);
        this.collider.enabled = true;
    }

    onDestroy ()
    {
        this.scene.addObject(new FloorTileDestroyer(this.transform.position.x, this.transform.position.y, this.scene.game.images.tile_floor_explosion, 0, .05, true));
    }
}
/*
 * End File:
 * ./src/minigame/frog/floorTile.js
 */ 

/*
 * Start File:
 * ./src/minigame/frog/floorTileDestroyer.js
 */ 
class FloorTileDestroyer extends GameObject
{

    timeOfDestroy = 0;
    timer = 0;

    constructor (x, y, sprite, layer, animationLength, destroyAfter) 
    {
        super(x, y, sprite, layer);

        this.renderer.setAnimation("destroy", 0, animationLength);

        this.timeOfDestroy = this.renderer.cycle.cycleArray.length * animationLength;
    }

    update (deltaTime) 
    {
        super.update(deltaTime);

        this.timer += deltaTime;
        if (this.timer > this.timeOfDestroy) 
        {
            this.destroy();
        }
    }
}
/*
 * End File:
 * ./src/minigame/frog/floorTileDestroyer.js
 */ 

/*
 * Start File:
 * ./src/minigame/frog/frog.js
 */ 
class Frog extends GameObject
{

    speed = 100;

    tongue_speed_max = 400;

    facing =
        {
            left: -.8,
            right: .8
        };

    currentFacing = this.facing.right;
    idle = true;

    tongueVector = null;
    tongueVectorBounce = null;

    tongueVectorBounceOrigin = null;

    tongueLength = 0;
    tongueLengthBounce = 0;
    retracting = false;

    frog_tongue_base = null;
    frog_tongue_tip = null;

    tongue_obj_ref = null;

    constructor (x, y, sprite, layer) 
    {
        super(x, y, sprite, layer);
        this.collider.enabled = true;
    }

    addedToScene ()
    {
        this.frog_tongue_base = this.scene.game.images.frog_tongue_base;
        this.frog_tongue_tip = this.scene.game.images.frog_tongue_tip;
    }

    onCollision (obj) 
    {
        // todo: todo
    }

    isFloor () 
    {
        let amount = this.renderer.sprite.width / 2;
        this.currentFacing == this.facing.right ? amount *= 1 : amount *= -1;

        let obj = Ray.Cast(this.scene, new vector(this.transform.position.x + amount, this.scene.real_size.y), new vector(0, -1), 50);

        return obj && obj.hitObj instanceof FloorTile;
    }

    update (deltaTime)
    {
        super.update(deltaTime);

        this.idle = true;

        if (this.tongue_retracted) 
        {
            if (GameInput.isHeld(GameInput.keys.ArrowLeft) || GameInput.isHeld(GameInput.keys.ArrowRight))
            {
                this.move(deltaTime);

            }
        }

        if (GameInput.isHeld(GameInput.keys[" "]) && !this.retracting)
        {
            this.extendTongueLength(deltaTime);

            this.checkCollision(deltaTime);
        }
        else
        {
            if (!this.tongue_retracted) 
            {
                this.retractTongueLength(deltaTime);
                this.updateFruitObjRef();
            }
            else
            {
                this.retracting = false;
                this.tongueLength = 0;
                this.tongueLengthBounce = 0;
                this.tongueVector = null;
                this.tongueVectorBounce = null;
                if (this.tongue_obj_ref)
                {
                    this.scene.consumeFruit(this.tongue_obj_ref);
                    this.tongue_obj_ref = null;
                }
            }
        }

        if (!this.tongue_retracted) 
        {
            this.calculateTongueVectors();
        }

        if (this.idle && this.tongue_retracted && !this.retracting) 
        {
            this.renderer.setSubImage(0);
        }


    }

    checkCollision (deltaTime)
    {
        let collisionVector = this.tongueVectorBounce ? this.tongueVectorBounce : this.tongueVector;

        if (!collisionVector)
        {
            return;
        }

        //let obj = Ray.Cast(this.scene, collisionVector, new vector(this.tongueVectorBounce ? this.currentFacing : this.opposite_facing, -1), this.tongue_speed * 2 * deltaTime);

        let obj = Ray.Cast(this.scene,
            collisionVector,
            new vector(this.tongueVectorBounce ? this.opposite_facing : this.currentFacing, -1),
            this.tongue_speed * 5 * deltaTime);

        if (obj)
        {
            if (obj.hitObj instanceof Fruit)
            {
                obj = obj.hitObj;
                obj.collider.enabled = false;
                this.tongue_obj_ref = obj;

                this.retracting = true;
            }
        }
    }

    calculateTongueVectors () 
    {
        let dir = new vector(this.currentFacing, -1);
        this.tongueVector = this.transform.position.add(dir.stretch(this.tongueLength)).add(new vector(this.getXOffset(this.currentFacing), 0));

        if (!this.isVectorWithinSceneY(this.tongueVector, this.scene))
        {
            this.retracting = true;
            return;
        }

        if (this.should_bounce) 
        {
            if ((this.tongueLengthBounce <= 0)) 
            {
                this.tongueVectorBounceOrigin = this.tongueVector.getCopy();
            }

            dir = new vector(this.opposite_facing, -1);
            this.tongueVectorBounce = this.tongueVectorBounceOrigin.add(dir.stretch(this.tongueLengthBounce));

            if (this.tongueVectorBounce.y <= 0 || this.tongueVectorBounce.y >= this.scene.size.y)
            {
                this.retracting = true;
                return;
            }
        }
        else
        {
            this.tongueVectorBounce = null;
        }
    }

    draw (context)
    {
        super.draw(context);

        if (!this.tongue_retracted) 
        {
            this.drawTongue();
        }
    }

    get tongue_retracted () 
    {
        return this.tongueLength <= 0;
    }

    get tongue_speed () 
    {
        return Math.min(this.tongue_speed_max, 150 * (1 + this.scene.gameSpeed * .2));
    }

    get opposite_facing () 
    {
        return this.currentFacing == this.facing.left ? this.facing.right : this.facing.left;
    }

    get should_bounce () 
    {
        return this.tongueVector && (!this.isVectorWithinSceneX(this.tongueVector, this.scene));
    }

    getXOffset (facing) 
    {
        return facing > 0 ? 8 : -8;
    }

    canMove (nextPos) 
    {
        return nextPos + this.transform.size.x / 2 < this.scene.real_size.x && nextPos - this.transform.size.x / 2 > 0 && this.isFloor();
    }

    isVectorWithinSceneX (vector, scene) 
    {
        return vector.x >= 0 && vector.x <= scene.real_size.x;
    }

    isVectorWithinSceneY (vector, scene) 
    {
        return vector.y >= 0 && vector.y <= scene.real_size.y;
    }

    move (deltaTime) 
    {
        if (!(GameInput.isHeld(GameInput.keys.ArrowRight) && GameInput.isHeld(GameInput.keys.ArrowLeft))) 
        {
            if (GameInput.isHeld(GameInput.keys.ArrowRight))
            {
                if (this.canMove(this.transform.position.x + this.speed * deltaTime)) 
                {
                    this.transform.position.x += this.speed * deltaTime;
                }

                if (this.currentFacing != this.facing.right) 
                {
                    this.renderer.mirrorX = !this.renderer.mirrorX;
                    this.currentFacing = this.facing.right;
                }
            }

            if (GameInput.isHeld(GameInput.keys.ArrowLeft))
            {
                if (this.canMove(this.transform.position.x - this.speed * deltaTime)) 
                {
                    this.transform.position.x -= this.speed * deltaTime;
                }

                if (this.currentFacing != this.facing.left) 
                {
                    this.renderer.mirrorX = !this.renderer.mirrorX;
                    this.currentFacing = this.facing.left;
                }
            }

            this.idle = false;
            this.renderer.setAnimation("walk", 0, .2);
        }
    }

    updateFruitObjRef ()
    {
        if (this.tongue_obj_ref && (this.tongueVectorBounce || this.tongueVector))
        {
            this.tongue_obj_ref.transform.position = this.tongueVectorBounce ? this.tongueVectorBounce : this.tongueVector;
        }
    }

    extendTongueLength (deltaTime) 
    {
        this.renderer.setSubImage(3);
        this.idle = false;
        this.tongueLength += deltaTime * this.tongue_speed;

        if (this.should_bounce) 
        {
            this.tongueLengthBounce += deltaTime * this.tongue_speed;
        }
    }

    retractTongueLength (deltaTime) 
    {
        this.tongueLength -= deltaTime * this.tongue_speed * 2;
        this.retracting = true;

        if (this.should_bounce) 
        {
            this.tongueLengthBounce -= deltaTime * this.tongue_speed * 2;
        }
    }

    drawTongue () 
    {
        let dir = new vector(this.currentFacing, -1);

        this.frog_tongue_tip.draw(this.scene,
            this.tongueVector.x, this.tongueVector.y,
            this.frog_tongue_tip.width, this.frog_tongue_tip.height,
            dir.toAngle() - 90, 0, 0, 1, 0);

        this.frog_tongue_base.draw(
            this.scene,
            (this.transform.position.x + this.tongueVector.x + this.getXOffset(this.currentFacing)) / 2, (this.transform.position.y + this.tongueVector.y) / 2,
            this.frog_tongue_base.width * (this.tongueLength / 12.5), this.frog_tongue_base.height,
            dir.toAngle() - 90, 0, 0, 1, 0);

        if (this.should_bounce) 
        {
            dir = new vector(this.opposite_facing, -1);

            this.frog_tongue_tip.draw(this.scene,
                this.tongueVectorBounce.x, this.tongueVectorBounce.y,
                this.frog_tongue_tip.width, this.frog_tongue_tip.height,
                dir.toAngle() - 90, 0, 0, 1, 0);

            this.frog_tongue_base.draw(
                this.scene,
                (this.tongueVectorBounceOrigin.x + this.tongueVectorBounce.x) / 2, (this.tongueVectorBounceOrigin.y + this.tongueVectorBounce.y) / 2,
                this.frog_tongue_base.width * (this.tongueLengthBounce / 12.5), this.frog_tongue_base.height,
                dir.toAngle() - 90, 0, 0, 1, 0);
        }
    }
}
/*
 * End File:
 * ./src/minigame/frog/frog.js
 */ 

/*
 * Start File:
 * ./src/minigame/frog/frogScene.js
 */ 
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
/*
 * End File:
 * ./src/minigame/frog/frogScene.js
 */ 

/*
 * Start File:
 * ./src/minigame/frog/fruit.js
 */ 
class Fruit extends GameObject
{
    speed = 10;

    constructor (x, y, sprite, layer)
    {
        super(x, y, sprite, layer);

        this.transform.scale = new vector(0.7, 0.7);
        this.renderer.subImage = Math.floor(Math.randomRange(0, 15));

        this.collider.enabled = true;
    }

    onCollision (obj)
    {
        if (obj instanceof FloorTile)
        {
            obj.destroy();
            this.scene.destroyFruit(this);
        }
    }

    update (deltaTime)
    {
        super.update(deltaTime);

        this.transform.position.y += this.speed * this.scene.gameSpeed * this.scene.gameSpeed * deltaTime;

        if (this.transform.position.y > this.scene.real_size.y)
        {
            this.scene.destroyFruit(this);
        }
    }
}
/*
 * End File:
 * ./src/minigame/frog/fruit.js
 */ 

/*
 * Start File:
 * ./src/objects/caster.js
 */ 
class Caster extends GameObject
{
    lastResult = {};
    update (deltaTime)
    {

        if (!GameInput.mousePosition)
            return;
        this.collider.enabled = true;
        if (this.collider.isInBounds(GameInput.mousePosition))
        {
            console.log("hoverin");
        }
    }

    draw (context)
    {
        if (!GameInput.mousePosition)
            return;

        super.draw(context);
        let origin = this.transform.position;
        let dir = GameInput.mousePosition.subtract(this.transform.position).normalize();
        let ray = Ray.Cast(this.scene, this.transform.position, dir);

        if (ray)
        {
            context.moveTo(this.transform.position.x, this.transform.position.y);
            context.lineTo(ray.hitPoint.x, ray.hitPoint.y);
            context.stroke();
            this.lastResult = ray;
        }
    }
}
/*
 * End File:
 * ./src/objects/caster.js
 */ 

/*
 * Start File:
 * ./src/objects/chao.js
 */ 
class Chao extends GameObject
{
    speed = 40;
    scenePadding = 50;
    prevPosition = null;
    targetDestination = null;
    hBeforeV = false;

    minTimeBetweenBehaviour = 3; //in seconds
    maxTimeBetweenbehaviour = 10; // in seconds
    behaviourTimer = 3;

    behaviourList = [];
    currentBehaviour = null;

    particler = null;

    static Instance;

    get busyWithBehaviour ()
    {
        return this.currentBehaviour != null;
    }

    get walking ()
    {
        return this.transform.position.distanceTo(this.targetDestination) > 5;
    }

    constructor (x, y, sprite, layer)
    {
        super(x, y, sprite, layer);
        this.wasHeld = {};
        this.collider.enabled = true;
        Chao.Instance = this;
        this.targetDestination = new vector(x, y);
    }

    registerBehaviour (behaviour)
    {
        this.behaviourList.push(behaviour);
    }

    endBehaviour ()
    {
        console.log("Ending Behaviour '" + this.currentBehaviour.constructor.name + "'");
        this.currentBehaviour = null;
        this.behaviourTimer = Math.randomRange(this.minTimeBetweenBehaviour, this.maxTimeBetweenbehaviour);
    }

    addedToScene ()
    {
        this.renderer.sprite = this.scene.game.chaoImages.random();

        this.renderer.defaultAnimationSpeed = 0.2;
        this.registerBehaviour(new BehaviourSneeze());
        this.registerBehaviour(new BehaviourWander());

    }

    onClick (btn)
    {
        console.log(btn);
    }

    anyHeld ()
    {
        return this.wasHeld.right || this.wasHeld.left || this.wasHeld.up || this.wasHeld.down;
    }

    walkToPosition (position)
    {
        console.log("Walking towards", position);
        this.targetDestination = position.getCopy();
        this.prevPosition = this.transform.position.getCopy();
        this.hBeforeV = Math.random() > 0.5;
    }

    update (deltaTime)
    {
        super.update(deltaTime);
        if (GameInput.isPressed(GameInput.keys.a))
        {
            this.walkToPosition(GameInput.mousePosition.getCopy());
        }

        if (this.busyWithBehaviour)
            this.currentBehaviour.update(deltaTime);
        else
        {
            if (!this.walking)
            {
                this.behaviourTimer -= deltaTime;

                if (this.behaviourTimer <= 0)
                {
                    this.currentBehaviour = this.behaviourList.random();
                    console.log("Starting Behaviour '" + this.currentBehaviour.constructor.name + "'");
                    this.currentBehaviour.startBehaviour();
                }
            }
        }

        if (this.walking)
        {
            let halfTotalDistanceH = Math.abs(this.prevPosition.x - this.targetDestination.x) / 2;
            let halfTotalDistanceV = Math.abs(this.prevPosition.y - this.targetDestination.y) / 2;

            let currentDistanceH = Math.abs(this.transform.position.x - this.targetDestination.x);
            let currentDistanceV = Math.abs(this.transform.position.y - this.targetDestination.y);

            let hDir = -Math.sign(this.transform.position.x - this.targetDestination.x);
            let vDir = -Math.sign(this.transform.position.y - this.targetDestination.y);

            if (this.hBeforeV)
            {
                if (currentDistanceH > halfTotalDistanceH || currentDistanceV < 1)
                {
                    this.renderer.mirrorX = hDir > 0;
                    this.transform.velocity.x = this.speed * hDir;
                    this.transform.velocity.y = 0;
                    this.renderer.setAnimation("walkLeft");
                }
                else
                {
                    this.transform.velocity.x = 0;
                    this.transform.velocity.y = this.speed * vDir;
                    this.renderer.setAnimation(vDir < 0 ? "walkUp" : "walkDown");
                }
            }
            else
            {
                if (currentDistanceV > halfTotalDistanceV || currentDistanceH < 1)
                {
                    this.transform.velocity.x = 0;
                    this.transform.velocity.y = this.speed * vDir;
                    this.renderer.setAnimation(vDir < 0 ? "walkUp" : "walkDown");
                }
                else
                {
                    this.renderer.mirrorX = hDir > 0;
                    this.transform.velocity.x = this.speed * hDir;
                    this.transform.velocity.y = 0;
                    this.renderer.setAnimation("walkLeft");
                }
            }
        }
        else if (this.renderer.currentAnimationName && this.renderer.currentAnimationName.indexOf("walk") >= 0)
        {
            this.renderer.setAnimation(this.renderer.currentAnimationName.replace("walk", "stand"));

            this.transform.velocity.x = 0;
            this.transform.velocity.y = 0;
        }
    }

    draw (context)
    {
        super.draw(context);
    }
}
/*
 * End File:
 * ./src/objects/chao.js
 */ 

/*
 * Start File:
 * ./src/objects/grasstiler.js
 */ 
class GrassTiler extends GameObject
{
    ground_light = null;
    ground_dark = null;

    addedToScene ()
    {
        this.ground_dark = this.scene.game.images.grass_dark;
        this.ground_light = this.scene.game.images.grass_light;
    }

    draw (context)
    {
        let width = this.scene.real_size.x + this.ground_dark.width;
        let height = this.scene.real_size.y + this.ground_dark.height;
        let size = 32;
        let count = 0;
        for (let x = 0; x < width; x += size)
        {
            for (let y = 0; y < height; y += size)
            {
                count++;
                ((count) % 2 == 1 ? this.ground_dark : this.ground_light).draw(this.scene, x - (size / 2), y, size, size, 0, 0, 0, 1, 0);
            }

            count = x / size % 2;
        }
    }
}
/*
 * End File:
 * ./src/objects/grasstiler.js
 */ 
