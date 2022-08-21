//css
import "../css/Navbar.css"
//hook
import { Link } from "react-router-dom"
import { useState } from "react"
//img
import Painting from "../img/painting.png"
import Mug from "../img/mug.png"
import Funko from "../img/funko.png"
import Cushion from "../img/cushion.png"
import Shirt from "../img/shirt.png"

const Navbar = () => {
	const [click, setClick] = useState(false)
	let openO = click == true ? "openO" : false
	let openT = click == true ? "openT" : false

	function handleOpen() {
		setClick(!click)
	}

	function handleClose() {
		setClick(false)
	}

	const [view, setView] = useState(false)
	function changeBackground() {
		if (window.scrollY >= 200) {
			setView(true)
		} else setView(false)
	}

	window.addEventListener("scroll", changeBackground)

	let viw = view == true ? "openO" : false
	let viwT = view == true ? "openT" : "offT"

	return (
		<div data-navbar>
			<div data-row={viw} className="col-12">
				<Link to="/" data-logo className="d-flex align-items-center">
					<h2 data-text={viw}>Ani</h2>
					<h2 data-text={viwT}>Fun</h2>
				</Link>
			</div>

			<nav
				data-nav={openO}
				className="d-flex flex-column justify-content-around align-items-center">
				<div
					data-button={openO}
					className="d-flex flex-column align-items-center justify-content-center"
					onClick={handleOpen}>
					<div data-line={openO}></div>
					<div data-line={openT}></div>
				</div>

				<Link
					to="/painting"
					data-link={openO}
					className="d-flex align-items-center justify-content-center"
					onClick={handleClose}>
					<img src={Painting} alt="Painting" />
					<h6>Quadro</h6>
				</Link>
				<Link
					to="/mug"
					data-link={openO}
					className="d-flex align-items-center justify-content-center"
					onClick={handleClose}>
					<img src={Mug} alt="Mug" />
					<h6>Caneca</h6>
				</Link>
				<Link
					to="/funko"
					data-link={openO}
					className="d-flex align-items-center justify-content-center"
					onClick={handleClose}>
					<img src={Funko} alt="Funko" />
					<h6>Funko</h6>
				</Link>
				<Link
					to="/cushion"
					data-link={openO}
					className="d-flex align-items-center justify-content-center"
					onClick={handleClose}>
					<img src={Cushion} alt="Cushion" />
					<h6>Almofada</h6>
				</Link>
				<Link
					to="/shirt"
					data-link={openO}
					className="d-flex align-items-center justify-content-center"
					onClick={handleClose}>
					<img src={Shirt} alt="Shirt" />
					<h6>Camisa</h6>
				</Link>
			</nav>
		</div>
	)
}

export default Navbar
