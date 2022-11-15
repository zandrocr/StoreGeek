//hook
import { useState, useEffect } from "react"
//components
import Card from "../Components/Card"
import Carous from "../Components/Carousel"
//api
import { List } from "../api/array"
import { getDoc, Pages } from "../api/submitProduct"
//css
import "../css/painting.css"
import "../css/options.css"
import bannerO from "../img/banners/jujutsu.png"
import bannerTw from "../img/banners/onePiece.png"
import bannerT from "../img/banners/dragon.png"
import Page from "../Components/Page"

const Painting = () => {
	const [quadro, setQuadro] = useState([])
	useEffect(() => {
		getDoc({ set: setQuadro, colle: "Quadro" })
	}, [])

	const [view, setView] = useState(false)
	function changeOptions() {
		if (window.scrollY >= 390) {
			setView(true)
		} else setView(false)
	}
	window.addEventListener("scroll", changeOptions)

	// const [more, setMore] = useState(4)
	// const [down, setDown] = useState(0)
	// function click(e) {
	// 	e = setPage(page + 1)
	// 	e = setDown(down + 4)
	// 	window.scrollTo({ top: 300 })
	// }
	// function dClick(e) {
	// 	page == 1 ? page : (e = setPage(page - 1))
	// 	down == 0 ? down : (e = setDown(down - 4))
	// 	window.scrollTo({ top: 300 })
	// }

	const [page, setPage] = useState(1)
	const [post, setPost] = useState(10)

	const lastPage = page * post
	const firstPost = lastPage - post
	const apiPage = quadro.slice(firstPost, lastPage)

	return (
		<section className="page col-12 d-flex flex-column justify-content-end">
			<Carous imgO={bannerO} imgTw={bannerTw} imgT={bannerT} />
			<div className="d-flex down">
				<div
					data-option={view == true ? "view" : ""}
					className={`col-10 col-md-5 col-lg-2 d-flex flex-column align-items-center justify-contente center`}>
					<List title="Marcas" list={animation} />
					<List title="Melhores preços" list={value} />
				</div>
				<section
					className={`${
						view == true ? "col-lg-12" : "col-lg-10"
					} d-flex justify-content-end`}>
					<div
						className={`${
							view == true ? "col-lg-10" : "col-lg-12"
						} d-flex flex-wrap justify-content-around`}>
						{apiPage.map((quadro, index) => {
							return (
								<Card
									key={index}
									id={quadro.id}
									file={quadro.file}
									name={quadro.name}
									price={quadro.price}
									description={quadro.description}
								/>
							)
						})}
					</div>
				</section>
			</div>
			<div className="col-12 d-flex justify-content-around">
				<Page post={quadro.length} page={page} setPage={setPage} />
			</div>
		</section>
	)
}

export default Painting

const animation = [
	{ type: "Marvel" },
	{ type: "Naruto" },
	{ type: "DC Comics" },
	{ type: "One Piece" },
	{ type: "Ciência" },
	{ type: "Hunter x Hunter" },
	{ type: "Jujutsu Kaisen" },
]

const value = [
	{ type: "De $R5,00 a R$20,00" },
	{ type: "De $R20,00 a R$50,00" },
	{ type: "De $R50,00 a R$100,00" },
	{ type: "De $R100,00 a R$200,00" },
]
