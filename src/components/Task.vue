<script setup>
import { useTasksStore } from "../stores/tasks";
const props = defineProps(['task']);
const task = props.task;

const tasksStore = useTasksStore();
const deleteTask = async () => {
    await tasksStore.deleteTask(task.id, task.createdAt)
}
</script>
<template>
    <li class="relative p-4 rounded-2xl bg-white border-2 border-gray-100 my-10 flex flex-row justify-between items-center"
        :class="{'border-lime-400' : task.isPersonal, 'border-gray-300' : !task.isPersonal}"
    >
        <span class="font-medium">{{ task.name }}</span>
        <button @click="deleteTask" class="absolute -right-3 -top-4 py-1 px-3 bg-red-700 hover:bg-red-600 text-white text-sm rounded-full">x</button>
        <div class="text-xs text-gray-400 absolute right-5 bottom-2">{{task.createdAtTime}}</div>
    </li>
</template>