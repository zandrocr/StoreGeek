import "../css/input.css"

const Input = (props) => {

	return (
		<label data-label htmlFor={props.id} className={`d-flex flex-column ${props.className}`}>
			<h4>{props.title}</h4>
			<input
				data-input
				value={props.value}
				name={props.id}
				autoComplete="off"
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				onChange={props.onChange}
				maxLength={props.max}
			/>
			<div className="d-flex justify-content-center">
				{props.src ? <img data-image id={props.id} src={props.src}></img> : null}
			</div>
		</label>
	)
}

export default Input
