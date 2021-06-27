import { Link } from "react-router-dom";

import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
type Path = {
    location: Location
}


export function Error(path: Path) {  
    
    console.log(path.location.pathname);

    return (
        <>
            <Header />
            <Main>
                <div className="error__container">
                    <h1 className="error__title">ERROR 404</h1>
                    <h2 className="error__subtitle">Yikes!! Something seems wrong!!</h2>
                    <h3 className="error__msg_location">Not match found for "{path.location.pathname}"</h3>
                    <p className="error__body">The page you are looking for does not exist or is not available.</p>
                    <p>Make sure you are logged in to access the url.</p>
                    <p>Refresh your browser and try it again, or click <Link to="/" className="error__link">here</Link> to get back to the home.</p>
                </div>
            </Main>
        </>
    );
}