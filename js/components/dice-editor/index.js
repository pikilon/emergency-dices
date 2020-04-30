import diceSide from "../dice-side/index.js"
import { DICES_STORE } from "../../store/dices.js";
import { template } from "./view.js";
import { VALIDATION_RULES } from "../../constants/validationRules.js";




export default Vue.extend({
  components: { diceSide },
  template,
  data() {return ({
    title: String,
    slug: String,
    sides: [],
    rules: {
      title: [VALIDATION_RULES.REQUIRED]
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
  },
  computed: {
      ...Vuex.mapGetters([DICES_STORE.GETTERS.PROCESSED]),
      allDicesMap() {return this[DICES_STORE.GETTERS.PROCESSED]},
      routeSlug() { return this.$route.params.diceSlug },
      storeDice() { return this.routeSlug && this.allDicesMap[this.routeSlug]},
      isNew() { return !this.routeSlug},
      diceChanged() { return this.isNew || this.slug !== this.routeSlug},
      existingDice() { return this.allDicesMap[this.slug]},
      titleSlug: {
        get() {return this.title},
        set(title) {
          this.title = title
          this.slug = _.kebabCase(title)
        },
      },
  },
})
