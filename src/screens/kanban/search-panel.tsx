import React from "react";
import { useTasksSearchParams } from "./util";
import { useSetUrlSearchParam } from "utils/url";
import { Button, Input } from "antd";
import { UserSelect } from "component/user-select";
import { TaskTypeSelect } from "component/task-type-select";
import { Row } from "component/lib";
export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  //重置
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      ></Input>
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
