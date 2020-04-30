import diceSide from "../dice-side/index.js"
import { processSides } from "../../store/dices.js"
import { template, css } from './view.js'
import { SIDES_TYPES } from "../../constants/index.js"
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'side-generator',
  components: { diceSide },
  template,
  css,
  mixins: [cssMixin],
  props: {
    content: {type: String, default: '1-10'},
    type: {type: String, default: SIDES_TYPES.NUMBER_INTERVAL},
    color: String,
  },
  computed: {
    processedSides() {
      const {content, type, color} = this
      const processedSides = processSides([{content, type, color}])
      return processedSides
    }
  }
})