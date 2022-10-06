import { storage, db, Api } from "./api"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore/lite"
import { useEffect } from "react"

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
	// const storageRef = ref(storage, `/images/${props.namefile}`)
	// const uploadTask = uploadBytesResumable(storageRef, props.file)

	// console.log(props.setName)

	try {
		setDoc(doc(db, props.setType, props.id), {
			file: props.file,
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

	// uploadTask.on(
	// 	"state_changed",
	// 	(snapshot) => {
	// 		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
	// 		console.log("Upload is " + progress + "% done")
	// 		switch (snapshot.state) {
	// 			case "paused":
	// 				console.log("Upload is paused")
	// 				break
	// 			case "running":
	// 				console.log("Upload is running")
	// 				break
	// 		}
	// 	},
	// 	(error) => {
	// 		console.log(error)
	// 	},
	// 	() => {
	// 		getDownloadURL(uploadTask.snapshot.ref).then((url) => {
	// 			try {
	// 				setDoc(doc(db, props.setType, props.id), {
	// 					file: url,
	// 					name: props.setName,
	// 					price: props.setPrice,
	// 					description: props.setDescription,
	// 					type: props.setType,
	// 					timeStamp: serverTimestamp(),
	// 				})
	// 				console.log("Written document")
	// 			} catch (error) {
	// 				console.log("Error adding document: ", error)
	// 			}
	// 			props.delFile == null
	// 				? null
	// 				: deleteObject(ref(storage, props.delFile))
	// 						.then(() => {
	// 							console.log("File deleted successfully")
	// 						})
	// 						.catch((erro) => {
	// 							console.log(`Uh-oh, an ${erro} occurred!`)
	// 						})
	// 			console.log("Sent with success")
	// 			setTimeout(() => {
	// 				window.location.reload()
	// 			}, 1000)
	// 		})
	// 	}
	// )
}

export const getDoc = async (props) => {
	// console.log(props.colle)
	const data = await getDocs(collection(db, props.colle))
	props.set(
		data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
	)
}

export const axiosGet = (props) => {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		Api.get(`/Quadro/${props.id}`)
	// 			.then((response) => {
	// 				props.set(response.data)
	// 			})
	// 			.catch((e) => {
	// 				console.log(e)
	// 			})
	// 	}, [])
	// }, [])
}
