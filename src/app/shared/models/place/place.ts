export interface IPlace {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
  created_at: string;
  updated_at: string;
  status_id?: number;
  country_id?: number;
  population: number;
  hours?: string;
  minutes?: string;
  timeDelta?: number;
  distance?: number;
  duration?: number;
  nextDay?: number;
  sortKey?: number;
}
