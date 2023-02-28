import { createContext, ReactNode, useState } from 'react';

interface Task{
	id: string;
	title: string;
	time: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

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
  stopTask: () => void;
  createTask: (data:CreateTask)=> void;
}

export const TasksContext = createContext({} as TasksContextType);

interface TaskContextProviderProps{
  children: ReactNode;
}

export function TaskContextProvider({ children }:TaskContextProviderProps){
	const [ tasks, setTasks ] = useState<Task[]>([]);
	const [ activeTaskId, setActiveTaskId ] = useState<string | null>(null);
	const [ amountSecondsPasses, setAmountSecondsPassed ] = useState(0);

	const activeTask = tasks.find(task => task.id === activeTaskId);

	function createTask(data:CreateTask){
		const task:Task = {
			id: String(new Date().getTime()),
			title: data.title,
			time: data.time,
			startDate: new Date()
		};

		setTasks(state => [...state, task]);
		setActiveTaskId(task.id);
		setAmountSecondsPassed(0);
	}

	function setCurrentTaskAsFinished(){
		setActiveTaskId(null);

		setTasks(state => state.map(task => {
			if(task.id === activeTaskId){
				return {...task, finishedDate : new Date()};
			}
			else{
				return task;
			}
		}));
	}

	function updateAmountSecondsPassed(newSeconds: number){
		setAmountSecondsPassed(newSeconds);
	}

	function stopTask(){
		setActiveTaskId(null);

		document.title = 'Pomodoro';

		setTasks(state => state.map(task => {
			if(task.id === activeTaskId){
				return {...task, interruptedDate : new Date()};
			}
			else{
				return task;
			}
		}));
	}

	return(
		<TasksContext.Provider value={{
			tasks,
			activeTask,
			activeTaskId,
			setCurrentTaskAsFinished,
			amountSecondsPasses,
			updateAmountSecondsPassed,
			stopTask,
			createTask
		}}>
			{children}
		</TasksContext.Provider>
	);
}
