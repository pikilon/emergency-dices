import { template, css } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { DICES_STORE } from "../../store/dices.js";
import cssMixin from '../../mixins/css.js'

const getDiceSlugColor = (dice, color) => color
                                      ? `${dice.slug}-${color}`
                                      : dice.slug
export default Vue.extend({
  name: 'dice-selector',
  css,
  mixins: [cssMixin],
  template,
  data: () => ({
    newGameSetDices: [],
    diceColors: {},
    colorEnabled: false,
    color: '#FF00FF',
  }),
  props: {
    slug: String
  },
  created() {
    this.refreshCurrentDices()
  },
  watch: {
    slug(newSlug) {
      this.refreshCurrentDices()
    }
  },
  methods: {
    ...Vuex.mapMutations([
      GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE,
      GAMES_SETS_STORE.MUTATIONS.ADD_DICE]),
    addDice(diceSlug, diceColor) {
      this[GAMES_SETS_STORE.MUTATIONS.ADD_DICE]({
        setSlug: this.slug,
        diceSlug,
        diceColor,
      })
    },
    removeDice(diceSlug, diceColor) {
      this[GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE]({
        setSlug: this.slug,
        diceSlug,
        diceColor,
      })
    },
    getDiceToAdd(diceSlug, diceColor) {
      const alreadyAddedDice = this.gameSetDices.find(({slug, color})=> {
        return diceSlug === slug && (!color || color === diceColor)
      })
      return alreadyAddedDice || {slug: diceSlug, amount: 0, color: diceColors[diceSlug]}
    },
    refreshCurrentDices() {
      if (this.gameSet) {
        this.dices = {}
        this.colors = {}
        this.gameSet.dices.forEach(({slug, amount, color})=> {

          this.$set(this.dices, slug, {dice: this.allDicesMap[slug] , amount, color})
        })
      }
    },
    updateGameSet() {
      if (!this.gameSet) return
      const updatedGameSet = {...this.gameSet, dices: this.dicesArray}
      this[GAMES_SETS_STORE.MUTATIONS.UPSERT](updatedGameSet)
    }
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    ...Vuex.mapState({
      gameSet(state) {return this.slug && state[GAMES_SETS_STORE.STORE][this.slug]},
    }),


    allDicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},
    gameSetDices() { return this.gameSet ? this.gameSet.dices : this.newGameSetDices },
    gameSetDicesDisplay() { return this.gameSetDices.map(
      ({slug,...rest}) => (
        {...this.allDicesMap[slug], ...rest}
      ))
    },
    availableDices() { return Object.values(this.allDicesMap)},
    enabledColor() { return (this.colorEnabled && this.color) || 'transparent' },


  }
})