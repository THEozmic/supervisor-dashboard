<template>
  <div class="dashboard">
    <DataTable v-on:delete="handleDelete" :columnNames="columnNames" :items="animals" itemKey="id"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DataTable from "./DataTable";

export default {
  name: "Dashboard",
  components: {
    DataTable
  },
  computed: {
    ...mapState(["animals", "columnNames"])
  },
  methods: {
    ...mapMutations(["deleteAnimal"]),
    handleDelete(item) {
      // dispatch an action to delete from firebase and Vuex
    }
  }
};
</script>

<style scoped lang="scss">
</style>
