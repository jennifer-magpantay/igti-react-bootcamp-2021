type MainProps = {
    children: any
}

export function Main(props: MainProps) {
    return (
        <main>{props.children}</main>
    )
}