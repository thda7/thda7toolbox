<!-- eslint-disable vue/multi-word-component-names -->
<template>


      <h1 class="d-flex justify-center mb-3 subheading grey--text">Applications</h1>

  <v-card
    flat
    outlined
    max-width="600"
    class="mx-auto"
  >
  <!--
  <v-img height="300" src="../assets/apps/dwelltime.png">

  </v-img>
  -->
  <!--
  <v-carousel
      :continuous="true"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-square"
      height="300"
    >
    <v-carousel-item
      v-for="(app,i) in apps"
      :key="i"
      :src="app.src" 
      cover
    >
    <div class="d-flex fill-height justify-center align-center">
      <v-icon :icon="app.icon" mb-3 size="x-large" align-center>Test</v-icon>
    </div>
  </v-carousel-item>
  </v-carousel>
  -->
    
    <v-carousel
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-square"
      height="300"
      max-width="600"
    >
      <v-carousel-item
        v-for="(app, i) in apps"
        :key="app.id"
      >
        <v-card
          :color="colors[i]"
          
          height="100%"
          tile
          :to="app.route"
        >    
          <div class="d-flex fill-height justify-center align-center">
            <v-icon :icon="app.icon" mb-3 size="x-large"></v-icon>
            <div class="text-h3">
              {{ app.text }} Calculator
              
            </div>
            <div>
    <v-img v-if="app.id == 1"
                  width="267"
                  src="../assets/apps/FillDepth.png"
                ></v-img>
                <v-img v-if="app.id == 2"
                  width="267"
                  src="../assets/apps/MaxCompForce.png"
                ></v-img>
                <v-img v-if="app.id == 3"
                  width="267"
                  src="../assets/apps/dwelltime.png"
                ></v-img>
              </div>
            
          </div>
          
        </v-card>
        
      </v-carousel-item>
      
    </v-carousel>
    
  </v-card>

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
                { id: 1, icon: 'mdi-pill', text: 'Fill Depth', route: '/applications/filldepth', src: '../assets/dragee'},
                { id: 2, icon: 'mdi-pill', text: 'Max Punch Force', route: '/applications/maxpunchforce', src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
                { id: 3, icon: 'mdi-pill', text: 'Dwell Time', route: '/applications/dwelltime', src: '../assets/apps/dwelltime.png'},
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
