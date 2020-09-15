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
    filter: "agSetColumnFilter",
    minWidth: 150,
    width: 150,
    floatingFilterComponentFramework: "SetFilter",
    filterParams: {
      suppressSelectAll: true
    }
  }
};
