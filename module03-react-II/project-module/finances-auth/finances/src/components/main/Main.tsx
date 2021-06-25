type MainProps = {
    children: any
}

export function Main(props: MainProps) {
    return (
        <main className="main__container">{props.children}</main>
    )
}