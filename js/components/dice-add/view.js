import { GAMES_SETS_STORE } from "../../store/games-sets.js";

const block = 'dices-edition'
const s = {
  block,
  bagde_transparent: `badge_transparent`
}

export const template = /*html*/`
<v-list-group v-model="isOpen">

  <v-list-item>
    <v-list-item-action>
      <v-checkbox v-model="colorEnabled" />
    </v-list-item-action>
    <v-list-item-content>
      Choose Color
      <v-color-picker flat hide-canvas hide-inputs v-model="color" :disabled="!colorEnabled" />
    </v-list-item-content>
  </v-list-item>
  <v-subheader class="title">Available Dices</v-subheader>
  <template v-slot:activator>
    <v-list-item-title>Add dices</v-list-item-title>
  </template>

  <template v-for="(dice, index) in dices">
    <v-list-item :key="dice.slug">
      <v-list-item-action>
        <v-btn icon @click="editDice(dice.slug)" color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-badge dot :class="{'${s.bagde_transparent}': !colorEnabled}" :color="enabledColor">
            {{dice.title}}
          </v-badge>
        </v-list-item-title>
        <v-list-item-subtitle>{{dice.sides.length}} sides: {{dice.sidesList}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="addDice(dice.slug, enabledColor)" color="primary">
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider v-if="index + 1 < dices.length" :key="index"></v-divider>
  </template>
</v-list-group>
`

export const css = /*css*/`
.${s.block} {
  background-color: white;
}
  .${s.bagde_transparent} .v-badge__badge {
    color: black;
    border: 1px solid black !important;
  }
`