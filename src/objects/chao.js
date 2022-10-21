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

    mood =
        { //all values range from 0 to 1
            happy: 0.5,
            angry: 0.5,
            hungry: 0.5,
            sad: 0.5,
            curious: 0.5
        };

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
        this.registerBehaviour(new BehaviourEmote());
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