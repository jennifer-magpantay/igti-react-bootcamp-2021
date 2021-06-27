import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import { FormHTMLAttributes } from 'react';

type FormLoginProps = FormHTMLAttributes<HTMLFormElement>

export function FormLogin(props: FormLoginProps, emailValue: string, passwordValue: string) {

    return (
        <div className="form__container">
            <h2>My Account</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={emailValue} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={passwordValue} required />

                {/* <Button type="submit" className="button-login" onClick={handleFormSubmit}>LOGIN</Button> */}
                {props.children}
            </form>

            <div className="form__caption">
                <p>Not registered yet?<Link to="/create-account"> Create an account</Link></p>
            </div>
        </div>
    );
}

// export function FormLogin(props: FormLoginProps) {
//     const { onFormSubmit } = props;
//     function handleFormSubmit(event: any) {
//         if (onFormSubmit) {
//             onFormSubmit(event);
//             console.log("submiting login form")
//         }
//     }

//     return (
//         <div className="form__container">
//             <h2>My Account</h2>
//             <form onSubmit={handleFormSubmit}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" name="email" required />

//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" required />

//                 <Button type="submit" className="button-login" onClick={handleFormSubmit}>LOGIN</Button>
//             </form>

//             <div className="form__caption">
//                 <p>Not registered yet?<Link to="/create-account"> Create an account</Link></p>
//             </div>
//         </div>
//     );
// }

export function FormCreateAccount() {

    function handleFormSubmit() {

    }

    return (
        <div className="form__container">
            <h2>Create Account</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Name</label>
                <input type="name" name="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />

                <Button type="submit" className="button-login" onClick={handleFormSubmit}>REGISTER</Button>
            </form>

            <div className="form__caption">
                <p>Have an account already<Link to="/login"> Login here</Link></p>
            </div>
        </div>
    );
}