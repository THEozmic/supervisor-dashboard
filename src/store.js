import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    table: {
      itemKey: "id",
      columnNames: [
        {
          name: "Name",
          key: "name"
        },
        {
          name: "Age (years)",
          key: "age"
        },
        {
          name: "Color",
          key: "color"
        },
        {
          name: "Weight (kg)",
          key: "weight"
        }
      ],
      animals: [
        {
          name: "Bingo",
          age: 2,
          color: "Black",
          weight: "5",
          id: 1
        },
        {
          name: "Charlie",
          age: 5,
          color: "Brown",
          weight: "35",
          id: 2
        }
      ]
    }
  },
  mutations: {
    deleteAnimal(state, item) {
      let itemKey = state.table.itemKey;
      state.table.animals = state.table.animals.filter(
        animal => animal[itemKey] != item[itemKey]
      );
    },
    reloadTable(state) {
      state.table = {
        itemKey: "id",
        columnNames: [
          {
            name: "Name",
            key: "name"
          },
          {
            name: "Age (years)",
            key: "age"
          },
          {
            name: "Color",
            key: "color"
          },
          {
            name: "Weight (kg)",
            key: "weight"
          }
        ],
        animals: [
          {
            name: "Bingo",
            age: 2,
            color: "Black",
            weight: "5",
            id: 1
          },
          {
            name: "Charlie",
            age: 5,
            color: "Brown",
            weight: "35",
            id: 2
          }
        ]
      };
    }
  },
  actions: {
    reloadTable({ commit }) {
      setTimeout(() => {
        commit("reloadTable");
      }, 1000);
    }
  }
});
