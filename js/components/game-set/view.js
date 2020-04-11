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
        v-for="(diceSlug, index) in dices"
        :key="diceSlug + index"
        cols="12"
        sm="2"
        class="d-flex justify-center"
        >
        <dice :slug="diceSlug" :selectedSideIndex="diceResultsIndex[index]" />
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
