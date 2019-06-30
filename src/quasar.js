import Vue from 'vue'

import './styles/quasar.styl'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  //directives
  ClosePopup,
  Ripple,
  //plugins
  Notify,
  Dialog,
  //components
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QFooter,
  QInput,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QTab,
  QRouteTab,
  QTabs,
  QTabPanel,
  QTabPanels,
  QSeparator,
  QImg,
  QPageSticky,
  QPageScroller,
  QSpinnerCube,
  QMenu,
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QFooter,
    QInput,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QTab,
    QRouteTab,
    QTabs,
    QTabPanel,
    QTabPanels,
    QSeparator,
    QImg,
    QPageSticky,
    QPageScroller,
    QSpinnerCube,
    QMenu,
  },
  directives: {
    ClosePopup,
    Ripple,
  },
  plugins: {
    Notify,
    Dialog,
  },
  iconSet: iconSet
 })