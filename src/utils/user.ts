import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { Project } from "../types/project";
import { User } from "../types/user";
import { useQuery } from "react-query";

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   // useAsync泛型指的是接口返回的数据类型
//   const { run, ...result } = useAsync<User[]>();
//
//   // 当param改变时，去调用接口
//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//   }, [param]);
//
//   return result;
// };
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () => client("users", { data: param }));
};
