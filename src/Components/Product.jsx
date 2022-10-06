import { useEffect, useState } from "react"
import { delProduct } from "../api/deletProduct"
//css
import "../css/allProduct.css"
import "../css/card.css"
import Otaku from "../img/otaku.png"
//components
import Change from "./Change"
import { Link } from "react-router-dom"
import { axiosGet, getDoc } from "../api/submitProduct"
import { array } from "../api/array"

const Product = () => {
	const [product, setProduct] = useState([])
	const [editInput, setEditInput] = useState("Quadro")
	const [modal, setModal] = useState(false)
	const [item, setItem] = useState("")

	const selectColle = (e) => {
		setEditInput(e.target.value)
	}

	function selectClik() {
		setTimeout(() => {
			getDoc({ set: setProduct, colle: editInput })
		}, [])
	}

	useEffect(() => {
		selectClik()
	}, [])

	axiosGet({ set: setProduct })

	function onModal(e) {
		setItem(e.item)
		setModal(!modal)
	}

	const deleteProduct = async (props) => {
		delProduct({ colle: props.type, id: props.id, file: props.file })
	}

	return (
		<section className="allProduct col-12 d-flex flex-column align-items-center">
			<label
				data-label
				className="col-10 d-flex flex-column align-items-center"
				htmlFor="select">
				<h4>Produtos</h4>
				<select
					id="setType"
					name="setType"
					data-input
					className="col-6"
					onChange={selectColle}
					onClick={selectClik}>
					<option hidden>Selecione o produto</option>
					{/* {array.map((list) => {
						return <option key={list.id}>{list.type}</option>
					})} */}
				</select>
			</label>
			<Change item={item} modal={modal} setModal={setModal} />
			<div className="cap col-12 d-flex flex-wrap justify-content-cente justify-content-around">
				{product.map((item) => {
					return (
						<div
							data-card
							key={item.id}
							className="col-11 col-md-5 col-lg-3 col-xxl-2 d-flex flex-column align-items-center">
							<img src={item.file} alt="product" className="col-12" />
							<div className="d-flex flex-column col-11 align-items-center">
								<div className="col-12 d-flex justify-content-between">
									<h4>{item.name}</h4>
									<h6>R$ {item.price}</h6>
								</div>
								<div>
									<p>{item.description}</p>
								</div>
								<div className="col-12 d-flex justify-content-center">
									<button
										className="col-5"
										onClick={() => {
											deleteProduct({
												id: item.id,
												file: item.file,
												type: item.type,
											})
										}}>
										Deletar
									</button>
									<Link
										to={`/newProduct/${item.id}`}
										className="col-7 d-flex justify-content-center">
										<button
											className="col-9"
											onClick={() => {
												onModal({ item: item })
											}}>
											Editar
										</button>
									</Link>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Product
