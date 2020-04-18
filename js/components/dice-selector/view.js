import { GAMES_SETS_STORE } from "../../store/games-sets.js";

export const template = /*html*/
`<v-card max-width="475" class="mx-auto">
<v-toolbar color="teal" dark>
  <v-toolbar-title>Edit dices</v-toolbar-title>
</v-toolbar>
<v-list subheader>
  <v-subheader>Current</v-subheader>
  <template v-for="({slug, title, amount, sides, sidesList, color}, index) in gameSetDicesDisplay">
  <v-list-item :key="slug + index">
  <v-list-item-action>
    <v-btn icon @click="removeDice(slug, color)" color="red">
      <v-icon>mdi-minus-box</v-icon>
    </v-btn>
  </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title >
        <v-badge :content="amount" :color="color">
         {{title}}
        </v-badge>
      </v-list-item-title>
      <v-list-item-subtitle>{{sides.length}} sides: {{sidesList}}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
    <v-btn icon @click="addDice(slug, color)" color="primary">
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
      <v-list-item-action>
      <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon :color="colors[dice.slug]" v-on="on">
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Dice Color</v-toolbar-title>
          </v-toolbar>
          <v-color-picker hide-canvas hide-inputs v-model="color" />
        </v-card>
      </v-menu>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{dice.title}}</v-list-item-title>
        <v-list-item-subtitle>{{dice.sides.length}} sides: {{dice.sidesList}}</v-list-item-subtitle>
        </v-list-item-content>
      <v-list-item-action>
      <v-btn icon @click="addDice(dice.slug)" color="primary">
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-list-item-action>
    </v-list-item>
    <v-divider v-if="index + 1 < availableDices.length" :key="index"></v-divider>
  </template>
</v-list>
</v-card>
`