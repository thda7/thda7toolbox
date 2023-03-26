
export default {
    methods: {
        reset: function(){
            this.diameter='';
            this.thickness = '';
            this.radius = '';
            this.SEH = '';
            this.SEV = '';
            this.lanes = '';
            this.CW = '';
            this.CL = '';
            this.PW = '';
            this.PL = '';

            this.submitted = !this.submitted;
            this.show_chart = !this.show_chart
        },
        chart_toggle: function(){
            this.show_chart = !this.show_chart   
        },
        
        calcStripCavity: function(shape){
            var diameter = this.diameter;
            var thickness = this.thickness;
            var SEH = this.SEH;
            var SEV = this.SEV;
            var radius = this.radius;
            var lanes = this.lanes;
            console.log(shape)
            if (shape === 'round_flat') {
                
                if (!this.diameter){
                    alert('Please enter the diameter!')
                    return false
                }
                if (!this.thickness){
                    alert('Please enter the weight!')
                    return false
                }
                if (!this.SEH){
                    alert('Please enter the Sealing Edge (horizontal)!')
                    return false
                }
                if (!this.SEV){
                    alert('Please enter the Sealing Edge (vertical)!')
                    return false
                }
                console.log(radius);
                var CW = +thickness/0.354 + +diameter; //[mm^2] preprend + to string to produce a number
                var CL = CW;

                var PW = CW+2*SEH;
                var PL = CL+2*SEV;
                console.log(SEH);
                console.log(SEV);
                console.log(PW);
                console.log(PL);
                var w_foil = +lanes * PW;
                console.log(w_foil);
                
            } else if (shape === 'round_convex') {
                
                if (!this.diameter){
                    alert('Please enter the diameter!')
                    return false
                }
                if (!this.thickness){
                    alert('Please enter the weight!')
                    return false
                }
                if (!this.thickness){
                    alert('Please enter the radius!')
                    return false
                }
                if (!this.SEH){
                    alert('Please enter the Sealing Edge (horizontal)!')
                    return false
                }
                if (!this.SEV){
                    alert('Please enter the Sealing Edge (vertical)!')
                    return false
                }
                console.log(radius);
                if (0.6676 * +radius > +diameter) {
                    console.log('if1')
                    console.log(Math.pow(+radius,2))
                    console.log(Math.pow(+diameter,2))
                    console.log(Math.pow(+radius,2) - Math.pow(+diameter/2,2))
                    console.log((Math.sqrt((Math.pow(+radius,2))-(Math.pow(+diameter/2,2)))))
                    CW = +diameter +(2*( ( (+thickness/2) - +radius +(Math.sqrt((Math.pow(+radius,2))-(Math.pow(+diameter/2,2)))) ) )/0.354);
                    CL = CW;  
                    PW = CW+2*SEH;
                    PL = CL+2*SEV;
                    console.log(SEH);
                    console.log(SEV);
                    console.log(PW);
                    console.log(PL);
                    w_foil = +lanes * PW;
                    console.log(w_foil);

                } else {
                    console.log('if2')
                    CW = (((((+thickness/2) - +radius*0.0573)/0.354)+(+radius*0.3338))*2);
                    CL = CW;  
                    PW = CW+2*SEH;
                    PL = CL+2*SEV;
                    console.log(SEH);
                    console.log(SEV);
                    console.log(PW);
                    console.log(PL);
                    w_foil = +lanes * PW;
                    console.log(w_foil);
                }

            } else if (shape === 'capsule') {
                if (this.selected_capsule === "000"){
                    console.log("cap 000");
                    var c_diameter = this.capsules.diameter[0];
                    var c_length = this.capsules.length[0];
                    var c_volume = this.capsules.volume[0];
                    var capsule_index = 0
                } else if (this.selected_capsule === "00"){
                    console.log("cap 00");
                    c_diameter = this.capsules.diameter[1];
                    c_length = this.capsules.length[1];
                    c_volume = this.capsules.volume[1];
                    capsule_index = 1
                } else if (this.selected_capsule === "0"){
                    console.log("cap 0");
                    c_diameter = this.capsules.diameter[2];
                    c_length = this.capsules.length[2];
                    c_volume = this.capsules.volume[2];
                    capsule_index = 2
                } else if (this.selected_capsule === "1"){
                    console.log("cap 1");
                    c_diameter = this.capsules.diameter[3];
                    c_length = this.capsules.length[3];
                    c_volume = this.capsules.volume[3];
                    capsule_index = 3
                } else if (this.selected_capsule === "2"){
                    console.log("cap 2");
                    c_diameter = this.capsules.diameter[4];
                    c_length = this.capsules.length[4];
                    c_volume = this.capsules.volume[4];
                    capsule_index = 4
                } else if (this.selected_capsule === "3"){
                    console.log("cap 3");
                    c_diameter = this.capsules.diameter[5];
                    c_length = this.capsules.length[5];
                    c_volume = this.capsules.volume[5];
                    capsule_index = 5
                } else if (this.selected_capsule === "4"){
                    console.log("cap 4");
                    c_diameter = this.capsules.diameter[6];
                    c_length = this.capsules.length[6];
                    c_volume = this.capsules.volume[6];
                    capsule_index = 6
                } else if (this.selected_capsule === "5"){
                    console.log("cap 5");
                    c_diameter = this.capsules.diameter[7];
                    c_length = this.capsules.length[7];
                    c_volume = this.capsules.volume[7];
                    capsule_index = 7
                } else {
                    c_diameter = this.diameter;
                    if (!this.diameter){
                        alert('Please enter the diameter!')
                        return false
                    }
                    c_length = this.length;
                    if (!this.length){
                        alert('Please enter the length!')
                        return false
                    }
                    this.capsules.diameter[8] = c_diameter;
                    this.capsules.length[8] = c_length;
                    //this.capsules.volume[8] = c_volume;
                    capsule_index = 8
                }
                   
                
                
                if (!this.SEH){
                    alert('Please enter the Sealing Edge (horizontal)!')
                    return false
                }
                if (!this.SEV){
                    alert('Please enter the Sealing Edge (vertical)!')
                    return false
                }
                
                
                    CW = +c_diameter/0.338;
                    CL = (+c_length - +c_diameter)+(+c_diameter/0.3338);  
                    PW = CW+2*SEH;
                    PL = CL+2*SEV;
                    console.log(SEH);
                    console.log(SEV);
                    console.log(PW);
                    console.log(PL);
                    w_foil = +lanes * PW;
                    console.log(w_foil);

               
                
                
            }
            /*else if (shape === 'oblong') {
                if (!this.length){
                    alert('Please enter the length!')
                    return false
                }
                if (!this.width){
                    alert('Please enter the width!')
                    return false
                }
                if (!this.weight){
                    alert('Please enter the weight!')
                    return false
                }
                if (!this.density){
                    alert('Please enter the density!')
                    return false
                }
                var Area = this.length*this.width-(Math.pow(this.width,2)-Math.PI/4*Math.pow(this.width,2)); //[mm^2]
            } */
            this.CW = Math.ceil(CW);
            this.CL = Math.ceil(CL);
            this.PW = Math.ceil(PW);
            this.PL = Math.ceil(PL);
            this.w_foil = lanes*Math.ceil(PW);
            this.diameter = c_diameter;
            this.length = c_length;

            if (!this.submitted) {
                this.submitted = !this.submitted
            }
            this.capsule_index = capsule_index;
            this.volume = c_volume;

            
            return {


            } 

        },
        
    },
    computed: {
        
    }
}