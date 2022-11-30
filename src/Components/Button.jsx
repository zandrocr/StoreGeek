import "../css/button.css"

export const Button = (props) => {
	return (
		<button
			onClick={props.click}
			ref={props.ref}
			onChange={props.onChange}
			data-iconbut={props.data || ""}
			className={`d-flex align-items-center justify-content-center ${props.position}`}>
			<div className="d-flex">
				{props.scr ? <img src={props.scr} alt={props.alt} /> : <p>{props.title}</p>}
			</div>
		</button>
	)
}
