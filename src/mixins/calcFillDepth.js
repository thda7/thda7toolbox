import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    methods: {
        reset: function(){
            this.diameter='';
            this.length = '';
            this.width = '';
            this.weight = '';
            this.density = '';
            this.Area = '';
            this.Volume = '';
            this.fillDepth = '';
            this.submitted = !this.submitted;
            this.show_chart = !this.show_chart
        },
        chart_toggle: function(){
            this.show_chart = !this.show_chart   
        },
        BuildChart: function (labels, values, chartTitle) {
            
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
                            text: 'Bulk Density [g/ml]',
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
                              text: 'Filling Depth [mm]',
                            }
                        }
                    }
                    /*scales: {
                        title: 'test',
                        
                    }*/

                    
                }
            });
            
        return [myChart]; 
        

        },
        calcFillDepth: function(shape){
            var Area = 1;
            console.log(shape)
            if (shape === 'round') {
                if (!this.diameter){
                    alert('Please enter the diameter!')
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
                Area = Math.PI/4*Math.pow(this.diameter,2); //[mm^2]
                console.log(Area);
                
            } else if (shape === 'oblong') {
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
                Area = this.length*this.width-(Math.pow(this.width,2)-Math.PI/4*Math.pow(this.width,2)); //[mm^2]
            }
            if (!this.submitted) {
                this.submitted = !this.submitted
            }
            if (this.show_chart) {
                this.show_chart = false
            }

            this.Area = Area;
            console.log(Area);
            console.log(this.Area);
            var m = this.weight; //[mg]
            var roh = this.density; //[g/ml = g/cm^3]
            var h = m/(Area*roh);

            var scale = [0.7,0.75,0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25,1.3];
            var density = [];
            var yval_h = [];
            
            var xval_roh = [];
            
            //var h_oblong_fixed = [];
            for (var i=0; i < scale.length; i++){
                density[i] = (scale[i]*roh);
                yval_h[i] = (m/(Area*density[i])).toFixed(2);
                xval_roh[i] = (density[i]).toFixed(2);
            }
            console.log(xval_roh)
            console.log(yval_h)
            this.xval = xval_roh;
            this.yval = yval_h;
            this.Area = Area.toFixed(2);
            this.fillDepth = h.toFixed(2);
            this.Volume = (Area*h).toFixed(2);
            
            return {
                

            } 

        },
    },
    computed: {
        
    }
}