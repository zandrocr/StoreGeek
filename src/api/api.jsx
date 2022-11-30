import axios from "axios"
import { initializeApp } from "firebase/app"
// import firebase from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore/lite"
import { GoogleAuthProvider, getAuth } from "firebase/auth"

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

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)

export const storage = getStorage(app)

export const Api = axios.create({
	baseURL: "http://localhost:5000",
})

//api Loja Gee
// apiKey: "AIzaSyC2DZjl09Q7xEq8yvL3Xv5Y_gl2q3AxCN8",
// authDomain: "loja-gee.firebaseapp.com",
// databaseURL: "https://loja-gee-default-rtdb.firebaseio.com",
// projectId: "loja-gee",
// storageBucket: "loja-gee.appspot.com",
// messagingSenderId: "186625834053",
// appId: "1:186625834053:web:5239758eb808a963f2b72c",
// measurementId: "G-YBQN8WCY9T"

//api test
// apiKey: "AIzaSyC8YGyRkTz5wU30GA8zdxVk6rF6a6x-Gcs",
// authDomain: "teste-45c4f.firebaseapp.com",
// projectId: "teste-45c4f",
// storageBucket: "teste-45c4f.appspot.com",
// messagingSenderId: "330088277147",
// appId: "1:330088277147:web:1a770d9faeb16c37ec123e",
// measurementId: "G-4R4SS2ZVVC"

//api My Project
// apiKey: "AIzaSyBWksuD1zzduobZMAnzg3zG28LkblbVZZc",
// authDomain: "myproje-ba9a9.firebaseapp.com",
// projectId: "myproje-ba9a9",
// storageBucket: "myproje-ba9a9.appspot.com",
// messagingSenderId: "143595825547",
// appId: "1:143595825547:web:9af57d78dbe358d75a278e",
// measurementId: "G-RE154LE10V"
