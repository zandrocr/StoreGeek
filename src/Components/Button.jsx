import "../css/button.css"

export const Button = (props) => {
	return (
		<button
			onClick={props.click}
			data-iconbut={props.data || ""}
			className={`d-flex align-items-center justify-content-center ${props.position}`}>
			<div className="d-flex">
				<img src={props.scr} alt={props.alt} />
			</div>
		</button>
	)
}
