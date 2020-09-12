<template>
  <q-card class="full-height box-shadow-3">
    <q-card-section class="full-height q-pa-md">
      <AgGridVue
        floating-filters-height="68"
        class="ag-grid-vue ag-theme-alpine"
        :row-data="rowData"
        v-bind="{ ...options, ...genericOptions }"
        @grid-ready="onGridReady"
        @first-data-rendered="firstDataRendered"
      ></AgGridVue>
    </q-card-section>
  </q-card>
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

  computed: {
    genericOptions() {
      return {
        columnTypes: {
          centerAligned: {
            cellStyle: { textAlign: "center" },
            headerClass: ["text-center"]
          },
          cellLeftAligned: {
            cellStyle: { textAlign: "left" }
          }
        }
      };
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
@import "~@/styles/fonts.scss";

$data-color: $secondary-5; // Color of text in grid cells
$header-foreground-color: $grey-1; // Color of text and icons in the header
$header-background-color: transparent; // Background colour for all headers, including the grid header, panels etc
$cell-horizontal-padding: 8px;
$header-height: 24px;
$row-height: 51px;

.ag-theme-alpine {
  @include ag-theme-alpine(
    (
      data-color: $data-color,
      header-foreground-color: $header-foreground-color,
      header-background-color: $header-background-color,
      cell-horizontal-padding: $cell-horizontal-padding,
      header-height: $header-height,
      row-height: $row-height,
      input-border-color: $white-5,
      input-focus-border-color: $white-5,
      input-focus-box-shadow: none,
      borders: false
    )
  );

  .ag-header-row:first-child {
    @extend .text-caption-2;
    line-height: $header-height;
  }

  .ag-row {
    border-bottom: 1px solid $white-4;
  }

  .ag-header-cell.text-center .ag-header-cell-label {
    justify-content: center;
  }

  .ag-row .ag-cell {
    @extend .text-body-4;
    line-height: $row-height;
  }

  .ag-header-row-floating-filter {
    background: $white-2;
  }

  .ag-body-viewport.ag-layout-normal {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid rgba(0, 0, 0, 0);
      border-top: none;
      border-bottom: none;
      background-clip: padding-box;
      border-radius: 5px;
      background-color: $secondary-1;
    }
  }
}

.ag-grid-vue {
  height: 100%;
  width: 99.9%; // hack to get rid of the horizontal scroll
}
</style>
