import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../types/project";
import { reorder } from "./reorder";
import { Task } from "../types/task";

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();
  return {
    //  前面执行成功后执行projects(为useQuery的queryKey)
    //  onSuccess: () => queryClient.invalidateQueries("projects")
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      // old 代表projects这个querykey的数组
      queryClient.setQueryData(
        queryKey,
        (old?: any[]) => callback(target, old)
        // old?.map((project) => (project.id === target.id ? { ...project, ...target } : project)) ||
        // []
      );
      // 返回是回滚机制
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || []);
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId ? { ...item, kanbanId: target.toKanbanId } : item
    );
  });
