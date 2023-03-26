<!-- eslint-disable vue/multi-word-component-names -->
<template>


      <h1 class="d-flex justify-center mb-3 subheading grey--text">Applications</h1>

      <v-card v-for="(app, i) in apps" :key="i"
      
      flat
      background-color="primary"
    max-width="400"
    class="mx-auto"
    :to="app.route"
    >
        
          
          <v-btn 
          
          class="d-flex mx-auto mb-2"
          color="grey darken-4"
            min-width="300"
            
            size="x-large" 
            variant="outlined"
            
          >
            <v-icon
              :icon="app.icon"
              size="large"
              class="mx-auto"
              start
            />

            {{app.text}}
          </v-btn>
          <div>
        <v-img v-if="app.id == 1"
                  width="50"
                  src="../assets/apps/FillDepth.png"
                  class="mx-auto"
                ></v-img>
                <v-img v-if="app.id == 2"
                  width="100"
                  src="../assets/apps/MaxCompForce.png"
                  class="mx-auto"
                ></v-img>
                <v-img v-if="app.id == 3"
                  width="100"
                  src="../assets/apps/dwelltime.png"
                  class="mx-auto"
                ></v-img>
              </div>
              <div class="py-6"></div>
      </v-card>
      <!-- 
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
                    -->
                    
                    <!-- v-text="item.text"  <v-list-item-title v-text="item.text> caused error 
                </v-list-item> -->
              

</template>

<script>
//import Appbar from '../components/Appbar.vue';

    export default{
    data(){
        return {
            drawer: false,
            component: 'Fill Depth',
            //myapps: this.$refs.appbar.apps,
            apps: [
                { id: 1, icon: 'mdi-pill', text: 'Fill Depth', route: '/applications/filldepth', src: '../assets/apps/FillDepth.png', colors: "green"},
                { id: 2, icon: 'mdi-pill', text: 'Max Punch Force', route: '/applications/maxpunchforce', src: '../assets/apps/MaxCompForce.png', colors: "blue"},
                { id: 3, icon: 'mdi-pill', text: 'Dwell Time', route: '/applications/dwelltime', src: '../assets/apps/dwelltime.png', colors: "orange"},
                //{ icon: 'mdi-filmstrip-box', text: 'Strip Cavity', route: '/applications/stripcavitysize'},
                
            ],
            colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
            ],
            slides: [
              'First',
              'Second',
              'Third',
              'Fourth',
              'Fifth',
            ], 
      }
    },
  }
</script>
