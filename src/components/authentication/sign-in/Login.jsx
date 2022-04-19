import "antd/dist/antd.css";
import "./login.css";
import { Form, Input, Button, Checkbox } from "antd";
import Icon from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import History from "../sign-up/History";
import { Redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [password, setPassword] = useState("");

  async function login() {
    try {
      let item = { email, password };
      let result = await fetch("http://localhost:9000/Authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      let results = await result.json();
      if (results?.success) {
        localStorage.setItem("user-info", JSON.stringify(results));
        setIsLoginSuccess(true);
      } else {
        alert("Login error" + results?.message);
      }
    } catch (error) {
      throw alert(error);
    }
  }

  if (isLoginSuccess) {
    return <Redirect to="Pointage" />;
  }
  return (
    <div className="wrapper">
      <div className="login-center">
        <Form onSubmit={() => {}} className="login-form">
          <h6>LMS</h6>
          <h5 className="title">L E A V E M A N A G E M E N T S Y S T E M</h5>
          <br></br>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="/forgotpass">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={login}
            >
              Log in
            </Button>
            <div className="text-right p-t-225">
              <span className="txt1">Don’t have an account? </span>
              <a className="txt2" href="Signup">
                Sign Up
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
