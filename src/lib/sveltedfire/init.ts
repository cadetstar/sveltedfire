import { initializeApp, type FirebaseOptions } from "firebase/app";

export const initFirebase = async (firebaseConfig: FirebaseOptions) => {
  await new Promise((res, rej) => {
    initializeApp(firebaseConfig)
    res(null);
  })
}