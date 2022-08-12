//css
import '../css/searche.css'
//img
import Compass from '../img/iconNavbar/pesquisa.png'

const Searche = ({click}) => {

    return (
        <div>
            <label data-seache={click == true ? 'open' : ''} htmlFor="searche" className='col-10 col-md-4 col-lg-4 d-flex align-items-center'>
                <input id='searche' type="text" className='col-9' />
                <img src={Compass} alt="compass" className='col-1' />
            </label>
        </div>
    )
}

export default Searche
