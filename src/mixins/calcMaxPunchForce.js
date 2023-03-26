  export default {

    methods: {
      //submit() {
      //  this.submitted = !this.submitted;
      //  this.$refs.observer.validate()
      //},
      calcFmax: function(){
        if (!this.shape){
          alert('Please choose the shape of the tablet')
          return false
        }
        if (!this.diameter){
          alert('Please enter the diameter in [mm]')
          return false
        }
        if (!this.submitted){
          this.submitted = !this.submitted;
        }
        var Acalc = Math.PI/4*Math.pow(this.diameter,2);
        this.Acalc = Acalc.toFixed(2);

        var factor = [0.8,0.7,0.7,0.45,0.3];
        var Force = [];
        for (var i=0; i < factor.length; i++) {
          Force[i] = factor[i]*Acalc;
        }
        
        if (this.shape === 'Flat (biplane)') {
          return this.Fcalc = Force[0].toFixed(2)
        } else if (this.shape === 'Flat (with facet)') {
          return this.Fcalc = Force[1].toFixed(2)
        } else if (this.shape === 'Convex') {
          return this.Fcalc = Force[2].toFixed(2)
        } else if (this.shape === 'Dragée, convex') {
          return this.Fcalc = Force[3].toFixed(2)
        } else if (this.shape === 'Spheric') {
          return this.Fcalc = Force[4].toFixed(2)
        }

      },
      /*submit: function(){
            this.submitted = !this.submitted
            
      }, */
      reset: function(){
        this.share = '';
        this.diameter = '';
        this.Acalc = '';
        this.Fcalc = '';
        this.submitted = !this.submitted;
      },
    },
  }
