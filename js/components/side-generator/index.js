import diceSide from "../dice-side/index.js"
import { processSides } from "../../store/dices.js"
import { template, css } from './view.js'
import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js"
import cssMixin from '../../mixins/css.js'
import { DEFAULT_VALUES } from "../../constants/DEFAULT_VALUES.js"

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
    index: Number,
  },
  methods: {
    sendContent(partial) {
      const {content, type, color, index} = this
      const completeSide = {content, type, color, ...partial}
      this.$emit('setSide', index, completeSide)
    },
    sendInterval(min, max) {
      const content = [min,max].join(',')
      this.sendContent({content})
    },
  },
  computed: {
    isInterval() {return this.type === SIDES_TYPES.NUMBER_INTERVAL},
    isString() {return this.type === SIDES_TYPES.STRING},
    isSymbol() {return this.type === SIDES_TYPES.SYMBOL},
    processedSides() {
      const {content, type, color} = this
      const processedSides = processSides([{content, type, color}])
      return processedSides
    },
    intervals() {
      const finalContent = this.content || DEFAULT_VALUES.SIDES.CONTENT[SIDES_TYPES.NUMBER_INTERVAL]
      return finalContent.split(',')
    },
    min: {
      get() {
        const [min] = this.intervals
        return min
      },
      set(min) {
        min = parseInt(min)
        const initialMax = parseInt(this.max)
        const max = !initialMax || (initialMax <= min) ? min + 3 : initialMax
        this.sendInterval(min,max)

      },
    },
    max: {
      get() {
        const [min, max] = this.intervals
        return max
      },
      set(max) {
        max = parseInt(max)
        const initialMin = parseInt(this.min)
        const min = !initialMin || (initialMin >= max) ? max - 3 : initialMin
        this.sendInterval(min,max)
      },
    },
  }
})