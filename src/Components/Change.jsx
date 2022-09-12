//components
import Input from "./input"
//hooks
import { useState } from "react"
//firestore
import { storage, collectionRef } from "../api/api"
import { addDoc, serverTimestamp } from "firebase/firestore/lite"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
//style
import "../css/change.css"
import Funko from "../img/file.png"

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
	const [loading, setLoading] = useState(false)
	const [valueInput, setvalueInput] = useState({ timeStamp: serverTimestamp() })
	//types
	const types = ["image/png", "image/jpeg"]
	const [erro, setErro] = useState(null)

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
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setvalueInput({ ...valueInput, [name]: value })
	}

	const upProduct = async (e) => {
		try {
			await addDoc(collectionRef, {
				file: e,
				name: valueInput.setName,
				price: valueInput.setPrice,
				description: valueInput.setDescription,
				type: valueInput.setSelect,
			})
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
		<section className="newProduct col-12 d-flex flex-column align-items-center justify-content-center">
			{/* {loading == true ? <Loading /> : null} */}
			<form
				className="forProduct col-10 d-flex flex-column align-items-center"
				onSubmit={submitProduct}>
				<div className="col-12 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							title="Imagem"
							id="setFile"
							type="file"
							className="col-12"
							onChange={previewImage}
							src={file ? URL.createObjectURL(file) : Funko}
							/>
						{erro && <p>{erro}</p>}
					</div>
					<div className={styleInput}>
						<Input
							id="setName"
							title="Nome"
							onChange={handleInput}
							value={valueInput.setName || ""}
							placeholder="Digite o nome do produto"
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
							value={valueInput.setDescription || ""}
							>
							<option hidden>Selecione o produto</option>
							{array.map((list, index) => {
								return <option key={index}>{list.type}</option>
							})}
						</select>
					</label>
				</div>
				<button className="col-3">Enviar</button>
			</form>
		</section>
		// <section className="col-12 d-flex justify-content-center">
		// 	<form
		// 		data-change={props.modal == true ? "" : "close"}
		// 		className="col-12 flex-column align-items-center justify-content-center flex-lg-row flex-sm-wrap">
		// 			<div className="d-flex flex-column align-items-center col-12">
		// 				<Input
		// 					html={"file"}
		// 					type={"file"}
		// 					title={"Imagem"}
		// 					className={"col-11"}
		// 					onChange={previewImage}
		// 					name={"file"}
		// 				/>
		// 				<img
		// 					src={file ? URL.createObjectURL(file) : Funko}
		// 					alt="file"
		// 					className="col-5 col-md-2"
		// 				/>
		// 			</div>
		// 			<div className="col-12 col-lg-5">
		// 				<Input
		// 					html={"name"}
		// 					title={"Nome"}
		// 					placeholder={"Digite o nome do produto"}
		// 					onChange={(e) => {
		// 						setName(e.target.value)
		// 					}}
		// 				/>
		// 			</div>
		// 			<div className="col-12 col-lg-5">
		// 				<Input
		// 					html={"price"}
		// 					title={"Valor"}
		// 					placeholder={"Digite o valor do produto"}
		// 					onChange={(e) => {
		// 						setPrice(e.target.value)
		// 					}}
		// 				/>
		// 			</div>
		// 			<div className="col-12 col-lg-5">
		// 				<Input
		// 					html={"description"}
		// 					title={"Descrição"}
		// 					placeholder={"Digite o valor do produto"}
		// 					onChange={(e) => {
		// 						setDescription(e.target.value)
		// 					}}
		// 				/>
		// 			</div>
		// 			<div className="col-12 col-lg-5">
		// 				<label
		// 					data-input
		// 					className="d-flex flex-column "
		// 					htmlFor="select">
		// 					<h4>Tipo</h4>
		// 					<select
		// 						id="select"
		// 						data-label
		// 						onChange={(e) => {
		// 							setSelect(e.target.value)
		// 						}}>
		// 						<option value="quadro">Quadro</option>
		// 						<option value="caneca">Caneca</option>
		// 						<option value="funko">Funko</option>
		// 						<option value="almofada">Almofada</option>
		// 						<option value="camisa">Camisa</option>
		// 					</select>
		// 				</label>
		// 			</div>
		// 		<div className="col-12 d-flex justify-content-around">
		// 			<button className="col-4 col-lg-2">Atualizar</button>
		// 			<button type="button" className="col-4 col-lg-2" onClick={onModal}>
		// 				Cancelar
		// 			</button>
		// 		</div>
		// 	</form>
		// </section>
	)
}

export default Change
