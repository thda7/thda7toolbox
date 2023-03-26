<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <!--class="grey--text" makes the text grey-->
    <v-app-bar-title>
      <!--<v-icon icon="mdi-circle-slice-4" />-->

      THDA7's Toolbox
    </v-app-bar-title>
  </v-app-bar>


    <v-navigation-drawer v-model="drawer"> <!-- without app it would not work -->

<!-- ################ TODO ################ -->
<!-- ich bekomme eine list-item-group nicht hin -->
<!-- An folgende Struktur denke ich
- Dashboard
- Applications (bei click anzeigen/ausblenden der Apps)
    - App #1
    - App #2
    - App #3
- About
-->

            
        <v-card
            class="mx-auto"
            max-width="300"
            flat
        >
            <v-list>
                <v-list-item
                    active-color="primary"
                    variant="plain"
                    router to="/"
                >
                    <template v-slot:prepend>
                    <v-icon icon="mdi-home"></v-icon>
                    </template>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
                <v-list-item
                    active-color="primary"
                    variant="plain"
                    router to="/About"
                >
                    <template v-slot:prepend>
                    <v-icon icon="mdi-information-outline"></v-icon>
                    </template>
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list>
                <v-list-subheader>Applications</v-list-subheader>

                <v-list-item
                    v-for="(app, i) in apps"
                    :key="i"
                    :value="app"
                    router :to="app.route"
                    active-color="primary"
                    variant="plain"
                >
                    <template v-slot:prepend>
                    <v-icon :icon="app.icon"></v-icon>
                    </template>
                    
                    <v-list-item-title>{{app.text}}</v-list-item-title>
                    <!-- v-text="item.text"  <v-list-item-title v-text="item.text> caused error -->
                </v-list-item>
            </v-list>
        </v-card>

                     
    </v-navigation-drawer>


</template>

<script>
  export default{
    data(){
        return {
            drawer: false,
            apps: [
                { icon: 'mdi-pill', text: 'Fill Depth', route: '/applications/filldepth'},
                { icon: 'mdi-pill', text: 'Max Punch Force', route: '/applications/maxpunchforce'},
                { icon: 'mdi-pill', text: 'Dwell Time', route: '/applications/dwelltime'},
                //{ icon: 'mdi-filmstrip-box', text: 'Strip Cavity', route: '/applications/stripcavitysize'},
            ],
        }
    }
}
</script>
