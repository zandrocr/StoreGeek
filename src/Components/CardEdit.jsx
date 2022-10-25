import { useEffect, useState } from "react"
//fire
import { delProduct } from "../api/deletProduct"
import { getDoc } from "../api/submitProduct"
//apiInte
import { array } from "../api/array"
//ouht
import { Link } from "react-router-dom"
import Change from "./Change"
//css
import "../css/cardEdit.css"
import Loading from "./Loading"

const CardEdit = () => {
	const [item, setItem] = useState("")
	const [modal, setModal] = useState(false)
	const [input, setInput] = useState("Quadro")
	const [product, setProduct] = useState([])
	const [loading, setLoading] = useState(false)

	const colletionSelect = (e) => {
		setInput(e.target.value)
	}

	function typeSelect() {
		setTimeout(() => {
			getDoc({ set: setProduct, colle: input })
		}, [])
	}

	useEffect(() => {
		typeSelect()
	}, [])

	function onModal(e) {
		setItem(e.item)
		setModal(!modal)
	}

	const deleteProduct = async (props) => {
		setLoading(true)
		delProduct({ colle: props.type, id: props.id, file: props.file })
	}

	return (
		<section className="carEdit col-12 d-flex flex-column align-items-center">
			{loading == true ? <Loading /> : null}
			<Change item={item} modal={modal} setModal={setModal} />
			<label
				data-label
				className="col-10 d-flex flex-column align-items-center"
				htmlFor="select">
				<select
					id="setType"
					name="setType"
					data-input
					className="col-6"
					onChange={colletionSelect}
					onClick={typeSelect}>
					<option hidden>Selecione o produto</option>
					{array.map((list, i) => {
						return <option key={i}>{list.type}</option>
					})}
				</select>
			</label>
			<h3>Produtos</h3>
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
								</div>
								<div className="col-12 d-flex justify-content-end">
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

export default CardEdit
