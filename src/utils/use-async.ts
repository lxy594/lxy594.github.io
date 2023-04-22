import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils/index"

interface State<D> {
  error: Error | null,
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultsInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}
const defaultConfig = {
  throwOnError: false
}
const useSafeDispatch = <T>(dispatch:(...args:T[])=>void)=>{
  const mountedRef = useMountedRef()
  return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args):void 0),[dispatch,mountedRef])
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig }
  // const [state, setState] = useState<State<D>>({
  //   ...defaultsInitialState,
  //   ...initialState
  // })

  // 修改reducer
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultsInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {
  })
  const setData = useCallback((data: D) => safeDispatch({
    data,
    stat: 'success',
    error: null
  }), [safeDispatch])

  const setError = useCallback(() =>
    (error: Error) => safeDispatch({
      error,
      stat: 'error',
      data: null
    }), [safeDispatch])

  //触发异步请求 增加刷新
  const run = useCallback(async (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    // 每次执行一遍
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    safeDispatch({  stat: 'loading' })
    return promise
      .then((data: D) => {
          setData(data)
        return data
      }).catch((error) => {
        // catch会消化异常 如果不主动抛出 外面接不到异常
        //@ts-ignore
        setError(error)
        // setError(error)//获取到的是 premiso pedding
        if (config.throwOnError)
          return Promise.reject(error)
        return error
      })
  }, [config.throwOnError, setData, setError,safeDispatch]
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    //调用时重新执行 run
    retry,
    ...state
  }
}