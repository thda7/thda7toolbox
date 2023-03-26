/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

//import vuetify from './plugins/vuetify';
//import Chartkick from 'vue-chartkick';
//import Chart from 'chart.js';
import VueChartkick from 'vue-chartkick'
//import 'chartkick/chart.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

//Vue.use(Chartkick.use(Chart))

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')


app.use(VueChartkick)
//app.use(Chart)