//img
import Painting from "../img/painting.png"
import Mug from "../img/mug.png"
import Funko from "../img/funko.png"
import Cushion from "../img/cushion.png"
import Shirt from "../img/shirt.png"

export const array = [
	{ type: "Quadro", img: Painting, link: 'painting'},
	{ type: "Caneca", img: Mug, link: 'mug'},
	{ type: "Funko", img: Funko, link: 'funko'},
	{ type: "Decorção", img: Cushion, link: 'cushion'},
	{ type: "Camisa", img: Shirt, link: 'shirt'},
]

//list options
export const List = (props) => {
	return (
		<div data-options="marcas" className="col-12">
			<h5>{props.title}</h5>
			<div className="typeAnimation col-10">
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
