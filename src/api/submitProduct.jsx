import { storage, db } from "./api"
import { uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { addDoc, serverTimestamp, setDoc, collection, getDocs } from "firebase/firestore/lite"

export const submitProduct = async (props) => {
	const storageRef = ref(storage, `/images/${props.setType}/${props.nameFile}`)
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
					addDoc(collection(db, props.type), {
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
				}, 2000)
			})
		}
	)
}

export const editProduct = async (props) => {
	const storageRef = ref(storage, `/images/${props.setType}/${props.namefile}`)
	const uploadTask = uploadBytesResumable(storageRef, props.file)
	props.delFile == null
		? setTimeout(() => {
				try {
					setDoc(doc(db, props.setType, props.id), {
						file: props.file,
						name: props.setName,
						price: props.setPrice,
						description: props.setDescription,
						type: props.setType,
						timeStamp: serverTimestamp(),
					})
				} catch (e) {
					console.log("Error adding document: ", e)
				}
				setTimeout(() => {
					console.log("Document updated")
					window.location.reload()
				}, 2000)
		  }, [])
		: uploadTask.on(
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
							setDoc(doc(db, props.setType, props.id), {
								file: url,
								name: props.setName,
								price: props.setPrice,
								description: props.setDescription,
								type: props.setType,
								timeStamp: serverTimestamp(),
							})
							console.log("Written document")
						} catch (error) {
							console.log("Error adding document: ", error)
						}
						props.delFile == null
							? null
							: deleteObject(ref(storage, props.delFile))
									.then(() => {
										console.log("File deleted successfully")
									})
									.catch((erro) => {
										console.log(`Uh-oh, an ${erro} occurred!`)
									})
						console.log("Sent with success")
						setTimeout(() => {
							window.location.reload()
						}, 1000)
					})
				}
		  )
}

export const getDoc = async (props) => {
	const data = await getDocs(collection(db, props.colle))
	props.set(
		data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
	)
	// console.log(data)
}

import { query, where, limit, startAt, onSnapshot } from "firebase/firestore"
import { async } from "@firebase/util"
// , "5kqSpIeGW50Ww6oqt4zU"
export const Pages = async (props) => {
	const data = await getDocs(collection(db, props.colle))
	props.set(
		data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
	)
	// console.log(q)
}

export const Mask = (props) => {
	return (Number(props.mask.replace(/\D/g, "")) / 100).toLocaleString({
		style: "currency",
		currency: "BRL",
	})
}

export const MaskChange = (props) => {
	return props.mask
		.replace(/\D+/g, "")
		.replace(/(\d{1})(\d{2})$/, props.replace)
		.replace(/^([0-9]{1})([0-9]{3})/g, "$1.$2")
}
