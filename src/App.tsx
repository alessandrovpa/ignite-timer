import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { TaskContextProvider } from './contexts/TaskContext';
import { Router } from './Routes';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<TaskContextProvider>
					<Router />
				</TaskContextProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}
