import { DICES_STORE, processDice } from "../../store/dices.js";
import { template } from "./view.js";
import { VALIDATION_RULES } from "../../constants/VALIDATION_RULES.js";
import sideGenerator from "../side-generator/index.js";


export default Vue.extend({
  components: { sideGenerator },
  template,
  data() {return ({
    title: String,
    slug: String,
    sides: [],
    rules: {
      title: [VALIDATION_RULES.MINIMUM_FOUR]
    }

  })},
  created() {
    this.refreshDice()
  },
  methods: {
    loadStoreData() {
      Object.keys(this.storeDice).forEach(key => {
        this[key] = this.storeDice[key]
      })
    },
    refreshDice() {
      if (this.routeSlug) this.loadStoreData()
    },
    setSide(index, side) { Vue.set(this.sides, index, side) },
  },
  computed: {
      ...Vuex.mapState({ allDices: DICES_STORE.STORE}),
      ...Vuex.mapGetters({ processedDicesMap: DICES_STORE.GETTERS.PROCESSED }),
      routeSlug() { return this.$route.params.diceSlug },
      storeDice() { return this.routeSlug && this.allDices[this.routeSlug]},
      sideGroups() { return this.storeDice ? this.storeDice.sides : []},
      isNew() { return !this.routeSlug},
      diceChanged() { return this.isNew || this.slug !== this.routeSlug},
      existingDice() { return this.allDices[this.slug]},
      titleSlug: {
        get() {return this.title},
        set(title) {
          this.title = title
          this.slug = _.kebabCase(title)
        },
      },
      currentDice() {
        const {title, slug, sides} = this
        return {title, slug, sides}
      },
      processedDice() { return processDice(this.currentDice) },
  },
})
