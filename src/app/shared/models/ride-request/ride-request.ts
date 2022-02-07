import { IStop } from '../ride/ride';
import { IUser } from '../ride/user';

export interface IRideRequestIn {
  id: number;
  number: number;
  originId: number;
  destinationId: number;
}

export interface IRideRequest {
  id: number;
  user: IUser;
  owner: IUser;
  number: string;
  departureTime: string;
  status: {
    id: number;
    name: string;
    caption: string;
  };
  startLocation: IStop;
  endLocation: IStop;
}

export enum RideRequestType {
  application = 'application',
  request = 'request',
}
