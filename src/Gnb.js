import React from 'react'
import { Link } from 'react-router-dom';
import './css/gnb/gnb.css'

function Gnb() {
    
    return (
        <div className="gnbWrap">
            <ul>
                <li className='logoGnb'><Link to="/">Logo</Link></li>
                <li className='mainGnb'><Link to="/">Main</Link></li>
                <li className='aboutGnb'><Link to="/about">About</Link></li>
                <li className='worksGnb'><Link to="/works">Works</Link></li>
            </ul>
        </div>
    )
}

export default Gnb;
