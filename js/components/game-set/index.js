
import { template } from './view.js'
import { GAMES_SETS_STORE } from '../../store/games-sets.js';
import dice from '../dice/index.js'

const { mapState } = Vuex;

export default Vue.extend({
  template,
  components: { dice },
  props: {
    slug: String
  },
  computed: {
    ...mapState({
      gameSet(state) {return state[GAMES_SETS_STORE.STORE][this.slug] },
    }),
    dices() { return this.gameSet.dices },
  }
})