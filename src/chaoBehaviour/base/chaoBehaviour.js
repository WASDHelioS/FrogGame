class ChaoBehaviour
{
    constructor ()
    {

    }

    startBehaviour ()
    {
        //override this to allow the Chao to start this behaviour
    }

    update (deltaTime)
    {

    }

    endBehaviour ()
    {
        //make sure to call this so the Chao knows it can queue up another thing.
        Chao.Instance.endBehaviour();
    }
}