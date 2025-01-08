import { createApp, defineAsyncComponent } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import syncAppComponents from '@/components/ui';

const BaseDialog = defineAsyncComponent(() =>
  import('@/components/ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(router);
app.use(store);

// Sync components
Object.keys(syncAppComponents).forEach((name) => {
  app.component(name, syncAppComponents[name]);
});
// Async components
app.component('BaseDialog', BaseDialog);

app.mount('#app');
