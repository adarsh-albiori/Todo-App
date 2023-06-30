<template>
  <div class="container">
    <h2 class="title">Todo List</h2>
    <div>
      <!-- <span class="vvv"> Filter Todo ⬇</span> -->
      <span>
        <label class="filterName">Filter To-do: </label>
        <select class="form-select" @change="filterTodo($event)">
          <option
            v-for="(filter, index) in filters"
            :key="index"
            :value="filter"
          >
            <span :class="{ active: filter === activeFilter }">
              {{ filter }}
            </span>
          </option>
        </select>
      </span>
    </div>
    <TodoItem />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoItem from "./TodoItem.vue";
import { useStore } from "../store/store.js";
export default {
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore();
    const filters = ref(["All", "Pending", "Finished", "To-do"]);
    const activeFilter = store.activeFilter;

    function filterTodo(e) {
      store.filterTodo(e.target.value);
    }

    const getTodos = computed(() => {
      if (activeFilter.value === "All") {
        return store.tasks;
      }
      return store.tasks.filter((item) => item.status === activeFilter.value);
    });

    return {
      store,
      filters,
      activeFilter,
      getTodos,
      filterTodo,
    };
  },
};
</script>

<style scoped>
.filterName {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bold;
  font-size: larger;
  float: right;
  position: relative;
  bottom: 93px;
  right: 257px;
}
.form-select {
  float: right;
  position: relative;
  bottom: 100px;
  width: 10%;
  text-align: left;
  color: black;
  background-color: #212529a8;
  border: 2px solid black;
  border-radius: 15px;
}
.form-select:hover {
  background-color: #32323292;
}
.title {
  margin-bottom: 40px;
  display: inline-block;
  color: aliceblue;
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.717);
  border-radius: 5%;
  text-decoration: dashed;
  background-color: #212529;
}
.container {
  background-color: rgb(255, 255, 255);
  margin-top: 100px;
  margin-bottom: 20px;
  border: 2px solid black;
  border-radius: 15px;
}
</style>
