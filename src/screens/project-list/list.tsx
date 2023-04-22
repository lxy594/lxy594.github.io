import React from "react";
import { Button, Dropdown, Modal, Table, TableProps } from "antd";
import { User } from "types/user";  
import dayjs from "dayjs";
// import Link from 'antd/es/typography/Link'
//react-router 和 react-router-dom 的关系 类似于 react 和react-dom/react-nativer
import { Link } from "react-router-dom";
import { Pin } from "component/pin";
import { useDelecteProject, useEditProject } from "utils/project";
// import { useDispatch } from "react-redux";
import { useProjectQueryKey, useProjectModal } from "./util";
import { Project } from 'types/project'

// export interface Project {
//   id: number;
//   name: string;
//   personId: number;
//   pin: boolean;
//   organization: string;
//   created: number;
// }
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  // const dispatch = useDispatch();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      rowKey={(r) => r.id}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          render(value, project) {
            return <More project={project} />
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
    const editProject = (id: number) => () => {
    startEdit(id);
  };
  // const startDelect = useDelecteProject()
  // const delectProject =(id:number) =>{
  //   startDelect(id)
  // }

  const {mutate:deleteProject} = useDelecteProject(useProjectQueryKey())
  const confirmDelectProject = (id:number)=>{
    console.log(id,'====')
    Modal.confirm({
      title:'确定删除这个项目吗？',
      content:'点击确定删除',
      okText:'确定',
      onOk(){
        deleteProject({id})
      }
    })
  }
  return<Dropdown>
    <>
      <Button type="link" key="edit" onClick={editProject(project.id)}>
        编辑
      </Button>
      <Button type="link" key="delect" onClick={()=>confirmDelectProject(project.id)}>
        删除
      </Button>
      </>
  </Dropdown>;
 
};
