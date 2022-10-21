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