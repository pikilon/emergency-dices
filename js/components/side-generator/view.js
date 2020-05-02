const block = 'side-generator'
const s =  {
  block,
  big: `${block}--big`,
  content: `${block}__content`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <div :class="['${s.block}', {['${s.big}']: processedSides.length > 6}]">
    <v-autocomplete
      :items="sideTypesArray"

      v-model="sideType"
      item-text="label"
      item-value="value"

      dense
      label="Side type"
    />
  <v-row v-if="isInterval" class="${s.content}">
        <v-text-field v-model="min" label="Low bound" class="ma-2" type="number"/>
        <v-text-field v-model="max" label="High bound" class="ma-2" type="number"/>
      </v-row>
      <v-row v-else class="${s.content}">
        <v-text-field v-model="sideContent" label="other content" />
      </v-row>

      <div class="${s.sides}">
        <dice-side v-for="(side, index) in processedSides"
          :key="index + side.content"
          :result="side.content"
          :color="side.color"
        />
      </div>

  </div>
`

export const css = /*css*/ `
  .${s.sides} {
    width: 600px;
    display: flex;
    margin-left: -1em;
  }
  .${s.big} .${s.sides} > :nth-child(n+3) {
    position: relative;
    margin-left: -6em;
  }
    .${s.big} .${s.sides} > :nth-child(n+2):hover {
      z-index: 1;
    }

`
