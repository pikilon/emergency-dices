import { template } from "./view.js"
import navigation from "../navigation/index.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import gameSet from "../game-set/index.js"
import gameSetEditor from "../game-set-editor/index.js"

export default Vue.extend({
  template,
  components: { navigation, gameSet, gameSetEditor },
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
  }
})