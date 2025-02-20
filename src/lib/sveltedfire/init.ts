import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { setLogLevel } from "firebase/firestore";

export const initFirebase = async (firebaseConfig: FirebaseOptions) => {
  await new Promise((res, rej) => {
    // setLogLevel('debug')
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const unsubscribe = auth.onAuthStateChanged(_ => {
      unsubscribe()
      res(null)
    })
  })
}