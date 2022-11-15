//hook
import { useState, useEffect } from "react"
//components
import Card from "../Components/Card"
import Carous from "../Components/Carousel"
//api
import { List } from "../api/array"
import { getDoc } from "../api/submitProduct"
//
import bannerO from "../img/banners/jujutsu.png"
import bannerTw from "../img/banners/onePiece.png"
import bannerT from "../img/banners/dragon.png"

const Mug = () => {
	const [Mug, setMug] = useState([])

	useEffect(() => {
		getDoc({ set: setMug, colle: "Caneca" })
	}, [])

	const [view, setView] = useState(false)
	function changeOptions() {
		if (window.scrollY >= 390) {
			setView(true)
		} else setView(false)
	}
	window.addEventListener("scroll", changeOptions)

	return (
		<section className="page col-12 d-flex flex-column justify-content-end">
			<Carous imgO={bannerO} imgTw={bannerTw} imgT={bannerT} />
			<div className="d-flex down">
				<div
					data-option={view == true ? "view" : ""}
					className={`col-10 col-md-5 col-lg-2 d-flex flex-column align-items-center justify-contente center`}>
					<List title="Mundo" list={animation} />
					<List title="Melhores preços" list={value} />
				</div>
				<section className="d-flex justify-content-end">
					<div
						className={`${
							view == true ? "col-lg-10" : "col-lg-12"
						} d-flex flex-wrap justify-content-around`}>
						{Mug.map((Mug, index) => {
							return (
								<Card
									key={index}
									id={Mug.id}
									file={Mug.file}
									name={Mug.name}
									price={Mug.price}
									description={Mug.description}
								/>
							)
						})}
					</div>
				</section>
			</div>
		</section>
	)
}

export default Mug

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
