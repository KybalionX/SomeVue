import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(router);
app.mount("#app");
