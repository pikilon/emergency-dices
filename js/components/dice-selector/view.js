import { GAMES_SETS_STORE } from "../../store/games-sets.js";

const block = 'dices-edition'
const s = {
  block,
  bagde_transparent: `badge_transparent`
}

export const template = /*html*/
`<div class="${block}">
<v-list subheader>
  <v-subheader class="title">Dices</v-subheader>
  <template v-for="({slug, title, amount, sides, sidesList, color}, index) in gameSetDicesDisplay">
  <v-list-item :key="slug + index">
  <v-list-item-action>
    <v-btn icon @click="removeDice(slug, color)" color="red">
      <v-icon>mdi-minus-box</v-icon>
    </v-btn>
  </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title >
        <v-badge :content="amount" :class="{'${s.bagde_transparent}': !color}" :color="color || 'transparent'">
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
  <v-divider v-if="index + 1 < gameSetDicesDisplay.length" :key="index"></v-divider>
</template>
</v-list>
  <dice-add @add-dice="addNewDice" />
</div>
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