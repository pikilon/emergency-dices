import app from '../components/app/index.js'
import { ROUTES } from '../constants/routes.js'

const routes = [
  {path: `${ROUTES.GAME_SET}/:gameSetSlug?`, component: app},
]
export default new VueRouter({ routes })