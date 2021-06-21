import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentconfigService {

  private config;

  constructor(private http: HttpClient) { }

  public load(): any {
    return this.http.get('assets/webconfig.json').toPromise()
      .then((data) => {
        this.config = data;
      });
  }

  getConfig(): any {
    return this.config;
  }
}
