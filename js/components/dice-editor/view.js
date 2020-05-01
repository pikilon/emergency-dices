const block = 'dice-editor'
const s =  {
  block,
  totalSidesTitle: `${block}__totalSidesTitle`,
  sideGroupsTitle: `${block}__sideGroupsTitle`,
  sides: `${block}__sides`,
}

export const template = /*html*/`
  <div class="${s.block}">
    <v-text-field v-model="titleSlug" label="Dice Title" :rules="rules.title"/>
    <h2 class="title ${s.totalSidesTitle}">Total sides: {{processedDice.sides.length}}</h2>
    <div class="${s.sides}">
      <h2 class="title ${s.sideGroupsTitle}">Sides groups</h2>
      <side-generator v-for="(sideGroup, index) in sideGroups"
        :key="sideGroup.color+sideGroup.content"
        :content="sideGroup.content"
        :type="sideGroup.type"
        :color="sideGroup.color"
        :index="index"
        @setSide="setSide"
      />
    </div>
  </div>
`



