import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRide } from '../models/ride/ride';
import { IRideIn } from '../models/ride/ride-in';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private config: any;
  constructor(
    private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService
  ) {
    this.config = envConfigService.getConfig();
  }

  getAllWithFilters(
    perPage: number,
    page: number,
    sort: string,
    destination: string,
    origin: string,
    date: string
  ): Observable<IRide[]> {
    return this.httpClient.get<IRide[]>(
      this.config.apiUrl +
        `/drives?per-page=${perPage}&page=${page}$sort=${sort}&destination=${destination}&origin=${origin}&date=${date}`
    );
  }

  get(id: number): Observable<IRide> {
    return this.httpClient.get<IRide>(this.config.apiUrl + `/drives/${id}`);
  }

  getActiveDrives(pageNumber: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.config.apiUrl}/api/active-drives?page=${pageNumber}`
    );
  }

  getPastDrives(): Observable<any> {
    return this.httpClient.get<any>(`${this.config.apiUrl}/api/past-drives`);
  }

  createRide(ride: IRideIn): Observable<any> {
    return this.httpClient.post<any>(`${this.config.apiUrl}/drives`, {});
  }
}
