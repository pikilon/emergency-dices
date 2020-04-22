const block = 'game-set-editor'
const s = {
  block,
}
export const template = /*html*/`
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title white--text">{{title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <dice-selector v-if="slug" :slug="slug"/>
  </div>
`

export const css = /*css*/`
`
//