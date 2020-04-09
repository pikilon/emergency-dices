import app from '../components/app/index.js'

const routes = [
  {path: '/:collectionSlug?', component: app},
]
export default new VueRouter({ routes })