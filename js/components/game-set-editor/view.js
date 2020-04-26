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

          <v-btn small tile class="ma-2" color="red" @click="deleteCurrent" dark><v-icon left>mdi-delete</v-icon> Delete</v-btn>
          <v-btn small tile class="ma-2" :disabled="!titleHasChanged" color="indigo" :dark="titleHasChanged" @click="createCopy"><v-icon left>mdi-content-copy</v-icon>Save as copy</v-btn>
          <v-btn small tile class="ma-2" :disabled="!titleHasChanged" color="success" :dark="titleHasChanged" @click="changeTitle"><v-icon left>mdi-pencil</v-icon> Update Title</v-btn>

      </v-list-item-content>
    </v-list-item>
    <game-set-dices v-if="slug" :slug="slug" />
    <dice-selector v-if="slug" :slug="slug" :open="isNew" />
  </v-card>
`