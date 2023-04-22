import React, {ReactNode, useCallback} from 'react'
import * as auth from 'auth-provider'
import {http} from 'utils/http'
// @ts-ignore
import {User} from 'types/user'
import {useMount} from 'utils'
import {useAsync} from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'component/lib'

//通过store获取 重新命名空间 因为都是login
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
export interface AuthForm {
  username: string
  password: string
}

//hook警告
export const useAuth = () => {
  // const context = React.useContext(AuthContext)
  // if (!context) {
  //   throw new Error('useAuth必须在AuthProvider中使用')
  // }
//@ts-ignore
  const dispatch: (...args:unknown[])=>Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const queryClient = useQueryClient()
  const login = useCallback((form: AuthForm)=>dispatch(authStore.login(form)),[dispatch])
  const register =useCallback((form: AuthForm)=>dispatch(authStore.register(form)),[dispatch])
  const logout =useCallback(()=>{
    dispatch(authStore.logout())
    queryClient.clear()
    console.log('登出')
  },[dispatch])
  return {
    user,login,register,logout
  }
}


export const AuthProvider = ({children}: {children: ReactNode}) => {
  //user=>setUser(user) =>setUser (point free)
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>()
  //@ts-ignore
  const dispatch: (...args:unknown[]) => Promise<User> = useDispatch()
  //保存token的持久化
  useMount(() => {
    run(dispatch(authStore.bootstrap()))
    // bootstrapUser().then(setUser)
})

if (isIdle || isLoading) {
  return <FullPageLoading></FullPageLoading>
}
if(isError){
    // @ts-ignorey
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>
}
  return <div>{children }</div> 
}

// 登录完刷新页面会重新到登录页面
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToke()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}
