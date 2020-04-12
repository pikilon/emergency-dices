
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
import { DICES_STORE } from '../../store/dices.js';

const { mapState } = Vuex;

export default Vue.extend({
  template,
  components: { dice },
  data: () => ({
    diceResultsIndex: []
  }),
  watch: {
    slug(newSlug, oldSlug) {
      this.roll()
    }
  },
  created() {
    this.diceResultsIndex = this.dices.map(() => 0)
    this.roll()
  },
  methods: {
    roll() {
      this.diceResultsIndex = this.dices.map(({slug}) => {
        const dice = this.dicesMap[slug]
        return _.random(0, dice.sides.length -1)
      })
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
  }
})