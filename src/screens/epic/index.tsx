import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "component/lib";
import React, { useState } from "react";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { CreactEpic } from "./create-epic";
import { Epic } from "types/epic";
export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: delectEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const comfirmDelectEpic = (epic: Epic) => {
    Modal.confirm({
      okText: " 确定",
      content: "点击确定删除",
      cancelText: "取消",
      title: `确定删除项目组：${epic.name}`,
      onOk() {
        delectEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type="link" onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
      style={{overflow:'scroll'}}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type="link" onClick={() => comfirmDelectEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreactEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
