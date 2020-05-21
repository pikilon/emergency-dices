import { template } from './view.js'

const UPPER_LIMIT = 9999
const LOWER_LIMIT = -999

export default Vue.extend({
  template,
  props: {
    value: String,
    maxChars: String,
  },
  methods: {
    sendContent(min,max) {
      if (min < LOWER_LIMIT) min = LOWER_LIMIT
      if (max > UPPER_LIMIT) max = UPPER_LIMIT
      this.$emit('input', `${min},${max}`)
    },
  },
  computed: {
    intervals() { return this.value.split(',') },
    min: {
      get() {return this.intervals[0]},
      set(min) {
        if (!min) return
        min = parseInt(min)
        let {max} = this.getMinMax
        if (!max || max <= min ) max = min + 3
        this.sendContent(min, max)
      }
    },
    max: {
      get() {return this.intervals[1]},
      set(max) {
        if (!max) return
        max = parseInt(max)
        let {min} = this.getMinMax
        if (!min || max <= min ) min = max - 3
        this.sendContent(min, max)
      }
    },
    getMinMax() { return {min: parseInt(this.$refs.min.value | 0 ), max: parseInt(this.$refs.max.value | 0)}},
  },

})