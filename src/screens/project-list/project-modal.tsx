import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "component/lib";
import { UserSelect } from "component/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./util";
export const ProjectModal = () => {
  // const dispatch = useDispatch();
  // const projectModalOpen = useSelector(selectProjectModelOpen);
  //第二种方式
  const { close, projectModalOpen, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectQueryKey());
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields(); //重置表单
      close();
      
    });
  };

  // 编辑回来创建项目的遗留数据
  const closeModal = ()=>{
    form.resetFields()
    close()
  }
  const title = editingProject ? "编辑项目" : "创建项目";
  useEffect(() => {
    form.setFieldsValue(editingProject); //改变的时候重置表单
  }, [editingProject, form]);

  return (
    <>
      <Drawer forceRender open={projectModalOpen} onClose={closeModal} width="100%">
        <Container>
          {isLoading ? 
            <Spin size="large" /> : 
            <>
              <h1>{title}</h1>
              <ErrorBox error={error}></ErrorBox>
              <Form
                form={form}
                layout="vertical"
                style={{ width: "40rem" }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="名称"
                  name={"name"}
                  rules={[{ required: true, message: "请输入项目名" }]}
                >
                  <Input placeholder="请输入项目名" />
                </Form.Item>
                <Form.Item
                  label="部门"
                  name={"organization"}
                  rules={[{ required: true, message: "请输入部门名" }]}
                >
                  <Input placeholder="请输入部门名" />
                </Form.Item>
                <Form.Item
                  label="负责人"
                  name={"personId"}
                  rules={[{ required: true, message: "请输入部门名" }]}
                >
                  <UserSelect defaultOptionName="负责人"></UserSelect>
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={mutateLoading}
                  >
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </>
          }
        </Container>
      </Drawer>
    </>
  );
};
const Container = styled.div`
  flex-direction: column;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
