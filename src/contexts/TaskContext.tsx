import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { addNewTaskAction, setTaskAsFinishedAction, setTaskAsInterruptedAction } from '../reducers/tasks/actions';
import { Task, TaskReducer } from '../reducers/tasks/reducer';
interface CreateTask{
  title: string;
  time: number;
}

interface TasksContextType{
	tasks: Task[];
	activeTask: Task | undefined;
	activeTaskId: string | null;
	setCurrentTaskAsFinished: () => void;
	amountSecondsPasses: number;
	updateAmountSecondsPassed: (newSeconds: number) => void;
  interruptActiveTask: () => void;
  createTask: (data:CreateTask)=> void;
}

export const TasksContext = createContext({} as TasksContextType);

interface TaskContextProviderProps{
  children: ReactNode;
}

export function TaskContextProvider({ children }:TaskContextProviderProps){

	const [ tasksState, dispatch ] = useReducer(TaskReducer, 
		{
			tasks: [],
			activeTaskId: null
		},
		(initialState) => {
			const storedTasks = localStorage.getItem('@ignite-timer:tasks-1.0.0');
			if(storedTasks){
				return JSON.parse(storedTasks);
			}
			return initialState;
		}
	);

	const { tasks, activeTaskId } = tasksState;
	const activeTask = tasks.find(task => task.id === activeTaskId);

	const [ amountSecondsPasses, setAmountSecondsPassed ] = useState(() => {
		if(activeTask){
			return differenceInSeconds(new Date(), new Date(activeTask.startDate));
		}
		return 0;
	});



	useEffect(() => {
		const tasksJSON = JSON.stringify(tasksState);
		localStorage.setItem('@ignite-timer:tasks-1.0.0', tasksJSON);
	}, [tasksState]);

	function createTask(data:CreateTask){
		const task:Task = {
			id: String(new Date().getTime()),
			title: data.title,
			time: data.time,
			startDate: new Date()
		};
		dispatch(addNewTaskAction(task));
		setAmountSecondsPassed(0);
	}

	function setCurrentTaskAsFinished(){
		dispatch(setTaskAsFinishedAction());
	}

	function updateAmountSecondsPassed(newSeconds: number){
		setAmountSecondsPassed(newSeconds);
	}

	function interruptActiveTask(){
		document.title = 'Pomodoro';
		dispatch(setTaskAsInterruptedAction());
	}

	return(
		<TasksContext.Provider value={{
			tasks,
			activeTask,
			activeTaskId,
			setCurrentTaskAsFinished,
			amountSecondsPasses,
			updateAmountSecondsPassed,
			interruptActiveTask,
			createTask
		}}>
			{children}
		</TasksContext.Provider>
	);
}
