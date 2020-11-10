import { SIGN_IN, SIGN_IN_ERROR } from "../types";
import firebase from "../../config/config";

export function signInWithEmailAndPassword(userData: any) {
  return (dispatch: any) =>
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then((resp) => dispatch({ type: SIGN_IN, payload: resp }))
          .catch((err) => dispatch({ type: SIGN_IN_ERROR, payload: err }))
      )
      .catch((er) => console.log(er));
}
