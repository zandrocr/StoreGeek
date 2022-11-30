import Card from "./Card"
//css
import "../css/scroll.css"
//hook
import { getDoc } from "../api/submitProduct"
import { useEffect, useState, useRef } from "react"
import Carousel from "react-bootstrap/Carousel"

const Scroll = (props) => {
	const [api, setApi] = useState([])

	useEffect(() => {
		getDoc({ set: setApi, colle: props.api })
	}, [])

	// console.log(window.screen.width)

	return (
		<section className="scroll col-12">
			<h3>{props.title}</h3>
			{window.screen.width >= 768 ? (
				<Carousel>
					<Carousel.Item interval={5000}>
						<div className="d-flex justify-content-around">
							{api.slice(props.index0, props.index1).map((product, index) => {
								return (
									<div
										key={index}
										className="col-3 d-flex justify-content-around">
										<Card
											id={product.id}
											file={product.file}
											name={product.name}
											price={product.price}
										/>
									</div>
								)
							})}
						</div>
					</Carousel.Item>
					<Carousel.Item interval={5000}>
						<div className="d-flex justify-content-around">
							{api.slice(props.index2, props.index3).map((product, index) => {
								return (
									<div
										key={index}
										className="col-3 d-flex justify-content-around">
										<Card
											id={product.id}
											file={product.file}
											name={product.name}
											price={product.price}
										/>
									</div>
								)
							})}
						</div>
					</Carousel.Item>
				</Carousel>
			) : (
				<div className="d-flex justify-content-center">
					<div className="col-3 d-flex justify-content-center">
						<Carousel>
							{api.slice(props.index0, props.index3).map((product, index) => {
								return (
									<Carousel.Item interval={5000} key={index}>
										<Card
											id={product.id}
											file={product.file}
											name={product.name}
											price={product.price}
										/>
									</Carousel.Item>
								)
							})}
						</Carousel>
					</div>
				</div>
			)}
		</section>
	)
}

export default Scroll
