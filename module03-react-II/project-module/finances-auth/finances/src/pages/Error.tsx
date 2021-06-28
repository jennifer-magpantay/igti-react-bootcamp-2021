import { Link } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import Image from "../assets/images/error-image.jpg";

type Path = {
    location: Location
}

export function Error(path: Path) {     
 
    return (
        <>
            <Header />
            <Main>
                <div className="error__container">
                    <div className="error__text">
                        <h1 className="error__title">! ERROR 404</h1>
                        <h2 className="error__subtitle">Yikes!! Something seems wrong!!</h2>
                        <h3>Not match found for "{path.location.pathname}"</h3>
                        <p>The page you are looking for does not exist or is not available. Make sure you are logged in to access the url.</p>
                        <p>Refresh your browser or click <Link to="/" className="error__link">here</Link> to get back to the home.</p>
                    </div>

                    <div className="error__image">
                        <img loading="lazy" src={Image} alt="Error illustration" />
                        <p className="caption"><a href="http://www.freepik.com">Designed by pch.vector / Freepik</a></p>
                    </div>                    
                </div>
            </Main>
        </>
    );
}