const Card = (props) => {
	return (
		<div
			data-card
			id={props.id}
			className="d-flex flex-column align-items-center justify-content-between">
			<img src={props.file} alt="product" className="col-12" />
			<div className="describ d-flex flex-column col-11 align-items-center justify-content-around">
				<div className="col-12 d-flex justify-content-between">
					<h4>{props.name}</h4>
					<h6>R$ {props.price}</h6>
				</div>
				<div>
					<p>{props.description}</p>
				</div>
			</div>
		</div>
	)
}

export default Card
