import { Project } from 'types/project'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // const { run, ...result } = useAsync<Project[]>()

  // const fetchProjects = useCallback(
  //   ()=>client('projects', { data: cleanObject(param || {}) }),[param,client]
  //   )
  // useEffect(() => {
  //   run(fetchProjects(),{
  //     retry:fetchProjects
  //   })
  // }, [fetchProjects, param, run])
  // return result

  //2
  return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }))
}

//删除
export const useDelecteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({id}:{id:number}) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)//使用乐观更新
  )
}


export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)//使用乐观更新
  )
}
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  // const queryClient = useQueryClient()
  // const { run, ...asyncResult } = useAsync()
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
  return useMutation((params: Partial<Project>) => client(`projects`, { method: 'POST', data: params }),
    // onSuccess: () => queryClient.invalidateQueries('projects') //及时刷新
    useAddConfig(queryKey)
  )
}

//获取项目的id
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['projects', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id) //id有值才促发
  }
  )
}