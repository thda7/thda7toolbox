<template>
  <!-- INFO: -->
  <!-- fillcam_app.vue hat zwei children - oblong.vue und round.vue gebindet via components-->

  
  <div class="filldepth">
    
    <h1 class="d-flex justify-center mb-3 subheading grey--text">Strip Pack Size Calculator</h1>
      <!-- in <v-card> :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'" -->

<!-- TO-DO: Die Uberschrift <h1> haette ich gerne in der bar integriert, so dass ich beim runterscrollen noch weiss, in welchem tool ich mich befinde -->
<!-- das gilt auch fuer die anderen apps (fillcam, dwelltime, etc.) -->

     <v-card
      class="d-flex justify-center mb-2"
      flat
      tile
      >
      <v-btn large v-on:click="component='round_flat'" small text color="grey">
        <v-icon >mdi-circle-outline</v-icon>
        <span>Round - flat</span>
      </v-btn>
      <v-btn large v-on:click="component='round_convex'" small text color="grey">
        <v-icon >mdi-circle-outline</v-icon>
        <span>Round - convex</span>
      </v-btn>
      <v-btn large v-on:click="component='capsule'" small text color="grey">
        <v-icon >mdi-pill</v-icon>
        <span>Capsules</span>
      </v-btn>
      </v-card>
      <v-card
      class="d-flex justify-center mb-6"
      color="white"
      flat
      tile
      >
        <component v-bind:is="component"></component>
      </v-card>
      
      
      
    
    
  </div>
</template>

<script>
import roundFlat from '../components/strip_cavity_app/round_flat';
import roundConvex from '../components/strip_cavity_app/round_convex';
import Capsule from '../components/strip_cavity_app/capsule';
//import Applications from '../views/Applications.vue';
import calcFillDepth from '../mixins/calcFillDepth';

export default {
    components: {
      'round_flat': roundFlat,
      'round_convex': roundConvex,
      'capsule': Capsule,

      //'applications-header': Applications,
    },
    data(){
        return {
            component: '',
            submitted: false,
            
        }
    },
    mixins: [calcFillDepth]
    
}
</script>