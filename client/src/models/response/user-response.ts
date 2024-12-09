import IUser from '../user';

export interface AllUserResponse {
  message: string;
  data: Array<IUser>;
}

export interface UserResponse {
  message: string;
  data: IUser;
}
