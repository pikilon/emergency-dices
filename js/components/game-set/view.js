export const template = /*html*/
`
 <div>
  <v-container fluid>
    <div class="controls text-right">
      <v-btn color="primary" @click="roll">
        <v-icon left>mdi-dice-multiple</v-icon> Roll
      </v-btn>
    </div>

    <v-row>
      <v-col
        v-for="(dice, index) in dices"
        :key="dice.slug + index"
        cols="12"
        sm="2"
        class="d-flex justify-center"
        >
        <dice :slug="dice.slug" :selectedSideIndex="diceResultsIndex[index]"  :color="dice.color" />
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
