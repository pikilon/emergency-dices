
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import { DICES_STORE } from '../../store/dices.js';

export default Vue.extend({
  props: {
    slug: String
  },
  template,
  methods: {
    ...Vuex.mapMutations([
      GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE,
      GAMES_SETS_STORE.MUTATIONS.ADD_DICE,
    ]),
    addDice(diceSlug, diceColor) {
        this[GAMES_SETS_STORE.MUTATIONS.ADD_DICE]({setSlug: this.slug, diceSlug, diceColor})
    },
    removeDice(diceSlug, diceColor) {
        this[GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE]({setSlug: this.slug, diceSlug, diceColor})
    },
  },
  computed: {
    ...Vuex.mapGetters({
      allDicesMap: DICES_STORE.GETTERS.PROCESSED,
    }),
    ...Vuex.mapState({
      gameSet(state){ return this.$route.params.gameSetSlug && state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    currentDices() {
      return this.gameSet
        ? this.gameSet.dices.map(dice => ({...dice, ...this.allDicesMap[dice.slug]}))
        : []
     },
  }
})