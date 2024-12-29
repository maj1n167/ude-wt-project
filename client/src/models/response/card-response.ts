import ICard from '../card';

export interface AllCardResponse {
  message: string;
  data: Array<ICard>;
}

export interface CardResponse {
  message: string;
  data: ICard;
}
