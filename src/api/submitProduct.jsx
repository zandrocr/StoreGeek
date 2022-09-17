import { collectionRef, storage } from "./api"
import { addDoc, serverTimestamp } from "firebase/firestore/lite"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

export const upProduct = async (e) => {
	try {
		await addDoc(collectionRef, {
			file: e.url,
			name: e.name,
			price: e.price,
			description: e.description,
			type: e.type,
            timeStamp: serverTimestamp()
		})
		console.log("Written document")
	} catch (e) {
		console.log("Error adding document: ", e)
	}
}

export const submitProduct = async (props) => {
	const storageRef = ref(storage, `/images/${props.namefile}`)
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
				upProduct({
					url: url,
					name: props.name,
					price: props.price,
					description: props.description,
					type: props.type,
				})
				console.log("Sent with success")
				setTimeout(() => {
					window.location.reload()
				}, 1000)
			})
		}
	)
}
