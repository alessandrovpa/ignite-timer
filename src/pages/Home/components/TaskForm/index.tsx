import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { TasksContext } from '../../../../contexts/TaskContext';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function TaskForm(){
	const { activeTask } = useContext(TasksContext);
	const taskForm = useFormContext();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput 
				type="text"
				id="task"
				placeholder='Dê um título para a tarefa'
				list="task-suggestions"
				{...taskForm.register('task')}
				disabled={!!activeTask}
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
				disabled={!!activeTask}
				{...taskForm.register('time', {valueAsNumber:true})}
			/>
			<span>minutos.</span>
		</FormContainer>
	);
}
