import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  config: any;
  constructor(
    private envConfigService: EnvironmentconfigService,
    private http: HttpClient
  ) {
    this.config = this.envConfigService.getConfig();
  }

  getPhonePrefixes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.apiUrl}/common/phone-prefixes`);
  }
}
