import { DICES_STORE, processDice } from "../../store/dices.js";
import { template } from "./view.js";
import { VALIDATION_RULES } from "../../constants/VALIDATION_RULES.js";
import sideGenerator from "../side-generator/index.js";
import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js";
import { ROUTES } from "../../constants/routes.js";


export default Vue.extend({
  components: { sideGenerator },
  template,
  data() {return ({
    title: String,
    slug: String,
    sides: [],
    rules: {
      title: [VALIDATION_RULES.MINIMUM_FOUR]
    },
    newSide: {},

  })},
  created() {
    this.refreshDice()
  },
  watch: {
    $route() {
      this.refreshDice()
    }
  },
  methods: {
    ...Vuex.mapMutations([DICES_STORE.MUTATIONS.NEW_TITLE]),
    loadStoreData() {
      Object.keys(this.storeDice).forEach(key => {
        this[key] = this.storeDice[key]
      })
    },
    refreshDice() {
      if (this.routeSlug) this.loadStoreData()
      this.newSide = {}
    },
    setSide(index, side) { Vue.set(this.sides, index, side) },
    deleteSide(index) { Vue.delete(this.sides, index) },
    setNewSide(newSide) {
      this.newSide = newSide
     },
    addNewSide() { this.sides.push(this.newSide)},
    save() {
      if (this.isNew) {
        const {title, slug} = this
        const payload = {title,slug}
        this[DICES_STORE.MUTATIONS.NEW_TITLE](payload)
        this.$router.push(`${ROUTES.DICE_EDITOR}/${payload.slug}`)
      }
    }
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
        get() {return this.isNew ? '' : this.title},
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
      isTitleValid() { return (VALIDATION_RULES.MINIMUM_FOUR(this.title) === true )},
      titleChanged() { return this.storeDice.slug !== this.slug && this.isTitleValid},

  },
})
