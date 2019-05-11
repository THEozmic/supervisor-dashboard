<template>
  <div class="data-table">
    <div class="table-wrapper">
      <!-- <div class="toolbar">
        <button
          class="delete-button delete-button--visible"
          v-if="selectedItems.length > 0"
          @click="handleBulkDelete"
        >Delete Selected</button>
        <input class="search-box" type="text" v-model="searchTerm" placeholder="Type to search">
      </div>
      <table class="table" v-if="tableData.length > 0">
        <tr>
          <th>
            <input
              type="checkbox"
              :checked="selectedItems.length === localItems.length"
              class="checkbox-item"
              @click="() => updateSelectedItems()"
            >
          </th>
          <th @click="() => orderBy(key)" v-for="key in Object.keys(tableData[0])" v-bind:key="key">
            <span class="table-icon" v-if="currentOrder[key] === 'desc' ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="9 16.172 2.929 10.101 1.515 11.515 10 20 10.707
                19.293 18.485 11.515 17.071 10.101 11 16.172 11 0 9 0"
                ></polygon>
              </svg>
            </span>
            <span class="table-icon" v-if="currentOrder[key] === 'asc'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="9 3.828 2.929 9.899 1.515 8.485 10 0 10.707 .707 
                18.485 8.485 17.071 9.899 11 3.828 11 20 9 20 9 3.828"
                ></polygon>
              </svg>
            </span>
            {{ key.toUpperCase() }}
          </th>
          <th></th>
        </tr>
        <tr v-for="(item, index) in localItems" v-bind:key="index">
          <td>
            <input
              type="checkbox"
              class="checkbox-item"
              :checked="isSelected(index)"
              @click="() => updateSelectedItems(index)"
            >
          </td>
          <td v-for="(value, key) in item" v-bind:key="key">
            <div
              v-if="options && options[key] && options[key].isEditable"
              class="table-value-wrapper"
            >
              <textarea
                v-on:keyup="resizeTextarea"
                v-model="localItems[index][key]"
                @change="() => options[key].handleChange({ newValue: localItems[index][key], index })"
                class="table-value"
              ></textarea>
            </div>
            <span
              v-else
            >{{ options && options[key] && options[key].presenter ? options[key].presenter(value) : value }}</span>
          </td>
          <td>
            <button class="delete-button" @click="() => handleDelete(index)">Delete</button>
          </td>
        </tr>
      </table>
      <div v-else class="empty-table-message">Nothing to show</div>
      <div class="table-footer">
        <div class="pagination">
          <div>
            <label>Rows per page:</label>
            <select class="pagination__options" v-model="rowsPerPage">
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="pagination__controls">
            <span
              :class="`controls-icon ${!canPaginateBack ? 'disabled' : '' }`"
              @click="() => changeCurrentPage({ isFoward: false })"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"
                ></polygon>
              </svg>
            </span>
            <span
              :class="`controls-icon ${!canPaginateFront ? 'disabled' : '' }`"
              @click="() => changeCurrentPage({ isFoward: true })"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"
                ></polygon>
              </svg>
            </span>
          </div>
        </div>
      </div>-->

      <table class="table">
        <tr>
          <th
            @click="sortItemsBy(columnName.key)"
            v-for="(columnName, index) in columnNames"
            :key="index"
          >
            <span class="table-icon" v-if="sort.key == columnName.key">
              <svg
                v-if="sort.order == 'desc'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <polygon
                  points="9 16.172 2.929 10.101 1.515 11.515 10 20 10.707
                19.293 18.485 11.515 17.071 10.101 11 16.172 11 0 9 0"
                ></polygon>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="9 3.828 2.929 9.899 1.515 8.485 10 0 10.707 .707 
                18.485 8.485 17.071 9.899 11 3.828 11 20 9 20 9 3.828"
                ></polygon>
              </svg>
            </span>
            <span v-if="sort.key !== columnName.key" class="table-icon table-icon--faded">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polygon
                  points="9 3.828 2.929 9.899 1.515 8.485 10 0 10.707 .707 
                18.485 8.485 17.071 9.899 11 3.828 11 20 9 20 9 3.828"
                ></polygon>
              </svg>
            </span>
            {{ columnName.name }}
          </th>
        </tr>
        <tr v-for="item in sortedItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { orderBy } from "lodash";

export default {
  name: "DataTable",
  props: ["items", "columnNames"],
  data() {
    return {
      sort: {
        key: this.columnNames[0].key,
        order: "asc"
      },
      localItems: [...this.items]
    };
  },
  computed: {
    sortedItems() {
      let newItems = orderBy(this.localItems, this.sort.key, this.sort.order);
      return newItems;
    }
  },
  methods: {
    sortItemsBy(key) {
      if (key == this.sort.key) {
        if (this.sort.order == "asc") {
          this.sort.order = "desc";
        } else {
          this.sort.order = "asc";
        }
      } else {
        this.sort.key = key;
        this.sort.order = "asc";
      }
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  background-color: #ffffff;
  overflow-x: auto;
  border-radius: 4px;
  box-shadow: 0 15px 35px 0 rgba(42, 51, 83, 0.12),
    0 5px 15px rgba(0, 0, 0, 0.06);
}

.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.empty-table-message {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #b2b2b2;
}

.table td,
.table th {
  text-align: left;
  border-bottom: 1px solid #efeded;
  padding: 15px 30px;
  position: relative;
}

.checkbox-item {
  visibility: hidden;
}

.checkbox-item:after {
  padding: 8px;
  position: relative;
  display: block;
  border: 2px solid #3559af;
  content: "";
  border-radius: 4px;
  top: -4px;
  left: -4px;
  color: #ffffff;
  background-color: transparent;
  visibility: visible;
}

.checkbox-item:checked:after {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='%23fff' d='M0 11l2-2 5 5L18 3l2 2L7 18z'/></svg>");
  background-color: #3559af;
}

.table th {
  cursor: pointer;
}

.table-icon {
  width: 18px;
  height: 18px;
  position: absolute;
  left: 5px;
  top: 18px;
  fill: #b2b2b2;
}

.table-icon--faded {
  fill: transparent;
  transition: 0.2s all ease-in;
}

.table th:hover .table-icon--faded {
  fill: rgba(201, 201, 230, 0.5);
}

.toolbar {
  width: 100%;
  display: inline-block;
  text-align: right;
  padding: 16px 30px;
}

.pagination {
  margin: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination label {
  margin-right: 12px;
  font-size: 18px;
}

.pagination__options {
  font-size: 20px;
  width: 70px;
  height: 48px;
  background-color: #fff;
  border: 1px solid #efeded;
  border-radius: 0;
  outline: none;
}

.controls-icon.disabled {
  fill: #c5c3c3;
  background-color: #f6f6f6;
  cursor: not-allowed;
}

.controls-icon {
  background-color: #f6f6f6;
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 100%;
  margin: 0 10px;
  padding: 15px;
  cursor: pointer;
}

.search-box {
  width: 30%;
  padding: 6px 10px;
  font-size: 16px;
  border: 1px solid #efeded;
  border-radius: 4px;
  background-color: #f6f6f6;
  outline: none;
}

.table-value {
  border: 1px solid transparent;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  resize: none;
  width: 100%;
  overflow: scroll;
  margin-left: -10px;
}

.table tr {
  transition: 0.2s all ease-in;
}

.delete-button {
  border: 1px solid;
  border-radius: 4px;
  min-width: 80px;
  font-size: 16px;
  text-transform: uppercase;
  background-color: #e91e63;
  color: #ffffff;
  padding-top: 5px;
  font-weight: bolder;
  visibility: hidden;
  cursor: pointer;
}

.delete-button--visible {
  visibility: visible;
  margin: 0 20px;
  padding: 8px;
}

.table tr:hover {
  background-color: #f3f3f4;
}

.table tr:hover .table-value {
  border: 1px solid #cecccc;
}

.table tr:hover .delete-button {
  visibility: visible;
}

.table-value:focus {
  padding: 10px;
  outline: none;
}

.table-footer {
  width: 100%;
}

@media screen and (min-width: 501px) and (max-width: 999px) {
  .search-box {
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .search-box {
    width: 100%;
  }

  .pagination {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin: 0px;
  }

  .pagination div {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
}
</style>
