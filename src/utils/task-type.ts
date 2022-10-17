import { Project } from "../types/project";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { TaskType } from "../types/task-type";

export const useTasksTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[], Error>(["taskTypes"], () => client("taskTypes"));
};
