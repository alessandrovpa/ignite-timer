import { HeaderContainer } from './styles';
import { Timer, Scroll } from 'phosphor-react';
import Logo from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

export function Header(){
	return (
		<HeaderContainer>
			<img src={Logo} alt="" title="ignite timer"/>
			<nav>
				<NavLink to="/" title="home">
					<Scroll size={24} />
				</NavLink>
				<NavLink to="/history" title="historico">
					<Timer size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	);
}
