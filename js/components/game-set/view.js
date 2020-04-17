const block = 'game-set'
const s = {
  block,
  board: 'board'
}
export const template = /*html*/`
 <div class="${s.block}">
  <v-container fluid>
    <v-row class="controls" justify="space-between">
      <v-btn color="secondary" @click="roll(true)" :disabled="!isSelectedAvailable">
        <v-icon left>mdi-dice-5</v-icon> Roll Selected
      </v-btn>
      <v-autocomplete
        :items="selectedDicesOptions"
        v-if="selectedDicesOptions"
        v-model="selectedDicesOptions"
        item-text="content"
        item-value="index"
        class="flex-grow-0"
        outlined
        dense
        label="Set Value on selected"
      />
      <v-btn color="primary" @click="roll(false)">
        <v-icon left>mdi-dice-multiple</v-icon> Roll
      </v-btn>

      </v-row >

      <v-row justify="center" class="${s.board}">
          <dice
            v-for="(dice, index) in dices"
            :key="dice.slug + index"
            :slug="dice.slug"
            :selectedSideIndex="diceResultsIndex[index]"
            :color="dice.color"
            v-on:dice-click="toggleSelectDice(index)"
            :selected="selectedDices[index]"
            :rolling="dicesRollingIndexes.includes(index)"
          />

      </v-row>



        </v-container>

    <dice-selector :slug="slug"/>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="indigo"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
 </div>
`

export const css = /*css*/`
  .${s.board} {
    max-width: 20cm;

  }
`
