<script setup>
import { ref } from "vue"
import { useTasksStore } from "../stores/tasks";
const tasksStore = useTasksStore();
const newTask = ref("")
const createNewTask = () => {
    console.log("create new taks");
    tasksStore.add({ name: newTask.value })
    newTask.value = "";
}
</script>
<template>
    <div class="w-full md:w-2/3 flex justify-center flex-col items-center space-y-4">
        <h1>Tasks</h1>
        <div class="w-full md:w-2/3">
            <input @keyup.enter="createNewTask" type="text" class="w-full p-4 rounded-2xl" v-model="newTask"
                placeholder="WDIDT" />
        </div>
        <div v-if="tasksStore.tasks.length > 0" class="w-full">
            <ul>
                <li v-for="task in tasksStore.tasks" class="p-2 rounded-2xl bg-white my-2 flex flex-row justify-between">
                    <pre>{{task}}</pre>
                    <span>{{ task.name }}</span>
                    <span>{{task.createdAtTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>