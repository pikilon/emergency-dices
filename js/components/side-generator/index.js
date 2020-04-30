import diceSide from "../dice-side/index.js"
import { processSides } from "../../store/dices.js"
import { template, css } from './view.js'
import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js"
import cssMixin from '../../mixins/css.js'
import { DEFAULT_VALUES } from "../../constants/DEFAULT_VALUES.js"
import { PATTERNS } from "../../constants/PATTERNS.js"

export default Vue.extend({
  name: 'side-generator',
  components: { diceSide },
  template,
  css,
  mixins: [cssMixin],
  props: {
    content: {type: String, default: DEFAULT_VALUES.SIDES.CONTENT[SIDES_TYPES.NUMBER_INTERVAL]},
    type: {type: String, default: SIDES_TYPES.NUMBER_INTERVAL},
    color: String,
  },
  computed: {
    processedSides() {
      const {content, type, color} = this
      const processedSides = processSides([{content, type, color}])
      return processedSides
    },
    intervals() {
      const finalContent = this.content || DEFAULT_VALUES.SIDES.CONTENT[SIDES_TYPES.NUMBER_INTERVAL]
      return finalContent.split('-')
    },
    min: {
      get() {
        const [min] = this.intervals
        return min
      },
      set(min) {
        const initialMax = this.max
        const max = !initialMax || (initialMax <= min) ? min + 3 : initialMax
        this.content = [min,max].join('-')
      },
    },
    max: {
      get() {
        const [min, max] = this.intervals
        return max
      },
      set(max) {
        const initialMin = this.min
        const min = !initialMin || (initialMin >= max) ? max - 3 : initialMin
        this.content = [min,max].join('-')
      },
    },
  }
})