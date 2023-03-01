import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
	HomeContainer, StartCountdownButton,
	StpopCountdownButton
} from './styles';

import { useContext } from 'react';
import { TasksContext } from '../../contexts/TaskContext';
import { Countdown } from './components/Countdown/';
import { TaskForm } from './components/TaskForm/';

const taskFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Preencha este campo'),
	time: zod.number()
		.min(5, 'Mínimo 5 minutos')
		.max(60, 'Máximo 60 minutos')
});

type TaskFormData = zod.infer<typeof taskFormValidationSchema>;

export function Home(){
	const {activeTask, interruptActiveTask, createTask} = useContext(TasksContext);

	const taskForm = useForm<TaskFormData>({
		resolver: zodResolver(taskFormValidationSchema),
	});

	const taskValue = taskForm.watch('task');
	const disableSubmit = !taskValue;

	function handleStopTask(){
		interruptActiveTask();
	}

	function handleSubmitTaskForm({task, time}:TaskFormData){
		createTask({title: task, time});
		taskForm.reset();
	}

	return (
		<HomeContainer>
			<form onSubmit={taskForm.handleSubmit(handleSubmitTaskForm)}>
				<FormProvider {...taskForm}>
					<TaskForm />
				</FormProvider>
				<Countdown />
				
				{activeTask ? (
					<StpopCountdownButton
						onClick={handleStopTask}
						type="button"
					>
						<HandPalm />
						Interromper
					</StpopCountdownButton>
				) : (
					<StartCountdownButton
						type="submit"
						disabled={disableSubmit}
					>
						<Play />
								Começar
					</StartCountdownButton>
				)
				}
				
			</form>
		</HomeContainer>
	);
}
