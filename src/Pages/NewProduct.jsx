//firestore
import { submitProduct } from "../api/submitProduct"
//hook
import { useEffect, useState } from "react"
import Input from "../Components/input"
//css
import "../css/newProduct.css"
import FileImg from "../img/file.png"
import Loading from "../Components/Loading"
import Product from "../Components/Product"
import { array } from "../api/array"

const styleInput = "d-flex flex-column col-12 col-lg-5"

const NewProduct = () => {
	const [loading, setLoading] = useState(false)
	const [file, setFile] = useState("")
	const [input, setInput] = useState({
		name: "",
		price: "",
		description: "",
		type: "",
	})
	const [erro, setErro] = useState(false)
	const [atent, setAtent] = useState(false)
	const types = ["image/png", "image/jpeg"]

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
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	}

	// console.log(input.type)
	const submit = (e) => {
		e.preventDefault()
		setLoading(true)

		submitProduct({
			file: file,
			nameFile: file.name,
			name: input.name,
			type: input.type,
			price: input.price,
			description: input.description,
		})
	}


	return (
		<section className="newProduct col-12 d-flex flex-column align-items-center justify-content-center">
			{loading == true ? <Loading /> : null}
			<form
				onSubmit={(e) => {
					submit(e)
				}}
				className="formProduct col-10 d-flex flex-column align-items-center">
				<div className="col-12 d-flex flex-column flex-lg-row align-items-center flex-sm-wrap justify-content-between">
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							id="file"
							title="Imagem"
							onChange={previewImage}
							type="file"
							className="col-12"
							src={file ? URL.createObjectURL(file) : FileImg}
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="name"
							title="Nome do produto"
							onChange={handleInput}
							value={input.name || ""}
							placeholder="Digite o nome do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="price"
							title="Valor do produto"
							onChange={handleInput}
							value={input.price || ""}
							placeholder="Digite o valor do produto"
						/>
					</div>
					<div className={styleInput}>
						<Input
							id="description"
							title="Descrição do produto"
							onChange={handleInput}
							value={input.description || ""}
							placeholder="Sobre o produto"
						/>
					</div>
					<label htmlFor="type" data-label className={styleInput}>
						<h4>Tipo</h4>
						<select
							name="type"
							id="type"
							data-input
							onChange={handleInput}
							value={input.type || ""}>
							<option hidden>Selecione o produto</option>
							{array.map((list, i) => {
								return <option key={i}>{list.type}</option>
							})}
						</select>
					</label>
				</div>
				<button className="col-3">Enviar</button>
			</form>
			<Product />
		</section>
	)
}

export default NewProduct
