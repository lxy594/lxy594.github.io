import {useEffect, useState} from 'react'
import React from 'react'

const test = () => {
  let num = 0
  const effect = () => {
    num += 1
    const message = `现在的num的值：${num}`
    return function unmount() {
      console.log(message)
    }
  }
  return effect
}
//执行test 返回effect函数
const add = test()
//执行effect函数 返回引用了message的unmount函数
const unmount = add()
//再一次执行effect函数 ，返回引用了
add()
add()
unmount() //打印的是1 现在的num的值：1  实际以为是3

// react hook和闭包， hook与闭包经典坑
export const Test = () => {
  const [num, setNum] = useState(0)
  const add = () => setNum(num + 1)

  useEffect(()=>{
    const id = setInterval(()=>{
      console.log('num setInterval:',num)
    },1000)
    return ()=> clearInterval(id)
  },[num])

  useEffect(() => {
    return () => {
      console.log('卸载值',num)
    }
  }, [num])
  return (
    <div>
      {num}
      <button onClick={add}>add+1</button>
    </div>
  )
}
