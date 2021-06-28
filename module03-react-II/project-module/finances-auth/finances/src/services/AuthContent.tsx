import { createContext } from "react";
import { IUser } from "./Backend";

// the context holds the user information and the logout function

export interface IAuthContext {
    user: IUser;
    logOutApp: () => void;
}

export const authContext = createContext<IAuthContext>({
    user: {
        nome: "",
        email: "",
        senha: ""
    },
    logOutApp: () => { },
});

