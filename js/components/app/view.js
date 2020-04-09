export const template = /*html*/
`
<v-app id="inspire">
  <v-navigation-drawer v-model="drawer" app>
    <navigation />
  </v-navigation-drawer>

  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>{{title}}</v-toolbar-title>
  </v-app-bar>

  <v-content>
    <v-container fluid>



    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; 2019</span>
  </v-footer>
</v-app>
`
/*
      <collection v-if="collectionSlug" :slug="collectionSlug" />
      <newCollection v-else/>
*/