import { useHistory } from "react-router-dom";
// components
import { Header } from "../components/header/Header";
import { NavBar } from "../components/navbar/NavBar";
import { Button } from "../components/button/Button";
import { Main } from "../components/main/Main";
import Image from "../assets/images/hero-image.jpg";

export function Home() {
    const history = useHistory();

    function handleButtonOnClick(event: any) {

        if (event.target.innerHTML === "LOGIN") {
            let path = `login`;
            history.push(path);
        }
        if (event.target.innerHTML === "CREATE ACCOUNT") {
            let path = `create-account`;
            history.push(path);
        }
    }

    return (
        <>
            <Header>
                <NavBar>
                    <Button type="button" className="button-login" onClick={handleButtonOnClick}>LOGIN</Button>
                </NavBar>
            </Header>

            <Main>
                <div className="hero__container">
                    <div className="hero__text">
                        <h1>Lorem ipsum dolor sit.</h1>
                        <h2>Lorem ipsum dolor sit amet consectetur</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ratione eos voluptates velit harum repellat.</p>
                        <Button type="button" className="button-login" onClick={handleButtonOnClick}>CREATE ACCOUNT</Button>
                    </div>

                    <div className="hero__img">
                        <img loading="lazy" src={Image} alt="Finances illustration" />
                        <p className="caption"><a href="http://www.freepik.com">Designed by pch.vector / Freepik</a></p>
                    </div>
                </div>

            </Main>
        </>
    );
}
