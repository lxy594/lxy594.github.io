import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
//项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      //@ts-ignore
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]),
    setParam] as const
}

export const useProjectQueryKey = () => {
  const [params] =  useProjectsSearchParams()
 return ['projects', params]
}
export const useProjectModal = () => {
  //@ts-ignore
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  //@ts-ignore
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])
  const setUrlParams = useSetUrlSearchParam()
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setUrlParams({ projectCreate: "" , editingProjectId:"" })
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading

  }
}