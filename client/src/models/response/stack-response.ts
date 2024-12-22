import IStack from '../stack';

export interface AllStackResponse {
  message: string;
  data: Array<IStack>;
}

export interface StackResponse {
  message: string;
  data: IStack;
}
