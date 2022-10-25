import "../css/alert.css"

export const Alert = (props) => {
	return (
		<h1 data-alert className="d-flex flex-column align-items-center text-center justify-content-center">
			{props.text}
		</h1>
	)
}
