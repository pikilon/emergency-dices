export const template = /*html*/`
  <v-card flat tile>
    <v-toolbar color="teal">
      <v-toolbar-title class="white--text">Edit game set</v-toolbar-title>
    </v-toolbar>
    <v-container>
    </v-container>
    <v-list-item >
      <v-list-item-content>
        <v-text-field v-model="title" label="Game set title" :hint="slugHint" :rules="titleRules" />
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-btn :disabled="!titleHasChanged" color="primary" @click="changeTitle">Update Title</v-btn>
      </v-list-item-content>
    </v-list-item>
    <game-set-dices v-if="slug" :slug="slug" />
    <dice-selector v-if="slug" :slug="slug" :open="isNew" />
  </v-card>
`