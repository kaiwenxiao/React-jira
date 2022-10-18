import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { Kanban } from "../types/kanban";
import { useAddConfig } from "./use-optimistic-options";

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
