
import { User } from "types/user";
import { useEffect } from 'react'
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  return useQuery<User[], Error>(['uses', param], () => client('users', { data: param }))
}

