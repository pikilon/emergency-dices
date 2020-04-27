import { template } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { ROUTES } from "../../constants/routes.js";

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapGetters([GAMES_SETS_STORE.GETTERS.ARRAY]),

    gameSets() { return this[GAMES_SETS_STORE.GETTERS.ARRAY].map(gameSet => ({
        ...gameSet,
        link: `${ROUTES.GAME_SET}/${gameSet.slug}`
      }))
    },
    title() {
      return 'Emergency dices'
    },
  }
})