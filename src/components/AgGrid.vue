<template>
  <AgGridVue
    class="ag-grid-vue ag-theme-alpine"
    :column-defs="options.columnDefs"
    :row-data="options.rowData"
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
@import "~ag-grid-enterprise/dist/styles/ag-grid.scss";
@import "~ag-grid-enterprise/dist/styles/ag-theme-alpine/sass/ag-theme-alpine-mixin";
@import "~@/styles/colors";

.ag-theme-alpine {
  @include ag-theme-alpine(
    (
      foreground-color: $secondary-1,
      data-color: $secondary-5,
      header-height: 24px
    )
  );
}

.ag-grid-vue {
  height: 100%;
  width: 100%;
}
</style>
