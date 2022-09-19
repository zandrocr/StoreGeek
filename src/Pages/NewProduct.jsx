//hooks
import { useState } from "react"
//firestore
import { submitProduct } from "../api/submitProduct"
//components
import Input from "../Components/input"
//css
import "../css/newProduct.css"
import Funko from "../img/file.png"
import AllProduct from "../Components/AllProduct"
import Loading from "../Components/Loading"
import { useForm } from "react-hook-form"

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
	const [input, setInput] = useState({
		name: "",
		price: "",
		description: "",
		type: "",
	})
	const [loading, setLoading] = useState(false)
	const [erro, setErro] = useState(false)

	const types = ["image/png", "image/jpeg"]
	const [atent, setAtent] = useState(false)

	const previewImage = (e) => {
		const img = e.target.files[0]
		if (img && types.includes(img.type)) {
			setFile(img)
			setErro(false)
		} else {
			setFile(null)
			setErro(true)
		}
	}

	const handleInput = (e) => {
		let newInput = input
		newInput[e.target.name] = e.target.value
		setInput({ ...newInput })
	}

	const submit = (e) => {
		e.preventDefault()
		let atents = Object.values(input).some((obj) => obj == "")
		setAtent(atents)

		if (file == "" || atent == true) {
			setErro(true)
		} else {
			setLoading(true)
			submitProduct({
				namefile: file.name,
				file: file,
				name: input.name,
				price: input.price,
				description: input.description,
				type: input.type,
			})
		}
	}

	// console.log(valueInput.name)
	return (
		<section className="newProduct col-12 d-flex flex-column align-items-center justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				className="forProduct col-10 d-flex flex-column align-items-center"
				onSubmit={(e) => {
					submit(e)
				}}>
				<div className="col-12 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							title="Imagem"
							id="file"
							type="file"
							className="col-12"
							onChange={previewImage}
							src={file ? URL.createObjectURL(file) : Funko}
						/>
						{erro == true && file == "" ? <p>Envie uma imagem png ou jpeg</p> : ""}
					</div>
					<div className={styleInput}>
						<Input
							id="name"
							title="Nome"
							onChange={handleInput}
							value={input.name || ""}
							placeholder="Digite o nome do produto"
						/>
						{atent == true && input.name == "" ? (
							<span>Digite o nome do produto</span>
						) : (
							""
						)}
					</div>
					<div className={styleInput}>
						<Input
							id="price"
							title="Valor"
							onChange={(e) => handleInput(e)}
							value={input.price || ""}
							placeholder="Digite o valor do produto"
						/>
						{atent == true && input.price == "" ? (
							<span>Digite o valor do produto</span>
						) : (
							""
						)}
					</div>
					<div className={styleInput}>
						<Input
							id="description"
							title="Descrição"
							onChange={(e) => handleInput(e)}
							value={input.description || ""}
							placeholder="Digite sobre do produto"
						/>
						{atent == true && input.description == "" ? (
							<span>Digite o nome do produto</span>
						) : (
							""
						)}
					</div>
					<label data-input className={styleInput} htmlFor="type">
						<h4>Tipo</h4>
						<select
							id="type"
							name="type"
							data-label
							onChange={(e) => handleInput(e)}
							value={input.type || ""}>
							<option hidden>Selecione o produto</option>
							{array.map((list, index) => {
								return <option key={index}>{list.type}</option>
							})}
						</select>
						{atent == true && input.type == "" ? (
							<span>Digite o tipo do produto</span>
						) : (
							""
						)}
					</label>
				</div>
				<button className="col-3">Enviar</button>
			</form>
			<AllProduct />
		</section>
	)
}

export default NewProduct
