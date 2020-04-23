
import { template, css } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'
import diceSelector from '../dice-selector/index.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

const { mapState } = Vuex;

const rules = {
  required: value => value.length >= 4 || 'The title has to be over 4 chars',
}

export default Vue.extend({
  name: 'game-set-editor',
  css,
  mixins: [cssMixin],
  template,
  components: { diceSelector },
  data: () => ({
    title: '',
    titleRules: [rules.required],
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
    ...Vuex.mapGetters({getFreeSlug: GAMES_SETS_STORE.GETTERS.FREE_SLUG}),
    slug() {return this.$route.params.gameSetSlug },
    ...Vuex.mapState({
      gameSet(state){ return this.$route.params.gameSetSlug && state[GAMES_SETS_STORE.STORE][this.slug]}
    }),
    isNew() { return !this.slug },
    titleHasChanged() {
      if (!rules.required(this.title)) return false
      const isDifferent = this.isNew || this.title !== this.gameSet.title
      return isDifferent
    },
    newSlug() {
      return this.titleHasChanged
        ? this.getFreeSlug(this.title)
        : this.slug
    },
  }
})