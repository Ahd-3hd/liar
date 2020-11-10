import { SIGN_IN } from "../types";
import firebase from "../../config/config";
const db = firebase.firestore();

export function signInWithEmailAndPassword(userData: any) {
  return (dispatch: any) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((resp) => dispatch({ type: SIGN_IN, payload: resp }))
      .catch((err) => dispatch({ type: SIGN_IN, payload: err }));
}
