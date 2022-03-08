import "antd/dist/antd.css";
import "./login.css";
import { Form, Input, Button, Checkbox } from "antd";
import Icon from "@ant-design/icons";
import React from "react";

function Login() {
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
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
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
