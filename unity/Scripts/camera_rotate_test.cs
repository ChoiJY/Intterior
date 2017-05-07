using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class camera_rotate_test : MonoBehaviour {

    public Transform target;
    public float distance = 10.0f;
    public float height = 5.0f;
    public float dampRotate = 5.0f;
    public float turnSpeed;
    public float camPosition;
    public float moveSpeed = 1f;

    Vector3 V3;

    private Transform tr;

	// Use this for initialization
	void Start ()
    {
        tr = GetComponent<Transform> ();
        turnSpeed = 1.5f;
        camPosition = 2f;
	}
	
	// Update is called once per frame
	void Update ()
    {
        Vector3 PositionInfo = tr.position - target.position;
        PositionInfo = Vector3.Normalize(PositionInfo);

        if(Input.GetKey(KeyCode.W))
        {
            target.transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.A))
        {
            target.transform.Translate(Vector3.left * moveSpeed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.S))
        {
            target.transform.Translate(Vector3.back * moveSpeed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.D))
        {
            target.transform.Translate(Vector3.right * moveSpeed * Time.deltaTime);
        }
        //if(Input.GetMouseButtonDown(0))
        //{
        transform.RotateAround(target.position, Vector3.down, Input.GetAxis("Mouse X") * turnSpeed);
        transform.RotateAround(target.position, Vector3.right, Input.GetAxis("Mouse Y") * turnSpeed);
       //}

        tr.position = tr.position - (PositionInfo * Input.GetAxis("Mouse ScrollWheel") * turnSpeed);
	}
}
