import { SIDES_TYPES } from "../../constants/SIDE_TYPES.js"

const block = 'dice-editor'

export const template = /*html*/`
  <v-container fluid>
    <v-text-field v-model="titleSlug" label="Dice Title" :rules="rules.title" />
    <v-container>
      <v-row class="controls" justify="space-between">
        <v-btn color="secondary" v-if="!isNew" :disabled="!titleChanged">
          <v-icon left>mdi-content-save-all</v-icon> Save a copy
        </v-btn>
        <v-btn color="primary" @click="save" :disabled="!isTitleValid">
          <v-icon left>mdi-content-save</v-icon> Save
        </v-btn>
      </v-row>
    </v-container>
    <div v-if="!isNew">
      <h2 v-if="sides.length" class="title">
        <v-badge color="teal" :content="processedDice.sides.length">
          Sides
        </v-badge>
      </h2>
      <v-col>
        <side-generator isNew :content="newSide.content" :type="newSide.type" @addNewSide="addNewSide"
          @setNewSide="setNewSide" />
      </v-col>
      <div class="d-flex flex-column-reverse">
        <v-col v-for="(sideGroup, index) in sideGroups" :key="index">
          <side-generator :content="sideGroup.content" :type="sideGroup.type" :color="sideGroup.color" :index="index"
            @setSide="setSide" @deleteSide="deleteSide" />
        </v-col>
      </div>
    </div>
  </v-container>
`



