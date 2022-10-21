class Fruit extends GameObject
{
    speed = 10;
    speedCap = 100;

    active = true;

    constructor (x, y, sprite, layer)
    {
        super(x, y, sprite, layer);

        this.transform.scale = new vector(0.7, 0.7);
        this.renderer.subImage = Math.floor(Math.randomRange(0, 15));

        this.collider.enabled = true;
    }

    onDestroy ()
    {
        this.scene.addObject(new FloorTileDestroyer(this.transform.position.x, this.transform.position.y, this.scene.game.images.tile_floor_explosion, 0, .05, true));
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

        if (this.active)
        {
            this.transform.position.y += this.speed * deltaTime;

            if (this.transform.position.y > this.scene.real_size.y)
            {
                this.scene.destroyFruit(this);
            }
        }
    }

    updateSpeed (val)
    {
        this.speed = Math.min(this.speedCap, val);
    }
}