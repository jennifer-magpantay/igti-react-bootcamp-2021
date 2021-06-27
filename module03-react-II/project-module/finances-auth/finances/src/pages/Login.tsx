import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import { Button } from "../components/button/Button";
import { createUserRegister } from "../services/Backend";

export function Login() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        createUserRegister(email, password).then(
            (user) => {
                // if the session is ok, then redirect the user to the dashboard
                let path = `dashboard/2021/01`;
                history.push(path);
                console.log(user)
            },
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
                    <form onSubmit={handleFormSubmit}>
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