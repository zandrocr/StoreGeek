//hooks
import { useEffect, useState } from "react"
import { getDoc } from "../api/submitProduct"

const Filter = (props) => {
	const [product, setProduct] = useState([])
	const [list, setList] = useState([])

	useEffect(() => {
		getDoc({ set: setProduct, colle: props.colle })
	}, [])

	useEffect(() => {
		setList(
			product.filter((name) => name.name.toLowerCase().includes(props.filt.toLowerCase()))
		)
	}, [props.filt, product])

	return (
		<div className="d-flex flex-column align-items-center">
			{props.filt.length == 0
				? ""
				: list.map((prop, i) => {
						return (
							<li
								key={i}
								className="item col-11 d-flex align-items-center justify-content-between">
								<img src={prop.file} alt={prop.name} />
								<p className="d-flex flex-wrap align-items-center">
									{prop.description}
								</p>
								<div className="col-4 d-flex flex-column align-items-center">
									<h3>{prop.name}</h3>
									<h6>R$ {prop.price}</h6>
								</div>
							</li>
						)
				  })}
		</div>
	)
}

export default Filter
