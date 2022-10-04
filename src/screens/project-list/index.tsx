// 异步请求状态、loading、错误管理
import { List, Project } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 2000);
  // useAsync泛型指的是接口返回的数据类型
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || undefined} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
