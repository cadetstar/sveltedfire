import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const signInWithGoogle = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
}