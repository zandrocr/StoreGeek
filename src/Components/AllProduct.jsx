import { async } from "@firebase/util"
import { useState, useEffect } from "react"
import { deleteObject, ref } from "firebase/storage"
import { deleteDoc, doc, getDocs } from "firebase/firestore/lite"
import { collectionRef, storage } from "../api/api"
//css
import "../css/allProduct.css"
import "../css/card.css"
//components
import Change from "./Change"

const AllProduct = () => {
	const [product, setProduct] = useState([])
	const [modal, setModal] = useState(false)

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

	const deleteProduct = async (id, file) => {
		await deleteDoc(doc(collectionRef, id))
			.then(() => {
				console.log("Doc deleted successfully")
			})
			.catch((error) => {
				console.log(`Uh-oh, an ${error} occurred!`)
			})

		await deleteObject(ref(storage, file))
			.then(() => {
				console.log("File deleted successfully")
				window.location.reload()
			})
			.catch((error) => {
				console.log(`Uh-oh, an ${error} occurred!`)
			})
	}

	function onModal(){
		setModal(!modal)
	}

	return (
		<section className="allProduct col-12 d-flex flex-column align-items-center">
			<p>Produtos</p>
			<Change modal={modal} setModal={setModal}/>
			<div className="cap col-12 d-flex flex-wrap justify-content-cente justify-content-around">
				{product.map((item) => {
					return (
						<div
							data-card
							key={item.id}
							className="col-11 col-md-5 col-lg-3 col-xxl-2 d-flex flex-column align-items-center">
							<img src={item.file} alt="product" className="col-12" />
							<div className="col-12">
								<h4>{item.name}</h4>
								<h6>R$ {item.price}</h6>
							</div>
							<button
								className="col-9"
								onClick={() => {
									deleteProduct(item.id, item.file)
								}}>
								Deletar
							</button>
							<button className="col-9" onClick={onModal}>Editar</button>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default AllProduct
