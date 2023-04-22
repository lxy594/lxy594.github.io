import { useEffect, useRef, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid= (value:unknown)=>value === undefined || value == null || value === ''
// 没有传入的对象去掉 不带空
export const cleanObject = (object:{[key:string]:unknown}) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 这样就排除value为0的情况
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 只执行一次 useEffect加【】执行一次  初始化加载一次使用customhook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //TODO 依赖项里加上callback会造成无限循环 这个和usecallback以及useMemo有关系
  }, []);
};

//iput输入的时候不想一直掉请求  (value:unknown, delay?:number):any修改泛型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次value变化的时候 设置定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 上一次useEffect执行完的时候 清除定时器 【上一个useEffect处理完以后再运行】
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

// 增加 删除 还有移除的功能
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}

export const useDocumentTitle = (title:string,keepOnmount:boolean=true)=>{
  const oldTitle =useRef(document.title).current ;
  //页面加载时：旧title
  //加载后 新的title
  //渲染时
  useEffect(()=>{
    document.title = title
  },[title])

  useEffect(()=>{
    return ()=>{
      if(!keepOnmount){
        //卸载时 不能依赖的时候执行旧title
         document.title = oldTitle
      }
    }
  },[keepOnmount,oldTitle])
}

//重置路由
export const resetRoute = () =>window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载返回false 反之是true
 */
export const useMountedRef = ()=>{
  const mountedRef = useRef(false)
  useEffect(()=>{
    mountedRef.current = true
    return()=>{
      mountedRef.current = false
    }
  })
  return mountedRef
}