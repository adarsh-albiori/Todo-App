<template>
  <div id="app" class="container">
    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";
export default {
  name: "App",
  components: {
    TodoInput,
    TodoList,
  },
};
</script>

<style>
.container {
  background-color: rgba(0, 0, 0, 0.642);
  border: 2px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.701);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
