import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import appComponents from '@/components/ui';

const app = createApp(App);

app.use(router);
app.use(store);

Object.keys(appComponents).forEach((name) => {
  app.component(name, appComponents[name]);
});

app.mount('#app');
