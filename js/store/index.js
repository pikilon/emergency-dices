import css from './css.js'
import sets, { GAMES_SETS_STORE } from './games-sets.js'
import dices, { DICES_STORE } from './dices.js'
/*
const vuexLocal = new window.VuexPersistence.VuexPersistence({
  storage: window.localStorage,
  modules: [ GAMES_SETS_STORE.STORE, DICES_STORE.STORE ]
})
*/
export const store = new Vuex.Store({
  modules: {
    css,
    [GAMES_SETS_STORE.STORE]: sets,
    [DICES_STORE.STORE]: dices,
  },
  // plugins: [ vuexLocal.plugin ],
})