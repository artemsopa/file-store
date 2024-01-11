import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { togglesInit } from './directives/index';
import { pluginsInit } from './plugins';
import axiosInit from './interceptors/axios';

const app = createApp(App);

togglesInit(app);
pluginsInit(app);

app.use(store).use(router);

axiosInit(store, router);

app.mount('#app');
