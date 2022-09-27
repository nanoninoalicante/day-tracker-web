import { defineStore } from 'pinia'
import moment from "moment";
export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: []
  }),
  getters: {
    getTasks: (state) => state.tasks.map((t) => {
      return {
        ...t,
        createdAtTime: moment(t.createdAt).toISOString()
      }
    })
  },
  actions: {
    add(newTaskData: any) {
      this.tasks.push({ name: newTaskData.name, createdAt: new Date().valueOf() })
    }
  }
})
