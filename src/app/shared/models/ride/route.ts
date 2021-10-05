import { IPlace } from './place';

export class IRoute {
  distance: number;
  duration: number;
  dates: Date[] | string[];
  stops: {
    origin: IPlace;
    waypoints: IPlace[];
    destination: IPlace;
  };
}
