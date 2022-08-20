//firestore
import { db, storage } from "../api/api"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
//components
import Input from "./input"
//hoos
import { async } from "@firebase/util"
import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite"
//css
import "../css/newProduct.css"

const NewProduct = () => {
	//modal
	let [modal, setModal] = useState(false)
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

	function openModal() {
		setModal(!modal)
	}

	function closeModal() {
		setModal(false)
	}

	const handleAdd = async (e) => {
		try {
			await addDoc(collection(db, "product"), {
				image: data,
				name: name,
				value: price,
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
		<div data-newproduct className="col-12 d-flex flex-column align-items-center">
			<button data-buttonproduct="open" className="col-3 button" onClick={openModal}>
				Novo Produto
			</button>
			<form
				data-formproduct={modal == true ? "open" : ""}
				className="col-12 flex-column justify-content-around align-items-center"
				onSubmit={handleAdd}>
				<button data-buttonproduct type="button" className="col-1 button" onClick={closeModal}>
					X
				</button>
				<div className="col-10">
					<Input
						htmfor="image"
						title={"Imagem do Produto"}
						type="file"
						onChange={handleImage}
					/>
					{erro && <div>{erro}</div>}
					{newImage && <div>{newImage.name}</div>}
					<Input
						htmfor="product"
						title={"Nome do Produto"}
						type="text"
						placeholder={"Digite o nome do produto"}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						htmfor="value"
						title={"Valor do Produto"}
						type="number"
						placeholder={"Digite o valor do produto"}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<button data-buttonproduct className="col-4">
					Cadastrar
				</button>
			</form>
		</div>
	)
}

export default NewProduct
