import markdownLoader from "../markdown-loader/index.js"

export default Vue.extend({
  components: { markdownLoader },
  template: '<markdown-loader url="../../../README.md" />',
})
