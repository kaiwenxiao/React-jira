import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { KanbanScreen } from "../Kanban";
import { EpicScreen } from "../Epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
        {/*  默认跳到kanban*/}
        <Route index element={<Navigate to={"kanban"} />} />
      </Routes>
    </div>
  );
};
