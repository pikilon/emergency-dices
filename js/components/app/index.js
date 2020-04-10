import { template } from "./view.js"
import navigation from "../navigation/index.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import gameSet from "../game-set/index.js"

const { mapGetters } = Vuex;

export default Vue.extend({
  template,
  components: { navigation, gameSet },
  mounted(){
    // const wrongSlug = this.collectionSlug && !this.title
    // if (wrongSlug) console.log("redirect")
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...Vuex.mapState({
      gameSet(state){ return this.$route.params.gameSetSlug && state[GAMES_SETS_STORE.STORE][this.$route.params.gameSetSlug]}
    }),
    title() {
      return this.gameSet ? this.gameSet.title : 'Emergency Dices'
    },
    // ...mapGetters([COLLECTIONS_STORE.GETTERS.ONE_TITLE]),
    // title() { return this[COLLECTIONS_STORE.GETTERS.ONE_TITLE](this.collectionSlug)},
    // collectionSlug() { return this.$route.params.collectionSlug || ''},
  }
})