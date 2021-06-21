import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlace } from '../models/place/place';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private config: any;
  constructor(private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService) {
      this.config = envConfigService.getConfig();
    }

  searchByName(name:string): Observable<IPlace> {
    return this.httpClient.get<IPlace>(this.config.apiUrl + `/places?sort=name&name=${name}`);
  }
}
