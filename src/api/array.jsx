//img
import painting from "../img/painting.png"
import mug from "../img/mug.png"
import funko from "../img/funko.png"
import cushion from "../img/cushion.png"
import shirt from "../img/shirt.png"
//array full site
export const array = [
	{ type: "Quadro", img: painting, link: "painting" },
	{ type: "Caneca", img: mug, link: "mug" },
	{ type: "Funko", img: funko, link: "funko" },
	{ type: "Decoração", img: cushion, link: "cushion" },
	{ type: "Camisa", img: shirt, link: "shirt" },
]

//list
export const List = (props) => {
	return (
		<div data-options="marcas" className="col-12">
			<h5>{props.title}</h5>
			<div className="typeAnimation col-10">
				{props.list.map((animation, i) => {
					return (
						<ul key={i}>
							<li>{animation.type}</li>
						</ul>
					)
				})}
			</div>
		</div>
	)
}
