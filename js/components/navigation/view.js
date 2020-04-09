import { GAMES_SETS_STORE } from "../../store/games-sets.js";

export const template = /*html*/
`
<v-list>
  <v-list-item tag="router-link" to="/">
    <v-list-item-icon>
      <v-icon>mdi-pen</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>New Game Set</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-item v-for="gameSet in ${GAMES_SETS_STORE.GETTERS.ARRAY}" tag="router-link" :to="gameSet.slug" :key="gameSet.slug">
    <v-list-item-icon>
      <v-icon>mdi-checkbox-multiple-marked</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{gameSet.title}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

</v-list>
`