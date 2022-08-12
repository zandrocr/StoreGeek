//import hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'
//imports css
import '../css/navbar.css'
//import img
import coffe from '../img/iconNavbar/coffee-cup.png'
import cushion from '../img/iconNavbar/cushion.png'
import funko from '../img/iconNavbar/funko.png'
import painting from '../img/iconNavbar/painting.png'
import tshirt from '../img/iconNavbar/tshirt.png'
//components
import Searche from './searchBar'

const Navbar = () => {
    let [click, setClick] = useState(false)
    function handleOpen() {
        setClick(!click)
    }
    function handleClose() {
        setClick(false)
    }

    //scroll view
    const [nav, setNav] = useState(false)
    function changeBackground() {
        if (window.scrollY >= 200) {
            setNav(true)
        } else setNav(false)
    }
    window.addEventListener('scroll', changeBackground)

    return (
        <div>
            <Searche click={click} />
            <nav
                data-navbar={click == true ? 'open' : ''}
                className={'text-center d-flex flex-column align-items-center justify-content-around'}>
                <Link to="/" data-logo="div" onClick={handleClose}>
                    <h1 data-logo={nav ? 'viewport' : ''}>AniFun</h1>
                </Link>
                <div
                    data-button={click == true ? 'open' : ''}
                    className="d-flex flex-column align-items-center justify-content-center"
                    onClick={handleOpen}>
                    <div data-line={click == true ? 'one' : ''}></div>
                    <div data-line={click == true ? 'two' : ''}></div>
                </div>
                <section
                    data-nav
                    className="col-9 d-flex flex-column align-items-center justify-content-around">
                    <Link
                        data-link={click == true ? 'one' : ''}
                        to="/painting"
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleClose}>
                        <img src={painting} alt="quandros geeks" />
                        <h6 data-title={click == true ? 'open' : ''}>Quadro</h6>
                    </Link>
                    <Link
                        data-link={click == true ? 'one' : ''}
                        to="/shirt"
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleClose}>
                        <img src={coffe} alt="canecas geeks" />
                        <h6 data-title={click == true ? 'open' : ''}>Canecas</h6>
                    </Link>
                    <Link
                        data-link={click == true ? 'one' : ''}
                        to="/funkos"
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleClose}>
                        <img src={funko} alt="funkos" />
                        <h6 data-title={click == true ? 'open' : ''}>Funkos</h6>
                    </Link>
                    <Link
                        data-link={click == true ? 'one' : ''}
                        to="/almofa"
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleClose}>
                        <img src={cushion} alt="almofada geeks" />
                        <h6 data-title={click == true ? 'open' : ''}>Almofada</h6>
                    </Link>
                    <Link
                        data-link={click == true ? 'one' : ''}
                        to="/shirt"
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleClose}>
                        <img src={tshirt} alt="camisas geeks" />
                        <h6 data-title={click == true ? 'open' : ''}>Camisas</h6>
                    </Link>
                </section>
            </nav>
        </div>
    )
}

export default Navbar
