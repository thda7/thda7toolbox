<template>
  <!-- INFO: -->
  <!-- fillcam_app.vue hat zwei children - oblong.vue und round.vue gebindet via components-->

  
  <div class="filldepth">
    
    <h1 class="d-flex justify-center mb-3 subheading ">Filling Depth</h1>
      <!-- in <v-card> :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'" -->
      <v-card
      class="d-flex justify-center mb-2"
      flat
      tile
      >
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn title="btn_round" large v-on:click="component='round_tablet'" small text color="grey darken-4" variant="outlined">
            <v-icon >mdi-circle-outline</v-icon>
            <span>Round Tablet</span>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn title="btn_oblong" large v-on:click="component='oblong_tablet'" small text color="grey darken-4" variant="outlined">
            <v-icon >mdi-ellipse-outline</v-icon>
            <span>Oblong Tablet</span>
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
      <v-card
      class="d-flex justify-center mb-6"
      
      flat
      tile
      >
      <component v-bind:is="component"></component>
    
    <textarea v-if="submitted" name="textarea" id="" cols="30" rows="10">NOTES: This calculation is based</textarea>
      </v-card>
      
  </div>
</template>



<script>
import roundTablet from '../components/fillcam_app/round.vue';
import oblongTablet from '../components/fillcam_app/oblong.vue';
//import Applications from '../views/Applications.vue';
//import calcFillDepth from '../mixins/calcFillDepth';
//import { Chart, registerables } from 'chart.js';
//Chart.register(...registerables);

export default {
    components: {
      'round_tablet': roundTablet,
      'oblong_tablet': oblongTablet,
      //'applications-header': Applications,
    },
    data(){
        return {
            component: 'roundTablet',
            submitted: false,
            //roundTablet: true,
            
        }
    },
    //mixins: [calcFillDepth]
    
}
</script>