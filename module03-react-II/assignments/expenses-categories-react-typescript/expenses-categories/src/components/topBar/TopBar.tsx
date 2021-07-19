type TopBarProps = {
  children: any;
};

export function TopBar(props: TopBarProps) {
  const { children } = props;
  return (
    <div className="topbar__container">
      <p className="topbar__caption">
        Select year and month to generate a report
      </p>
      {children}
    </div>
  );
}
