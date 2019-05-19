<template>
  <div id="app">
    <Dashboard/>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "app",
  components: {
    Dashboard
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Oxygen");
* {
  box-sizing: border-box;

  font-family: "Oxygen", sans-serif;
  line-height: 1;
}

body {
  padding: 30px;
  background-color: #f6f6f6;
}

.btn {
  padding: 10px;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.btn--blue {
  background-color: #3490dc;
}

.btn--shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
