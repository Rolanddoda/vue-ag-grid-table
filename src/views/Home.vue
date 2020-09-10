<template>
  <Page>
    <AgGrid :options="agGridOptions" />
  </Page>
</template>

<script>
import AgGrid from "@/components/AgGrid";

export default {
  components: {
    AgGrid
  },

  computed: {
    agGridOptions() {
      return {
        columnDefs: [
          { headerName: "Make", field: "make" },
          { headerName: "Model", field: "model" },
          { headerName: "Price", field: "price", type: "rightAligned" }
        ],
        rowData: [
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Ford", model: "Mondeo", price: 32000 },
          { make: "Porsche", model: "Boxter", price: 72000 }
        ]
      };
    }
  }
};
</script>
