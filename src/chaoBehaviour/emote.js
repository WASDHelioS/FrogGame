class BehaviourEmote extends ChaoBehaviour
{
    pickedAnimation = "";

    startBehaviour ()
    {
        let potentialMoods = [];

        if (Chao.Instance.mood.hungry > 0.4)
            potentialMoods.push("hungry");

        if (Chao.Instance.mood.happy > 0.6 && Chao.Instance.mood.angry < 0.3 && Chao.Instance.mood.sad < 0.3)
        {
            potentialMoods.push("cheer");
            potentialMoods.push("wave");
            potentialMoods.push("happy");
        }
        else
        {
            if (Chao.Instance.mood.angry > 0.5 || Chao.Instance.mood.sad > 0.5)
            {
                if (Chao.Instance.mood.angry > Chao.Instance.mood.sad)
                {
                    potentialMoods.push("standDownAngry");
                    potentialMoods.push("tantrum");
                }
                else
                {
                    potentialMoods.push("standDownSad");
                    potentialMoods.push("cry");
                }
            }
            else
            {
                if (Chao.Instance.mood.curious > 0.4)
                {
                    potentialMoods.push("think");
                    potentialMoods.push("think2");
                    potentialMoods.push("eureka");
                }
            }
        }

        this.pickedAnimation = potentialMoods.random();
        Chao.Instance.renderer.setAnimation(this.pickedAnimation);
    }

    update (deltaTime)
    {
        if (Chao.Instance.renderer.currentAnimationName != this.pickedAnimation)
            this.endBehaviour();
    }
} 