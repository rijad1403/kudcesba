export interface IPlace {
  id?: number | string;
  sortKey?: number;
  name: string;
  latitude: string | number;
  longitude: string | number;
  population: number;
  hours?: number;
  minutes?: number;
  timeDelta?: number;
  distance?: number;
  duration?: number;
  nextDay?: boolean;
  dateString?: string;
}

export enum PlaceType {
  origin = 'origin',
  destination = 'destination',
  waypoint = 'waypoint',
}
