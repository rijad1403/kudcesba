import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRideRequest,
  IRideRequestIn,
  RideRequestType,
} from '../models/ride-request/ride-request';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class RideRequestService {
  private config: any;
  constructor(
    private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService
  ) {
    this.config = this.envConfigService.getConfig();
  }

  get(
    rideRequestType: RideRequestType,
    sort = '-id',
    perPage = 10,
    page = 1
  ): Observable<HttpResponse<IRideRequest[]>> {
    let params = new HttpParams();
    params = params.appendAll({
      sort,
      perPage: perPage.toString(),
      page: page.toString(),
    });
    return this.httpClient.get<IRideRequest[]>(
      `${this.config.apiUrl}/user/${
        rideRequestType == RideRequestType.request
          ? 'my-drive-requests'
          : 'drive-requests'
      }`,
      {
        params,
        observe: 'response',
      }
    );
  }

  create(rideRequest: IRideRequestIn) {
    return this.httpClient.post(
      `${this.config.apiUrl}/passenger/reserve`,
      rideRequest
    );
  }

  cancel(id: number) {
    return this.httpClient.get(
      `${this.config.apiUrl}/passenger/cancel?id=${id}`
    );
  }

  reject(id: number) {
    return this.httpClient.get(
      `${this.config.apiUrl}/passenger/reject?id=${id}`
    );
  }
}
