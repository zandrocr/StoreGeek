import "../css/input.css"

const Input = ({ id, htmfor, title, type, placeholder, onChange, value, className }) => {
	return (
		<div className="col-12">
			<label htmlFor={htmfor} className="label d-flex flex-column align-item">
				<h4>{title}</h4>
				<input
					className={`input ${className}`}
					autoComplete="off"
					type={type}
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
				/>
			</label>
		</div>
	)
}

export default Input
