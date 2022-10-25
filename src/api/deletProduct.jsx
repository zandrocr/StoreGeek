import { collection, deleteDoc, doc } from "firebase/firestore/lite"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "./api"

export const delProduct = (props) => {
	deleteDoc(doc(collection(db, props.colle), props.id))
		.then(() => {
			console.log("Doc deleted successfully")
		})
		.catch((err) => {
			console.log(`Uh-oh, an ${err} occurred!`)
		})

	deleteObject(ref(storage, props.file))
		.then(() => {
			console.log("File deleted successfully")
			window.location.reload()
		})
		.catch((err) => {
			console.log(`Uh-oh, an ${err} occurred!`)
		})
}
