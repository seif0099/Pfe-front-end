import "antd/dist/antd.css";
import "./signup.css";
import { Form, Input, Button, Checkbox } from "antd";
import Icon from "@ant-design/icons";
import React,{useState,useEffect} from "react";
import history from "./History"


function Signup() {
const [email,setEmail]=useState("");
const [username,setUsername]=useState("");
const [nom,setNom]=useState("");
const [prenom,setPrenom]=useState("");
const [postEmp,setPostEmp]=useState("");
const [classEmp,setClassEmp]=useState("");
const [matricule,setMatricule]=useState("");
const [password,setPassword]=useState("");
  
  async function signUp(){
    let item= {email,nom,prenom,matricule,classEmp,postEmp,password,username};
 let result = await fetch("http://localhost:9000/register",{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
},
body: JSON.stringify(item)
 });
 let results = await result.json()
localStorage.setItem("user-info",JSON.stringify(results))
  }
  
  return (
    <div className="wrapper">
      <div className="login-center">
        <Form onSubmit={() => {}} className="login-form">
          <h1 className="title">Bienvenue</h1>
          <br></br>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username" onChange={(e)=>setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nom"onChange={(e)=>setNom(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Prenom" onChange={(e)=>setPrenom(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email" onChange={(e)=>setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Classe"
              onChange={(e)=>setClassEmp(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Matricule"
              onChange={(e)=>setMatricule(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Poste"
              onChange={(e)=>setPostEmp(e.target.value)}
            />
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item></Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="/forgotpass">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={signUp}
            >
              Sign up
            </Button>
            <div className="text-right p-t-225">
              <span className="txt1">You already have an account ? </span>
              <a className="txt2" href="Signup">
                Log in
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
