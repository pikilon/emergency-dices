import { template } from "./view.js";
import { GAMES_SETS_STORE } from "../../store/games-sets.js";

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapGetters([GAMES_SETS_STORE.GETTERS.ARRAY]),
    title() {
      return 'Emergency dices'
    },
  }
})