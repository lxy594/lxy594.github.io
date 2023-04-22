import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auto-context";
import styled from "@emotion/styled";
import { Button, Menu } from "antd";
import React from "react";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { ButtonNoPadding, Row } from "component/lib";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "component/project-popover";
// import { useDispatch } from "react-redux";
// import { projectListActions } from "screens/project-list/project-list.slice";
import type { MenuProps } from "antd";
import { UserPopover } from "component/user-popover";
// import { useProjectModal } from "screens/project-list/util";

/***
 * 1.charCodeAt(index)grid和flex布局的场景
 * 一维布局和二维布局
 * 一维布局flex 二维布局grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 * ***/

export const AuthenticatedApp = () => {
  // 第一种
  // const dispatch = useDispatch();
  //  const projectModalOpen = useSelector(selectProjectModelOpen)
  //第二种方法
  // const { open } = useProjectModal();
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route
              path={"/projects"}
              element={
                // <ProjectListScreen
                //   projectButton={
                //     <ButtonNoPadding
                //       onClick={() => dispatch(projectListActions.openProjectModal)}
                //       type="link"
                //     >
                //       创建项目
                //     </ButtonNoPadding>
                //   }
                // />
                <ProjectListScreen />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route
              index
              element={<Navigate to={"projects"} replace={true} />}
            ></Route>
            {/* <Navigate to={"/projects"} /> */}
            {/* <Navigate to={'/projects'}/> */}
          </Routes>
        </Main>
        {/* @ts-ignore */}
        <ProjectModal></ProjectModal>
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,55)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover/>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Menu>
          <Menu.Item key="layout">
            <Button onClick={logout} type="link">
              登出
            </Button>
          </Menu.Item>
        </Menu>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        <Space>
          Hi. {user?.name}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
const Container = styled.div`
  /* display: grid; */
  /* 1fr= 100vh-12rem fr是中间的位置 */
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

//grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
