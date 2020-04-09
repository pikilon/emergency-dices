

import app from './components/app/index.js'
import styles from './components/all-styles.js'
import { store } from './store/index.js'
import router from './routes/index.js'

const { mapGetters } = Vuex;

new Vue({
  components: { app, styles },
  el: '#app',
  vuetify: new Vuetify(),
  store,
  router,
  template: /*html*/
  `<div>
    <styles />
    <template>
      <app />
    </template>
  </div>
  `,
})
