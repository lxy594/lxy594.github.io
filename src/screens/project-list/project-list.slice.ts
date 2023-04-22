import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

//弹框状态打开
interface State {
  projectModalOpen: boolean
}
const initialState: State = {
  projectModalOpen: false
}
export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModelOpen = (state:RootState)=>state.projectList.projectModalOpen