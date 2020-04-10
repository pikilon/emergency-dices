
import { template, css } from './view.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'


const { mapState } = Vuex;

export default Vue.extend({
  name: 'dice',
  css,
  mixins: [cssMixin],
  template,
  props: {
    slug: String,
    selectedSideIndex: 0
  },
  computed: {
    ...mapState({
      dice(state) {return state[DICES_STORE.STORE][this.slug]},
    }),
    selectedSide() { return this.dice.sides[this.selectedSideIndex] },
    styles() {
      const { color } = this.selectedSide
      if (!color) return undefined
      return `background-color: ${color}`
    },
  }
})