export const columnTypes = {
  centerAligned: {
    cellStyle: { textAlign: "center" },
    headerClass: ["text-center"]
  },

  cellLeftAligned: {
    cellStyle: { textAlign: "left" }
  },

  statusColumn: {
    cellClass: ["status-column"],
    cellRenderer: params =>
      `<div class="status-col-badge">${params.value}</div>`,
    filter: "agTextColumnFilter",
    floatingFilterComponentFramework: "StatusColFilter"
  },

  setFilterColumn: {
    minWidth: 150,
    width: 150,
    filter: "agSetColumnFilter",
    floatingFilterComponentFramework: "SetFilter",
    filterParams: {
      suppressSelectAll: true
    }
  },

  textFilterColumn: {
    minWidth: 110,
    width: 110,
    filter: "agTextColumnFilter",
    floatingFilterComponentFramework: "TextFilter"
  }
};
