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