//firestore
import { submitProduct } from "../api/submitProduct"
//hook
import { useState } from "react"
import { Mask, MaskChange } from "../api/mask"
//componet
import Input from "../Components/input"
//css
import "../css/newProduct.css"
import FileImg from "../img/file.png"
import Loading from "../Components/Loading"
import CardEdit from "../Components/CardEdit"
import { array } from "../api/list"

const styleInput = "d-flex flex-column col-12 col-lg-5"

const NewProduct = () => {
	const [loading, setLoading] = useState(false)
	const [erro, setErro] = useState(false)
	const [file, setFile] = useState("")
	const types = ["image/png", "image/jpeg"]
	const [input, setInput] = useState({
		name: "",
		price: "",
		description: "",
		type: "",
	})

	const previewImage = (e) => {
		const img = e.target.files[0]
		if (img && types.includes(img.type)) {
			setFile(img)
			setErro(false)
		} else {
			setErro(true)
			setFile(null)
		}
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	}

	const submit = (e) => {
		e.preventDefault()
		if (
			file == "" ||
			input.name == "" ||
			input.type == "" ||
			input.price == "" ||
			input.type == ""
		) {
			setErro(true)
		} else {
			setErro(false)
			setLoading(true)
			submitProduct({
				file: file,
				nameFile: file.name,
				name: input.name,
				type: input.type,
				price: Mask({ mask: input.price, type: "$1,$2" }),
				description: input.description,
			})
		}
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
					<div className={styleInput}>
						<Input
							id="name"
							title="Nome do produto"
							onChange={handleInput}
							value={input.name}
							placeholder="Digite o nome do produto"
							max="50"
						/>
						{erro && input.name == "" ? (
							<p>Digite o nome do produto</p>
						) : null || (erro && input.name.length < 3) ? (
							<p>Pelo menos 3 caracteres</p>
						) : null}
					</div>
					<div className={styleInput}>
						<Input
							id="price"
							title="Valor do produto"
							onChange={handleInput}
							value={MaskChange({ mask: input.price, replace: "$1,$2" })}
							placeholder="Digite o valor do produto"
							max="8"
						/>
						{erro && input.price == "" ? (
							<p>Digite o valor do produto</p>
						) : null || (erro && input.price.length < 5) ? (
							<p>Pelo menos R$ 10,00</p>
						) : null}
					</div>
					<label htmlFor="type" data-label className={styleInput}>
						<h4>Tipo</h4>
						<select
							name="type"
							id="type"
							data-input
							onChange={handleInput}
							value={input.type}>
							<option hidden>Selecione o produto</option>
							{array.map((list, i) => {
								return <option key={i}>{list.type}</option>
							})}
						</select>
						{erro && input.type == "" ? <p>Selecione o tipo do produto</p> : null}
					</label>
					<div className={styleInput}>
						<Input
							id="description"
							title="Descrição do produto"
							onChange={handleInput}
							value={input.description}
							placeholder="Sobre o produto"
							max="30"
						/>
						{erro && input.description == "" ? (
							<p>Digite sobre do produto</p>
						) : null || (erro && input.description.length < 5) ? (
							<p>Pelo menos 5 caracteres</p>
						) : null}
					</div>
					<div className="d-flex flex-column align-items-center col-12">
						<Input
							id="file"
							title="Imagem"
							onChange={previewImage}
							type="file"
							className="col-12"
							src={file ? URL.createObjectURL(file) : FileImg}
						/>
						<p>{erro && file == "" ? "Envie uma imagem" : null}</p>
					</div>
				</div>
				<button className="col-6 col-md-3">Enviar</button>
			</form>
			<CardEdit />
		</section>
	)
}

export default NewProduct
