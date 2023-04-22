import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
// import { useDispatch } from "react-redux";
// import { projectListActions } from "screens/project-list/project-list.slice";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
export const ProjectPopover = () => {
  // const dispatch = useDispatch()
  const { data: projects ,refetch} = useProjects();
  //第二种写法
  const { open } = useProjectModal();
  //收藏的项目
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      {/* 收藏项目的list */}
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover onVisibleChange={()=>refetch()} placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  /* padding: 0; */
  min-width: 30rem;
`;
