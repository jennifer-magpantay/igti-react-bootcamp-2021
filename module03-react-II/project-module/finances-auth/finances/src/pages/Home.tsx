import { useHistory } from "react-router-dom";
// components
import { Header } from "../components/header/Header";
import { NavBar } from "../components/navbar/NavBar";
import { Button } from "../components/button/Button";
import { Main } from "../components/main/Main";
import Image from "../assets/Image.jpg";

export function Home() {
    const history = useHistory();

    function handleButtonOnClick(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.innerHTML)
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
                    <Button type="button" classStyle="button-login" buttonOnClick={handleButtonOnClick}>LOGIN</Button>
                </NavBar>
            </Header>

            <Main>
                <div className="hero__container">
                    <div className="hero__text">
                        <h2>Lorem ipsum dolor sit.</h2>
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptates voluptas eligendi.
                        </h3>
                        <Button type="button" classStyle="button-login" buttonOnClick={handleButtonOnClick}>CREATE ACCOUNT</Button>
                    </div>

                    <div className="hero__img">
                        <img src={Image} alt="Finances illustration" />
                        <p className="caption"><a href="http://www.freepik.com">Designed by pch.vector / Freepik</a></p>
                    </div>
                </div>

            </Main>
        </>
    );
}
