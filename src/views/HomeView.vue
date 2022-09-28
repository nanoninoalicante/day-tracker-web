<script setup>
import { ref, onMounted, computed } from "vue"
import { useTasksStore } from "../stores/tasks";
import Task from "../components/Task.vue";
const tasksStore = useTasksStore();
const newTask = ref("")
const allTasks = computed(() => tasksStore.getTasks);
const createNewTask = () => {
    console.log("create new taks");
    tasksStore.add({ name: newTask.value })
    newTask.value = "";
}
onMounted(() => {
    tasksStore.getAll();
})
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
                <Task v-for="task in allTasks" :key="task.id" :task="task"></Task>
            </ul>
        </div>
    </div>
</template>