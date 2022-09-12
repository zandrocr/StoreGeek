//hooks
import { useState, useEffect } from "react"
//firestore
import { storage, collectionRef } from "../api/api"
import { addDoc, serverTimestamp } from "firebase/firestore/lite"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
//components
import Input from "../Components/input"
//css
import "../css/newProduct.css"
import Funko from "../img/file.png"
import AllProduct from "../Components/AllProduct"
import { async } from "@firebase/util"
import { propTypes } from "react-bootstrap/esm/Image"
import Loading from "../Components/Loading"

const array = [
	{ type: "Quadro" },
	{ type: "Caneca" },
	{ type: "Funko" },
	{ type: "Almofada" },
	{ type: "Camisa" },
]

const styleInput = "d-flex flex-column col-12 col-lg-5"

const NewProduct = () => {
	const [file, setFile] = useState("")
	const [urlFile, setUrlFile] = useState("")
	// const [name, setName] = useState("")
	// const [price, setPrice] = useState("")
	// const [select, setSelect] = useState("")
	// const [description, setDescription] = useState("")
	const [loading, setLoading] = useState(false)
	const [valueInput, setvalueInput] = useState({ timeStamp: serverTimestamp(), file: urlFile })

	const handleInput = (e) => {
		const { name, value } = e.target
		setvalueInput({ ...valueInput, [name]: value })
	}

	console.log(valueInput)

	const upProduct = async (url) => {
		try {
			await addDoc(
				collectionRef,
				valueInput
				// {name: name,
				// price: price,
				// file: urlFile,
				// select: select,
				// description: description,
				// timeStamp: serverTimestamp(),}
			)
			console.log("Written document")
		} catch (e) {
			console.log("Error adding document: ", e)
		}
	}


	const submitProduct = async (e) => {
		e.preventDefault()

		const storageRef = ref(storage, `/images/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file)
		setLoading(true)

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
					setUrlFile(url)
					console.log("Sent with success")
					setTimeout(() => {
						// upProduct()
						// console.log(valueInput)
						// window.location.reload()
					}, 2000)
				})
			}
		)
	}

	return (
		<section className="newProduct col-12 d-flex flex-column align-items-center justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				className="forProduct col-10 d-flex flex-column align-items-center"
				onSubmit={submitProduct}>
				<div className="col-12 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							title="Imagem"
							id="file"
							type="file"
							className="col-12"
							onChange={(e) => setFile(e.target.files[0])}
							src={file ? URL.createObjectURL(file) : Funko}
						/>
						{/* {!urlFile && <p>shpww</p>}
						{urlFile && <img src={urlFile} alt="image" />} */}
					</div>
					<div className={styleInput}>
						<Input
							id="name"
							title="Nome"
							onChange={handleInput}
							value={valueInput.name || ""}
							placeholder="Digite o nome do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="price"
							title="Valor"
							onChange={handleInput}
							value={valueInput.price || ""}
							placeholder="Digite o valor do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="description"
							title="Descrição"
							onChange={handleInput}
							value={valueInput.description || ""}
							placeholder="Digite sobre do produto"
						/>
					</div>
					<label data-input className={styleInput} htmlFor="select">
						<h4>Tipo</h4>
						<select
							id="select"
							name="select"
							data-label
							onChange={handleInput}
							value={valueInput.select || ""}>
							<option hidden>Selecione o produto</option>
							{array.map((list, index) => {
								return <option key={index}>{list.type}</option>
							})}
						</select>
					</label>
				</div>
				<button className="col-3">Enviar</button>
			</form>
			<AllProduct />
		</section>
	)
}

export default NewProduct
