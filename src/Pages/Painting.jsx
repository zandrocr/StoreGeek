import "../css/painting.css"
import "../css/options.css"
import { animation } from "../api/array"
import { getDoc } from "../api/submitProduct"
import { useState } from "react"

const Painting = () => {
	const [quadro, setQuadro] = useState([])

	function selectClik() {
		setTimeout(() => {
			getDoc({ set: setQuadro, colle: editInput })
		}, [])
	}

	return (
		<section className="painting col-12 d-flex justify-content-center">
			<div className="options col-3 d-flex flex-column align-items-center justify-contente center">
				{/* <div data-options="marcas" className="col-12">
					<h5>Marcas</h5>
					<div className="typeAnimation col-10">
						{animation.map((animation, index) => {
							return (
								<ul key={index}>
									<li>{animation.type}</li>
								</ul>
							)
						})}
					</div>
				</div> */}
				{/* <div data-options="preco" className="col-12">
					<h5>Melhores preços</h5>
					<div className="typeAnimation col-10">
						{animation.map((animation) => {
							return (
								<ul>
									<button>{animation.type}</button>
								</ul>
							)
						})}
					</div>
				</div> */}
			</div>
			{quadro.map((quadro) => {
				return (
					<Card
						id={quadro.id}
						file={quadro.file}
						name={quadro.name}
						price={quadro.price}
						description={quadro.description}
					/>
				)
			})}
		</section>
	)
}

export default Painting
