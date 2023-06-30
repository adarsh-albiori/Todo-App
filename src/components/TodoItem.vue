<template>
  <div>
    <table class="table table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">Edit</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td class="names">
            <template v-if="currentlyEditing !== index">
              <span
                :class="{
                  'text-decoration-line-through': task.status === 'Finished',
                }"
              >
                {{ task.name }}
              </span>
            </template>
            <template v-else>
              <input type="text" v-model="newName" />
            </template>
          </td>
          <td>
            <span
              @click="currentlyEditing == index ? changeStatus(index) : nothing"
              class="statusClass"
              :class="{
                'bg-danger p-2 text-danger bg-opacity-50 border border-danger rounded':
                  task.status === 'Pending',
                'bg-success p-2 text-success bg-opacity-25 border border-success rounded':
                  task.status === 'Finished',
                'bg-primary p-2 text-primary bg-opacity-50 border border-primary rounded':
                  task.status === 'To-do',
              }"
              >{{ capitalizeFirstChar(task.status) }}</span
            >
          </td>

          <td>
            <template v-if="currentlyEditing !== index">
              <div @click="editTask(index, task.name)">
                <span class="material-symbols-outlined"> edit </span>
              </div>
            </template>
            <template v-else>
              <div>
                <span
                  @click="saveTask(index)"
                  class="material-symbols-outlined"
                >
                  save
                </span>
                <span @click="cancelTask()" class="material-symbols-outlined">
                  cancel
                </span>
              </div>
            </template>
          </td>
          <td>
            <div @click="deleteTask(index)">
              <span class="material-symbols-outlined"> delete </span>
            </div>
          </td>
          <template>
            <td>
              <div @click="editTask(index)">
                <input type="text" />
              </div>
            </td>
            <td>
              <div @click="deleteTask(index)">
                <button>btn</button>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store/store.js";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const store = useStore();
    const { filteredTasks } = storeToRefs(store);
    const currentlyEditing = ref(null);
    const newName = ref("");
    function nothing() {
      return 0;
    }

    function deleteTask(index) {
      store.tasks.splice(index, 1);
    }
    function editTask(index, taskName) {
      // task = store.tasks[index].name;
      currentlyEditing.value = index;
      newName.value = taskName;
    }
    function capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function changeStatus(index) {
      let newIndex = store.statuses.indexOf(store.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      store.tasks[index].status = store.statuses[newIndex];
    }
    function saveTask(index) {
      store.tasks[index].name = newName.value;
      currentlyEditing.value = null;
    }
    function cancelTask() {
      currentlyEditing.value = null;
    }

    return {
      tasks: filteredTasks,
      deleteTask,
      editTask,
      changeStatus,
      currentlyEditing,
      capitalizeFirstChar,
      saveTask,
      newName,
      cancelTask,
      nothing,
    };
  },
};
</script>

<style scoped>
.statusClass {
  width: 100px;
}
.names {
  text-align: left;
  padding-left: 2%;
}
</style>
