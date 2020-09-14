<template>
  <Page class="q-pa-xl">
    <AgGrid ref="agGrid" :options="options" :row-data="rowData" />
  </Page>
</template>

<script>
import AgGrid from "@/components/ag-grid/AgGrid";

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
        {
          headerName: "STATUS",
          field: "status",
          type: ["statusColumn", "centerAligned"]
        },
        { headerName: "SUBSCRIPTIONS", field: "subscriptions" },
        { headerName: "PUBLISHER", field: "publisher" },
        {
          headerName: "DEPARTMENT",
          field: "department",
          filter: "agSetColumnFilter",
          headerClass: "hack-filter",
          floatingFilterComponentFramework: "SetFilter",
          filterParams: {
            suppressSelectAll: true
          }
        },
        {
          headerName: "START DATE",
          field: "start_date",
          type: "centerAligned"
        },
        { headerName: "END DATE", field: "end_date", type: "centerAligned" },
        {
          headerName: "LAST YEAR PRICE",
          field: "last_year_price",
          type: "rightAligned"
        },
        {
          headerName: "FORECASTED INCREASE",
          field: "forecasted_increase",
          type: "rightAligned"
        },
        {
          headerName: "FORECASTED PRICE",
          field: "forecasted_price",
          type: "rightAligned"
        },
        { headerName: "PRICE", field: "price", type: "rightAligned" }
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: false
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

    getDepartment() {
      const deps = ["Main", "Secondary", "Another", "Last"];
      const random = Math.floor(Math.random() * 4);
      return deps[random];
    },

    getData() {
      return Array.from({ length: 20 }, nr => ({
        id: nr + 1,
        status: "A",
        subscriptions: "The international",
        publisher: "Cambridge University",
        department: this.getDepartment(),
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
