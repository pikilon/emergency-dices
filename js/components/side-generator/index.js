import diceSide from "../dice-side/index.js"
import { processSides } from "../../store/dices.js"
import { template, css } from './view.js'
import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js"
import cssMixin from '../../mixins/css.js'
import { DEFAULT_VALUES } from "../../constants/DEFAULT_VALUES.js"
import { VALIDATION_RULES } from "../../constants/VALIDATION_RULES.js"
import sideContentInterval from "./side-content-interval/index.js"

const SIDE_TYPES_MAP = {
  [SIDES_TYPES.STRING]: {value: SIDES_TYPES.STRING, label: 'A Word', inputLabel: 'Small Word for the side', rules: [VALIDATION_RULES.REQUIRED, VALIDATION_RULES.MAX_FOUR], type: 'text',  maxlength: "4"},
  [SIDES_TYPES.NUMBER]: {value: SIDES_TYPES.NUMBER, label: 'A Number', inputLabel: 'A single number', rules: [VALIDATION_RULES.REQUIRED, VALIDATION_RULES.MAX_FOUR], type: 'number'},
  [SIDES_TYPES.SYMBOL]: {value: SIDES_TYPES.SYMBOL, label: 'Symbols', inputLabel: 'Every character will be a side', rules: [VALIDATION_RULES.REQUIRED], type: 'text'},
  [SIDES_TYPES.NUMBER_INTERVAL]: {value: SIDES_TYPES.NUMBER_INTERVAL, label: 'Number interval', inputLabel: 'A interval of numbers'},
}

export default Vue.extend({
  name: 'side-generator',
  components: { diceSide, sideContentInterval },
  template,
  css,
  mixins: [cssMixin],
  props: {
    content: {type: String, default: DEFAULT_VALUES.SIDES.CONTENT[SIDES_TYPES.NUMBER_INTERVAL]},
    type: {type: String, default: SIDES_TYPES.NUMBER_INTERVAL},
    color: String,
    index: Number,
    isNew: Boolean,
  },
  methods: {
    sendSide(partial) {
      const {content, type, color, index} = this
      const completeSide = {content, type, color, ...partial}
      if (this.isNew) {
        this.sendSideNew(completeSide)
      } else {
        this.$emit('setSide', index, completeSide)

      }
    },
    deleteSide() {
      this.$emit('deleteSide', this.index)
    },
    sendSideNew(newSide) {

      const typeChanged = newSide.type !== this.type
      if (typeChanged) newSide.content = ''
      this.$emit('setNewSide', newSide)
    }
  },
  computed: {
    limitNumberChars() {return `if (this.value.length > 4) this.value = this.value.slice(0,4)`},
    isInterval() {return this.type === SIDES_TYPES.NUMBER_INTERVAL},
    isString() {return this.type === SIDES_TYPES.STRING},
    isSymbol() {return this.type === SIDES_TYPES.SYMBOL},
    processedSides() {
      const {content, type, color} = this
      if (!content) return []
      let processedSides = processSides([{content, type, color}])
      return processedSides
    },
    processedSidesEllipsis() {
      const {processedSides} = this
      const doesntNeedEllipsis = processedSides.length <= 60
      if (doesntNeedEllipsis) return processedSides
      const first = processedSides[0]
      const ellipsis = {...first, content: '...'}
      const last = processedSides[processedSides.length - 1]
      return [first, ellipsis, last]
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
    sideTypeTitle() { return this.sideTypesMap[this.type].label},
    isNewReady() { return this.processedSides.length <= 0 },
  }
})