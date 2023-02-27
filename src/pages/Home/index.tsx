import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import { HandPalm, Play } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	StpopCountdownButton,
	TaskInput
} from './styles';

const taskFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Preencha este campo'),
	time: zod.number()
		.min(5, 'Mínimo 5 minutos')
		.max(60, 'Máximo 60 minutos')
});

type TaskFormData = zod.infer<typeof taskFormValidationSchema>;

interface Task{
	id: string;
	title: string;
	time: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

export function Home(){
	const [ tasks, setTasks ] = useState<Task[]>([]);
	const [ activeTaskId, setActiveTaskId ] = useState<string | null>(null);
	const [ amountSecondsPasses, setAmountSecondsPassed ] = useState(0);

	const taskForm = useForm<TaskFormData>({
		resolver: zodResolver(taskFormValidationSchema),
	});

	const taskValue = taskForm.watch('task');
	const disableSubmit = !taskValue;

	function handleSubmitTaskForm(data:TaskFormData){
		const task:Task = {
			id: String(new Date().getTime()),
			title: data.task,
			time: data.time,
			startDate: new Date()
		};

		setTasks(state => [...state, task]);
		setActiveTaskId(task.id);
		setAmountSecondsPassed(0);

		taskForm.reset();
	}

	const activeTask = tasks.find(task => task.id === activeTaskId);

	const taskInSeconds = activeTask ? activeTask.time * 60 : 0;
	const currentSeconds = activeTask ? taskInSeconds - amountSecondsPasses : 0;

	useEffect(() => {
		let interval: number;

		if(activeTask){
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(new Date, activeTask.startDate);
				if(secondsDifference >= taskInSeconds){
					setActiveTaskId(null);

					setTasks(state => state.map(task => {
						if(task.id === activeTaskId){
							return {...task, finishedDate : new Date()};
						}
						else{
							return task;
						}
					}));
					clearInterval(interval);
				}
				else{
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeTask, taskInSeconds, activeTaskId]);

	const minutesAmount = Math.floor(currentSeconds/60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		if(activeTask){
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeTask]);

	function handleStopTask(){
		setActiveTaskId(null);

		setTasks(state => state.map(task => {
			if(task.id === activeTaskId){
				return {...task, interruptedDate : new Date()};
			}
			else{
				return task;
			}
		}));
		console.log(tasks);
	}

	return (
		<HomeContainer>
			<form onSubmit={taskForm.handleSubmit(handleSubmitTaskForm)}>
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

				<CountdownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

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
