import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      {/* <div
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
              <label htmlFor="username">用户名</label>
              <input type="text" id={"username"} />
          </>
        }
      /> */}
      {user ? (
        <div>
          {" "}
          登录成功，用户名：{user?.name}
          {user?.token}
        </div>
      ) : null}
      <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
