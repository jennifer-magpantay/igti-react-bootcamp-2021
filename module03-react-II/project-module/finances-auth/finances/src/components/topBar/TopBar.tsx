type TopBarProps = {
    children: any;
}

export function TopBar(props: TopBarProps) {
    return (
        <div className="topbar__container">
            {props.children}
        </div>
    );
}
