type AsideProps = {
    children: any
}

export function Aside(props: AsideProps) {
    return (
        <aside>{props.children}</aside>
    )
}