type MainProps = {
  children: any;
};

export function Main(props: MainProps) {
  const { children } = props;
  return <main>{children}</main>;
}
