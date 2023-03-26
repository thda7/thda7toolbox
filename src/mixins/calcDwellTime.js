import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    methods: {
        submit: function(){
            
        },
        reset: function(){
            this.component = '',
            this.d_pitch = '',
            this.selected_punch = '',
            this.selected_press = '',
            this.selected_rpm = '',
            this.submitted = false,
            this.show_chart = false
        },
        chart_toggle: function(){
            this.show_chart = !this.show_chart
        },
        BuildChart2: function (labels, values, chartTitle, values2, chartTitle2, values3, chartTitle3) {
            
            var ctx = document.getElementById("myChart").getContext('2d');
            
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels, // Our labels
                    datasets: [{
                        label: chartTitle, // Name the series
                        data: values, // Our values
                        backgroundColor: 'rgba(0, 0, 0, 1)' /* [ // Specify custom colors
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)' ]*/
                        ,
                        borderColor: 'rgba(66, 185, 131, 1)' /*[ // Add custom color borders
                            'rgba(66, 185, 131, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ]*/,
                        borderWidth: 1, // Specify bar border width
                        fill: false
                    },
                    {
                        label: chartTitle2, // Name the series
                        data: values2, // Our values
                        backgroundColor: 'rgba(0, 0, 0, 1)' /* [ // Specify custom colors
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)' ]*/
                        ,
                        borderColor: 'rgba(255, 0, 0)' /*[ // Add custom color borders
                            'rgba(66, 185, 131, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ]*/,
                        borderWidth: 1, // Specify bar border width
                        fill: false
                    },
                    {
                        label: chartTitle3, // Name the series
                        data: values3, // Our values
                        backgroundColor: 'rgba(0, 0, 0, 1)' /* [ // Specify custom colors
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)' ]*/
                        ,
                        borderColor: 'rgba(0, 0, 255)' /*[ // Add custom color borders
                            'rgba(66, 185, 131, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ]*/,
                        borderWidth: 1, // Specify bar border width
                        fill: false
                    }]
                },
                options: {
                    responsive: true, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
                    scales: {
                        x: {
                            display: true,
                            title: {
                              display: true,
                              text: 'Revolutions [1/min]',
                              //color: '#911',
                              /*font: {
                                family: 'Comic Sans MS',
                                size: 20,
                                weight: 'bold',
                                lineHeight: 1.2,
                              },
                              padding: {top: 20, left: 0, right: 0, bottom: 0} */
                            }
                          },
                          y: {
                              display: true,
                              title: {
                                display: true,
                                text: 'Dwell time [ms]',
                              }
                          },
                    }
                    
                }
            });
        return myChart;
        },
        calcDwellTime: function(){
            console.log("Fire calcDwellTime")
            
            if (!this.selected_punch){
                alert('Please choose the punch type!');
                console.log("select punch");
                return false
                //console.log("if 2")
            } else if (this.selected_punch === "EU-B") {
                console.log("p1");
                var d_flat = this.punches.d_flat[0];
                var punch_index = 0
                //console.log("if 3")
            } else if (this.selected_punch === "EU-D") {
                console.log("p2");
                d_flat = this.punches.d_flat[1];
                punch_index = 1
                //console.log("if 4")
            } else if (this.selected_punch === "KILIAN 24/41") {
                console.log("p3");
                d_flat = this.punches.d_flat[2];
                punch_index = 2
                //console.log("if 5")
            }
            console.log(this.d_flat);
            if (!this.selected_press){
                alert('Please choose the press type!')
                console.log("if 1");
                return false
                
            } else if (this.selected_press === "K420"){
                console.log("pr1");
                var d_pitch = this.tablet_presses.d_pitch[0];
                var press_index = 0
            } else if (this.selected_press === "K720"){
                console.log("pr2");
                d_pitch = this.tablet_presses.d_pitch[1];
                press_index = 1
            } else if (this.selected_press === "KTP 420 X"){
                d_pitch = this.tablet_presses.d_pitch[2];
                press_index = 2
            } else if (this.selected_press === "KTP 590 X"){
                d_pitch = this.tablet_presses.d_pitch[3];
                press_index = 3
            } else if (this.selected_press === "KTP 720 X"){
                d_pitch = this.tablet_presses.d_pitch[4];
                press_index = 4
            } else {
                d_pitch = this.d_pitch;
                this.tablet_presses.d_pitch[5] = d_pitch;
                press_index = 5
            }
            if (this.selected_rpm < 10 || this.selected_rpm > 120 ) {
                alert('Please enter a value between 10 and 120 rpm!')
                //console.log("if 1");
                return false
            }         
            //console.log("Finished two if loops")
            //console.log('Pitch:' + d_pitch)
            //console.log('Flat:' + d_flat)
            this.d_pitch = d_pitch;
            this.d_flat = d_flat;
            //console.log('Pitch:' + this.d_pitch)
            //console.log('Flat:' + this.d_flat)
            
            var selected_rpm = this.selected_rpm;
            var t_dwell = [];

            //console.log('Before t_dwell loop')
            //console.log('Length tablet.presses_type:' + this.tablet_presses.type.length)
            
            for (i = 0; i < this.tablet_presses.type.length; i++) {
                d_pitch = this.tablet_presses.d_pitch[i];
                //console.log('inner t_dwell loop' + i +'- t_dwell[i]:' + d_pitch);
                //console.log(selected_rpm);
                t_dwell[i] = (60000*d_flat/(Math.PI*selected_rpm*d_pitch)).toFixed(2); //[ms]
                
            }
            //console.log('d_pitch:' + d_pitch)
            //console.log('this._pitch:' + this.d_pitch)
            //console.log('t_Dwell:' + t_dwell)
            this.t_dwell = t_dwell;
               //console.log(this.t_dwell)

            ///////////////////////////
            // cancel submit and canel show_chart
            if (!this.submitted) {
                this.submitted = !this.submitted
            }
            if (this.show_chart) {
                this.show_chart = false
            }
            ///////////////////////////
            
            
            var xval = [10,20,30,40,50,60,70,80,90,100,110,120];
            //console.log(xval)
            var yval_B = [];
            var yval_D = [];
            var yval_K = [];
            
            //console.log('Last loop');
            //var h_oblong_fixed = [];
            for (var i=0; i < xval.length; i++){   
                d_pitch = this.tablet_presses.d_pitch[press_index];
                yval_B[i] = (60000*this.punches.d_flat[0]/(Math.PI*xval[i]*d_pitch)).toFixed(2); //[ms]
                yval_D[i] = (60000*this.punches.d_flat[1]/(Math.PI*xval[i]*d_pitch)).toFixed(2); //[ms]
                yval_K[i] = (60000*this.punches.d_flat[2]/(Math.PI*xval[i]*d_pitch)).toFixed(2); //[ms]

                
            }
            this.xval = xval;
            this.yval_B = yval_B;
            this.yval_D = yval_D;
            this.yval_K = yval_K;
            
           
            this.press_index = press_index;
            this.punch_index = punch_index;
            console.log('runs without problems')
            return {
                
                
            } 
        },
    },

    computed: {
        
    }
}