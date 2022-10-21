class FloorTile extends GameObject
{

    g_target_y = 0;

    constructor (x, y, sprite, layer) 
    {
        super(x, y, sprite, layer);

        this.transform.position.y = 0;
        this.g_target_y = y;
        this.posScaleY = 0;

        new TWEEN.Tween(this)
            .to({ posScaleY: 1 }, 800)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
        this.collider.enabled = false;
    }

    update (deltaTime)
    {
        super.update(deltaTime);

        this.animate();
    }

    onDestroy ()
    {
        this.scene.addObject(new FloorTileDestroyer(this.transform.position.x, this.transform.position.y, this.scene.game.images.tile_floor_explosion, 0, .05, true));
    }

    animate ()
    {
        if (this.transform.position.y != this.g_target_y)
        {
            this.transform.position.y = this.g_target_y * this.posScaleY;
            this.collider.enabled = true;
        }
    }
}