import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import { FormLogin } from "../components/form/Form";

export function Login() {

    function handleFormSubmit(){}
    return (
        <>
            <Header />
            <Main>
                <FormLogin onFormSubmit={handleFormSubmit}/>
            </Main>
        </>
    );
}