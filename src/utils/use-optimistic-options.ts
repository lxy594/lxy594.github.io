import { QueryKey, useQueryClient } from "react-query";
import { reorder } from "./ reorder";
import { Task } from "types/task";

//乐观更新 点五角星的时候更新
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {

    onSuccess: () => queryClient.invalidateQueries(queryKey),//及时刷新

    //乐观更新增加的
    async onMutate(target: any) {
      const previousItems = queryClient.getQueriesData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return { previousItems }
    },
    //@ts-ignore
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItem)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old: any[] | undefined) =>
  old?.filter(item => item.id !== target.id) || []
)

export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old: any[] | undefined) =>
  old?.map(item => item.id === target.id ? { ...item, ...target } : {}) || []
)

export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old: any[] | undefined) =>
  old ? [...old, target] : []
  )
  export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
