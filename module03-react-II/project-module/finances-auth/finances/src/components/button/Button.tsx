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