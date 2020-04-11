
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
      this.diceResultsIndex = this.dices.map((diceSlug) => {
        const dice = this.dicesMap[diceSlug]
        return _.random(0, dice.sides.length -1)
      })
    },
  },
  props: {
    slug: String
  },
  computed: {
    ...mapState({
      gameSet(state) {return state[GAMES_SETS_STORE.STORE][this.slug]},
      dicesMap(state) { return state[DICES_STORE.STORE]}
    }),
    dices() { return this.gameSet.dices},
  }
})