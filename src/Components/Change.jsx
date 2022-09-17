//components
import Input from "./input"
//hooks
import { useState, useEffect } from "react"
//firestore
import { storage, collectionRef, db } from "../api/api"
import { getDatabase, set } from "firebase/database"
import {
	addDoc,
	getDocs,
	serverTimestamp,
	doc,
	collection,
	setDoc,
	where,
	query,
	getDoc,
} from "firebase/firestore/lite"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
//style
import "../css/change.css"
import Loading from "./Loading"
import Funko from "../img/file.png"
import { Link, useParams } from "react-router-dom"

const styleInput = "d-flex flex-column col-12 col-lg-5"

const array = [
	{ type: "Quadro" },
	{ type: "Caneca" },
	{ type: "Funko" },
	{ type: "Almofada" },
	{ type: "Camisa" },
]

const Change = (props) => {
	const [file, setFile] = useState("")
	const [product, setProduct] = useState([])
	const [loading, setLoading] = useState(false)
	const [valueInput, setvalueInput] = useState({ timeStamp: serverTimestamp() })
	//types
	const types = ["image/png", "image/jpeg"]
	const [erro, setErro] = useState(null)

	useEffect(() =>{
		const docRef = doc(collectionRef, 'IOBqOpI2Mkpq2LIZB0Gd')

		const getProduct = async () => {
			getDoc(docRef)
			// .then((doc) =>{
			// 	console.log(doc.data(), doc.id)
			// 	// console.log('getDoc')
			// })

			onSnapshot(docRef, (doc) => {
				console.log(doc.data(), doc.id)
			})
		}
		getProduct()
	},[])

	const previewImage = (e) => {
		const img = e.target.files[0]
		if (img && types.includes(img.type)) {
			setErro("")
			setFile(img)
		} else {
			setFile(null)
			setErro("message")
		}
	}

	function onModal() {
		props.setModal(!props.modal)
		setFile(null)
		setErro(null)
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setvalueInput({ ...valueInput, [name]: value })
	}

	const upProduct = async (e) => {
		try {
			await setDoc(doc(db, "product", props.id), {
				file: e,
				name: valueInput.setName,
				price: valueInput.setPrice,
				description: valueInput.setDescription,
				type: valueInput.setSelect,
			})
			console.log("Written document")
		} catch (error) {
			console.log("Error adding document: ", error)
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
					upProduct(url)
					console.log("Sent with success")
					setTimeout(() => {
						window.location.reload()
					}, 1000)
				})
			}
		)
	}

	return (
		<section className="col-12 d-flex justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				data-change={props.modal == true ? "" : "close"}
				//
				className="col-12 flex-column align-items-center"
				onSubmit={submitProduct}>
				<div className="inForm col-11 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							title="Imagem"
							id="setFile"
							type="file"
							className="col-11"
							onChange={previewImage}
							src={file ? URL.createObjectURL(file) : Funko}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setName"
							title="Nome"
							onChange={handleInput}
							value={valueInput.setName || ""}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setPrice"
							title="Valor"
							onChange={handleInput}
							value={valueInput.setPrice || ""}
							placeholder="Digite o valor do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setDescription"
							title="Descrição"
							onChange={handleInput}
							value={valueInput.setDescription || ""}
							placeholder="Digite sobre do produto"
						/>
					</div>
					<label data-input className={styleInput} htmlFor="select">
						<h4>Tipo</h4>
						<select
							id="setSelect"
							name="setSelect"
							data-label
							onChange={handleInput}
							value={valueInput.setSelect || ""}>
							<option hidden>Selecione o produto</option>
							{array.map((list, index) => {
								return <option key={index}>{list.type}</option>
							})}
						</select>
					</label>
				</div>
				<div className="col-12 d-flex justify-content-around">
					<button className="col-4 col-lg-2">Atualizar</button>
					<Link to="/newProduct" className="col-4 col-lg-2">
						<button type="button" className="col-12" onClick={onModal}>
							Cancelar
						</button>
					</Link>
				</div>
			</form>
		</section>
	)
}

export default Change
