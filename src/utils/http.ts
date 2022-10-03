import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// endpoint -- baidu.com/getpost(服务器路由，不是前端路由) -> /getpost
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // customConfig 可能为post 覆盖掉默认的get
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 自动携带jwt的方法
export const useHttp = () => {
  const { user } = useAuth();
  // utitlity type
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 联合类型
// let myFavoriteNumber: string | number;
// myFavoriteNumber = "seven";
// myFavoriteNumber = 7;

// let jackFavoriteNumber: string | number;

// // 类型别名
// type FavoriteNumber = string | number;
// let roseFavoriteNumber: FavoriteNumber = "6";

// type和interface在很多时候可以互换
// type可以做到联合类型和交叉类型，以及utility type
type Person = {
  name: string;
  age: string;
};

const xiaoMing: Partial<Person> = { age: "8" };
const shenMiRen: Omit<Person, "name" | "age"> = {};
