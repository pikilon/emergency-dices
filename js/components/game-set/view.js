const block = 'game-set'
const s = {
  block,
  board: 'board'
}
export const template = /*html*/`
 <v-container class="${s.block}">
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
              @clone-dice="cloneDice"
              @remove-dice="removeDice"
              :slug="dice.slug"
              :selectedSideIndex="diceResultsIndex[index]"
              :color="dice.color"
              v-on:dice-click="toggleSelectDice(index)"
              :selected="selectedDices[index]"
              :rolling="rollingDices[index]"
              :editing="editing"
            />

        </v-row>



          </v-container>


      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="teal"
        @click="toggleEditing"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-navigation-drawer right v-model="editing" width="400" absolute >
        <game-set-editor />
    </v-navigation-drawer>
 </v-container>
`

export const css = /*css*/`
  .${s.board} {
    max-width: 20cm;

  }
`
