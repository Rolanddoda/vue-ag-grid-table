<template>
  <AgGridVue
    class="ag-grid-vue ag-theme-alpine"
    :grid-options="options"
    @grid-ready="onGridReady"
    @first-data-rendered="firstDataRendered"
  ></AgGridVue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";

export default {
  components: {
    AgGridVue
  },

  props: {
    options: {
      type: Object,
      required: true
    }
  },

  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },

    getAgGrid() {
      // access from parent
      return { gridApi: this.gridApi, columnApi: this.gridApi };
    },

    firstDataRendered() {
      this.gridApi.sizeColumnsToFit();
    }
  }
};
</script>

<style lang="scss">
@import "~ag-grid-enterprise/dist/styles/ag-grid.css";
@import "~ag-grid-enterprise/dist/styles/ag-theme-balham/sass/ag-theme-balham";
@import "~ag-grid-enterprise/dist/styles/ag-theme-alpine/sass/ag-theme-alpine";

/*.ag-theme-alpine {
  @include ag-theme-alpine(
    (
      odd-row-background-color: blue,
      row-border-color: red,
      row-hover-color: yellow,
      checkbox-checked-color: #2661ad,
      range-selection-border-color: #ff00b1,
      range-selection-background-color: #03305633
    )
  );
}*/

.ag-grid-vue {
  height: 100%;
  width: 100%;
}
</style>
