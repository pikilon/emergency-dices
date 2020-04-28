
import { template, css } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
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
  diceResultsIndex: [],
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
    diceResultsIndex: [],
    selectedDices: {},
    isRolling: ROLLING.FALSE,
    dicesRollingIndexes: [],
    rollTime: 1000,
    rollTimeOuts: false,
    editing: false,
  }),
  created() {
    this.diceResultsIndex = this.dices.map(() => 0)
    if (this.noDices) this.editing = true
  },
  destroyed() {
    this.resetData()
    clearTimeout(this.rollTimeOuts)
  },
  methods: {
    toggleEditing() {
      if (this.dices.length <= 0) return
      this.editing = !this.editing },
    results(onlySelected) {
      this.diceResultsIndex = this.dices.map(({slug}, index) => {
        const shouldNotAlter = onlySelected && !this.selectedDices[index]
        if (shouldNotAlter) return this.diceResultsIndex[index]
        const dice = this.dicesMap[slug]
        return _.random(0, dice.sides.length -1)
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
    resetData() { Object.assign(this.$data, this.$options.data.call(this)) },
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
        (result, {amount, ...currentDice}) => {
          for (let addedDice = 0; addedDice < amount; addedDice++) {
            result.push(currentDice)
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
      set: function(newSideIndex) {
        this.selectedDicesIndexArray.forEach(selectIndex => {
          Vue.set(this.diceResultsIndex, selectIndex ,newSideIndex)
        })
      }
    }
  }
})