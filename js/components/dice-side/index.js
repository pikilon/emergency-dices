
import { template, css } from './view.js'
import { DICES_STORE } from '../../store/dices.js';
import cssMixin from '../../mixins/css.js'

export default Vue.extend({
  name: 'side',
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
      const color = this.color || 'white'
      return `background-color: ${color}`
    },
  },
  methods: {
    clicked() { this.$emit('dice-click')},
  },
})