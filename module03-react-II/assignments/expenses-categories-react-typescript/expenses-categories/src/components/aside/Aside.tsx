type AsideProps = {
    children: any
}

export function Aside(props: AsideProps) {
    const {children } = props;
    return (
        <aside>{children}</aside>
    )
}