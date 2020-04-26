import state from './games-sets-default-state.js'
import { slugFinder } from '../helpers/slugFinder.js'
const STORE = 'games_sets'
export const GAMES_SETS_STORE = {
  STORE,
  MUTATIONS : {
    UPSERT: `${STORE}_upsert`,
    DELETE: `${STORE}_delete`,
    ADD_DICE: `${STORE}_add_dice`,
    REMOVE_DICE: `${STORE}_remove_dice`,
  },
  GETTERS: {
    ARRAY: `get_${STORE}_array`,
    FREE_SLUG: `get_${STORE}_free_slug`,
  }
}
const getExistingDice = (dices, diceSlug, diceColor) => dices.find(
  ({slug, color}) => diceSlug === slug && (!color || color === diceColor)
  )

const mutations = {
  [GAMES_SETS_STORE.MUTATIONS.UPSERT]: function(state, newSet) {
    Vue.set(state, newSet.slug, newSet)
  },
  [GAMES_SETS_STORE.MUTATIONS.DELETE]: function(state, setSlug) {
    Vue.delete(state, setSlug)
  },
  [GAMES_SETS_STORE.MUTATIONS.ADD_DICE]: function(state, {setSlug, diceSlug, diceColor}) {
    const dices = state[setSlug].dices
    const existingDice = getExistingDice(dices, diceSlug, diceColor)
    if (existingDice) {
      existingDice.amount += 1
    } else {
      dices.push({slug: diceSlug, color: diceColor, amount: 1})
    }
  },
  [GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE]: function(state, {setSlug, diceSlug, diceColor}) {
    const dices = state[setSlug].dices
    const existingDice = getExistingDice(dices, diceSlug, diceColor)
    const resultAmount = existingDice.amount - 1
    if (resultAmount > 0) {
      existingDice.amount = resultAmount
    } else {
      const indexOfExisting = dices.indexOf(existingDice)
      Vue.delete(dices, indexOfExisting)
    }
  },
}

const getters = {
  [GAMES_SETS_STORE.GETTERS.ARRAY]: state => Object.values(state),
  [GAMES_SETS_STORE.GETTERS.FREE_SLUG]: state => title => slugFinder(state, _.kebabCase(title)),
}

export default {
  state,
  mutations,
  getters,
}