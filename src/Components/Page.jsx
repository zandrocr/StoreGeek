const Page = (props) => {
	let pages = []
	for (let i = 1; i <= Math.ceil(props.post / 10); i++) {
		pages.push(i)
		// window.scrollTo({ top: 300 })
	}

	// () => props.setPage(page)
	function click(e) {
		props.setPage(e.page)
	}

	return (
		<div className="col-12 d-flex justify-content-end">
			<div className="col-10 d-flex justify-content-center">
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

export default Page
