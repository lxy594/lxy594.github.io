import React from 'react'
import {useAuth} from '../context/auto-context'
import {Form, Input} from 'antd'
import {LognButton} from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'
// import { useDispatch } from 'react-redux'
export const LoginScreens = ({onError}: {onError: (error: Error) => void}) => {
  const {login} = useAuth()
  const {run , isLoading} = useAsync(undefined,{throwOnError:true})
  // const dispatch =useDispatch()
  const handleSubmit = async (values: {username: string; password: string}) => {
    // 掉登录的接口y
    try {
      // await  dispatch(login(values))
      await run(login(values)) 
    } catch (error) {
         // @ts-ignore
      onError(error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{required: true, message: '请输入用户名'}]}
      >
        <Input placeholder="用户名" type="text" id="{'username'}" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: '请输入密码'}]}
      >
        <Input placeholder="密码" type="password" id="{'password'}" />
      </Form.Item>
      <Form.Item>
        <LognButton loading={isLoading } htmlType="submit" type="primary">
          登录
        </LognButton>
      </Form.Item>
    </Form>
  )
}
