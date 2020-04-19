
import { template, css } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
import diceSelector from '../dice-selector/index.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'


const getDefaultData = () => ({
  diceResultsIndex: [],
  selectedDices: {},
  dicesRollingIndexes: [],
  rollTime: 1000,
  rollTimeOuts: false,
  editing: false,
});

const { mapState } = Vuex;

export default Vue.extend({
  name: 'game-set',
  css,
  mixins: [cssMixin],
  template,
  components: { dice, diceSelector },
  data: getDefaultData,
  watch: {
    slug(newSlug, oldSlug) {
      this.resetData()
      this.diceResultsIndex = this.dices.map(() => 0)
      clearTimeout(this.rollTimeOuts)
    }
  },
  created() {
    this.diceResultsIndex = this.dices.map(() => 0)
  },
  destroyed() {
    this.resetData()
    clearTimeout(this.rollTimeOuts)
  },
  methods: {
    toggleEditing() { this.editing = !this.editing },
    results(onlySelected) {
      this.diceResultsIndex = this.dices.map(({slug}, index) => {
        const shouldNotAlter = onlySelected && !this.selectedDices[index]
        if (shouldNotAlter) return this.diceResultsIndex[index]
        const dice = this.dicesMap[slug]
        return _.random(0, dice.sides.length -1)
      })
    },
    roll(onlySelected) {
      this.dicesRollingIndexes = this.selectedDicesIndexArray.length
        ? this.selectedDicesIndexNumber
        : this.dices.map((ignore,index) => index)

      this.rollTimeOuts = setTimeout(() => {
        this.results(onlySelected)
        this.dicesRollingIndexes = []

      }, this.rollTime);
    },
    cloneDice(data) { console.log('data clone dice', data);},
    removeDice(data) { console.log('data remove dice', data);},
    toggleSelectDice(index) {
      if (this.selectedDices[index]) {
        Vue.delete(this.selectedDices, index)
      } else {
        Vue.set(this.selectedDices, index, true)
      }
    },
    resetData() { Object.assign(this.$data, this.$options.data.call(this)) },
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

    selectedDicesIndexArray() { return Object.keys(this.selectedDices) },
    selectedDicesIndexNumber() { return this.selectedDicesIndexArray.map(parseFloat) },
    isSelectedAvailable() { return !!this.selectedDicesIndexArray.length},
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