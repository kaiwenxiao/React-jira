import { useAuth } from "context/auth-context";
import React from "react";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // elements[0] 代表username的信息
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
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
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
