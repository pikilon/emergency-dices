const block = 'side-generator'
const s =  {
  block,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <div class="${s.block}">
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
