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
      <v-list-item-content class="text-center">
        <div className="text-center">
          <v-btn small class="ma-2" :disabled="!titleHasChanged" color="secondary" @click="createCopy">Save as copy</v-btn>
          <v-btn small class="ma-2" :disabled="!titleHasChanged" color="primary" @click="changeTitle">Update Title</v-btn>
        </div>
      </v-list-item-content>
    </v-list-item>
    <game-set-dices v-if="slug" :slug="slug" />
    <dice-selector v-if="slug" :slug="slug" :open="isNew" />
  </v-card>
`