import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from '../models/car/car';
import { ICarType } from '../models/car/car-type';
import { IStatus } from '../models/car/status';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private config: any;
  constructor(
    private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService
  ) {
    this.config = envConfigService.getConfig();
  }

  getAll(): Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(
      this.config.apiUrl + `/cars`
    );
  }

  getCarTypes(): Observable<ICarType[]> {
    return this.httpClient.get<ICarType[]>(
      this.config.apiUrl + `/common/car-types`
    );
  }

  getStatuses(): Observable<IStatus[]> {
    return this.httpClient.get<IStatus[]>(
      this.config.apiUrl + `/common/statuses`
    );
  }

  add(car: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(
      this.config.apiUrl + `/cars`,
      car
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.config.apiUrl + `/cars/${id}`
    );
  }
}
