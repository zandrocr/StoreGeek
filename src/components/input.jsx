import "../css/input.css"

const Input = ({ htmfor, title, type, place, change, value }) => {
	return (
		<div>
			<label htmlFor={htmfor} className="label d-flex flex-column align-item">
				<h4>{title}</h4>
				<input
					className="input"
					autoComplete="off"
					type={type}
					id={htmfor}
					placeholder={place}
					onChange={change}
					value={value}
				/>
			</label>
		</div>
	)
}

export default Input
