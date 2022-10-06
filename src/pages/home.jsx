//api
import { Api } from "../api/api"
import { axiosGet } from "../api/submitProduct"
//hook
import { useEffect, useState } from "react"
//components
import Card from "../Components/Card"
//css
import "../css/home.css"
import mug from "../img/mug.png"

const Home = () => {
	// const [quadro, setQuadro] = useState([
	// 	{ id: 1, name: "quadro" },
	// 	{ id: 2, name: "caneca" },
	// ])

	const [quadro, setQuadro] = useState([])
	const [quadroOne, setQuadroOne] = useState([])

	axiosGet({ set: setQuadro, id: "2" }, { set: setQuadroOne, id: "3" })
	// axiosGet({ set: setQuadroOne, id: "3" })

	// console.log(quadro)

	return (
		<section
			data-home
			className="col-12 d-flex flex-column justify-content-around align-items-center">
			<div data-subhome className="col-11 d-flex justify-content-center">
				<span data-cel className="col-11"></span>
			</div>
			<div className="col-11 d-flex flex-column align-items-center justify-content-center">
				<div className="col-12 d-flex justify-content-center">
					<Card
						id={quadro.id}
						file={quadro.file}
						name={quadro.name}
						price={quadro.price}
						description={quadro.description}
					/>
					<Card
						id={quadroOne.id}
						file={quadroOne.file}
						name={quadroOne.name}
						price={quadroOne.price}
						description={quadroOne.description}
					/>
				</div>
				<div data-car className="col-11 col-lg-11 d-flex justify-content-center">
					{/* {quadro.map((quadro) => {
						return (
							<Card
								id={quadro.id}
								file={quadro.file}
								name={quadro.name}
								price={quadro.price}
								description={quadro.description}
							/>
						)
					})} */}
				</div>
				<div data-car className="col-11 d-flex justify-content-center">
					{/* {quadro.map((quadro) => {
						return (
							<Card
								id={quadro.id}
								file={quadro.file}
								name={quadro.name}
								price={quadro.price}
								description={quadro.description}
							/>
						)
					})} */}
				</div>
				<div data-car className="col-11 d-flex justify-content-center">
					{/* {quadro.map((quadro) => {
						return (
							<Card
								id={quadro.id}
								file={quadro.file}
								name={quadro.name}
								price={quadro.price}
								description={quadro.description}
							/>
						)
					})} */}
				</div>
				<div data-car className="col-11 d-flex justify-content-center">
					{/* {quadro.map((quadro) => {
						return (
							<Card
								id={quadro.id}
								file={quadro.file}
								name={quadro.name}
								price={quadro.price}
								description={quadro.description}
							/>
						)
					})} */}
				</div>
				<div data-car className="col-11 d-flex justify-content-center">
					{/* {quadro.map((quadro) => {
						return (
							<Card
								id={quadro.id}
								file={quadro.file}
								name={quadro.name}
								price={quadro.price}
								description={quadro.description}
							/>
						)
					})} */}
				</div>
			</div>
		</section>
	)
}

export default Home
