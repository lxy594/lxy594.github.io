import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useDelectTask, useEditTask } from "utils/task";
import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "component/user-select";
import { TaskTypeSelect } from "component/task-type-select";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const {mutate:deleteTask} = useDelectTask(useTasksQueryKey())
  const onCancel = () => {
    close();
    form.resetFields(); //表单重置
  };
  const onOk = async () => {
    //@ts-ignore
    await editTask({ ...editTask, ...form.getFieldValue() });
    close();
  };
  const startDelect =() =>{
    
    close()
    Modal.confirm({
      okText: " 确定",
      cancelText: "取消",
      title: "确定删除任务吗",
      onOk() {
        return deleteTask({ id: Number(editingTaskId)});
      },
    });
  }
  useEffect(() => {
    //@ts-ignore
    form.setFieldValue(editingTask);
  }, [form]);
  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title="编辑任务"
      open={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"}  name={"processorId"}>
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label={"类型" } name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{textAlign:'right'}}>
        <Button size="small" style={{fontSize:'14px'}} onClick={startDelect}> 删除</Button> </div>
    </Modal>
  );
};
