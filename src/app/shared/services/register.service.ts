import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '../models/user/register-form';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private config: any;
  constructor(
    private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService
  ) {
    this.config = this.envConfigService.getConfig();
  }

  register(registerData: IRegisterForm) {
    return this.httpClient.post<any>(this.config.apiUrl + `/user/register`, {
      SignupForm: registerData,
    });
  }
}
