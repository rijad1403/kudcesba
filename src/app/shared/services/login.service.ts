import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn = new BehaviorSubject<boolean>(false);
  private config: any;
  constructor(
    private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService
  ) {
    this.config = envConfigService.getConfig();
  }

  login(loginData): Observable<any> {
    return this.httpClient.post<any>(
      this.config.apiUrl + `/user/login`,
      loginData
    );
  }

  checkLoggedIn(message: boolean) {
    this.loggedIn.next(message);
  }

  onCheckLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
