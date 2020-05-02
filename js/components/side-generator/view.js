const block = 'side-generator'
const s =  {
  block,
  title: `${block}__title`,
  big: `${block}--big`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <v-card :class="['${s.block}', {['${s.big}']: processedSides.length > 6}]">
    <v-card-text v-if="isNew">
      <v-autocomplete :items="sideTypesArray" v-model="sideType" item-text="label" item-value="value" dense
        label="Side type" />
    </v-card-text>
    <v-toolbar v-else color="indigo" dark>
      <v-card-title color="indigo" dark>{{sideTypeTitle}}</v-card-title>
    </v-toolbar>

    <div class="${s.sides}">
      <dice-side v-for="(side, index) in processedSides" :key="index + side.content" :result="side.content"
        :color="side.color" />
    </div>
    <v-card-actions v-if="isInterval">
      <v-text-field v-model="min" label="Low bound" class="ma-2" type="number" />
      <v-text-field v-model="max" label="High bound" class="ma-2" type="number" />
    </v-card-actions>
    <v-card-actions v-else>
      <v-text-field v-model="sideContent" label="other content" />
    </v-card-actions>
  </v-card>
`

export const css = /*css*/ `
  .${s.sides} {
    width: 600px;
    display: flex;
  }
  .${s.title} {

  }
  .${s.big} .${s.sides} > :nth-child(n+3) {
    position: relative;
    margin-left: -6em;
  }
    .${s.big} .${s.sides} > :nth-child(n+2):hover {
      z-index: 1;
    }

`
