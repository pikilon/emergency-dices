const block = 'dice'
const s = {
  block,
  content: `${block}__content`,
  selected: 'selected',
  rolling: 'rolling',
}

export const template = /*html*/
`
 <div :class="['${s.block}', {'${s.selected}': selected, '${s.rolling}': rolling }]" :style="styles" @click="clicked">
  <div class="${s.content}">
    {{selectedSide.content}}
  </div>
 </div>
`


export const css = /*css*/ `
  @keyframes rolling {
    to {
      transform: rotate(360deg)
    }
  }
  .${s.block} {
    font-size: 1cm;
    height: 2.5em;
    width: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: inset 0 0 1em #999;
    border: 3px solid transparent;
    margin: 0.5em;
  }

  .${s.block}.${s.rolling} {
    animation: rolling .2s linear infinite;
  }
  .${s.block}.${s.selected} {
    border-color: red;
  }

  .${s.content} {
    font-size: 0.8em;
    font-weight: bold;
  }

`