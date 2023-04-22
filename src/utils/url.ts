import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { useMemo, useState } from "react"
import { cleanObject, subset } from "utils"

/**
 *返回页面url中，指定键参数值 
 * 
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    //当obj基本类型的时候就不会无限循环 const obj = 1 当obj是对象的时候 就会无限循环const obj = {name:'jack'} 
    //当obj是对象的state的时候 不会无限循环 这里会无限掉  所以使用usemeno
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys) as {
        [Key in K]: string;
      },
      [searchParams, stateKeys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
     return setSearchParams(params)
    }
  ] as const
}


export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}