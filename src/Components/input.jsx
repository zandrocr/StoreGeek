import "../css/input.css"

const Input = (props) => {

	return (
		<label data-input htmlFor={props.id} className={`d-flex flex-column ${props.className}`}>
			<h4>{props.title}</h4>
			<input
				data-label
				value={props.value}
				name={props.id}
				autoComplete="off"
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
			<div className="d-flex justify-content-center">
				{props.src ? (
					<img id={props.id} src={props.src} className="col-11 col-lg-4" />
				) : null}
			</div>
		</label>
	)
}

export default Input

//(e) => props.onChange(e.target.value)
// ? props.onChange
// : null
// ? null
// : (e) => props.onFile(e.target.files[0])
