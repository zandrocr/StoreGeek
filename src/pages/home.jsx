import '../css/home.css'
//img
import Deadpoo from '../img/carrossel/canecaDeadpoo.png'
import Star from '../img/carrossel/canecaStar.png'
import Game from '../img/carrossel/games.png'
import Hero from '../img/carrossel/quadroH.png'
import Queen from '../img/carrossel/queen_elizabeth.png'
import Kimetsu from '../img/carrossel/kimetsu.png'
//hooks
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
    return (
        <section className="col-12 d-flex flex-column align-items-center">
            <div
                data-home
                className="carousel slide col-11 col-md-12"
                data-bs-ride="carousel">
                <Carousel data-carousel>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center">
                            <img src={Deadpoo} alt="First slide" />
                        </div>
                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Caneca Deadpool</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center">
                            <img src={Star} alt="Third slide" />
                        </div>
                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Caneca Start Wars</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center">
                            <img src={Hero} alt="Second slide" />
                        </div>

                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Quadros de herois</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center">
                            <img src={Game} alt="Second slide" />
                        </div>

                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Quadros de games</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center ">
                            <img src={Queen} alt="Second slide" />
                        </div>
                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Funko POP Rainha Elizabeth</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="d-flex justify-content-center ">
                            <img src={Kimetsu} alt="Second slide" />
                        </div>
                        <Carousel.Caption
                            data-text
                            className="col-11 col-md-7 d-flex flex-column justify-content-center">
                            <h3>Funko POP Kimetsu no Yaiba</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div data-new className="d-flex justify-content-center col-12"></div>
        </section>
    )
}

export default Home
