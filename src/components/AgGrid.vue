<template>
  <AgGridVue
    class="ag-grid-vue ag-theme-alpine"
    :row-data="rowData"
    v-bind="options"
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
    },
    rowData: Array
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
@import "~ag-grid-enterprise/dist/styles/ag-grid.scss";
@import "~ag-grid-enterprise/dist/styles/ag-theme-alpine/sass/ag-theme-alpine-mixin";
@import "~@/styles/colors";

$data-color: $secondary-5; // Color of text in grid cells
$header-foreground-color: $grey-1; // Color of text and icons in the header
$header-background-color: transparent; // Background colour for all headers, including the grid header, panels etc

.ag-theme-alpine {
  @include ag-theme-alpine(
    (
      data-color: $data-color,
      header-foreground-color: $header-foreground-color,
      header-background-color: $header-background-color,
      header-height: 24px
    )
  );
}

.ag-grid-vue {
  height: 100%;
  width: 100%;
}
</style>
