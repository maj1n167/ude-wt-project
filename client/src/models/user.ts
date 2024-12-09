// Interfaces
import ITodo from './todo';

export default interface IUser {
  _id: string;
  name: string;
  createdAt: Date;
  todos: Array<ITodo>;
}
