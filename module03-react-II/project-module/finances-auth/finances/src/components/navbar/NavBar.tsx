type NavBarProps = {
    children: any
}

export function NavBar(props: NavBarProps) {
    const { children } = props;
    return (
        <div className="navbar__container">
            {children}
        </div>
    );
}