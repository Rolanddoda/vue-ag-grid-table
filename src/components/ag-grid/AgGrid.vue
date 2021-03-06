<template>
  <q-card class="full-height box-shadow-3">
    <q-card-section class="full-height q-pa-md">
      <AgGridVue
        floating-filters-height="68"
        class="ag-grid-vue ag-theme-alpine"
        :row-data="rowData"
        v-bind="mergedOptions"
        @grid-ready="onGridReady"
        @first-data-rendered="firstDataRendered"
      ></AgGridVue>
    </q-card-section>
  </q-card>
</template>

<script>
import { columnTypes } from "./column-types";
// Libraries
import { merge } from "lodash-es";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
// Ag grid components
import StatusColFilter from "./components/status-col-filter/Index";
import SetFilter from "./components/set-filter/Index";
import TextFilter from "./components/text-filter/Index";

export default {
  components: {
    AgGridVue,
    // eslint-disable-next-line vue/no-unused-components
    StatusColFilter,
    // eslint-disable-next-line vue/no-unused-components
    SetFilter,
    // eslint-disable-next-line vue/no-unused-components
    TextFilter
  },

  props: {
    options: {
      type: Object,
      required: true
    },
    rowData: Array
  },

  computed: {
    defaultOptions() {
      return {
        frameworkComponents: {
          StatusColFilter,
          SetFilter
        },
        defaultColDef: {
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          type: "cellLeftAligned",
          floatingFilterComponentParams: {
            suppressFilterButton: true
          },
          menuTabs: ["generalMenuTab", "columnsMenuTab"],
          width: 85,
          minWidth: 85
        },
        suppressContextMenu: true,
        columnTypes
      };
    },

    mergedOptions() {
      return merge(this.defaultOptions, this.options);
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
@import "~@/styles/fonts";

$data-color: $secondary-5; // Color of text in grid cells
$header-foreground-color: $grey-1; // Color of text and icons in the header
$header-background-color: transparent; // Background colour for all headers, including the grid header, panels etc
$cell-horizontal-padding: 8px;
$header-height: 24px;
$row-height: 51px;

.ag-theme-alpine {
  --filter-height: 36px;

  @include ag-theme-alpine(
    (
      data-color: $data-color,
      foreground-color: $header-foreground-color,
      secondary-foreground-color: $header-foreground-color,
      header-foreground-color: $header-foreground-color,
      header-background-color: $header-background-color,
      cell-horizontal-padding: $cell-horizontal-padding,
      header-height: $header-height,
      row-height: $row-height,
      input-border-color: $white-5,
      input-focus-border-color: $white-5,
      input-focus-box-shadow: none,
      borders: false,
      header-column-resize-handle: true,
      header-column-resize-handle-height: 100%,
      header-column-resize-handle-width: 2px,
      header-column-resize-handle-color: $white-5
    )
  );

  /* ========================= STARTS Header styling ========================= */

  .ag-header-row:first-child {
    @extend .text-caption-2;
    line-height: $header-height;
  }

  .ag-header-row-floating-filter {
    $box-shadow-height: 2px;
    background: $white-2;
    top: calc(
      #{$header-height} - #{$box-shadow-height}
    ) !important; // hack to show the box-shadow below
    box-shadow: 0 #{$box-shadow-height} 6px rgba(71, 71, 71, 0.1);

    .ag-input-field-input {
      height: var(--filter-height);
    }
  }

  .ag-header-cell.text-center .ag-header-cell-label {
    justify-content: center;
  }

  /* ========================= ENDS Header styling ========================= */

  .ag-row {
    border-bottom: 1px solid $white-4;
  }

  /* ========================= STARTS cell styling ========================= */

  .ag-row .ag-cell {
    @extend .text-body-4;
    line-height: $row-height;
  }

  .ag-cell.status-column {
    > span {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;

      > .status-col-badge {
        width: 18px;
        height: 18px;
        background: #35d0ba;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: $white-1;
        @extend .text-button-big;
      }
    }
  }

  /* ========================= ENDS cell styling ========================= */

  /* ========================= STARTS Table Scrollbar styling ========================= */
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

  /* ========================= ENDS Table Scrollbar styling ========================= */
}

.ag-grid-vue {
  height: 100%;
  width: 99.9%; // hack to get rid of the horizontal scroll
}
</style>
