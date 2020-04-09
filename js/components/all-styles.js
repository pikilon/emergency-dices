import { CSS_STORE } from "../store/css.js"

export default Vue.extend({
  render: function (createElement) {
    return createElement('style', this.$store.getters[CSS_STORE.GETTERS.ALL])
  }
});