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
  <v-divider v-if="index + 1 < availableDices.length" :key="index"></v-divider>
</template>
</v-list>
<v-list>
  <v-subheader class="title">Choose new dice color</v-subheader>

  <v-list-item>
    <v-list-item-action>
      <v-checkbox v-model="colorEnabled" />
    </v-list-item-action>
    <v-list-item-content>
      <v-color-picker flat hide-canvas hide-inputs v-model="color" :disabled="!colorEnabled"/>
    </v-list-item-content>
  </v-list-item>
  <v-subheader class="title">Available Dices</v-subheader>
</v-list>
<v-list class="overflow-y-auto" subheader two-line>
  <template v-for="(dice, index) in availableDices">
    <v-list-item :key="dice.slug">
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
    <v-divider v-if="index + 1 < availableDices.length" :key="index"></v-divider>
  </template>
</v-list>
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