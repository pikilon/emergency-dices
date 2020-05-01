const block = 'side-generator'
const s =  {
  block,
  content: `${block}__content`,
  group: `${block}__side_group`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <div class="${s.block}">
    <div class="${s.group}">
      <v-row v-if="isInterval" class="${s.content}">
        <v-text-field v-model="min" label="Low bound" class="ma-2" type="number"/>
        <v-text-field v-model="max" label="High bound" class="ma-2" type="number"/>
      </v-row>
      <div class="${s.sides}">
        <dice-side v-for="(side, index) in processedSides"
          :key="index + side.content"
          :result="side.content"
          :color="side.color"
        />
      </div>
    </div>
  </div>
`

export const css = /*css*/ `
  .${s.sides} {
    width: 600px;
    display: flex;
  }
  .${s.sides} > * {

  }
    .${s.sides} > :nth-child(n+5) {
      position: relative;
      margin-left: -5em;
    }
      .${s.sides} > :nth-child(n+4):hover {
        z-index: 1;
      }
`
