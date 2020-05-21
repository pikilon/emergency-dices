import state from './dices-default-state.js'
import { SIDES_TYPES } from '../constants/SIDE_TYPES.js'
import { slugFinder } from '../helpers/slugFinder.js'

const STORE = 'dices'
export const DICES_STORE = {
  STORE,
  MUTATIONS : {
    UPSERT: `${STORE}_upsert`,
    NEW_TITLE: `${STORE}_new_title`,
    DELETE: `${STORE}_delete`,
    ADD_SIDE: `${STORE}_add_side`,
    REMOVE_SIDE: `${STORE}_remove_side`,
  },
  GETTERS: {
    PROCESSED: `get_processed_${STORE}`,
    PROCESSED_ARRAY: `get_processed_array_${STORE}`,
    FREE_SLUG: `get_${STORE}_free_slug`,
  }
}

const mutations = {
  [DICES_STORE.MUTATIONS.UPSERT]: function(state, newDice) {
    Vue.set(state, newDice.slug, newDice)
  },
  [DICES_STORE.MUTATIONS.NEW_TITLE]: function(state, titleSlug) {
    const { title } = titleSlug
    titleSlug.sides = []
    titleSlug.slug = slugFinder(state, _.kebabCase(title))
    mutations[DICES_STORE.MUTATIONS.UPSERT](state, titleSlug)
  },
  [DICES_STORE.MUTATIONS.DELETE]: function(state, diceSlug) {
    Vue.delete(state, diceSlug)
  },
  [DICES_STORE.MUTATIONS.ADD_SIDE]: function(state, {diceSlug, side}) {
    state[diceSlug].sides.push(side)
  },
  [DICES_STORE.MUTATIONS.REMOVE_SIDE]: function(state, {diceSlug, sideIndex}) {
    state[diceSlug].sides.splice(sideIndex, 1)
  },
}

const SIZES_NEED_PROCCESING = {
  [SIDES_TYPES.NUMBER_INTERVAL] : true,
  [SIDES_TYPES.SYMBOL] : true,
}

export const processSides = (sides) => sides.reduce(
  (result, side) => {
    if (!SIZES_NEED_PROCCESING[side.type]) {
      result.push(side)
      return result
    }
    if (side.type === SIDES_TYPES.NUMBER_INTERVAL) {
      let [lowerBound, upperBound] = side.content.split(',').map(parseFloat)
      for (lowerBound; lowerBound <= upperBound; lowerBound++) {
        result.push({content: lowerBound.toString(), type: SIDES_TYPES.NUMBER})
      }
    }
    if (side.type === SIDES_TYPES.SYMBOL) {
      Array.from(side.content).forEach(content => result.push({content, type: SIDES_TYPES.STRING}))
    }
    return result
  },
  []
)

export const processDice = (dice, slug) => {
  const { sides, ...restDice } = dice
  const processedSides = processSides(sides)
  const sidesList = processedSides.map(({content}) => content).join(', ')
  return {slug, sidesList, sides: processedSides, ...restDice}
}

const getters = {
  [DICES_STORE.GETTERS.PROCESSED]: state => Object.keys(state).reduce(
    (result, diceSlug) => {
      result[diceSlug] = processDice(state[diceSlug], diceSlug)
      return result
    },
    {}
  ),
  [DICES_STORE.GETTERS.PROCESSED_ARRAY]: state => Object.values(getters[DICES_STORE.GETTERS.PROCESSED](state)),
  [DICES_STORE.GETTERS.FREE_SLUG]: state => title => slugFinder(state, _.kebabCase(title)),
}

export default {
  state,
  mutations,
  getters,
}
