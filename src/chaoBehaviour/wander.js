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