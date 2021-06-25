import { ButtonHTMLAttributes } from 'react';

/*
ButtonHTMLAttributes has all props a button could receive as optional props

We just need to assign the ButtonProps to ButtonHTMLAttributes<HTMLButtonElement> and pass a spread object to the button element
*/

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) { 
    return <button {...props} />
}

// this will deadly reduce our code to a few lines and dispense the need of declared a prop to handle events, like onclick 

/*
type ButtonProps = {
    type: "button" | "submit"
    children: string
    classStyle: string
    buttonOnClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Button(props: ButtonProps) {
    const { type, children, classStyle, buttonOnClick } = props;

    function handleButtonOnClick(event: any) {
        if (buttonOnClick) {
            buttonOnClick(event)
        }
    }
    return <button type={type} className={classStyle} onClick={handleButtonOnClick}>{children}</button>
}
*/