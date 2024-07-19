import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import router from "@/router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = createApp(App);
const pinia = createPinia();

const firebaseConfig = {
  apiKey: "AIzaSyBWeulARUVp8Bsb0fAVGeRMjmIOK9dhCsk",
  authDomain: "cartier-auth.firebaseapp.com",
  projectId: "cartier-auth",
  storageBucket: "cartier-auth.appspot.com",
  messagingSenderId: "865652755414",
  appId: "1:865652755414:web:89d157eaece7f309fd7277",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export { db };

app.use(pinia);
app.use(router);
app.use(Toast, {});

app.mount("#app");
