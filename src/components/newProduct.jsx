//firestore
import { db, storage } from "../api/api"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
//components
import Input from "./input"
//hoos
import { async } from "@firebase/util"
import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite"

const NewProduct = () => {
	//input name and value imga
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	//reservation data
	let [data, setData] = useState({})
	const [newImage, setImage] = useState(null)
	//error handling
	const [erro, setErro] = useState(null)
	const types = ["image/png", "image/jpeg"]
	//product collection
	const productCollectionRef = collection(db, "product")

	const handleAdd = async (e) => {
		e.preventDefault()
		try {
			await addDoc(collection(db, "product"), {
				name: name,
				value: price,
				image: data,
				timeStamp: serverTimestamp(),
			})
		} catch (err) {
			console.log(err)
		}
	}

	const uploadForm = async (e) => {
		e.preventDefault()
		const storageRef = ref(storage, `/images/${newImage.name}`)
		const uploadTask = uploadBytesResumable(storageRef, newImage)
		if (name === "" || price === 0) {
			console.error(
				`not an data, the product file is a ${typeof name}, the image file is a ${typeof price}`
			)
		} else {
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
				(err) => {
					console.log(err)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log("File available at", downloadURL)
						setData(downloadURL)
						console.log(data)
					})
				}
			)
			await addDoc(productCollectionRef, {
				image: data,
				name: name,
				value: price,
			})
		}
	}

	function handleImage(e) {
		let img = e.target.files[0]
		if (img && types.includes(img.type)) {
			setImage(img)
			setErro("")
		} else {
			setImage(null)
			setErro("Please select an image file (png or jpeg)")
		}
	}

	return (
		<form className="col-10 d-flex flex-column" onSubmit={handleAdd}>
			<Input htmfor="image" title={"Imagem do Produto"} type="file" change={handleImage} />
			{erro && <div>{erro}</div>}
			{newImage && <div>{newImage.name}</div>}
			<Input
				htmfor="product"
				title={"Nome do Produto"}
				type="text"
				place={"Digite o nome do produto"}
				change={(e) => setName(e.target.value)}
			/>
			<Input
				htmfor="value"
				title={"Valor do Produto"}
				type="number"
				place={"Digite o valor do produto"}
				change={(e) => setPrice(e.target.value)}
			/>
			<button type="submit">Novo Produto</button>
		</form>
	)
}

export default NewProduct
