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
    async getAll() {
      const response = await fetch("https://day-tracker-api-dev.nanonino.workers.dev/");
      const jsonResponse = await response.json();
      jsonResponse.result.map((item: any) => {
        this.tasks.push(JSON.parse(item))
      })
    },
    async add(newTaskData: any) {
      const newTask = { name: newTaskData.name, createdAt: new Date().valueOf() }
      const response = await fetch("https://day-tracker-api-dev.nanonino.workers.dev/", { method: "POST", body: JSON.stringify(newTask) });
      this.tasks.push(newTask)
    }
  }
})
