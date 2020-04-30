
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import diceSelector from '../dice-selector/index.js'
import gameSetDices from '../game-set-dices/index.js'
import { DICES_STORE } from '../../store/dices.js';
import { ROUTES } from '../../constants/routes.js';
import { VALIDATION_RULES } from '../../constants/VALIDATION_RULES.js';


const { mapState } = Vuex;

const rules = {
  required: value => value.length >= 4 || 'The title has to be over 4 chars',
}

export default Vue.extend({
  template,
  components: { diceSelector, gameSetDices },
  props: {
    slug: String
  },
  data: () => ({
    title: '',
    rules: {
      title: [VALIDATION_RULES.REQUIRED]
    },
  }),
  watch: {
    slug(newSlug) {
      this.refresh()
    }
  },
  created() {
    this.refresh()
  },
  computed: {
    ...Vuex.mapGetters({
      getFreeSlug: GAMES_SETS_STORE.GETTERS.FREE_SLUG,
      allDicesMap: DICES_STORE.GETTERS.PROCESSED,
    }),
    ...Vuex.mapState([GAMES_SETS_STORE.STORE]),
    gameSet() { return this[GAMES_SETS_STORE.STORE][this.slug] },
    currentDices() {
      return this.gameSet
        ? this.gameSet.dices.map(dice => ({...dice, ...this.allDicesMap[dice.slug]}))
        : []
     },
    isNew() { return !this.slug },
    addDiceOpen() { return this.gameSet.dices.length <=0 },
    titleHasChanged() {
      if (VALIDATION_RULES.REQUIRED(this.title)) return false
      const isDifferent = this.isNew || this.title !== this.gameSet.title
      return isDifferent
    },
    newSlug() {
      return this.titleHasChanged
      ? this.getFreeSlug(this.title)
      : this.slug
    },
    slugHint() { return `slug: ${this.newSlug}`},
    editorTitle() { return this.isNew ? 'Create a game set' : 'Edit game set'},
  },

  methods: {
      ...Vuex.mapMutations([
        GAMES_SETS_STORE.MUTATIONS.UPSERT,
        GAMES_SETS_STORE.MUTATIONS.DELETE
      ]),
      newGameSet() {
        if (!this.titleHasChanged) return
        const dices = this.gameSet ? [...this.gameSet.dices] : []
        const newGameSet = {title: this.title, slug: this.newSlug, dices}
        this[GAMES_SETS_STORE.MUTATIONS.UPSERT](newGameSet)
        this.$router.push(`${ROUTES.GAME_SET}/${newGameSet.slug}`)
      },
      delete(slug) {this[GAMES_SETS_STORE.MUTATIONS.DELETE](slug)},
      deleteCurrent() {
        this.$router.push(`/`)
        this.delete(this.slug)
      },
      changeTitle() {
        const oldSlug = this.slug
        this.newGameSet()
        this.delete(oldSlug)
      },
      refresh() {
        if (this.gameSet) this.title = this.gameSet.title
      }

  },
})