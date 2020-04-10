export const template = /*html*/
`
 <div>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(diceSlug, index) in dices"
        :key="diceSlug + index"
        cols="12"
        sm="2"
        class="d-flex justify-center"
        >
        <dice :slug="diceSlug" :selectedSideIndex="index" />
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
