import { GAMES_SETS_STORE } from "../../store/games-sets.js";

export const template = /*html*/
`<v-card max-width="475" class="mx-auto">
<v-toolbar color="teal" dark>
  <v-toolbar-title>Edit dices</v-toolbar-title>
</v-toolbar>
<v-list subheader>
  <v-subheader>Current</v-subheader>
  <template v-for="({dice, amount}, index) in dices">
  <v-list-item :key="dice.slug">
  <v-list-item-action>
    <v-btn icon @click="removeDice(dice)" color="red">
      <v-icon>mdi-minus-box</v-icon>
    </v-btn>
  </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        <v-badge :content="amount">
         {{dice.title}}
        </v-badge>
      </v-list-item-title>
      <v-list-item-subtitle>{{dice.sides.length}} sides: {{dice.sidesList}}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
    <v-btn icon @click="addDice(dice)" color="primary">
      <v-icon>mdi-plus-box</v-icon>
    </v-btn>
  </v-list-item-action>
  </v-list-item>
  <v-divider v-if="index + 1 < availableDices.length" :key="index"></v-divider>
</template>
</v-list>
<v-divider></v-divider>
<v-list subheader two-line>
  <v-subheader>Available</v-subheader>
  <template v-for="(dice, index) in availableDices">
    <v-list-item :key="dice.slug">
      <v-list-item-content>
        <v-list-item-title>{{dice.title}}</v-list-item-title>
        <v-list-item-subtitle>{{dice.sides.length}} sides: {{dice.sidesList}}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
      <v-btn icon @click="addDice(dice)" color="primary">
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-list-item-action>
    </v-list-item>
    <v-divider v-if="index + 1 < availableDices.length" :key="index"></v-divider>
  </template>
</v-list>
</v-card>
`