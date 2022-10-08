import Carousel from "react-bootstrap/Carousel"

function Carous(props) {
	return (
		<Carousel fade>
			<Carousel.Item interval={3000}>
				<div className="d-flex justify-content-center">
					<img className="d-block col-12" src={props.imgO} alt="First slide" />
				</div>
				{/* <Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption> */}
			</Carousel.Item>
			<Carousel.Item interval={3000}>
				<div className="d-flex justify-content-center">
					<img className="d-block w-100" src={props.imgTw} alt="Second slide" />
				</div>

				{/* <Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption> */}
			</Carousel.Item>
			<Carousel.Item interval={3000}>
				<div className="d-flex justify-content-center">
					<img className="d-block w-100" src={props.imgT} alt="Third slide" />
				</div>

				{/* <Carousel.Caption>
					<h3>Third slide label</h3>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption> */}
			</Carousel.Item>
		</Carousel>
	)
}

export default Carous
