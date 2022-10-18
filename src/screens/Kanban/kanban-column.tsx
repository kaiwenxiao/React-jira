import React from "react";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";
import { useTasksTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";

// useTasksTypes 接口返回类似 [{id: 1, name: bug},{id: 2, name: task}] -- 这里是要获取task的真实类型bug or task
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTasksTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContaienr>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            {task.name}
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContaienr>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContaienr = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
