module.exports = {
  devServer: {
    clientLogLevel: "warn",
    overlay: false
  },

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
