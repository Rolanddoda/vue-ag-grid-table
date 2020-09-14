import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import {
  Quasar,
  QBtn,
  QIcon,
  QCard,
  QCardSection,
  QSelect,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar
} from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QIcon,
    QCard,
    QCardSection,
    QSelect,
    QItem,
    QItemSection,
    QItemLabel,
    QAvatar
  },
  directives: {},
  plugins: {}
});
