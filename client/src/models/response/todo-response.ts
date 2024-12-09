import ITodo from '../todo';

export interface TodoResponse {
  message: string;
  data: ITodo;
}

export interface AllTodoResponse {
  message: string;
  data: Array<ITodo>;
}
