import { ActionTypes } from './actions';

export interface Task{
	id: string;
	title: string;
	time: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface TasksState{
	tasks: Task[];
	activeTaskId: string | null;
}

export function TaskReducer(state: TasksState, action: any){
	if(action.type === ActionTypes.ADD_NEW_TASK){
		return {
			...state,
			activeTaskId: action.payload.task.id,
			tasks: [...state.tasks, action.payload.task],
		};
	}

	if(action.type === ActionTypes.SET_TASK_AS_FINISHED){
		const updatedTasks = state.tasks.map(task => {
			if(task.id === state.activeTaskId){
				return {...task, finishedDate : new Date()};
			}
			else{
				return task;
			}
		});
		return {
			...state,
			activeTaskId: null,
			tasks: updatedTasks
		};
	}

	if(action.type === ActionTypes.SET_TASK_AS_INTERRUPTED){
		const updatedTasks = state.tasks.map(task => {
			if(task.id === state.activeTaskId){
				return {...task, interruptedDate : new Date()};
			}
			else{
				return task;
			}
		});
		return {
			...state,
			activeTaskId: null,
			tasks: updatedTasks
		};
	}
	return state;
}
