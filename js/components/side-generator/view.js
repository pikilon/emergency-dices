const block = 'side-generator'
const s =  {
  block,
  big: `${block}--big`,
  ultrabig: `${block}--ultrabig`,
  content: `${block}__content`,
  group: `${block}__side_group`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <div :class="['${s.block}', {['${s.big}']: processedSides.length > 6, ['${s.ultrabig}']: processedSides.length > 70}]">
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
    margin-left: -1em;
  }
  .${s.big} .${s.sides} > :nth-child(n+3) {
    position: relative;
    margin-left: -6em;
  }
    .${s.big} .${s.sides} > :nth-child(n+2):hover {
      z-index: 1;
    }
  .${s.ultrabig} .${s.sides} > :nth-child(n+3) {
    display: none;

  }
  .${s.ultrabig} .${s.sides} > :last-child {
    display:block;
    margin-left: 0.4em;

  }

`
