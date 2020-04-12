
import { template, css } from './view.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'dice',
  css,
  mixins: [cssMixin],
  template,
  props: {
    color: String,
    slug: String,
    selectedSideIndex: 0
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    dice(state) {return this[DICES_STORE.GETTERS.PROCESSED][this.slug]},

    selectedSide() { return this.dice.sides[this.selectedSideIndex] },
    styles() {
      const color = this.selectedSide.color || this.color || false
      if (!color) return undefined
      return `background-color: ${color}`
    },
  }
})