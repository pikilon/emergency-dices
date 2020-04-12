export const template = /*html*/
`
 <div>
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

    </v-row>

    <v-row>
      <v-col
        v-for="(dice, index) in dices"
        :key="dice.slug + index"
        cols="12"
        sm="2"
        class="d-flex justify-center"
        >
        <dice
          :slug="dice.slug"
          :selectedSideIndex="diceResultsIndex[index]"
          :color="dice.color"
          v-on:dice-click="toggleSelectDice(index)"
          :selected="selectedDices[index]"
        />
      </v-col>
    </v-row>
  </v-container>

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
