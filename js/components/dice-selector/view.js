import { GAMES_SETS_STORE } from "../../store/games-sets.js";

const block = 'dices-edition'
const s = {
  block,
  bagde_transparent: `badge_transparent`
}

export const template = /*html*/
`<div class="${block}">
  <dice-add @add-dice="addNewDice" :open="open"/>
</div>
`

export const css = /*css*/`
.${s.block} {
  background-color: white;
}
  .${s.bagde_transparent} .v-badge__badge {
    color: black;
    border: 1px solid black !important;
  }
`