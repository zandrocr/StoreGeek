import { useState } from "react"
import Input from "../Components/input"
//css
import x from "../img/close.png"
import "../css/search.css"
import { Button } from "./Button"
import Filter from "./Filter"

const Search = (props) => {
	const [filter, setFilter] = useState("")

	const clos = () => {
		setFilter("")
		props.set(!props.state)
	}

	function filt(e) {
		setFilter(e.target.value)
	}

	var largura = window.screen.width

	// console.log(Filter.length)

	return (
		<section
			data-search={props.state == true ? "open" : ""}
			className="col-12 col-lg-6 d-flex flex-column justify-content-center position-fixed position-md-absolute">
			<div className="d-flex justify-content-center">
				<Input onChange={filt} value={filter} className="col-12" />
				{filter.length >= 1 || largura <= 768 ? <Button click={clos} scr={x} /> : null}
			</div>

			{filter.length >= 1 ? (
				<div className="list col-12">
					<Filter colle="Quadro" filt={filter} />
					<Filter colle="Caneca" filt={filter} />
					<Filter colle="Funko" filt={filter} />
					<Filter colle="Decoração" filt={filter} />
					<Filter colle="Camisa" filt={filter} />
				</div>
			) : (
				""
			)}
		</section>
	)
}

export default Search
