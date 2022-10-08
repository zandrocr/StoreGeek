//img
import Painting from "../img/painting.png"
import Mug from "../img/mug.png"
import Funko from "../img/funko.png"
import Cushion from "../img/cushion.png"
import Shirt from "../img/shirt.png"

export const array = [
	{ type: "Quadro", img: Painting },
	{ type: "Caneca", img: Mug },
	{ type: "Funko", img: Funko },
	{ type: "Decorção", img: Cushion },
	{ type: "Camisa", img: Shirt },
]

//list options
export const List = (props) => {
	return (
		<div data-options="marcas" className="col-12">
			<h5>{props.title}</h5>
			<div className="typeAnimation col-10">
				{/* <p>{props.list}</p> */}
				{props.list.map((animation, index) => {
					return (
						<ul key={index}>
							<li>{animation.type}</li>
						</ul>
					)
				})}
			</div>
		</div>
	)
}
