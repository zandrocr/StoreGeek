//components
import Input from "./input"
import { array } from "../api/array"
import { editProduct } from "../api/submitProduct"
//hooks
import { Link } from "react-router-dom"
import { useState } from "react"
//style
import "../css/change.css"
import Loading from "./Loading"

const styleInput = "d-flex flex-column col-12 col-lg-5"

const Change = (props) => {
	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)
	const [editInput, setEditInput] = useState("")
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
			setErro(true)
		}
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setEditInput({ ...editInput, [name]: value })
	}

	// console.log(file)

	const editProd = (e) => {
		e.preventDefault()
		setLoading(true)
		editProduct({
			id: props.item.id,
			namefile: file.name,
			file: file == "" ? props.item.file : file,
			delFile: file == "" || null ? null : props.item.file,
			setName: editInput.setName == null ? props.item.name : editInput.setName,
			setPrice: editInput.setPrice == null ? props.item.price : editInput.setPrice,
			setDescription:
				editInput.setDescription == null
					? props.item.description
					: editInput.setDescription,
			setType: editInput.setType == null ? props.item.type : editInput.setType,
		})
	}

	function closeModal() {
		props.setModal(!props.modal)
		setFile(null)
		setEditInput("")
		setFile("")
	}

	return (
		<section className="col-12 d-flex justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				data-change={props.modal == true ? "" : "close"}
				className="col-12 flex-column align-items-center"
				onSubmit={editProd}>
				<div className="inForm col-11 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-around justify-content-lg-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							title="Imagem"
							id="setFile"
							type="file"
							className="col-11"
							onChange={previewImage}
							src={file ? URL.createObjectURL(file) : props.item.file}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setName"
							title="Nome"
							onChange={handleInput}
							placeholder={props.item.name}
							value={editInput.setName || ""}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setPrice"
							title="Valor"
							placeholder={props.item.price}
							onChange={handleInput}
							value={editInput.setPrice || ""}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setDescription"
							title="Descrição"
							placeholder={props.item.description}
							onChange={handleInput}
							value={editInput.setDescription || ""}
						/>
					</div>
					<label data-label className={styleInput} htmlFor="select">
						<h4>Tipo</h4>
						<select
							id="setType"
							name="setType"
							data-input
							onChange={handleInput}
							value={editInput.setType || ""}>
							<option hidden>{props.item.type}</option>
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
