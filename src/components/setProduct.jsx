import { doc, setDoc } from "firebase/firestore/lite"
import { useState } from "react"
import { db } from "../api/api"
import Input from "./input"

import '../css/setProduct.css'

const SetProduct = ({ pro, modal }) => {
	const [name, setName] = useState("")
	const [value, setValue] = useState(0)

	const updateProduct = async (id) => {
		await setDoc(doc(db, "product", id), {
			name: name,
			value: value,
		})
	}

	return (
		<div>
			<form
				data-updata={modal == true ? 'open' : ''}>
				<Input htmfor="image" title={"Imagem do Produto"} type="file" />
				<Input
					htmfor="product"
					title={"Nome do Produto"}
					type="text"
					place={pro.name}
					change={(e) => {
						setName(e.target.value)
					}}
				/>
				<Input
					htmfor="value"
					title={"Valor do Produto"}
					type="number"
					place={pro.value}
					change={(e) => {
						setValue(e.target.value)
					}}
				/>
				<button
					onClick={() => {
						updateProduct(pro.id)
					}}>
					Atualizar
				</button>
			</form>
		</div>
	)
}

export default SetProduct
