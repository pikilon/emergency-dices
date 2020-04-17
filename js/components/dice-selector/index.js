import { template } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { DICES_STORE } from "../../store/dices.js";
export default Vue.extend({
  template,
  data: () => ({
    dices: {},
  }),
  props: {
    slug: String
  },
  created() {
    if (this.gameSet) {
      this.gameSet.dices.forEach(({slug, amount})=> {
        this.$set(this.dices, slug, {dice: this.allDicesMap[slug] , amount})
      })
    }
  },
  methods: {
    ...Vuex.mapMutations([GAMES_SETS_STORE.MUTATIONS.UPSERT]),

    addDice(dice) {
      const alreadyAddedDice = this.dices[dice.slug]
      const amount = alreadyAddedDice ? alreadyAddedDice.amount + 1 : 1
      this.$set(this.dices, dice.slug, {dice, amount})
      this.updateGameSet()
    },
    removeDice(dice) {
      const alreadyAddedDice = this.dices[dice.slug]
      alreadyAddedDice.amount = alreadyAddedDice.amount - 1
      if (!alreadyAddedDice.amount) this.$delete(this.dices, dice.slug)
      this.updateGameSet()

    },
    updateGameSet() {
      if (!this.gameSet) return
      const updatedGameSet = {...this.gameSet, dices: this.dicesArray}
      this[GAMES_SETS_STORE.MUTATIONS.UPSERT](updatedGameSet)
    }
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    allDicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},

    ...Vuex.mapState({
      gameSet(state) {return this.slug && state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    dicesArray() {
      return Object.keys(this.dices).map(slug => ({slug, amount: this.dices[slug].amount}))
    },
    availableDices() {
      if (!Object.keys(this.dices).length) return Object.values(this.allDicesMap)
      return Object.keys(this.allDicesMap).reduce(
        (result, diceSlug) => {
          if (!this.dices[diceSlug]) result.push(this.allDicesMap[diceSlug])
          return result
        },
        [])
    },

  }
})