const block = 'dice'
const s = {
  block,
  content: `${block}__content`
}

export const template = /*html*/
`
 <div :class="['${s.block}']" :style="styles">
  <div class="${s.content}">
    {{selectedSide.content}}
  </div>
 </div>
`

export const css = /*css*/ `
  .${s.block} {
    font-size: 1rem;
    height: 5em;
    width: 5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    box-shadow: inset 0 0 1em #999
  }

  .${s.content} {
    font-size: 1.5em;
    font-weight: bold;
  }

`