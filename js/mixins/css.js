import { CSS_STORE } from "../store/css.js"

CSS_STORE
export default {
  beforeCreate() {
    const { name, css } = this.$options
    if (!name || !css) return console.error('the component should have a name and css', this)
    this.$store.commit(CSS_STORE.MUTATIONS.ADD, { key: name, styleString: css })
  },
  destroyed() {
    const { name } = this.$options
    if (name) this.$store.commit(CSS_STORE.MUTATIONS.REMOVE, name)
  }
}