import "../css/pagination.css"

const Pagination = (props) => {
	let pages = []
	for (let i = 1; i <= Math.ceil(props.lenght / props.post); i++) {
		pages.push(i)
	}

	return (
		<div className="d-flex justify-content-end">
			<div className="pagination col-10 d-flex justify-content-around" onClick={props.click}>
				{pages.map((page, i) => {
					return (
						<button key={i} onClick={() => props.setPage(page)}>
							{page}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default Pagination
