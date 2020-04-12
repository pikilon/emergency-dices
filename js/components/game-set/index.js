
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
import { DICES_STORE } from '../../store/dices.js';

const { mapState } = Vuex;

export default Vue.extend({
  template,
  components: { dice },
  data: () => ({
    diceResultsIndex: [],
    selectedDices: {},
  }),
  watch: {
    slug(newSlug, oldSlug) {
      this.diceResultsIndex = []
      this.selectedDices = {}
      this.roll()
    }
  },
  created() {
    this.diceResultsIndex = this.dices.map(() => 0)
    this.roll()
  },
  methods: {
    roll(onlySelected) {
      this.diceResultsIndex = this.dices.map(({slug}, index) => {
        const shouldNotAlter = onlySelected && !this.selectedDices[index]
        if (shouldNotAlter) return this.diceResultsIndex[index]
        const dice = this.dicesMap[slug]
        return _.random(0, dice.sides.length -1)
      })
    },
    toggleSelectDice(index) {
      if (this.selectedDices[index]) {
        Vue.delete(this.selectedDices, index)
      } else {
        Vue.set(this.selectedDices, index, true)
      }
    },
  },
  props: {
    slug: String
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    ...mapState({
      gameSet(state) {return state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    dicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},
    dices() {
      return this.gameSet.dices.reduce(
        (result, {amount, ...currentDice}) => {
          for (let addedDice = 0; addedDice < amount; addedDice++) {
            result.push(currentDice)
          }
          return result
        },
        []
      )
    },
    isSelectedAvailable() { return !!Object.keys(this.selectedDices).length},
    selectedDicesOptions: {
      get() {
        const selectedIndexes = Object.keys(this.selectedDices)
        if (!selectedIndexes.length) return false
        let lastSlug = false
        for (let index = 0; index < selectedIndexes.length; index++) {
          const currentSlug = this.dices[selectedIndexes[index]].slug;
          if (!lastSlug) lastSlug = currentSlug
          if  (lastSlug !== currentSlug) return false
        }
        const diceSlug = this.dices[selectedIndexes[0]].slug
        return this.dicesMap[diceSlug].sides.map((side, index) => ({...side, index}))
      },
      set: function(newSideIndex) {
        Object.keys(this.selectedDices).forEach(selectIndex => {
          Vue.set(this.diceResultsIndex, selectIndex ,newSideIndex)
        })
      }
    }
  }
})