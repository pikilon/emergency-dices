import { ROUTES } from '../constants/routes.js'
import app from '../components/app/index.js'
import home from '../components/home/index.js'
import gameSetEditor from '../components/game-set-editor/index.js'
import gameSet from '../components/game-set/index.js'
import diceEditor from '../components/dice-editor/index.js'

const routes = [
  {path: `${ROUTES.DICE_EDITOR}/:diceSlug?`, component: diceEditor},
  {path: ROUTES.NEW_DICE, component: diceEditor},
  {path: ROUTES.NEW_GAME_SET, component: gameSetEditor},
  {path: `${ROUTES.GAME_SET}/:gameSetSlug?`, component: gameSet},
  {path: `/`, component: home},
]
export default new VueRouter({ routes })