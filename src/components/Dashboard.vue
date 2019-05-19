<template>
  <div class="dashboard">
    <div style="text-align: right; padding: 20px 0;">
      <button class="btn btn--blue btn--shadow" @click="reloadTable">Reload Data</button>
    </div>
    <DataTable
      v-on:delete="deleteAnimal"
      :columnNames="table.columnNames"
      :items="table.animals"
      :itemKey="table.itemKey"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import DataTable from "./DataTable";

export default {
  name: "Dashboard",
  components: {
    DataTable
  },
  computed: {
    ...mapState(["table"])
  },
  methods: {
    ...mapMutations(["deleteAnimal"]),
    ...mapActions(["reloadTable"])
  }
};
</script>

<style scoped lang="scss">
</style>
