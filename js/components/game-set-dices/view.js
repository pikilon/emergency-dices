const block = ''
const s = {
  block,
  bagde_transparent: `badge_transparent`
}
export const template = /*html*/`
<v-list subheader class="${s.block}">
  <v-subheader class="title">Current Dices</v-subheader>
  <template v-for="({slug, title, amount, sides, sidesList, color}, index) in currentDices">
    <v-list-item :key="slug + index">
      <v-list-item-action>
        <v-btn icon @click="removeDice(slug, color)" color="red">
          <v-icon>mdi-minus-box</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
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
    <v-divider v-if="index + 1 < currentDices.length" :key="index"></v-divider>
  </template>
</v-list>
`