import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Params } from "react-router-dom";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // useAsync泛型指的是接口返回的数据类型
  // const { run, ...result } = useAsync<Project[]>();
  //
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [param, client]
  // );
  //
  // // 当param改变时，去调用接口
  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param, run, fetchProjects]);
  //
  // return result;

  // 第一个参数也可以是数组,当为数组的时候,数组里面的值发生变化,会执行第二个参数回调
  return useQuery<Project[], Error>(["projects", param], () => client("projects", { data: param }));
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    //  前面执行成功后执行projects(为useQuery的queryKey)
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
  return useMutation(
    (params: Partial<Project>) =>
      client(`project`, {
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
