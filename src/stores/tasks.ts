import { defineStore } from 'pinia'
import moment from "moment";
import { orderBy, groupBy } from 'lodash';
import * as uuid from "uuid";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://day-tracker-api-dev.nanonino.workers.dev";
interface State {
  tasks: any[]
}

export const useTasksStore = defineStore({
  id: 'tasks',
  state: (): State => ({
    tasks: []
  }),
  getters: {
    getTasks: (state) => {
      return (filter: string | null | undefined) => {
        let tasks: any = state.tasks.map((t) => {
          let newTaskData = {
            ...t,
            createdAtTime: moment(t.createdAt).format("dd HH:mm"),
            day: moment(t.createdAt).format("YYYY-DDD"),
            dayFormatted: moment(t.createdAt).format("dddd Do MMM")
          }
          return newTaskData;
        });
        tasks = orderBy(tasks, (t: any) => t.createdAt, "desc");
        if (filter) {
          tasks = tasks.filter((t: any) => !t.isPersonal)
        }
        tasks = groupBy(tasks, (t: any) => t.day);
        let groupedTasks = [];
        for (let task in tasks) {
          groupedTasks.push({
            tasks: tasks[task],
            dayFormatted: tasks[task]?.[0].dayFormatted,
            day: tasks[task]?.[0].day
          })
        }
        return groupedTasks;
      }
    },

  },
  actions: {
    async getAll() {
      const response = await fetch(`${API_BASE_URL}`);
      const jsonResponse = await response.json();
      jsonResponse.result.map((item: any) => {
        this.tasks.push(JSON.parse(item))
      })
    },
    async add(newTaskData: any) {
      const id = uuid.v4();
      const newTask = { id, name: newTaskData.name, createdAt: new Date().valueOf(), isPersonal: newTaskData.isPersonal }
      const response = await fetch(`${API_BASE_URL}`, { method: "POST", body: JSON.stringify(newTask) });
      this.tasks.push(newTask)
    },
    async deleteTask(id: string, score: any) {
      const response = await fetch(`${API_BASE_URL}/${score}`, { method: "POST" });
      console.log("score: ", score);
      console.log("response: ", await response.json())
      const index = this.tasks.findIndex((task: any) => task.id === id);
      console.log("index to be removed: ", index)
      this.tasks.splice(index, 1);
    }
  }
})
