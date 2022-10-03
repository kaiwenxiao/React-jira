import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // useAsync泛型指的是接口返回的数据类型
  const { run, ...result } = useAsync<Project[]>();

  // 当param改变时，去调用接口
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
