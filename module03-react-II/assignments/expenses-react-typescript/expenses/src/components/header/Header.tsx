type HeaderProps = {
    children: string;
}

export function Header(props: HeaderProps) {
    return (
        <header>
            <h1>{props.children}</h1>
        </header>
    );
}