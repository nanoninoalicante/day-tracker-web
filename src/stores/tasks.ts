import { defineStore } from 'pinia'
import moment from "moment";
import { orderBy } from 'lodash';
import * as uuid from "uuid";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
      const tasks = state.tasks.map((t) => {
        return {
          ...t,
          createdAtTime: moment(t.createdAt).format("dd HH:mm")
        }
      });
      return orderBy(tasks, (t) => t.createdAt, "desc")
    }
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
      const newTask = { id, name: newTaskData.name, createdAt: new Date().valueOf() }
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
