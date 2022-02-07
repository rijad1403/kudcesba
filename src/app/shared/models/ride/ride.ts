import { ICar } from './car';
import { IFlow } from './flow';
import { IUser } from './user';

export interface IRide {
  id: number;
  user: IUser;
  car: ICar;
  origin: IFlow;
  destination: IFlow;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  free_seats: number;
  available_free_seats: number;
  price: number;
  stops: IStop[];
  smoking: string;
  female_only: string;
  luggage: string;
}

export enum RideType {
  active = 'active',
  past = 'past',
}

export interface IStop {
  id: number;
  place: {
    id: number;
    name: string;
  };
}
