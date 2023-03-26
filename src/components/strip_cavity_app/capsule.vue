<template>
  <v-container>
    <v-card
      class="d-flex justify-center mb-3"
      
      flat
      tile
    > 
      <p class="subheading grey--text text-uppercase"
      >Overview of common capsules:</p>
    </v-card>
    <v-card flat class="mx-auto mb-6" width="600px" >
      <v-simple-table>
        <template >
          <thead>
            <tr>
              <th class="text-left">
                Capsule Type
              </th>
              <th class="text-center">
                Capsule Diameter [mm]
              </th>
              <th class="text-right">
                Capsule Length [mm]
              </th>
              <th class="text-right">
                Capsule Volume [mm³]
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- TO-DO iteration "capsule in capsules" durch die arrays kriege ich nicht hin, daher habe ich das Array common_capsules mit Objekten bestueckt-->
            <tr
              v-for="(capsule) in common_capsules" 
                :key="capsule.type"
            >
              <td class="text-left">{{ capsule.type }}</td>            
            
              <td class="text-center">{{ capsule.diameter }}</td> 
           
              <td class="text-center">{{ capsule.length }}</td>
            
              <td class="text-center">{{ capsule.volume }}</td>
            </tr>


          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card
    class="d-flex justify-center align-center mb-6"
    color="white"
    flat
    height="300px"
    tile>
      <v-img
        
        max-width="300"
        src="../../assets/capsule.png"
      ></v-img>
      
      
    </v-card>
    
    


    <v-card
      class="d-flex justify-center mb-3"
      
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Please fill in the required data to calculate the Strip Pack's size:</p>
    </v-card>
    
    
    <v-card flat class="mx-auto mb-6" width="600px">
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
      <!-- TO-DO: 
        bei Auswahl in <v-select> wy.B. capsule.type = "000", wuerde ich gerne die dazugehoerigen capsule.length, capsule.diameter ueber den ausgewaehlten index in v-model="diameter" anzaigen 
        Das bekomme ich aber nur ueber calStripCavity.js durch klicken des buttons zur Aktivierung der Funktion calcStripCavity() hin
        Das selbe Problem habe ich in Dwelltime_app.vue-->

        <v-select v-model="selected_capsule"
          :items="capsules.type"
          label="Capsule Type"
        ></v-select>
      </v-card>
      <v-card v-if="selected_capsule == 'Custom'"
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="diameter"
          label="Capsule Diameter D"
          
          hide-details="auto"
          hint=""
          placeholder="Enter Capsule Diameter"
          suffix="[mm]"
          
        ></v-text-field>
      </v-card>
      <v-card v-if="selected_capsule == 'Custom'"
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model="length"
          label="Capsule Length L"
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
          label="Lanes (optional)"
          
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
      <v-btn large small text color="green lighten-3" v-on:click="calcStripCavity('capsule')" >
      
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
      <v-btn large small text color="green lighten-3"   v-on:click="calcStripCavity('capsule')">
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
        <v-text-field v-model.number="diameter" readonly
          label="Capsule Diameter D"
          
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
        <v-text-field v-model.number="length" readonly
          label="Capsule Length L"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>

      <v-card v-if="selected_capsule != 'Custom'"
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="volume" readonly
          label="Capsule Volume"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm³]"
        ></v-text-field>
      </v-card>
      
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <v-text-field v-model.number="CW" readonly
          label="Cavity Width CW"
          
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
        <v-text-field v-model.number="CL" readonly
          label="Cavity Length CL"
          
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
          label="Packsize Width PW"
          
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
        <v-text-field v-model.number="PL" readonly
          label="Packsize Length PL"
          
          hide-details="auto"
          hint=""
          placeholder="Please calculate"
          suffix="[mm]"
        ></v-text-field>
      </v-card>

      <v-card v-if="lanes != ''"
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
      length: '',
      volume: '',
      SEH: '',
      SEV: '',
      lanes: '',
      CW: '',
      CL: '',
      PW: '',
      PL: '',
      w_foil: '',
      shape: 'capsule', // QUESTION: wird fuer calcStripCavity in der if Schleife ueberprueft
      capsules: {
        type: ['000','00','0','1','2','3','4','5','Custom'],
        diameter: [9.91, 8.53, 7.65, 6.91, 6.35, 5.82, 5.31, 4.91],
        length: [26.14, 23.3, 21.7, 19.4, 18, 15.9, 14.3, 11.1],
        volume: [1.36, 0.95, 0.67, 0.48, 0.37, 0.27, 0.20, 0.13],
      },
      common_capsules: [
          { type: '000', diameter: '9.91', length: '26.14', volume: '1.36'},
          { type: '00', diameter: '8.53', length: '23.3', volume: '0.95'},
          { type: '0', diameter: '7.65', length: '21.7', volume: '0.67'},
          { type: '1', diameter: '6.91', length: '19.4', volume: '0.48'},
          { type: '2', diameter: '6.35', length: '18', volume: '0.37'},
          { type: '3', diameter: '5.82', length: '15.9', volume: '0.27'},
          { type: '4', diameter: '5.31', length: '14.3', volume: '0.20'},
          { type: '5', diameter: '4.91', length: '11.1', volume: '0.13'},
      ],
      selected_capsule: '',
      capsule_index: '',
    }
  },
  computed: {

  },
  mixins: [calcStripCavity],
  
} 
</script>


<style scoped>

</style>