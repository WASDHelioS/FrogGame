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