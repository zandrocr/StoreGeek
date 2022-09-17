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
import { editProduct } from "../api/submitProduct"

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
	const [editInput, setEditInput] = useState('')
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

	function closeModal() {
		props.setModal(!props.modal)
		setFile(null)
		setErro(null)
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setEditInput({ ...editInput, [name]: value })
	}

	const editProd = (e) => {
		e.preventDefault()
		setLoading(true)
		editProduct({
			id: props.id,
			namefile: file.name,
			file: file,
			setName: editInput.setName,
			setPrice: editInput.setPrice,
			setDescription: editInput.setDescription,
			setSelect: editInput.setSelect,
		})
	}

	return (
		<section className="col-12 d-flex justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				data-change={props.modal == true ? "" : "close"}
				//
				className="col-12 flex-column align-items-center"
				onSubmit={editProd}>
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
							value={editInput.setName || ""}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setPrice"
							title="Valor"
							onChange={handleInput}
							value={editInput.setPrice || ""}
							placeholder="Digite o valor do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setDescription"
							title="Descrição"
							onChange={handleInput}
							value={editInput.setDescription || ""}
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
							value={editInput.setSelect || ""}>
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
						<button type="button" className="col-12" onClick={closeModal}>
							Cancelar
						</button>
					</Link>
				</div>
			</form>
		</section>
	)
}

export default Change
