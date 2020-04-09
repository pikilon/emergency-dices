import { template } from "./view.js"
// import newCollection from "../new-collection/index.js"
// import collection from "../collection/index.js"
// import { COLLECTIONS_STORE } from "../../store/collections.js";
import navigation from "../navigation/index.js";

const { mapGetters } = Vuex;

export default Vue.extend({
  template,
  components: { navigation },
  mounted(){
    // const wrongSlug = this.collectionSlug && !this.title
    // if (wrongSlug) console.log("redirect")
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    title() {
      return 'Emergency Dices'
    },
    // ...mapGetters([COLLECTIONS_STORE.GETTERS.ONE_TITLE]),
    // title() { return this[COLLECTIONS_STORE.GETTERS.ONE_TITLE](this.collectionSlug)},
    // collectionSlug() { return this.$route.params.collectionSlug || ''},
  }
})