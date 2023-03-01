import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { TasksContext } from '../../../../contexts/TaskContext';
import { CountdownContainer, Separator } from './styles';

export function Countdown(){
	const { 
		activeTask,
		activeTaskId,
		setCurrentTaskAsFinished,
		amountSecondsPasses,
		updateAmountSecondsPassed
	} = useContext(TasksContext);

	const taskInSeconds = activeTask ? activeTask.time * 60 : 0;
	const currentSeconds = activeTask ? taskInSeconds - amountSecondsPasses : 0;

	const minutesAmount = Math.floor(currentSeconds/60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	//Atualizar o título da página
	useEffect(() => {
		if(activeTask){
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeTask]);

	//Atualizar o countdown
	useEffect(() => {
		let interval: number;

		if(activeTask){
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date, new Date(activeTask.startDate)
				);
				if(secondsDifference >= taskInSeconds){
					setCurrentTaskAsFinished();
					clearInterval(interval);
				}
				else{
					updateAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeTask, taskInSeconds, activeTaskId, setCurrentTaskAsFinished, updateAmountSecondsPassed]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
}
