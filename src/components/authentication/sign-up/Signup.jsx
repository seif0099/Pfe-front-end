import "antd/dist/antd.css";
import "./signup.css";
import { Form, Input, Button, Checkbox } from "antd";
import Icon from "@ant-design/icons";
import React from "react";

function Signup() {
  return (
    <div className="wrapper">
      <div className="login-center">
        <Form onSubmit={() => {}} className="login-form">
          <h1 className="title">Bienvenue</h1>
          <br></br>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nom"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Prenom"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
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
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Classe"
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
