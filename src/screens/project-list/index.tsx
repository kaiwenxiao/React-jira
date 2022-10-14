// 异步请求状态、loading、错误管理
import { List, Project } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Row } from "../../components/lib";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const debounceParam = useDebounce(param, 2000);
  const { isLoading, error, data: list, retry } = useProjects(debounceParam);
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      {/*<button onClick={retry}> retry</button>*/}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || undefined}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
