<script setup>
import { ref, onMounted, computed } from "vue"
import { useTasksStore } from "../stores/tasks";
import Task from "../components/Task.vue";
import moment from "moment";
import { useClipboard } from '@vueuse/core'

const tasksStore = useTasksStore();
const newTask = ref("")
const isPersonal = ref(false);
const showWork = ref(false)
const allTasks = computed(() => {
    return tasksStore.getTasks(showWork.value);
});
const createNewTask = () => {
    console.log("create new taks");
    tasksStore.add({ name: newTask.value, isPersonal: isPersonal.value })
    newTask.value = "";
}
const selectedDaySummary = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source: selectedDaySummary })
const exportDay = (taskGroup) => {
    selectedDaySummary.value = `${taskGroup.dayFormatted}\n`;
    for (let task of taskGroup.tasks) {
        selectedDaySummary.value += `${task.name} - ${task.createdAtTime} \n`;
    }
    copy();
}
onMounted(() => {
    tasksStore.getAll();
})
</script>
<template>
    <div class="w-full md:w-2/3 flex justify-center flex-col items-center space-y-4">
        <h1 class="font-medium text-lg">Add Task</h1>
        <div class="w-full md:w-2/3 flex flow-row justify-between items-center space-x-2">

            <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" v-model="isPersonal" id="default-toggle" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 dark:peer-focus:ring-lime-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-600">
                </div>
            </label>

            <input @keyup.enter="createNewTask" type="text" class="w-full border-2 border-gray-300 p-4 rounded-2xl"
                v-model="newTask" :class="{'border-lime-500' : isPersonal}"
                :placeholder="isPersonal ? 'WDIDT - Personal' : 'WDIDT - Work'" />
        </div>
        <div>
            <label for="showwork-toggle" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" v-model="showWork" id="showwork-toggle" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">All/Work</span>

            </label>
        </div>
        <div v-if="allTasks.length > 0" class="w-full">
            <div v-for="taskGroup in allTasks" :key="taskGroup.day" class="w-full">
                <div class="-mb-6 mt-8">
                    <span class="text-xl font-bold text-gray-500">{{taskGroup.dayFormatted}}</span>
                    <button @click="exportDay(taskGroup)"
                        class="p-2 text-sm text-gray-400 underline hover:no-underline">{{copied ? 'copied!' :
                        'export'}}</button>
                </div>
                <TransitionGroup name="list" tag="ul">
                    <Task v-for="task in taskGroup.tasks" :key="task.id" :task="task"></Task>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>
<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.1s ease-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>