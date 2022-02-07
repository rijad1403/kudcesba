import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRide, RideType } from '../models/ride/ride';
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
    this.config = this.envConfigService.getConfig();
  }

  getAllWithFilters(
    origin: string,
    destination: string,
    date: string,
    sort = 'id',
    perPage = 10,
    page = 1
  ): Observable<HttpResponse<IRide[]>> {
    let params = new HttpParams();
    params = params.appendAll({
      sort,
      perPage: perPage.toString(),
      page: page.toString(),
    });
    if (origin !== null) {
      params = params.append('origin', origin);
    }
    if (destination !== null) {
      params = params.append('destination', destination);
    }
    if (date !== null) {
      params = params.append('date', date);
    }
    return this.httpClient.get<IRide[]>(`${this.config.apiUrl}/drives`, {
      params,
      observe: 'response',
    });
  }

  get(id: number): Observable<IRide> {
    return this.httpClient.get<IRide>(this.config.apiUrl + `/drives/${id}`);
  }

  createRide(ride: IRideIn): Observable<any> {
    return this.httpClient.post<any>(`${this.config.apiUrl}/drives`, ride);
  }

  getUserRides(type: RideType, page = 1): Observable<HttpResponse<IRide[]>> {
    const params = new HttpParams().appendAll({
      sort: '-id',
      perPage: '1',
      page: page.toString(),
    });
    return this.httpClient.get<IRide[]>(
      `${this.config.apiUrl}/user/${type}-drives`,
      { params, observe: 'response' }
    );
  }
}
