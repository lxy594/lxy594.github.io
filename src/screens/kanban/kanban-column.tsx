import { Kanban } from "types/kanban";
import React from "react";
import { useTasks } from "utils/task";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import { useTaskTypes } from "utils/task-type";
// import taskIcon from "assets/bugs.svg";
// import bugIcon from "assets/tasks.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, MenuProps, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "component/mask";
import { useDelectKanban } from "utils/kanban";
import { Row } from "component/lib";
import { CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Drag, Drop, DropChild } from "component/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;
  if (!name) {
    return null;
  }
  //增加前面的icon
  return (
    <div>{name === "task" ? <CheckOutlined /> : <InfoCircleOutlined />} </div>
  );
  // <img alt="task-icon" src={name === "task" ? taskIcon : bugIcon} />;
};

//抽离card
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem" }}
      key={task.id}
    >
      {/* <div>{item.name}</div> */}
      <Mark keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container {...props} ref={ref}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TasksContainer>
        {/* 实现上下拖拽 */}
        <Drop
      
          droppableId={String(kanban.id)}
          type={"ROW"}
          direction={"vertical"}
  
        >
          <DropChild style={{minHeight:'5px'}}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                draggableId={"task" + task.id}
                index={taskIndex}
              >
                <div ref={ref}>
                  <TaskCard task={task} key={task.id}></TaskCard>
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

//三个点的删除
const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDelectKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: " 确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Menu>
          <Menu.Item>
            <Button type="link" onClick={startEdit}>
              删除
            </Button>
          </Menu.Item>
        </Menu>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type="link">...</Button>
    </Dropdown>
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
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
