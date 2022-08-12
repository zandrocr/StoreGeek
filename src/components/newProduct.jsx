//firestore
import { db, storage } from "../api/api"
//components
import Input from "./input"
//hoos
import { async } from "@firebase/util"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore/lite"

const NewProduct = () => {
	const allInputs = { imgUrl: "" }
	const [newImage, setImage] = useState("") //null
	const [imageUrl, setImageUrl] = useState(allInputs)

	const [newProduct, setNewProduct] = useState("")
	const [newValue, setNewValue] = useState(0)

	const productCollectionRef = collection(db, "product")

	function handleChange(e) {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
		}
	}

	function handleImage(e) {
		e.preventDefault()
		console.log("satrt upload")
		if (image === "") {
			console.error(`not an image, the image file is a ${typeof image}`)
		}
		const uploadTask = storage.ref(`/images/${image.name}`).put(image)
		uploadTask.on(
			"state_changed",
			(snapShot) => {
				console.log(snapShot)
			},
			(err) => {
				console.log(err)
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						setImageUrl((prevObject) => ({ ...prevObject, imgUrl: fireBaseUrl }))
					})
			}
		)
	}

	const createProduct = async (e) => {
		e.preventDefault()
		if (newProduct === "" || newValue === 0) {
			console.error(
				`not an data, the product file is a ${typeof newProduct}, the image file is a ${typeof newValue}`
			)
		} else {
			await addDoc(productCollectionRef, {
				image: newImage,
				name: newProduct,
				value: newValue,
			})
		}
	}

	return (
		<form className="col-10 d-flex flex-column" onSubmit={createProduct}>
			<Input htmfor="image" title={"Imagem do Produto"} type="file" change={handleImage} />
			<Input
				htmfor="product"
				title={"Nome do Produto"}
				type="text"
				place={"Digite o nome do produto"}
				change={(e) => {
					setNewProduct(e.target.value)
				}}
			/>
			<Input
				htmfor="value"
				title={"Valor do Produto"}
				type="number"
				place={"Digite o valor do produto"}
				change={(e) => {
					setNewValue(e.target.value)
				}}
			/>
			<button>Novo Produto</button>
		</form>
	)
}

export default NewProduct
