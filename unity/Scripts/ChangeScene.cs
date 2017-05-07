using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ChangeScene : MonoBehaviour
{
    public void ChangeSceneTest()
    {
        SceneManager.LoadScene("test01");
    }

    public void ChangeSceneMenu()
    {
        SceneManager.LoadScene("main menu");
    }
}
