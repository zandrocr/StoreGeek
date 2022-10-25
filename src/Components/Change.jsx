//components
import Input from "./input"
import { array } from "../api/array"
import { editProduct, Mask } from "../api/submitProduct"
//hooks
import { Link } from "react-router-dom"
import { useState } from "react"
//style
import "../css/change.css"
import Loading from "./Loading"
import { Alert } from "./Alert"

const styleInput = "d-flex flex-column col-12 col-lg-5"

const Change = (props) => {
	const [loading, setLoading] = useState(false)
	const [erro, setErro] = useState(false)
	const [alert, setAlert] = useState(false)
	const [file, setFile] = useState("")
	const types = ["image/png", "image/jpeg"]
	const [editInput, setEditInput] = useState({
		setName: "",
		setPrice: "",
		setDescription: "",
		setType: "",
	})

	const previewImage = (e) => {
		const img = e.target.files[0]
		if (img && types.includes(img.type)) {
			setFile(img)
		} else {
			setFile(null)
		}
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setEditInput({ ...editInput, [name]: value })
	}

	// console.log(editInput)

	const editProd = (e) => {
		e.preventDefault()
		if (
			file == "" &&
			editInput.setName == "" &&
			editInput.setPrice == "" &&
			editInput.setDescription == "" &&
			editInput.setType == ""
		) {
			setAlert(true)
			setTimeout(() => {
				setAlert(false)
			}, 5000)
		} else {
			setErro(false)
			setLoading(true)
			editProduct({
				id: props.item.id,
				namefile: file.name,
				file: file == "" ? props.item.file : file,
				delFile: file == "" || null ? null : props.item.file,
				setName: editInput.setName == "" ? props.item.name : editInput.setName,
				setPrice:
					editInput.setPrice == ""
						? props.item.price
						: Mask({ mask: editInput.setPrice }),
				setDescription:
					editInput.setDescription == ""
						? props.item.description
						: editInput.setDescription,
				setType: editInput.setType == "" ? props.item.type : editInput.setType,
			})
		}
	}

	function closeModal() {
		props.setModal(!props.modal)
		setFile("")
		setErro(false)
		setEditInput({
			setName: "",
			setPrice: "",
			setDescription: "",
			setType: "",
		})
	}

	return (
		<section className="col-12 d-flex justify-content-center">
			{loading == true ? <Loading /> : null}
			{alert == true ? <Alert text="Nenhuma alteração realizada" /> : null}
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
							value={editInput.setName}
						/>
						{erro && editInput.setName.length < 3 ? (
							<p>Digite o novo nome do produto</p>
						) : null || (erro && editInput.setName.length < 3) ? (
							<p>Pelo menos 3 caracteres</p>
						) : null}
					</div>
					<div className={styleInput}>
						<Input
							id="setPrice"
							title="Valor"
							placeholder={props.item.price}
							onChange={handleInput}
							value={Mask({ mask: editInput.setPrice })}
							max="8"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="setDescription"
							title="Descrição"
							placeholder={props.item.description}
							onChange={handleInput}
							value={editInput.setDescription}
						/>
					</div>
					<label data-label className={styleInput} htmlFor="select">
						<h4>Tipo</h4>
						<select
							id="setType"
							name="setType"
							data-input
							onChange={handleInput}
							value={editInput.setType}>
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
