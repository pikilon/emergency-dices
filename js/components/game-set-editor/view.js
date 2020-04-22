const block = 'game-set-editor'
const s = {
  block,
}
export const template = /*html*/`
  <v-card flat class="${s.block}" tile>
    <v-toolbar color="teal">
      <v-toolbar-title class="white--text">Edit game set</v-toolbar-title>
    </v-toolbar>
    <v-container>
    </v-container>
    <v-list-item >
      <v-list-item-content>
        <v-text-field v-model="title" label="Game set title" :hint="hint"/>
      </v-list-item-content>
    </v-list-item>

    <dice-selector v-if="slug" :slug="slug" :open="isNew" />
  </v-card>
`

export const css = /*css*/`
  .${s.block} {

  }
`
//