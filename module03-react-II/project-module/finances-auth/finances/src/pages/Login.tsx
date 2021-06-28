import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import { Button } from "../components/button/Button";
import { loginUserSession, IUser } from "../services/Backend";

type LoginProps = {
    onLogin: (user: IUser) => void;
}

export function Login(props: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        loginUserSession(email, password).then(props.onLogin,
            // once the user is logged in, they will be redirect to the dashboard/2021/01, as set on App

            // if the login fails, because the user indentification has not been found, then display the alert message
            (error) => {
                console.error(error)
                const message = `No registers found for ${email}. Make sure email and password are typed correctly`;
                alert(message);
            }
        )
    }

    function handleInputOnChange(event: any) {
        event.preventDefault();
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    return (
        <>
            <Header />
            <Main>
                <div className="form__container">
                    <h2>My Account</h2>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email}
                            onChange={handleInputOnChange} required />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={handleInputOnChange} required />
                        {/* add a submit button: without it the onSubimit will not work. also, there is no need to add an onclick event to a submit button. if you add itm, this will change the event.target for the button instead of the form*/}
                        <Button type="submit" className="button-login">LOGIN</Button>
                    </form>

                    <div className="form__caption">
                        <p>Not registered yet?<Link to="/create-account"> Create an account</Link></p>
                    </div>
                </div>
            </Main>
        </>
    );
}