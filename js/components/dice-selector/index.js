import { template, css } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import diceAdd from '../dice-add/index.js'
import { DICES_STORE } from "../../store/dices.js";
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'dice-selector',
  css,
  components: {diceAdd},
  mixins: [cssMixin],
  template,
  props: {
    slug: String,
    open: Boolean,
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
      GAMES_SETS_STORE.MUTATIONS.ADD_DICE]
    ),
    addNewDice({diceSlug, diceColor}) {
      this[GAMES_SETS_STORE.MUTATIONS.ADD_DICE]({
        setSlug: this.slug,
        diceSlug,
        diceColor,
      })
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
  },
  computed: {
    ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
    ...Vuex.mapState({
      gameSet(state) {return this.slug && state[GAMES_SETS_STORE.STORE][this.slug]},
    }),
    allDicesMap() { return this[DICES_STORE.GETTERS.PROCESSED]},
  }
})