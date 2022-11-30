import "../css/card.css"

const Card = (props) => {
	return (
		<div
			data-card
			id={props.id}
			className="d-flex flex-column align-items-center">
			<img src={props.file} alt="product" className="col-12" />
			<div className="describ d-flex flex-column col-11 align-items-center justify-content-around">
				<div className="col-12 d-flex flex-column justify-content-between">
					<h4>{props.name}</h4>
				</div>
				<div className="col-12 d-flex justify-content-end">
					<h6>
						R$ {props.price}
					</h6>
				</div>
				<div>
					<p>{props.description}</p>
				</div>
				<button className="col-5">Buy</button>
			</div>
		</div>
	)
}

export default Card
