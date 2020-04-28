import { GAMES_SETS_STORE } from "../../store/games-sets.js";
import { ROUTES } from "../../constants/routes.js";

export const template = /*html*/
`
<v-list>
  <v-list-item tag="router-link" to="/">
    <v-list-item-icon>
      <v-icon>mdi-home</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Emergency dices</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item tag="router-link" to="${ROUTES.NEW_GAME_SET}">
    <v-list-item-icon>
      <v-icon>mdi-pen</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>New Game Set</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-item v-for="gameSet in gameSets" tag="router-link" :to="gameSet.link" :key="gameSet.slug">
    <v-list-item-icon>
      <v-icon>mdi-checkbox-multiple-marked</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{gameSet.title}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

</v-list>
`