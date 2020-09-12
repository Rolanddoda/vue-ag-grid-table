<template>
  <Page>
    <AgGrid :options="options" :row-data="rowData" />
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

  created() {
    this.options = {
      columnDefs: [
        { headerName: "STATUS", field: "status" },
        { headerName: "SUBSCRIPTIONS", field: "subscriptions" },
        { headerName: "PUBLISHER", field: "publisher" },
        { headerName: "DEPARTMENT", field: "department" },
        { headerName: "START DATE", field: "start_date" },
        { headerName: "END_DATE", field: "end_date" },
        { headerName: "LAST YEAR PRICE", field: "last_year_price" },
        { headerName: "FORECASTED INCREASE", field: "forecasted_increase" },
        { headerName: "FORECASTED PRICE", field: "forecasted_price" },
        { headerName: "PRICE", field: "price" }
      ],
      defaultColDef: {
        floatingFilter: true,
        filter: "agTextColumnFilter"
      }
    };
    this.getAndSetRows();
  },

  methods: {
    fakeBE(data) {
      return new Promise(res => {
        setTimeout(() => res(data), 1000);
      });
    },

    getAndSetRows() {
      return this.fakeBE(this.getData()).then(data => {
        this.rowData = data;
      });
    },

    getData() {
      return Array.from({ length: 10 }, nr => ({
        id: nr + 1,
        status: "A",
        subscriptions: "The international",
        publisher: "Cambridge University",
        department: "Main",
        start_date: "01/01/2021",
        end_date: "031/012/2021",
        last_year_price: "$100,000",
        forecasted_increase: "5%",
        forecasted_price: "$105,000",
        price: "N/A"
      }));
    }
  }
};
</script>
