//在真实环境中 如果使用firebase这种第三方auth服务的话 ，此文件不需要开发
import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'
export const getToke = () => window.localStorage.getItem(localStorageKey)
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}
//登录接口
export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (res) => {
            if (res.ok) {
                return handleUserResponse(await res.json())
            } else {
                return Promise.reject(await res.json())
            }
        })
}
//注册接口
export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (res) => {
            if (res.ok) {
                return handleUserResponse(await res.json())
            } else {
                return Promise.reject(await res.json())
            }
        }
    )
}
//登出
export const logout = async () => {
  await  window.localStorage.removeItem(localStorageKey)
//   await useQueryClient().clear()
}