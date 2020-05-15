
import { template, css } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice-side/index.js'
import diceSelector from '../dice-selector/index.js'
import gameSetEditor from '../game-set-editor/index.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

const ROLLING = {
  FALSE: false,
  ALL: 'ALL',
  SELECTED: 'SELECTED',
}

const getDefaultData = () => ({
  selectedDices: {},
  isRolling: ROLLING.FALSE,
  dicesRollingIndexes: [],
  rollTime: 1000,
  rollTimeOuts: false,
  editing: true,
});

const { mapState } = Vuex;

export default Vue.extend({
  name: 'game-set',
  css,
  mixins: [cssMixin],
  template,
  components: { dice, gameSetEditor },
  data: () => ({
    diceResults: [],
    selectedDices: {},
    isRolling: ROLLING.FALSE,
    dicesRollingIndexes: [],
    rollTime: 1000,
    rollTimeOuts: false,
    editing: false,
  }),
  created() {
    this.resetGameSet()
  },
  watch: {
    $route() {
      this.resetGameSet()
    }
  },
  destroyed() {
    clearTimeout(this.rollTimeOuts)
  },
  methods: {
    toggleEditing() {
      if (this.dices.length <= 0) return
      this.editing = !this.editing },
    results(onlySelected) {
      this.diceResults = this.dices.map(({slug, sides}, index) => {
        const shouldNotAlter = onlySelected && !this.selectedDices[index]
        if (shouldNotAlter) return this.diceResults[index]
        const randomSideIndex = _.random(0, sides.length -1)
        const value = sides[randomSideIndex].content.toString()
        return value
      })

    },
    roll(onlySelected) {
      this.isRolling = onlySelected ? ROLLING.SELECTED : ROLLING.ALL

      this.rollTimeOuts = setTimeout(() => {
        this.results(onlySelected)
        this.isRolling = ROLLING.FALSE

      }, this.rollTime);
    },
    toggleSelectDice(index) {
      if (this.selectedDices[index]) {
        Vue.delete(this.selectedDices, index)
      } else {
        Vue.set(this.selectedDices, index, true)
      }
    },
    resetGameSet() {
      this.diceResults = this.dices.map(({sides}) => sides[0].content.toString())
      if (this.noDices) this.editing = true
      this.selectedDices = {}
    },
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    ...mapState({
      gameSet(state) {return state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    slug() { return this.$route.params.gameSetSlug },
    dicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},
    dices() {
      return this.gameSet.dices.reduce(
        (result, {amount,...dice}, index) => {
          for (let addedDice = 0; addedDice < amount; addedDice++) {
            const currentDice = {...dice, ...this.dicesMap[dice.slug]}
            result.push({...currentDice})
          }
          return result
        },
        []
      )
    },
    noDices() { return this.dices.length <= 0},
    selectedDicesIndexArray() { return Object.keys(this.selectedDices) },
    selectedDicesIndexNumber() { return this.selectedDicesIndexArray.map(parseFloat) },
    isSelectedAvailable() { return this.selectedDicesIndexArray.length > 0 },
    allDicesIndexes() { return this.dices.reduce((result, dice, index) => {
      result[index] = true
      return result
    }, {})
    },
    rollingDices() {
      if (!this.isRolling) return {}
      return (this.isRolling === ROLLING.SELECTED) ? this.selectedDices : this.allDicesIndexes
    },
    selectedDicesOptions: {
      get() {
        const selectedIndexes = this.selectedDicesIndexArray
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
      set(newSideIndex) {
        this.selectedDicesIndexArray.forEach(selectIndex => {
          Vue.set(this.diceResults, selectIndex , this.dices[selectIndex].sides[newSideIndex].content.toString())
        })
      }
    }
  }
})