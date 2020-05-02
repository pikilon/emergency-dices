import diceSide from "../dice-side/index.js"
import { processSides } from "../../store/dices.js"
import { template, css } from './view.js'
import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js"
import cssMixin from '../../mixins/css.js'
import { DEFAULT_VALUES } from "../../constants/DEFAULT_VALUES.js"
import { VALIDATION_RULES } from "../../constants/VALIDATION_RULES.js"


const SIDE_TYPES_MAP = {
  [SIDES_TYPES.STRING]: {value: SIDES_TYPES.STRING, label: 'A Word', hint: 'Small Word for the side', rules: [VALIDATION_RULES.REQUIRED, VALIDATION_RULES.MAX_FOUR], type: 'text'},
  [SIDES_TYPES.NUMBER]: {value: SIDES_TYPES.NUMBER, label: 'A Number', hint: 'A single number', rules: [VALIDATION_RULES.REQUIRED, VALIDATION_RULES.MAX_FOUR], type: 'number'},
  [SIDES_TYPES.SYMBOL]: {value: SIDES_TYPES.SYMBOL, label: 'Symbols', hint: 'Every character will be a side', rules: [VALIDATION_RULES.REQUIRED], type: 'text'},
  [SIDES_TYPES.NUMBER_INTERVAL]: {value: SIDES_TYPES.NUMBER_INTERVAL, label: 'Number interval', hint: 'A interval of numbers'},
}

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
    sendSide(partial) {
      const {content, type, color, index} = this
      const completeSide = {content, type, color, ...partial}
      this.$emit('setSide', index, completeSide)
    },
    sendInterval(min, max) {
      const content = [min,max].join(',')
      this.sendSide({content})
    },
  },
  computed: {
    isInterval() {return this.type === SIDES_TYPES.NUMBER_INTERVAL},
    isString() {return this.type === SIDES_TYPES.STRING},
    isSymbol() {return this.type === SIDES_TYPES.SYMBOL},
    processedSides() {
      const {content, type, color} = this
      let processedSides = processSides([{content, type, color}])
      const isUltraBig = processedSides.length > 60
      if (isUltraBig) {
        const first = processedSides[0]
        const ellipsis = {...first, content: '...'}
        const last = processedSides[processedSides.length - 1]
        processedSides = [first, ellipsis, last]

      }
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
    sideContent: {
      get() { return this.content },
      set(content) {this.sendSide({content})},
    },
    sideType: {
      get() { return this.type },
      set(type) {this.sendSide({type})},
    },
    sideTypesMap() {return SIDE_TYPES_MAP},
    sideTypesArray() {return Object.values(this.sideTypesMap)},
  }
})