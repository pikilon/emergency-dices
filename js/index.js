

import app from './components/app/index.js'
import styles from './components/all-styles.js'
import { store } from './store/index.js'
Vue.use(VueMarkdown)

new Vue({
  components: { app, styles },
  el: '#app',
  vuetify: new Vuetify(),
  store,

  template: /*html*/
  `<div>
    <styles />
    <template>
      <app />
    </template>
  </div>
  `,
})
