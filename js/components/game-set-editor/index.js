
import { template, css } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
import diceSelector from '../dice-selector/index.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

const { mapState } = Vuex;

export default Vue.extend({
  name: 'game-set-editor',
  css,
  mixins: [cssMixin],
  template,
  components: { diceSelector },
  data: () => ({
    title: ''
  }),
  created() {
    if (this.gameSet) this.title = this.gameSet.title
  },
  methods: {
    ...Vuex.mapMutations([
      GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE,
      GAMES_SETS_STORE.MUTATIONS.ADD_DICE
    ]),
  },
  computed: {
    slug() {return this.$route.params.gameSetSlug },
    ...Vuex.mapState({
      gameSet(state){ return this.$route.params.gameSetSlug && state[GAMES_SETS_STORE.STORE][this.slug]}
    }),
    isNew() { return !this.slug },
    hint() { return this.slug },
  }
})