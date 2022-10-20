import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { Kanban } from "../types/kanban";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { Project } from "../types/project";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () => client("tasks", { data: param }));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), { enabled: Boolean(id) });
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
