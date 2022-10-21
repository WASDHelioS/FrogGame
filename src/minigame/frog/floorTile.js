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