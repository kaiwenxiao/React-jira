import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { logout } from "./auth-provider";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 高度分成三段，每段的高度，1fr自适应
  height: 100vh;
`;

const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
