import { storage, collectionRef, db } from "./api"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, serverTimestamp } from "firebase/firestore/lite"

export const submitProduct = async (props) => {
	const storageRef = ref(storage, `/images/${props.nameFile}`)
	const uploadTask = uploadBytesResumable(storageRef, props.file)

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			console.log("Upload is " + progress + "% done")
			switch (snapshot.state) {
				case "paused":
					console.log("Upload is paused")
					break
				case "running":
					console.log("Upload is running")
					break
			}
		},
		(error) => {
			console.log(error)
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((url) => {
				try {
					addDoc(collectionRef, {
						file: url,
						name: props.name,
						price: props.price,
						description: props.description,
						type: props.type,
						timeStamp: serverTimestamp(),
					})
                    console.log("Written document")
				} catch (e) {
					console.log("Error adding document: ", e)
				}
                console.log("Sent with success")
                setTimeout(() => {
					window.location.reload()
				}, 1000)
			})
		}
	)
}
