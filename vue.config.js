module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-ag-grid-table/" : "/",

  pluginOptions: {
    quasar: {
      importStrategy: "manual",
      rtlSupport: false
    }
  },

  transpileDependencies: ["quasar"]
};
