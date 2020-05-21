export const template = /*html*/`
    <v-card-actions>
      <v-text-field v-model="min" ref="min" label="Low bound" class="ma-2" type="number" :oninput="maxChars" counter="4"/>
      <v-text-field v-model="max" ref="max" label="High bound" class="ma-2" type="number" :oninput="maxChars" counter="4" />
    </v-card-actions>
`