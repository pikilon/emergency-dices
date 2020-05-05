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
    <v-container fluid class="d-flex justify-center">
      <router-view />
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">Pikilon &copy; 2020</span>
  </v-footer>
</v-app>
`

export const css = /*css*/`
  html, body {
    overflow-x: hidden;
  }

`