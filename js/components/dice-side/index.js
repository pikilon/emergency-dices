
import { template, css } from './view.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'dice',
  css,
  mixins: [cssMixin],
  template,
  props: {
    color: String,
    result: String,
    selected: Boolean,
    rolling: Boolean,
  },
  computed: {

    styles() {
      const color = this.color || false
      if (!color) return undefined
      return `background-color: ${color}`
    },
  },
  methods: {
    clicked() { this.$emit('dice-click')},
  },
})