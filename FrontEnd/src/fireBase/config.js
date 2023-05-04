import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWFTRDub71IT1KsB730T3YXRtnWSnkRL4",
  authDomain: "trello-fdada.firebaseapp.com",
  projectId: "trello-fdada",
  storageBucket: "trello-fdada.appspot.com",
  messagingSenderId: "319700912253",
  appId: "1:319700912253:web:74dd9b9ae3180d7ba60914",
  measurementId: "G-8S36NYXRZ7",
  // apiKey: "AIzaSyA-zYQW3_53651bj2GGLJLwiq6oScJl_SM",
  // authDomain: "fellox.firebaseapp.com",
  // projectId: "fellox",
  // storageBucket: "fellox.appspot.com",
  // messagingSenderId: "728392368372",
  // appId: "1:728392368372:web:de71d3236a3200544b1ea1",
  // measurementId: "G-DHEHSEHBV7"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
