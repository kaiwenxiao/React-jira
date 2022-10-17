import React from "react";
import { useUsers } from "../utils/user";
import { IdSelect } from "./id-select";
import { useTasksTypes } from "../utils/task-type";

export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTasksTypes();
  return <IdSelect options={taskTypes || undefined} {...props} />;
};
