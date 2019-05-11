<template>
  <div class="dashboard">
    <!-- <ul>
      <li
        v-for="(animal, index) in animals"
        :key="index"
        @click="deleteAnimal(animal)"
      >{{ animal.name }} is {{ animal.age }} years old</li>
    </ul>-->
    <DataTable :items="animals"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DataTable from "./DataTable";

export default {
  name: "Dashboard",
  components: {
    DataTable
  },
  computed: {
    ...mapGetters(["animals"])
  },
  methods: {
    ...mapMutations(["deleteAnimal"])
  }
};
</script>

<style scoped lang="scss">

</style>
