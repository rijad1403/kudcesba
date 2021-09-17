import { IPlace } from '../place/place';

export interface IRideIn {
  distance: number;
  duration: number;
  dates: Date[] | string[];
  stops: {
    origin: IPlace;
    waypoints?: IPlace[];
    destination: IPlace;
  };
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
