import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPancel } from "./search-panel";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams, useProjectModal } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "component/lib";
// import { useDispatch } from "react-redux";
// import { projectListActions } from "./project-list.slice";
// import retry from ''
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  //1.封装useUsers  const [users, setUsers] = useState([])
  // const [keys] = useState<('name'|'personId')[]>(['name','personId']) 需要传keys的时候的写法
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  // const dispatch = useDispatch()
//第二种写法
const {open} = useProjectModal()
  return (
    <Container>
      <Row between = {true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPancel users={users || []} param={param} setParam={setParam} />
      {/* {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null} */}
      <ErrorBox error={error}/>
      {/* @ts-ignore */}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        // projectButton={props.projectButton}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3rem;
`;
