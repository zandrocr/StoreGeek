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
	const [loading, setLoading] = useState(false)
	const [valueInput, setvalueInput] = useState('')
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
		setvalueInput({ ...valueInput, [name]: value })
	}

	const submit = (e) => {
		e.preventDefault()
		setLoading(true)
		submitProduct({
			namefile: file.name,
			file: file,
			name: valueInput.name,
			price: valueInput.price,
			description: valueInput.description,
			type: valueInput.type,
		})
	}

	return (
		<section className="newProduct col-12 d-flex flex-column align-items-center justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				className="forProduct col-10 d-flex flex-column align-items-center"
				onSubmit={submit}>
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
						{erro == true && <p>asdas</p>}
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
					<label data-input className={styleInput} htmlFor="type">
						<h4>Tipo</h4>
						<select
							id="type"
							name="type"
							data-label
							onChange={handleInput}
							value={valueInput.type || ""}>
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
