import IUser from './user';

export default interface IStack {
  _id: string;
  name: string;
  description: string;
  published: boolean;
  creator: IUser;
}
