import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';

export function Home(){

	function handleSendForm(){
		console.log('opa');
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSendForm}>
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput 
						type="text"
						id="task"
						placeholder='Dê um título para a tarefa'
						list="task-suggestions"	
					/>

					<datalist id="task-suggestions">
						<option value="Projeto 1" />
						<option value="Projeto 2" />
						<option value="Projeto 3" />
					</datalist>

					<label htmlFor="minutes">durante</label>
					<MinutesAmountInput 
						type="number" 
						id="minutes"
						step={5}
						min={5}
						max={60}
					/>
					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton type="submit"><Play />Começar</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}
