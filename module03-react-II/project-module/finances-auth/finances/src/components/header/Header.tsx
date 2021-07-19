import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

type HeaderProps = {
    children?: any;
}
// export const functionName = React.memo(function ());

export function Header(props: HeaderProps) {
    return (
        <header className="header__container">
            <Link to="/"><img src={Logo} alt="Finances Logo" /></Link>
            {props.children}
        </header>
    );
}

