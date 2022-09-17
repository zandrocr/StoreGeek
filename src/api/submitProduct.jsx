import { collectionRef, db, storage } from "./api"
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore/lite"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"


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

export const editProduct = async (props) => {
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
				try {
					setDoc(doc(db, "product", props.id), {
						file: url,
						name: props.setName,
						price: props.setPrice,
						description: props.setDescription,
						type: props.setSelect,
						timeStamp: serverTimestamp(),
					})
					console.log("Written document")
				} catch (error) {
					console.log("Error adding document: ", error)
				}
				console.log("Sent with success")
				// setTimeout(() => {
				// 	window.location.reload()
				// }, 1000)
			})
		}
	)
}
