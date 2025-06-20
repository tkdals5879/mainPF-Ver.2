import { Link } from 'react-router-dom';
import './css/gnb/gnb.css'

function Gnb() {

    const handleMailTo = () => {
        window.location.href = "mailto:tkdals58799@gmail.com";
    }

    return (
        <div className="gnbWrap">
            <ul>
                <li className='logoGnb'><Link to="/">sangmin.L</Link></li>
                <li className='mainGnb'><Link to="/">Main</Link></li>
                <li className='aboutGnb'><Link to="/about">About</Link></li>
                <li className='worksGnb'><Link to="/works">Works</Link></li>
                <li className='contactGnb' onClick={handleMailTo}>Contact</li>
            </ul>
        </div>
    )
}

export default Gnb;
