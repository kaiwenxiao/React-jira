import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { Params } from "react-router-dom";
import { useProjectQueryKey, useProjectSearchParams } from "../screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

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

// export const useEditProject = (queryKey: QueryKey) => {
//     const client = useHttp();
//
//     // const { run, ...asyncResult } = useAsync();
//     // const mutate = (params: Partial<Project>) => {
//     //   return run(
//     //     client(`projects/${params.id}`, {
//     //       data: params,
//     //       method: "PATCH",
//     //     })
//     //   );
//     // };
//     // return { mutate, ...asyncResult };
//     return useMutation((params: Partial<Project>) =>
//         client(`projects/${params.id}`, {
//             method: "PATCH",
//             data: params
//         }),
//         useEditProject(queryKey)
//     )}
// {
//   //  前面执行成功后执行projects(为useQuery的queryKey)
//   //  onSuccess: () => queryClient.invalidateQueries("projects")
//   onSuccess: () => queryClient.invalidateQueries(queryKey),
//   async onMutate(target) {
//     const previousItems = queryClient.getQueryData(queryKey);
//     // old 代表projects这个querykey的数组
//     queryClient.setQueryData(
//       queryKey,
//       (old?: Project[]) =>
//         old?.map((project) =>
//           project.id === target.id ? { ...project, ...target } : project
//         ) || []
//     );
//     // 返回是回滚机制
//     return { previousItems };
//   },
//   onError(error, newItem, context) {
//     queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
//   },
// }
//   );
// };

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

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
      client(`projects`, {
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  // 当id不为undefined的时候才调用该函数
  return useQuery<Project>(["project", { id }], () => client(`projects/${id}`), { enabled: !!id });
};
