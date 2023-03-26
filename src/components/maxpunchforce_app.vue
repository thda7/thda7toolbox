<template>
  <div class="maxpunchforce">
    <h1 class="d-flex justify-center mb-3 subheading grey--text">Maximum Punch Force</h1> 
    
    <v-card
      class="d-flex justify-center mb-3"
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Overview of common tablet geometries:</p>
    </v-card>
    
    <v-card flat class="mx-auto mb-6" max-width="600px" >
      <v-table>
        
          <thead>
            <tr>
              <th colspan="2" class="text-left">
                Tablet Shape
              </th>
              <th class="text-center">
                Limitations
              </th>
              <th class="text-right">
                Max. Pressure
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in forcedata"
                :key="data.name"
            >
              <td class="text-left">{{ data.name }}</td>

              <td>
<!-- ################ TODO ################ -->
<!-- 1) Dynamic binding funktioniert weder bei <v-img> noch bei <img>, daher hardgecodet mit v-if und index-->
                
                <!-- Folgendes habe ich versucht:
                
                <v-img
                  max-height="150"
                  max-width="120"
                  :src="data.img_src"
                ></v-img>
                <div>
                <img :src="data.img_src" alt="failed"> 
                </div>

                -->
                <v-img v-if="index == 0"
                  width="50"
                  src="../assets/flat.png"
                ></v-img>
                <v-img v-if="index == 1"
                  
                  max-width="70"
                  src="../assets/facet.png"
                ></v-img>
                <v-img v-if="index == 2"
                  
                  max-width="70"
                  src="../assets/convex.png"
                ></v-img>
                <v-img v-if="index == 3"
                  
                  max-width="70"
                  src="../assets/dragee.png"
                ></v-img>
<!-- ################ TODO ################ -->
<!-- 1) L76: justify-center does not work, daher manuell ueber d-flex mx-2 und my-2-->
                <v-img v-if="index == 4"
                  class="d-flex mx-2 my-2"
                  max-width="50"
                  src="../assets/spheric.png"
                ></v-img>
              </td>
              
                <td class="text-center">{{ data.limit }}</td>
                
                <td class="text-right">{{ data.Pmax }}</td>
                
            </tr>


          </tbody>
        
      </v-table>
    </v-card>
    <v-card
      class="d-flex justify-center mb-3"
      
      flat
      tile
    >
      <p class="subheading grey--text text-uppercase"
      >Calculate the Max. Compaction Force [kN]:</p>
    </v-card>
    
    <v-card flat class="mx-auto mb-6" max-width="600px">
      <v-card
        class="pa-2 caption"
        outlined
        dense
        tile
      >
        <!-- <select class="t-middle" v-model="shape" style="width: 100%">
          <option v-for="shape_select in shapes" v-bind:key="shape_select">{{ shape_select }}</option>
        </select> -->
        <v-select v-model="shape"
          :items="shapes"
          label="Tablet Shape"
        ></v-select>
      </v-card>
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
    </v-card>
    
    <v-card v-if="!submitted" class="d-flex justify-center mb-6" 
    flat
    tile>
    <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn large small text color="green lighten-3"   v-on:click="calcFmax" >
            <v-icon>mdi-calculator-variant</v-icon>
            <span>Calculate</span>
          </v-btn>
        </v-col>
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
          <v-btn large small text color="green lighten-3"   v-on:click="calcFmax" >
            <v-icon>mdi-calculator-variant</v-icon>
            <span>Recalculate</span>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn  large small text color="red lighten-3"   v-on:click="reset" >
            <v-icon>mdi-close-circle</v-icon>
            <span>Reset</span>
          </v-btn>
        </v-col> 
      </v-row>
    </v-card>

    

    <v-card v-if="submitted" flat class="mx-auto mb-2" > 
      <v-card
      max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field v-model="Fcalc"
          label="Max. Compaction Force F_max"
          hint="The limit on most common tablet presses is 100 kN"
          hide-details="auto"
          suffix="[kN]"
          readonly
        ></v-text-field>
      </v-card>
      <v-card
        max-width="600"
        flat class="mx-auto mb-2"
        outlined
        dense
        tile
      >
        <v-text-field v-model="Acalc"
          label="Cross Section A"
          
          hide-details="auto"
          suffix="[mm²]"
          readonly
        ></v-text-field>
        
      </v-card>
    </v-card>
  </div>


</template>

<script>
//import Applications from '../views/Applications.vue';
import MaxPunchForce from '../mixins/calcMaxPunchForce';
//import Validation from '../mixins/validation'

  export default {
    components: {
      //'applications-header': Applications,
    },
    methods: {
      getPic(index) {
      return '../assets/' + this.image_src[index] + '.png';
      },
      getPic2() {
      return '../assets/' + this.forcedata.img_src + '.png';
      },
      getPic3(index){
        return this.forcedata.img_src[index];
      }
    },
    data () {
      return {
        // Snackbar props
        multiLine: true,
        snackbar: false,
        text: `The calculated maximum compaction force depends on the punch material's quality and the punch's condition. It serves as a guideline if no indication has been given by the punch supplier.
        The punch supplier himself shall be able to indicate the maximum applicable compaction force.`,
        // Snackbar
        diameter: '',
        shape: '',
        Fcalc: '',
        Acalc: '',
        submitted: false,
        shapes: ['Flat (biplane)', 'Flat (with facet)', 'Convex', 'Dragée, convex', 'Spheric'],
        tablet_shapes: ['flat', 'facet', 'convex', 'dragee', 'spheric' ],
        forcedata: [
          
          {
            name: 'Flat (biplane)',
            shape: 'Flat (biplane)',
            Pmax: '0.80 kN/mm²',
            unit: '[kN]',
            value: [5.7,10,23,40,63,90,123,161,204,251],
            image_src: ['flat','test','test','test','test'],
            img_src: '../assets/flat.png'
          },
          {
            name: 'Flat (with facet)',
            shape: 'Flat (with facet)',
            Pmax: '0.70 kN/mm²',
            unit: '[kN]',
            value: [4.9,8.8,20,35,55,79,108,141,178,220],
            image_src: 'facet',
            img_src: '../assets/facet.png'
          },
          {
            name: 'Convex',
            limit: '(r = 1.5 - 2.0*D)',
            shape: 'Convex',
            Pmax: '0.70 kN/mm²',
            unit: '[kN]',
            value: [4.9,8.8,20,35,55,79,108,141,178,220],
            image_src: 'convex',
            img_src: '../assets/convex.png'
          },
          {
            name: 'Dragée, convex',
            limit: '(r = 0.7 - 0.9*D)',
            shape: 'Dragée, convex',
            Pmax: '0.45 kN/mm²',
            unit: '[kN]',
            value: [3.2,5.7,13,23,35,51,69,90,115,141],
            image_src: 'dragee',
            img_src: '../assets/dragee.png'
          },
          {
            name: 'Spheric',
            shape: 'Spheric',
            Pmax: '0.30 kN/mm²',
            unit: '[kN]',
            value: [2.1,3.8,8.5,15,24,34,46,60,76,94],
            image_src: 'spheric',
            img_src: '../assets/spheric.png'
          },
        ],
      }
    }, 
    //mixins: [Maxpunchforce,Validation],
    mixins: [MaxPunchForce]
  }
</script>

<style scoped>

</style>
