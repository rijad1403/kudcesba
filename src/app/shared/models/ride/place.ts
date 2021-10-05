export interface IPlace {
  sortKey?: number;
  name: string;
  latitude: string;
  longitude: string;
  population: number;
  hours?: number;
  minutes?: number;
  timeDelta?: number;
  distance?: number;
  duration?: number;
  nextDay?: boolean;
}
