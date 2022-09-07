import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Games from './components/Games.vue';
import GameInfo from './components/GameInfo.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: "", component: Games},
    { path: '/showgame',
      component: GameInfo,
      children: [
        {
          name: "showgame",
          path: '/showgame/:id',
          component: GameInfo,
          props: true,
        }
      ]
    }
  ],
  mode: "history",
});

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
