import React from 'react'
type FallbackRender = (props: {error: Error | null}) => React.ReactElement

// <{children: ReactNode, fallbackRender: FallbackRender}>
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallbackRender: FallbackRender
  }>,
  {error: Error | null}
> {
  state = {error: null}
  //子组件抛出异常的 这里会接到调用
  static getDerivedStateFormError(error:Error){
    return {error}
  }
  render(){
    const {error } = this.state
    const {fallbackRender,children} = this.props
    if(error){
      return fallbackRender({error})
    }
    return children
  }
}
