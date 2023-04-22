import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Task } from "types/task";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistic-options";
import { Project } from "types/project";
import { SortProps } from "./kanban";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', param], () =>
   client('tasks', { data: param })
   );
};
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client('tasks', {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

//获取详情
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id) //id有值才促发
  }
  )
}
//编辑
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)//使用乐观更新
  )
}
export const useDelectTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({id}:{id:number}) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)//使用乐观更新
  )
}
export const  useReorderTask =  (queryKey:QueryKey) =>{
  const client = useHttp()
  return useMutation(
    (params:SortProps) =>{
      return client('tasks/reorder',{
        data:params,
        method:'POST'
      })
    },   
    useReorderTaskConfig(queryKey)
  )
}