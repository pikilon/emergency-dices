import { template, css } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { DICES_STORE } from "../../store/dices.js";
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'dice-add',
  css,
  mixins: [cssMixin],
  template,
  props: {
    open: Boolean,
  },
  data: function() { return {
    colorEnabled: false,
    color: '#FF00FF',
    isOpen: this.open
  }},
  methods: {
    addDice(diceSlug, diceColor) {
      this.$emit('add-dice', {diceSlug, diceColor})
    },
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED_ARRAY]),
    dices() { return this[DICES_STORE.GETTERS.PROCESSED_ARRAY]},
    enabledColor() { return (this.colorEnabled && this.color) || 'transparent' },
  }
})