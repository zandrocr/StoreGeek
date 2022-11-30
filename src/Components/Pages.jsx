//hook
import { useState, useEffect } from "react"
//components
import Card from "../Components/Card"
import Carous from "../Components/Carousel"
//api
import { List } from "../api/list"
import { getDoc } from "../api/submitProduct"
//css
import "../css/pages.css"
import "../css/options.css"
import bannerO from "../img/banners/jujutsu.png"
import bannerTw from "../img/banners/onePiece.png"
import bannerT from "../img/banners/dragon.png"
import Pagination from "../Components/Pagination"

const Pages = (props) => {
	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	const [product, setProduct] = useState([])
	useEffect(() => {
		getDoc({ set: setProduct, colle: `${props.colle}` })
	}, [])

	const [view, setView] = useState(false)
	function changeOptions() {
		window.scrollY >= 200 ? setView(true) : setView(false)
	}
	window.addEventListener("scroll", changeOptions)

	const [page, setPage] = useState(1)
	const [post, setPost] = useState(12)
	const lastPage = page * post
	const firstPost = lastPage - post
	const apiPage = product.slice(firstPost, lastPage)

	function click() {
		product.slice(firstPost, lastPage)
		window.scrollTo({ top: 330 })
	}

	// console.log(window.scrollY)
	return (
		<section className="page col-12 d-flex flex-column justify-content-end">
			<Carous imgO={bannerO} imgTw={bannerTw} imgT={bannerT} />
			<div className="d-flex down">
				<div
					data-option={view == true ? "view" : ""}
					className={`col-10 col-md-5 col-lg-2 d-flex flex-column align-items-center justify-contente center`}>
					<List title="Marcas" list={props.animation} />
					<List title="Preços" list={props.value} />
				</div>
				<section
					className={`cards ${
						view == true ? "col-lg-12" : "col-lg-12"
					} d-flex justify-content-end`}>
					<div
						className={`${
							view == true ? "col-lg-10" : "col-lg-10"
						} d-flex flex-wrap justify-content-around`}>
						{apiPage.map((product, index) => {
							return (
								<Card
									key={index}
									id={product.id}
									file={product.file}
									name={product.name}
									price={product.price}
									description={product.description}
								/>
							)
						})}
					</div>
				</section>
			</div>
			<Pagination
				lenght={product.length}
				page={page}
				setPage={setPage}
				click={click}
				post={post}
			/>
		</section>
	)
}

export default Pages
