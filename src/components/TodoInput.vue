<template>
  <div class="">
    <div class="input-group">
      <input
        v-model="task"
        type="text"
        class="col form-control mx-2"
        placeholder="Todo task......"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-dark" @click="submitTask">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store/store.js";
export default {
  setup() {
    const store = useStore();
    const task = ref("");

    function submitTask() {
      if (this.task.length === 0) return;
      store.tasks.push({
        name: this.task,
        status: "To-do",
      });
      this.task = "";
    }

    return { task, submitTask, store };
  },
};
</script>

<style scoped>
.input-group {
  padding: 20px;
  border: 2px;
  box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.701);
}
</style>
