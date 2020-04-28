import {template} from './view.js'
export default Vue.extend({
  template,
  props: {
    url: String,
  },
  data() {return ({
    text: ''
  })},
  created() {

    this.fetch()

  },
  methods: {
    async fetch(){
      const file = await fetch(this.url)
      const text = await file.text()
      this.text = text
    },
  }
})
