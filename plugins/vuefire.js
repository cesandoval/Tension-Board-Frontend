import Vue from 'vue'
import { rtdbPlugin, firestorePlugin } from 'vuefire'

export default () => {
  Vue.use(rtdbPlugin)
  Vue.use(firestorePlugin)
}
