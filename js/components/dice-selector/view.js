import { GAMES_SETS_STORE } from "../../store/games-sets.js";

export const template = /*html*/
`
<v-card
  max-width="475"
  class="mx-auto"
>
  <v-toolbar color="teal" dark>
    <v-toolbar-title>Edit dices</v-toolbar-title>
  </v-toolbar>
  <v-list subheader>
    <v-subheader>Current</v-subheader>
  </v-list>
  <v-divider></v-divider>
  <v-list subheader>
    <v-subheader>Available</v-subheader>
    <v-list-item v-for="dice in availableDices" :key="dice.slug">
    <v-list-item-action>
      <v-checkbox color="primary"/>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{dice.title}}</v-list-item-title>
      <v-list-item-subtitle>{{dice.sides.length}} sides: {{dice.sides.map(({content}) => content).join(', ')}}</v-list-item-subtitle>
    </v-list-item-content>
    </v-list-item>
  </v-list>
</v-card>
`