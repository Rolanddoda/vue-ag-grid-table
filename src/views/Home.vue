<template>
  <Page>
    <AgGrid :options="options" />
  </Page>
</template>

<script>
import AgGrid from "@/components/AgGrid";

export default {
  components: {
    AgGrid
  },

  data: () => ({
    rowData: null
  }),

  computed: {
    options() {
      return {
        columnDefs: [
          { headerName: "Make", field: "make" },
          { headerName: "Model", field: "model" },
          { headerName: "Price", field: "price", type: "rightAligned" }
        ],
        rowData: this.rowData
      };
    }
  },

  created() {
    fetch(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json"
    )
      .then(result => result.json())
      .then(rowData => {
        this.rowData = rowData;
      });
  }
};
</script>
