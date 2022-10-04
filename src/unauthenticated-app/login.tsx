import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "../utils/use-async";

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const { login, user } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values));
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError(e);
    }
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
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
