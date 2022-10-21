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