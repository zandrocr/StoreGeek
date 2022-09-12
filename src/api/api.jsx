import { initializeApp } from "firebase/app"
import { collection, getFirestore } from "firebase/firestore/lite"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA_mz-Oh46emfE8FCDaTrKInRKr5e0HQT4",
	authDomain: "store-3c940.firebaseapp.com",
	databaseURL: "https://store-3c940-default-rtdb.firebaseio.com",
	projectId: "store-3c940",
	storageBucket: "store-3c940.appspot.com",
	messagingSenderId: "971547880241",
	appId: "1:971547880241:web:ad47c4c1c8ba4b0a9cde10",
	measurementId: "G-Y7ZGWBSWTE",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const collectionRef = collection(db, "product")
