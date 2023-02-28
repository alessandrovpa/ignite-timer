import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { HeaderContainer } from './styles';

export function Header(){
	return (
		<HeaderContainer>
			<img src={Logo} alt="" title="ignite timer"/>
			<nav>
				<NavLink to="/" title="home">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="historico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	);
}
