class Frog extends GameObject
{

    speed = 100;

    tongue_speed_max = 400;

    facing =
        {
            left: -.9,
            right: .9
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

    g_target_y = 0;

    constructor (x, y, sprite, layer) 
    {
        super(x, y, sprite, layer);
        this.collider.enabled = true;

        this.transform.position.y = 0;
        this.g_target_y = y;
        this.posScaleY = 0;

        new TWEEN.Tween(this)
            .to({ posScaleY: 1 }, 800)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    }

    addedToScene ()
    {
        this.frog_tongue_base = this.scene.game.images.frog_tongue_base;
        this.frog_tongue_tip = this.scene.game.images.frog_tongue_tip;
    }

    onCollision (obj) 
    {
        if (obj instanceof Fruit)
        {
            this.scene.reset();
        }
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

        this.animate();
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
        return facing > 0 ? 9 : -9;
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
            this.frog_tongue_base.width * (this.tongueLength / 12), this.frog_tongue_base.height,
            dir.toAngle() - 90, 0, 0, 1, 0);

        if (this.should_bounce && this.tongueVectorBounce) 
        {
            dir = new vector(this.opposite_facing, -1);

            this.frog_tongue_tip.draw(this.scene,
                this.tongueVectorBounce.x, this.tongueVectorBounce.y,
                this.frog_tongue_tip.width, this.frog_tongue_tip.height,
                dir.toAngle() - 90, 0, 0, 1, 0);

            this.frog_tongue_base.draw(
                this.scene,
                (this.tongueVectorBounceOrigin.x + this.tongueVectorBounce.x) / 2, (this.tongueVectorBounceOrigin.y + this.tongueVectorBounce.y) / 2,
                this.frog_tongue_base.width * (this.tongueLengthBounce / 12), this.frog_tongue_base.height,
                dir.toAngle() - 90, 0, 0, 1, 0);
        }
    }


    animate ()
    {
        if (this.transform.position.y != this.g_target_y)
        {
            this.transform.position.y = this.g_target_y * this.posScaleY;
        }
    }
}