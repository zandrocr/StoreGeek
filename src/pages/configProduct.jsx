//css
import "../css/configProduct.css"
//hooks
import { useState, useEffect } from "react"
import { db } from "../api/api"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite"
import { async } from "@firebase/util"
//componests
import NewProduct from "../components/newProduct"
import SetProduct from "../components/setProduct"

const ConfigProduct = () => {
	const collectionRef = collection(db, "product")
	const [product, setProduct] = useState([])
	const [click, setClik] = useState(false)

	function open() {
		setClik(!click)
	}

	useEffect(() => {
		const getProduct = async () => {
			const data = await getDocs(collectionRef)
			setProduct(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			)
		}
		getProduct()
	}, [])

	const deleteProduct = async (id) => {
		await deleteDoc(doc(db, "product", id))
	}

	return (
		<section data-form className="col-12 d-flex flex-column align-items-center ">
			<NewProduct />
			<div className="col-10 d-flex flex-wrap">
				{product.map((pro) => {
					return (
						<section key={pro.id} className="d-felx col-6 justify-content-around">
							<img className="col-4" src={pro.image} alt="image" />
							<h3>{pro.name}</h3>
							<h5>R$ {pro.value}</h5>
							<button
								onClick={() => {
									deleteProduct(pro.id)
								}}>
								Delete
							</button>
							<br />
							<button
								onClick={() => {
									open(pro.id)
								}}>
								Alterar Dados
							</button>
							<SetProduct pro={pro} modal={click} />
						</section>
					)
				})}
			</div>
		</section>
	)
}

export default ConfigProduct
