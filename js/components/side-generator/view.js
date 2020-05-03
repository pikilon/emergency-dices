const block = 'side-generator'
const s =  {
  block,
  title: `${block}__title`,
  big: `${block}--big`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <v-card :class="['${s.block}', {['${s.big}']: processedSidesEllipsis.length > 5}]">
    <v-toolbar v-if="isNew" color="indigo" dark>
      <v-btn color="teal" fab dark small @click="$emit('addNewSide')" :disabled="isNewReady">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-card-title color="indigo" dark>
        <v-badge color="teal" :content="processedSides.length" >
          New sides
        </v-badge>
      </v-card-title>
    </v-toolbar>
    <v-toolbar v-else color="indigo" dark>
      <v-btn color="error" fab dark small @click="deleteSide">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-card-title color="indigo" dark>
        <v-badge color="teal" :content="processedSides.length" >
          {{sideTypeTitle}}
        </v-badge>
      </v-card-title>
    </v-toolbar>
    <v-card-text v-if="isNew">
    <v-autocomplete :items="sideTypesArray" v-model="sideType" item-text="label" item-value="value" dense
        label="Side type" />
    </v-card-text>
    <div class="${s.sides}">
      <dice-side v-for="(side, index) in processedSidesEllipsis" :key="index + side.content" :result="side.content"
        :color="side.color" />
    </div>
    <v-card-actions v-if="isInterval">
      <v-text-field v-model="min" label="Low bound" class="ma-2" type="number" :oninput="limitNumberChars" counter="4"/>
      <v-text-field v-model="max" label="High bound" class="ma-2" type="number" :oninput="limitNumberChars" counter="4" />
    </v-card-actions>
    <v-card-actions v-else>
      <v-text-field v-model="sideContent" :label="sideTypesMap[type].inputLabel" :rules="sideTypesMap[type].rules" :maxlength="sideTypesMap[type].maxlength" />
    </v-card-actions>
  </v-card>
`

export const css = /*css*/ `
  .${s.sides} {
    width: 600px;
    display: flex;
  }
  .${s.title} {

  }
  .${s.big} .${s.sides} > :nth-child(n+3) {
    position: relative;
    margin-left: -6em;
  }
    .${s.big} .${s.sides} > :nth-child(n+2):hover {
      z-index: 1;
    }

`
