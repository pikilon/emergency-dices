
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import diceSelector from '../dice-selector/index.js'
import gameSetDices from '../game-set-dices/index.js'
import { DICES_STORE } from '../../store/dices.js';


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
    titleRules: [rules.required],
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
    slugHint() { return `slug: ${this.newSlug}`}
  },

  methods: {
      ...Vuex.mapMutations([
        GAMES_SETS_STORE.MUTATIONS.UPSERT,
        GAMES_SETS_STORE.MUTATIONS.DELETE
      ]),
      createCopy() {
        if (!this.titleHasChanged) return
        const newGameSet = {...this.gameSet, title: this.title, slug: this.newSlug}
        this[GAMES_SETS_STORE.MUTATIONS.UPSERT](newGameSet)
        this.$router.push(`/${newGameSet.slug}`)
      },
      delete(slug) {this[GAMES_SETS_STORE.MUTATIONS.DELETE](slug)},
      deleteCurrent() {
        this.$router.push(`/`)
        this.delete(this.slug)
      },
      changeTitle() {
        const oldSlug = this.slug
        this.createCopy()
        this.delete(oldSlug)
      },
      refresh() {
        if (this.gameSet) this.title = this.gameSet.title
      }

  },
})