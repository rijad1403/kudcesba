import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  searchByName(name:string) {
    return this.httpClient.get<any[]>(this.config.apiUrl + `/places?sort=name&name=${name}`);
  }
}
