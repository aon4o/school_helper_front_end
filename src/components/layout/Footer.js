import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faCoffee, faGlobe, faHeart} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <footer>
            <Container className="d-flex flex-wrap justify-content-between align-items-center py-3">
                <div className="col-md-4 d-flex align-items-center">
                    <a className="mb-3 me-3 mb-md-0 text-muted lh-1" href={"https://github.com/aon2003"}>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a className="mb-3 me-3 mb-md-0 text-muted lh-1" href="/#">
                        <FontAwesomeIcon icon={faCode} />
                    </a>
                    <span className="text-muted">
                        © 2021 ELSYS Helper, Inc
                    </span>
                </div>

                <div className="justify-content-center">
                    <span className="text-muted">
                        Made with <FontAwesomeIcon icon={faHeart}/> and <FontAwesomeIcon icon={faCoffee} /> by <a className="text-muted" href="https://www.linkedin.com/in/alex-naida/">Alex Naida</a>
                    </span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li>
                        <span className="text-muted">ELSYS / TUES</span>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href={"https://www.tues.bg/"} rel="noopener noreferrer" target="_blank">
                            <FontAwesomeIcon icon={faGlobe}/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href={"https://www.instagram.com/tues.bg/"} rel="noopener noreferrer" target="_blank">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href={"https://www.linkedin.com/school/tues/"} rel="noopener noreferrer" target="_blank">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                    </li>
                </ul>
            </Container>
        </footer>
    )
}

export default Footer;