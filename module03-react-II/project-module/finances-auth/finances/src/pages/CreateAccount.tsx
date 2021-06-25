import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import { FormCreateAccount } from "../components/form/Form";

export function CreateAccount() {
    return (
        <>
            <Header />
            <Main>
                <FormCreateAccount />
            </Main>
        </>
    );
}