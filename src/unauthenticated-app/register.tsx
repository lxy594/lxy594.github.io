import React from "react";
import { useAuth } from "../context/auto-context";
import { Form, Input } from "antd";
import { LognButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
export const RegisterScreens = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    // 判断两次输入的密码是否相同
    if (cpassword !== values.password) {
      onError(new Error("请确认输入的两次密码是否相同"));
      return;
    }
    // 掉注册的接口
    try {
      await run(register(values));
    } catch (error) {
      console.log(error);
      // @ts-ignore
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input
          placeholder="用户名"
          type="text"
          id="{'username'}"
          autoComplete="true"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input
          placeholder="密码"
          type="password"
          id="password"
          autoComplete="true"
        />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input
          placeholder="确认密码"
          type="password"
          id="cpassword"
          autoComplete="true"
        />
      </Form.Item>
      <Form.Item>
        <LognButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LognButton>
      </Form.Item>
    </Form>
  );
};
