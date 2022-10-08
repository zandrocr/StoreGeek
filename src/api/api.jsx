import axios from "axios"
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { collection, getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
	apiKey: "AIzaSyC2DZjl09Q7xEq8yvL3Xv5Y_gl2q3AxCN8",
	authDomain: "loja-gee.firebaseapp.com",
	databaseURL: "https://loja-gee-default-rtdb.firebaseio.com",
	projectId: "loja-gee",
	storageBucket: "loja-gee.appspot.com",
	messagingSenderId: "186625834053",
	appId: "1:186625834053:web:5239758eb808a963f2b72c",
	measurementId: "G-YBQN8WCY9T",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const collectionRef = collection(db, "Caneca")

export const Api = axios.create({
	baseURL: "http://localhost:5000",
})

//api principal
// apiKey: "AIzaSyC2DZjl09Q7xEq8yvL3Xv5Y_gl2q3AxCN8",
// authDomain: "loja-gee.firebaseapp.com",
// databaseURL: "https://loja-gee-default-rtdb.firebaseio.com",
// projectId: "loja-gee",
// storageBucket: "loja-gee.appspot.com",
// messagingSenderId: "186625834053",
// appId: "1:186625834053:web:5239758eb808a963f2b72c",
// measurementId: "G-YBQN8WCY9T"

//api secundaria
// apiKey: "AIzaSyC8YGyRkTz5wU30GA8zdxVk6rF6a6x-Gcs",
// authDomain: "teste-45c4f.firebaseapp.com",
// projectId: "teste-45c4f",
// storageBucket: "teste-45c4f.appspot.com",
// messagingSenderId: "330088277147",
// appId: "1:330088277147:web:1a770d9faeb16c37ec123e",
// measurementId: "G-4R4SS2ZVVC"
