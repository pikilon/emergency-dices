export const template = /*html*/`
  <v-card flat tile width="400">
    <v-toolbar color="teal">
      <v-toolbar-title class="white--text">{{editorTitle}}</v-toolbar-title>
    </v-toolbar>
    <v-list-item >
      <v-list-item-content>
        <v-text-field v-model="title" label="Game set title" :hint="slugHint" :rules="titleRules" />
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="isNew">
      <v-list-item-content>
        <v-btn tile :disabled="!titleHasChanged" color="success" :dark="titleHasChanged"
          @click="newGameSet">
          <v-icon left>mdi-pencil</v-icon>
          Create Game Set
        </v-btn>

      </v-list-item-content>
    </v-list-item>
    <div v-else>
      <v-list-item>
        <v-list-item-content class="text-center">

            <v-btn small tile class="ma-2" color="red" @click="deleteCurrent" dark><v-icon left>mdi-delete</v-icon> Delete</v-btn>
            <v-btn small tile class="ma-2" :disabled="!titleHasChanged" color="indigo" :dark="titleHasChanged" @click="newGameSet"><v-icon left>mdi-content-copy</v-icon>Save as copy</v-btn>
            <v-btn small tile class="ma-2" :disabled="!titleHasChanged" color="success" :dark="titleHasChanged" @click="changeTitle"><v-icon left>mdi-pencil</v-icon> Update Title</v-btn>

        </v-list-item-content>
      </v-list-item>
      <game-set-dices :slug="slug" />
      <dice-selector :slug="slug" :open="addDiceOpen" />
    </div>
  </v-card>
`