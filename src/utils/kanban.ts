import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client('kanbans', {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDelectKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)//使用乐观更新
  )
}

//拖拽持久化掉数据

export interface SortProps {
  fromId: number;//重新排序的 item
  referenceId: number; //目标 item
  type: 'before' | 'after'; //目标的前还是后
  fromKanbanId?: number;
  toKanbanId?: number;
}
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: SortProps) => {
      return client('kanbans/reorder', {
        data: params,
        method: 'POST'
      })
    },
    useReorderKanbanConfig(queryKey)
  )
}