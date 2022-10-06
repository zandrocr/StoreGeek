//css
import "../css/Navbar.css"
//hook
import { Link } from "react-router-dom"
import { array } from "../api/array"
import { useState } from "react"

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
			<div data-row={viw} className="col-12 d-flex align-items-center">
				<Link to="/" data-logo className="d-flex align-items-center">
					<h2 data-text={viw}>Ani</h2>
					<h2 data-text={viwT}>Fun</h2>
				</Link>
			</div>
			<div
				data-button={openO}
				className="d-flex flex-column align-items-center justify-content-center"
				onClick={handleOpen}>
				<div data-line={openO}></div>
				<div data-line={openT}></div>
			</div>
			<nav
				data-nav={openO}
				className="d-flex flex-column justify-content-around align-items-center">
				{array.map((produt, index) => {
					return (
						<div key={produt.id}>
							<Link
								to="/painting"
								data-link={openO}
								className="d-flex align-items-center justify-content-center"
								onClick={handleClose}>
								<img src={produt.img} alt="Painting" />
								<h6>{produt.type}</h6>
							</Link>
						</div>
					)
				})}
			</nav>
		</div>
	)
}

export default Navbar
