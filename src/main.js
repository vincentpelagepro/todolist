import Vue from 'vue'
import App from './App.vue'

import MainTitle from './MainTitle';
import CardToDo from './CardToDo';

Vue.component('mainTitle', MainTitle);
Vue.component('cardToDo', CardToDo);

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
