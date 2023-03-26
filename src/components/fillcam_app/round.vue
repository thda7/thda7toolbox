<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card
    class="d-flex justify-center align-center mb-6"
    
    flat
    height="150px"
    tile>
      <v-img
        max-height="150"
        max-width="120"
        src="../../assets/rnd.png"
      ></v-img>
      
      
    </v-card>
    
    <v-card
      class="d-flex justify-center mb-3"
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Please fill in the required data to calculate the fill depth:</p>
      <!--<h3 class="d-flex justify-center mb-3" text-uppercase>
        Please fill in the required data to calculate the fill depth:
      </h3>-->
    </v-card>
    
<!-- ################ TODO ################ -->
<!-- 1) ich bekomme v-model="" nicht dynamisch gebindet, daher hardgecodet. Ich habe die props parameters erstellt (s. data()) -->
<!-- L31-48: rendern geht wunderbar, aber v-model wird nicht gebindet.-->
    <!-- <v-card flat class="mx-auto mb-6" width="600px">
      <v-card v-for="parameter in parameters" :key="parameter"
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field :v-model="parameter.model"
          :label="parameter.label"
          
          hide-details="auto"
          :hint="parameter.hint"
          :placeholder="parameter.placeholder"
          :suffix="parameter.unit"
          
        ></v-text-field>
      </v-card>
    </v-card> -->
    
    <!--<v-card flat >-->
      <v-card 
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field v-model="diameter"
          label="Tablet Diameter D"
          
          hide-details="auto"
          hint="Typically between 2 - 25 mm"
          placeholder="Enter Tablet Diameter"
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
        <v-text-field v-model="weight"
          label="Tablet Weight m"
          
          hide-details="auto"
          hint="Typically between 200 and 4000 mg"
          placeholder="Enter Tablet Weight"
          suffix="[mg]"
          
        ></v-text-field>
      </v-card>
      <v-card
      max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
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
    <!--</v-card>-->
    
    <v-card v-if="!submitted" class="d-flex justify-center mb-3" 
    flat
    tile>
    <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn large small text color="green lighten-3"   v-on:click="calcFillDepth('round')" @keyup.enter="calcFillDepth('oblong')">
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
    <!-- ############################# SNACKBAR END ############################# -->
    </v-card>

    
    <v-card v-if="submitted" class="d-flex justify-center mb-2"
    flat
    tile>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn large title="btn_Recalculate" small text color="green lighten-3"   v-on:click="calcFillDepth('round')">
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

    
    <v-card v-if="submitted" flat class="mx-auto mb-2">
      <v-card
      max-width="600"
        flat class="mx-auto mb-2"
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
        flat class="mx-auto mb-2"
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
    
      <!-- ############################# CHART #############################-->
      
      
      <v-card flat v-if="show_chart == false && submitted == true"  class="d-flex justify-center mb-2" >

<!-- ################ TODO ################ -->
<!-- 1) L199: ich kann die functions BuildChart() und chart_toggle() nur in der combination v-on:click.once und v-on:click feuern, nicht kombinieren (s. L199) -->
<!-- 2) Ich erhalte den Fehler "vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in v-on handler: "TypeError: Cannot read property 'getContext' of null"", trotzdem berechnet und zeigt Chart.js den Chart an -->

      
          <v-btn large small text color="green lighten-3"  v-on:click.once="BuildChart(xval,yval,'Filling Depth as a function of the bulk density')" v-on:click="chart_toggle">
          <!-- <v-btn large small text color="green lighten-3"  v-on:click.once="BuildChart(xval,yval,'Fill Depth as a function of the bulk density')" v-on:click="chart_toggle"> -->
            <!-- <v-btn large small text color="green lighten-3"  v-on:click.once="BuildChart(xval,yval,'Fill Depth as a function of the bulk density');chart_toggle()"  > -->
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
          >Filling Depth as a function of the bulk denisty:</p>
        </v-card> 
        
        <v-card flat v-if="show_chart" class="mx-auto mb-6" height="350px" max-width="600">
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
      rules: {
        diameter: [
          //val => val < 10 || `I don't believe you!`,
          val => (val || '').length > 0 || 'This field is required'
        ],
        weight: [val => (val || '').length > 0 || 'This field is required'],
        density: [val => (val || '').length > 0 || 'This field is required'],
      },
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
      Area: '',
      Volume: '',
      fillDepth: '',
      weight: '',
      density: '',
      shape: 'round', // TODO: wird fuer calcFillDepth.js in der if Schleife ueberprueft
      xval: [],
      yval: [],
      parameters: [
        { model: 'diameter', label: "Tablet Diameter D:", placeholder: "Please enter the diameter", unit: "[mm]"},
        { model: 'weight', label: "Weight m:", placeholder: "Please enter the weight", unit: "[mg]"},
        { model: 'density', label: "Bulk Density ρ", placeholder: "Please enter the density", unit: "[g/ml]"},
      ],
      //sparkline props
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
      value2: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
      
      //sparkline props end
      chartData: {

      },
      
    }
  },
  computed: {
    
  },
  mixins: [calcFillDepth],
  
} 
</script>


<style scoped>

</style>