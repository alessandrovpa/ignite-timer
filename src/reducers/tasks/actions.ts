import { Task } from './reducer';

export enum ActionTypes{
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  SET_TASK_AS_FINISHED = 'SET_TASK_AS_FINISHED',
  SET_TASK_AS_INTERRUPTED = 'SET_TASK_AS_INTERRUPTED'
}

export function addNewTaskAction(task:Task){
	return {
		type: ActionTypes.ADD_NEW_TASK,
		payload: {
			task
		}
	};
}

export function setTaskAsFinishedAction(){
	return {
		type: ActionTypes.SET_TASK_AS_FINISHED
	};
}

export function setTaskAsInterruptedAction(){
	return {
		type: ActionTypes.SET_TASK_AS_INTERRUPTED
	};
}
