import "../css/loading.css"

const Loading = () => {
	return (
		<div className="loading col-12 d-flex align-items-center justify-content-center">
			<div className="lds-ring d-flex align-items-center justify-content-center">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loading
