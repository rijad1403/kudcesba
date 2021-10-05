import { IPlace } from './place';
import { IRoute } from './route';

export interface IRideIn {
  route: IRoute;
  car: {
    id: string;
  };
  details: {
    price: number;
    minPrice: number;
    freeSeats: string;
    maxSeats: string;
    luggage: boolean;
    smoking: boolean;
    female_only: boolean;
    note: string;
  };
}
