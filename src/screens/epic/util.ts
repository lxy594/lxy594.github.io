import { useKanbanSearchParams, useProjectIdInUrl } from "screens/kanban/util"

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useEpicsQueryKey = () => ['epic', useKanbanSearchParams()]