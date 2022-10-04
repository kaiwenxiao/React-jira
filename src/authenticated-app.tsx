import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { logout } from "./auth-provider";
// import softwareLogo from "assets/software-logo.svg";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectScreen } from "./screens/project";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          {/*  ProjectListScreen使用了Link - 应该在Router里面*/}
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/*<img src={softwareLogo} />*/}
        <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 高度分成三段，每段的高度，1fr自适应
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
