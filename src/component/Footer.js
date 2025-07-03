import '../css/footer/footer.css'
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();

    const handleNavigate = (nav) => {
        navigate(nav)
    }

    return (
        <footer>
            <div className='contactAndNavWrap'>
                <div className='contact'>
                    <h2>Contact</h2>
                    <span className='bar'></span>
                    <a href="mailto:tkdals58799@gmail.com">tkdals58799@gmail.com</a>
                </div>
                <div className='rightWrap'>

                    <div className='footerNav'>
                        <h2>Nav</h2>
                        <span className='bar'></span>
                        <div>
                            <p onClick={() => handleNavigate('/')}>Home</p>
                            <p onClick={() => handleNavigate('/about')}>About</p>
                            <p onClick={() => handleNavigate('/works')}>Works</p>
                            <p onClick={() => handleNavigate('/archive')}>Archive</p>
                        </div>
                    </div>

                    <div className='footerToolWrap'>
                        <h2>can use</h2>
                        <span className='bar'></span>
                        <ul>
                            <li><img src="/html.svg" alt="htmlImg" /></li>
                            <li><img src="/css.svg" alt="cssImg" /></li>
                            <li><img src="react.svg" alt="reactImg" /></li>
                            <li><img src="framerMotion.svg" alt="framerMotionImg" /></li>
                            <li><img src="redux.svg" alt="reduxImg" /></li>
                            <li><img src="github.svg" alt="gitHubImg" /></li>
                            <li><img src="netlify.svg" alt="netlifyImg" /></li>
                            <li><img src="figma.svg" alt="figmaImg" /></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='footerText'>
                <p>PORTFOLIO VER.2</p>
            </div>
        </footer>
    )
}

export default Footer;
