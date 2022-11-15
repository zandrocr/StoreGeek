//css
import "../css/navbar.css"
import cart from "../img/cart.png"
import loupe from "../img/loupe.png"
import user from "../img/user.png"
//hook
import { Link } from "react-router-dom"
import { array } from "../api/array"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import Search from "./Search"

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
	useEffect(() => {
		function changeBackground() {
			if (window.scrollY >= 200) {
				setView(true)
			} else setView(false)
		}
		window.addEventListener("scroll", changeBackground)
	}, [])

	let viw = view == true ? "openO" : false
	let viwT = view == true ? "openT" : "offT"

	const [busca, setBusca] = useState(false)
	function openBusca() {
		setBusca(!busca)
	}

	return (
		<section data-navbar>
			<div data-row={viw} className="col-12 d-flex">
				<Link to="/" data-logo className="d-flex align-items-center">
					<h2 data-text={viw}>Ani</h2>
					<h2 data-text={viwT}>Fun</h2>
				</Link>
				<Search state={busca} set={setBusca} />
				<Button
					scr={loupe}
					position="position-absolute d-md-none"
					data="loupe"
					click={openBusca}
				/>
				<Button scr={cart} position="position-absolute" data="cart" />
				<Button scr={user} position="position-absolute" data="user" />
			</div>

			<div
				data-button={openO}
				className="d-flex flex-column align-items-center justify-content-center col-12"
				onClick={handleOpen}>
				<div data-line={openO}></div>
				<div data-line={openT}></div>
			</div>
			<nav
				data-nav={openO}
				className="d-flex flex-column justify-content-around align-items-center col-9 col-md-4 col-lg-3">
				{array.map((produt, i) => {
					return (
						<div key={i} className="col-10 d-flex justify-content-">
							<Link
								to={`${produt.link}`}
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
		</section>
	)
}

export default Navbar
