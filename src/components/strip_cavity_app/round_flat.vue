<template>
  <v-container>
    <v-card
    class="d-flex justify-center align-center mb-6"
    color="white"
    flat
    height="200px"
    tile>
      <v-img
        
        max-width="300"
        src="../../assets/round_flat.png"
      ></v-img>
      
      
    </v-card>
    
    <v-card
      class="d-flex justify-center mb-3"
      
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Please fill in the required data to calculate the cavity's size:</p>
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
    
    <v-card flat class="mx-auto mb-6" width="600px">
      <v-card
        class="pa-2 caption"
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
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="thickness"
          label="Tablet Thickness T"
          m
          hide-details="auto"
          hint=""
          placeholder="Enter Tablet Thickness"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="SEH"
          label="Sealing Edge (horizontal) SEH"
          
          hide-details="auto"
          hint="Typically 5 mm"
          placeholder="Enter Sealing edge (horizontal)"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="SEV"
          label="Sealing Edge (vertical) SEV"
          
          hide-details="auto"
          hint="Typically 5 mm"
          placeholder="Enter Sealing edge (vertical)"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="lanes"
          label="Lanes"
          
          hide-details="auto"
          hint="Depending on the max. foil width"
          placeholder="Enter amount of lanes"
          suffix="[-]"
          
        ></v-text-field>
      </v-card>
    </v-card>
    
    <v-card v-if="!submitted" class="d-flex justify-center mb-6"
    flat
    tile>
      <v-btn large small text color="green lighten-3"   v-on:click="calcStripCavity('round_flat')" >
      
        <v-icon>mdi-calculator-variant</v-icon>
        <span>Calculate</span>
      </v-btn>
      
<!-- ################ TODO ################ -->
<!-- 1) ich haette gerne \n in meiner Snackbar, er rendert \n zwar, stellt aber keine newline dar, siehe prop: text -->
      <!-- ############################# SNACKBAR ############################# -->
    <v-btn
      large small text
      color="red darken-2"
      @click="snackbar = true"
    >
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>

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

    <v-card v-if="submitted" class="d-flex justify-center mb-6"
    
    flat
    tile>
      <v-btn large small text color="green lighten-3"   v-on:click="calcStripCavity('round_flat')">
        <v-icon>mdi-calculator-variant</v-icon>
        <span>Recalculate</span>
      </v-btn>
      <v-btn large small text color="red lighten-3"   v-on:click="reset">
        <v-icon>mdi-close-circle</v-icon>
        <span>Reset</span>
      </v-btn>
    </v-card>
    
    <v-card v-if="submitted" flat class="mx-auto mb-6" width="600px">
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="CW" readonly
          label="Cavity Width CW and Length CL"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="PW" readonly
          label="Packsize Width PW and Length PL"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="w_foil" readonly
          label="Total Foil Width"
          
          hide-details="auto"
          hint="This calculation does not consider any foil width restrictions"
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>
      
    </v-card>
    
      <!-- ############################# Output #############################-->
      

      

<!-- ################ TODO ################ -->
<!-- 1) L194 - 233: bei v-sparkline verstehe ich nicht, wie ich die y-Achse beschriften kann, daher nutze ich noch Chart.js -->
<!-- 2) Hast du vllt ein Template fuer mich? Oder was nutzt du? -->


      <!-- ############################# SPARKLINE #############################-->
      
      <!-- <v-card
        class="mx-auto text-center"
        color="grey"
        dark
        max-width="600"
      >
        <v-card-text>
          <div class="body-1 font-weight-thick">
            Filling Depth as a function of the bulk density:
          </div>
        </v-card-text>
        <v-card-text>
          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="value"
              
              color="rgba(255, 255, 255, .7)"
              height="100"
              padding="20"
              stroke-linecap="round"
              smooth
            >
              <template v-slot:label="item">
                ${{ item.value }}
              </template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn
            block
            text
          >
            Go to Report
          </v-btn>
        </v-card-actions>
      </v-card> -->
      <!-- ############################# -->
      <!-- SPARKLINE END -->
      <!-- ############################# -->
        <v-card v-if="show_chart == true && submitted == true"
          class="d-flex justify-center mb-3"
          
          flat
          tile
        >
          <p class="subheading grey--text text-uppercase"
          >Filling Depth as a function of the bulk denisty:</p>
        </v-card> 
        
        <v-card flat v-if="show_chart" class="mx-auto mb-6" width="600px" height="350px">
          <canvas id="myChart"></canvas>
        </v-card>
        

  </v-container>
</template>

<script>
import calcStripCavity from '../../mixins/calcStripCavity';

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
      text: `Please update.`,
      // Snackbar
      show_chart: false,
      submitted: false,
      diameter: '',
      thickness: '',
      SEH: '',
      SEV: '',
      lanes: '',
      CW: '',
      CL: '',
      PW: '',
      PL: '',
      w_foil: '',
      shape: 'round_flat', // QUESTION: wird fuer calcStripCavity in der if Schleife ueberprueft
      
    }
  },
  computed: {

  },
  mixins: [calcStripCavity],
  
} 
</script>


<style scoped>

</style>