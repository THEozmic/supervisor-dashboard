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
@import url("https://fonts.googleapis.com/css?family=Hind+Guntur");
* {
  box-sizing: border-box;

  font-family: "Hind Guntur", sans-serif;
}

body {
  padding: 30px;
  background-color: #f6f6f6;
}
</style>
