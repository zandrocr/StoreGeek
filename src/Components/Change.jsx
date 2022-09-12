import Input from "./input"
import { useState } from "react"
import "../css/change.css"
import Funko from "../img/file.png"

const Change = ({modal, setModal}) => {
	const [file, setFile] = useState("")
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [select, setSelect] = useState("")
	const [description, setDescription] = useState("")
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
		setModal(!modal)
		setFile(null)
	}

	return (
		<section className="col-12 d-flex justify-content-center">
			<form
				data-change={modal == true ? "" : "close"}
				className="col-12 flex-column align-items-center justify-content-center flex-lg-row flex-sm-wrap">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							html={"file"}
							type={"file"}
							title={"Imagem"}
							className={"col-11"}
							onChange={previewImage}
							name={"file"}
						/>
						<img
							src={file ? URL.createObjectURL(file) : Funko}
							alt="file"
							className="col-5 col-md-2"
						/>
						{/* {erro && <div>{erro}</div>} */}
					</div>
					<div className="col-12 col-lg-5">
						<Input
							html={"name"}
							title={"Nome"}
							placeholder={"Digite o nome do produto"}
							onChange={(e) => {
								setName(e.target.value)
							}}
						/>
					</div>
					<div className="col-12 col-lg-5">
						<Input
							html={"price"}
							title={"Valor"}
							placeholder={"Digite o valor do produto"}
							onChange={(e) => {
								setPrice(e.target.value)
							}}
						/>
					</div>
					<div className="col-12 col-lg-5">
						<Input
							html={"description"}
							title={"Descrição"}
							placeholder={"Digite o valor do produto"}
							onChange={(e) => {
								setDescription(e.target.value)
							}}
						/>
					</div>
					<div className="col-12 col-lg-5">
						<label
							data-input
							className="d-flex flex-column "
							htmlFor="select">
							<h4>Tipo</h4>
							<select
								id="select"
								data-label
								onChange={(e) => {
									setSelect(e.target.value)
								}}>
								<option value="quadro">Quadro</option>
								<option value="caneca">Caneca</option>
								<option value="funko">Funko</option>
								<option value="almofada">Almofada</option>
								<option value="camisa">Camisa</option>
							</select>
						</label>
					</div>
				<div className="col-12 d-flex justify-content-around">
					<button className="col-4 col-lg-2">Atualizar</button>
					<button type="button" className="col-4 col-lg-2" onClick={onModal}>
						Cancelar
					</button>
				</div>
			</form>
		</section>
	)
}

export default Change
