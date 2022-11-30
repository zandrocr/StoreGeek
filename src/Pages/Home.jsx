//hook
//components
import Scroll from "../Components/Scroll"
import Carous from "../Components/Carousel"
//css
import "../css/home.css"
import gee from "../img/home/gee.jpg"
import geek from "../img/home/geek.jpg"
import otaku from "../img/home/otaku.png"

const Home = () => {
	return (
		<section
			data-home
			className="col-12 d-flex flex-column justify-content-around align-items-center">
			<div data-subhome className="col-11 d-flex justify-content-center">
				<span data-cel className="col-11">
					<Carous imgO={gee} imgTw={geek} imgT={otaku} interva={7000} />
				</span>
			</div>
			<div className="col-11 d-flex flex-column align-items-center justify-content-center">
				<Scroll title="Quadros" api="Quadro" index0={3} index1={7} index2={7} index3={11} />
				<Scroll title="Canecas" api="Caneca" index0={3} index1={7} index2={7} index3={11} />
				<Scroll title="Funkos" api="Funko" index0={3} index1={7} index2={7} index3={11} />
				<Scroll
					title="Decorações"
					api="Decoração"
					index0={3}
					index1={7}
					index2={7}
					index3={11}
				/>
				<Scroll title="Camisas" api="Camisa" index0={3} index1={7} index2={7} index3={11} />
			</div>
		</section>
	)
}

export default Home
