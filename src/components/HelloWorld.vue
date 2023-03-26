<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/THDA7.svg"
        
      />
      <div class="py-2" />
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
      <div class="py-2" />
      <h1 class="text-h2 font-weight-bold">THDA7's Toolbox</h1>

      <div class="py-10" />
<!--  mb-3  @click="drawer = !drawer" 
to="/applications/"

-->   

<v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            to="/applications/" 
            min-width="228"
            rel="noopener noreferrer"
            size="x-large" 
            variant="flat"
            
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              
              start
            />

            Applications
          </v-btn>
        </v-col>
      </v-row>
      <div class="py-6" />
      <v-row class="d-flex align-center justify-center">
        
          <v-btn
            href="https://www.linkedin.com/in/thda7/"
            min-width="16" 
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-linkedin"
              size="large"
              start
            />

            <!-- Components -->
          </v-btn>
        
          <v-btn
            href="https://facebook.com/thda7"
            min-width="16"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-facebook"
              size="large"
              start
            />
          </v-btn>

          <v-btn
            href="https://www.instagram.com/thda7/"
            min-width="16"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-instagram"
              size="large"
              start
            />
          </v-btn>
        
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
//import Drawer from '../layouts/default/AppBar.vue';

  export default{
    components: {
      //Drawer,
    },
    data(){
        return {
            //drawer: false,
            //data: this.$refs.Drawer.data
        }
    }
}
</script>
