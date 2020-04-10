import app from '../components/app/index.js'

const routes = [
  {path: '/:gameSetSlug?', component: app},
]
export default new VueRouter({ routes })