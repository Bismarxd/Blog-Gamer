import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import firebaseConfig from "./config";
import {getFirestore} from "firebase/firestore"

import {getStorage} from '@firebase/storage'


class Firebase {
  constructor() {

     const app = initializeApp(firebaseConfig);   
    this.auth = getAuth(app);
    this.db = getFirestore(app)
    this.storage = getStorage(app)
  }

  //Registra un usuario
  async registrar(nombre, email, password){

      const nuevoUsuario = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return await updateProfile(nuevoUsuario.user, {
        displayName: nombre,
      });

  }

  //iniciar Sesión
  async login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //Cerrar sesion del usuario
  async cerrarSesion() {
    await signOut(this.auth);
  }
}

const firebase = new Firebase();

export default firebase;
