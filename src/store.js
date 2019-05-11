import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    columnNames: ["Name", "Age (years)"],
    animals: [
      {
        name: "Bingo",
        age: 2,
        id: 1
      },
      {
        name: "Charlie",
        age: 5,
        id: 2
      }
    ]
  },
  mutations: {
    deleteAnimal(state, name) {
      state.animals = state.animals.filter(animal => animal != name);
    }
  },
  actions: {}
});
