//获取列表的数据
import { useQuery } from "react-query"
import { useHttp } from "./http"
import { Task } from "types/task";
import { TaskType } from "types/task-type";

export const useTaskTypes = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<TaskType[]>(['taskTypes'], () =>
   client('taskTypes')
   );
};