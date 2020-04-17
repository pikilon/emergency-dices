import { template } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { DICES_STORE } from "../../store/dices.js";

export default Vue.extend({
  template,
  data: () => ({
    dices: [],
  }),
  props: {
    slug: String
  },
  methods: {
    addDice(dice) {
      const alreadyAddedDice = this.dices[dice.slug]
      const amount = alreadyAddedDice ? alreadyAddedDice.amount + 1 : 1
      Vue.set(this.dices, dice.slug, {dice, amount})
    }
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    allDicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},
    ...Vuex.mapState({
      gameSet(state) {return state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    dicesMap() {
      return this.dices.reduce(
        (result, diceGameSet) => {
          result[diceGameSet.slug] = diceGameSet.slug
          return result
        },
        {})
    },
    availableDices() {
      if (!Object.keys(this.dices).length) return Object.values(this.allDicesMap)

      return Object.keys(this.allDicesMap).reduce(
        (result, diceSlug) => {
          if (!this.dicesMap[diceSlug]) result.push(this.allDicesMap[diceSlug])
          return result
        },
        [])
    },

  }
})