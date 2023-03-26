<template>
  <div class="dwell-time">
    <h1 class="d-flex justify-center mb-3 subheading grey--text">Dwell Time</h1>
    <v-card
      class="d-flex justify-center mb-3"
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Definition of Dwell Time:</p>
    </v-card>
    <v-card
    class="d-flex justify-center align-center mb-6"
    
    flat
    tile>
      <v-img
        max-height="250"
        max-width="500"
        src="../assets/dwelltime.png"
      ></v-img>
      
      
    </v-card>
    
    <v-card
      class="d-flex justify-center mb-3"
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Calculate the Dwell Time [ms]:</p>
    </v-card>

    
      <v-card 
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <!-- <select class="t-middle" v-model="shape" style="width: 100%">
          <option v-for="shape_select in shapes" v-bind:key="shape_select">{{ shape_select }}</option>
        </select> -->
        <v-select v-model="selected_punch"
          :items="punches.type"
          label="Punch Type"
        ></v-select>
      </v-card>
      <v-card 
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <!-- <select class="t-middle" v-model="shape" style="width: 100%">
          <option v-for="shape_select in shapes" v-bind:key="shape_select">{{ shape_select }}</option>
        </select> -->
        <v-select v-model="selected_press"
          :items="tablet_presses.type"
          label="Press Type"
        ></v-select>
        
      </v-card>
      <v-card
      max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field v-if="selected_press == 'Custom'" v-model.number="d_pitch"
          label="Pitch Diameter"
          hide-details="auto"
          hint="To be inquired from the tablet press manufacturer"
          placeholder="Enter Pitch Diameter"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      
      <v-card 
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field  v-model="selected_rpm"
          label="Revolutions"
          hide-details="auto"
          hint="Typically between 10 - 100 rpm"
          placeholder="Enter revolutions"
          suffix="[1/min]"
        ></v-text-field>
        <v-card-text>
          <v-slider
            v-model="selected_rpm"
            step="1"
            label="RPM"
            min="10"
            max="120"
          ></v-slider>
        </v-card-text>
      </v-card>
      
<!-- ################### -->

    <v-card v-if="!submitted" class="d-flex justify-center mb-3"
    flat
    tile>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn large small text color="green lighten-3"   v-on:click="calcDwellTime" >
            <v-icon>mdi-calculator-variant</v-icon>
            <span>Calculate</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="submitted" class="d-flex justify-center mb-3"
    flat
    tile>
      <v-row class="d-flex align-center justify-center">
          <v-col cols="auto">
            <v-btn large title="btn_Recalculate" small text color="green lighten-3" v-on:click="calcDwellTime">
              <v-icon>mdi-calculator-variant</v-icon>
              <span>Recalculate</span>
            </v-btn>
          </v-col>
          <v-col cols="auto"> 
            <v-btn large small text color="red lighten-3"   v-on:click="reset">
              <v-icon>mdi-close-circle</v-icon>
              <span>Reset</span>
            </v-btn>
          </v-col>
      </v-row>
    </v-card>
<!-- ################### -->

    <v-card v-if="submitted" flat class="mx-auto mb-2">
      <v-card v-if="selected_press != 'Custom'"
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
      <!-- press_index und punch_index kommen aus calcDwellTime.js-->
        <v-text-field  v-model="tablet_presses.d_pitch[press_index]" readonly
          label="Pitch Circle Diameter"
          hide-details="auto"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      <v-card
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field  v-model="punches.d_flat[punch_index]" readonly
          label="Flat Punch Diameter"
          
          hide-details="auto"
          hint="Typically between 3 - 20 mm"
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      <v-card
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field v-model="t_dwell[press_index]" readonly
          label="Dwell Time" 
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[ms]"
        ></v-text-field>
      </v-card>
    </v-card>
    <!-- ############################# -->
      <!-- CHART -->
      <!-- ############################# -->
      <v-card flat v-if="show_chart == false && submitted == true"  class="d-flex justify-center mb-6" >
        <v-btn large small text color="green lighten-3"  v-on:click="chart_toggle" v-on:click.once="BuildChart2(xval,yval_B,'@ EU-B',yval_D,'@ EU-D',yval_K,'@ KILIAN 24/41')" >
          <v-icon>mdi-chart-line</v-icon>
          <span>Show Chart</span>
        </v-btn>
      </v-card>
      <v-card flat v-if="show_chart == true && submitted == true"  class="d-flex justify-center mb-6  " >
        <v-btn large small text color="red lighten-3" v-on:click="chart_toggle" >
          <v-icon>mdi-chart-line</v-icon>
          <span>Hide Chart</span>
        </v-btn>
      </v-card>
      <v-card v-if="show_chart == true && submitted == true"
        class="d-flex justify-center mb-2"
        flat
        tile
      >
        <p class="subheading grey--text text-uppercase"
        >Comparison of Dwell Times for different punch types:</p>
      </v-card> 
      
      <v-card v-if="show_chart && submitted" class="mx-auto mb-6" max-width="600px" height="350px">
        <canvas id="myChart"></canvas>
      </v-card>
    

    
    
    
  </div>
</template>

<script>


import DwellTime from '../mixins/calcDwellTime';
 


export default {
    components: {
      
    },
    methods: {
      
    },
    computed:{
      
    },
    mixins: [DwellTime],
    data(){
      return {
          component: '',
          show_chart: false,
          punch_index: null,
          press_index: null,
          d_pitch: '',
          d_flat: '',
          selected_punch: '',
          selected_press: '',
          selected_rpm: null,
          submitted: false,
          index: null,
          t_dwell: [],
          xval: [],
          yval_B: [],
          yval_D: [],
          yval_K: [],
          punches: {
              type: ['EU-B','EU-D','KILIAN 24/41'],
              d_flat: [9.65, 18.13, 27]
            
          },
          tablet_presses: { 
              type: ['K420', 'K720', 'KTP 420 X', 'KTP 590 X', 'KTP 720 X','Custom'],
              d_pitch: [416,712,416,594,712],
              sides: ['Single-rotary','Double-rotary','Single-rotary','Single-rotary','Double-rotary'],
            
            },  
          /*punches: [
            {
              type: 'EU-B',
              d_flat: 9.65,
            
            },
            {
              type: 'EU-D',
              d_flat: 18.13,
            },
            {
              type: 'KILIAN 24/41',
              d_flat: 27,
            },
            
          ],
          tablet_presses: [
            
            { 
              type: 'K420',
              d_pitch: 416,
              sides: 'Single-rotary',
            
            }, 
            {
              type: 'K720',
              d_pitch: 712,
              sides: 'Double-rotary',
            },
            {
              type: 'KTP 420 X',
              d_pitch: 416,
              sides: 'Single-rotary',
            }, 
            {
              type: 'KTP 590 X',
              d_pitch: 594,
              sides: 'Single-rotary',
            },
            {
              type: 'KTP 720 X',
              d_pitch: 712,
              sides: 'Double-rotary',
            },
            {
              type: 'Custom',
            },
          ]*/
        }
    },
    
}
</script>

<style scoped>

</style>