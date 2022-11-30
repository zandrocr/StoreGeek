import { useEffect, useState } from "react"
//fire
import { delProduct } from "../api/deletProduct"
import { getDoc, MaskChange } from "../api/submitProduct"
//apiInte
import { array } from "../api/list"
import Pagination from "./Pagination"
//ouht
import { Link } from "react-router-dom"
import Change from "./Change"
//css
import "../css/cardEdit.css"
import Loading from "./Loading"
import Input from "./input"

const CardEdit = () => {
	const [input, setInput] = useState("Quadro")
	const colletionSelect = (e) => {
		setInput(e.target.value)
	}

	const [product, setProduct] = useState([])
	const typeSelect = async () => {
		getDoc({ set: setProduct, colle: input })
	}

	useEffect(() => {
		typeSelect()
	}, [])

	const [item, setItem] = useState("")
	const [modal, setModal] = useState(false)
	function onModal(e) {
		setItem(e.item)
		setModal(!modal)
	}

	const [loading, setLoading] = useState(false)
	const deleteProduct = async (props) => {
		setLoading(true)
		delProduct({ colle: props.type, id: props.id, file: props.file })
	}

	const [busca, setBusca] = useState("")
	const [filter, setFilter] = useState([])
	useEffect(() => {
		setFilter(product.filter((name) => name.name.toLowerCase().includes(busca.toLowerCase())))
	}, [busca, product])

	const [page, setPage] = useState(1)
	const [post, setPost] = useState(12)
	const lastPage = page * post
	const firstPost = lastPage - post
	const apiPage = filter.slice(firstPost, lastPage)

	function click() {
		window.scrollTo({ top: 665 })
	}

	// console.log(window.scrollY)
	return (
		<section className="carEdit col-12 d-flex flex-column align-items-center">
			{loading == true ? <Loading /> : null}
			<Change item={item} modal={modal} setModal={setModal} />
			<label
				data-label
				className="col-10 col-md-3 d-flex flex-column align-items-center"
				htmlFor="select">
				<select
					id="setType"
					name="setType"
					data-input
					className="col-12"
					onChange={colletionSelect}
					onClick={typeSelect}>
					<option hidden>Selecione o produto</option>
					{array.map((list, i) => {
						return <option key={i}>{list.type}</option>
					})}
				</select>
			</label>
			<div className="col-6 d-flex align-items-center text-center justify-content-around">
				<h2 className="">Produtos</h2>
				<div className="d-flex align-items-center">
					<Input onChange={(e) => setBusca(e.target.value)} />
				</div>
			</div>
			<div className="cap col-12 d-flex flex-wrap justify-content-cente justify-content-around">
				{filter == "" ? (
					<h3>Nenhum resultado encontrado</h3>
				) : (
					apiPage.map((item) => {
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
										<h6>
											{"R$ " +
												parseFloat(
													MaskChange({
														mask: item.price,
														replace: "$1.$2",
													})
												)}
										</h6>
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
					})
				)}
			</div>
			<div className="col-12">
				<Pagination
					lenght={product.length}
					page={page}
					setPage={setPage}
					click={click}
					post={post}
				/>
			</div>
		</section>
	)
}

export default CardEdit
