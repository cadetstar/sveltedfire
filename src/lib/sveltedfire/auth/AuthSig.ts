import { type User } from "firebase/auth"

export type AuthSig = {
  currentUser: User|null,
  signInWithGoogle: any,
  signOut: any,
  [k: string]: any
}