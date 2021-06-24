type HeaderProps = {
    children?: any;
}

export function Header(props: HeaderProps) {
    return (
        <header className="header__container">
            <h1>Finance$$</h1>
            {props.children}
        </header>
    );
}