import IStack from './stack';

export default interface ICard {
  _id: string;
  front: string;
  back: string;
  stack: IStack;
}
