<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
<!-- ################ TODO ################ -->
<!-- Prinzipiell wie round.vue -->
<!-- Eventuell koennte ich den Content mit dem chart auch in den vater fillcam_app.vue kombinieren, da, bis auf die zu kalkulieren Werte, gleich -->
<!-- zur Unterscheidung bei der Kalkulation verwende ich unterschiedliche inputs calcFillDepth(round) und (oblong) -->

    <v-container>
    <v-card
    class="d-flex justify-center align-center mb-6"
    
    flat
    height="150px"
    tile
    >
      <v-img
        max-height="150"
        max-width="190"
        src="../../assets/obl.png"
      ></v-img>
      
      
    </v-card>
    
    <v-card
      class="d-flex justify-center mb-3"
      
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Please fill in the required data to calculate the fill depth:</p>
    </v-card>
    
    <v-card flat class="mx-auto mb-2"
    max-width="600"
        outlined
        dense
        tile>
      
        <v-text-field v-model="length"
          label="Tablet Length L"
          
          hide-details="auto"
          hint="Typically between 6 and 25 mm"
          placeholder="Enter Tablet Length"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      <v-card
        flat class="mx-auto mb-2"
        max-width="600"
        outlined
        dense
        tile>
        <v-text-field v-model="width"
          label="Tablet Width W"
          
          hide-details="auto"
          hint="Typically between 3 - 15 mm"
          placeholder="Enter Tablet Width"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      <v-card flat class="mx-auto mb-2"
      max-width="600"
        outlined
        dense
        tile>
        <v-text-field v-model="weight"
          label="Tablet Weight m"
          
          hide-details="auto"
          hint="Typically between 200 and 4000 mg"
          placeholder="Enter Tablet Weight"
          suffix="[mg]"
          
        ></v-text-field>
      </v-card>
      <v-card flat class="mx-auto mb-2"
      max-width="600"
        outlined
        dense
        tile>
      <!-- :rules="rules.density"
          required -->
        <v-text-field v-model="density"
          label="Bulk Density ρ"
          
          hide-details="auto"
          hint="Typically between 0.5 and 1 g/ml"
          placeholder="Enter Bulk Density"
          suffix="[g/ml]"
          
        ></v-text-field>
      </v-card>
    
    <v-card v-if="!submitted" class="d-flex justify-center mb-3"
    flat
    tile>
    <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          
        <v-btn large small text color="green lighten-3"   v-on:click="calcFillDepth('oblong')" @keyup.enter="calcFillDepth('oblong')">
      
        <v-icon>mdi-calculator-variant</v-icon>
        <span>Calculate</span>
      </v-btn>
     </v-col>

<!-- ################ TODO ################ -->
<!-- 1) ich haette gerne \n in meiner Snackbar, er rendert \n zwar, stellt aber keine newline dar, siehe prop: text -->
      <!-- ############################# SNACKBAR ############################# -->
        <v-col cols="auto">
          <v-btn
          large small text
          color="red darken-2"
          @click="snackbar = true"
          >
          <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          </v-col>
      </v-row>

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-card>

    <v-card v-if="submitted" class="d-flex justify-center mb-6"
    
    flat
    tile>
      <v-row class="d-flex align-center justify-center">
          <v-col cols="auto">
            <v-btn large small text color="green lighten-3"   v-on:click="calcFillDepth('oblong')">
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
    
    <v-card v-if="submitted" flat class="mx-auto mb-6" max-width="600px">
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="fillDepth" readonly
          label="Filling Depth h"
          
          hide-details="auto"
          hint="Typically between 3 - 20 mm"
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      <v-card
      max-width="600"
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="Area" readonly
          label="Cross Section A"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm²]"
        ></v-text-field>
      </v-card>
    </v-card>
    
      
      <!-- ############################# -->
      <!-- CHART -->
      <!-- ############################# -->
      <v-card flat v-if="show_chart == false && submitted == true"  class="d-flex justify-center mb-6" max-width="600">
        <v-btn large small text color="green lighten-3"  v-on:click.once="BuildChart(xval,yval,'Fill Depth as a function of the bulk density')" v-on:click="chart_toggle" >
          <v-icon>mdi-chart-line</v-icon>
          <span>Show Chart</span>
        </v-btn>
      </v-card>
      <v-card flat v-if="show_chart == true && submitted == true"  class="d-flex justify-center mb-6" >
        <v-btn large small text color="red lighten-3" v-on:click="chart_toggle" >
          <v-icon>mdi-chart-line</v-icon>
          <span>Hide Chart</span>
        </v-btn>
      </v-card>
        <v-card v-if="show_chart == true && submitted == true"
          class="d-flex justify-center mb-3"
          flat
          tile
        >
          <p class="subheading grey--text text-uppercase"
          >Filling Depth as a function of the bulk denisty:</p>
        </v-card> 
        
        <v-card flat v-if="show_chart" class="mx-auto mb-6" max-width="600px" height="350px">
          <canvas id="myChart"></canvas>
        </v-card>
      

  </v-container>
  
</template>

<script>
import calcFillDepth from '../../mixins/calcFillDepth';

export default {
  methods: {

  },
  data(){
    return {
      // Snackbar props
      multiLine: true,
      snackbar: false,
      text: `The calculated values are theoretical and do consider the tablet to be flat. \n
      Neither a convex shape, breaking line nor facet has been considered.
      The computed values do serve as a base line and give an indication only. A manual measurement of the bulk density leads to high fluctuations in calculating the filling depth.`,
      // Snackbar
      show_chart: false,
      submitted: false,
      diameter: '',
      length: '',
      width: '',
      Area: '',
      weight: '',
      density: '',
      fillDepth: '',
      shape: 'oblong',
      chartData: {
        
      }
    }
  },
  computed: {

  },
  mixins: [calcFillDepth],
} 
</script>

<style scoped>
.chart-container {
    width: 500px;
    height:250px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: center;
}
.table-container {
    width: 600px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: center;
}
.box { 
  height: 135px;
  background:rgba(255, 255, 255, 0);

  display:flex;
  justify-content:center;
  align-items:center;
}
.note{
  font-size: small;
  color: red;
  border: red;
  border-color: red;
  border-radius: 20px;
  border: 2px solid red;
  width: 250px;
  padding: 10px;
  
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: center;
    text-align: justify;
  
}
</style>
