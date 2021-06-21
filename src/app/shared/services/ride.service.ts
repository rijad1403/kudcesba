import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRide } from '../models/ride/ride';
import { EnvironmentconfigService } from './environmentconfig.service';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private rides = [
    {
      id: 1,
      driver: {
        id: 1,
        name: 'Mujo Mujić',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjx4UieqE-Bepuju7kdcIqS8OWWqaxW3K90A&usqp=CAU',
        rating: '5,0',
      },
      start: 'Zagreb',
      destination: 'Split',
      price: 40,
      startTime: '12:00',
      endTime: '14:00',
      passengers: [
        {
          id: 2,
          name: 'Suljo Suljić',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lvcb27aJRUsvtQwAasjUB9z7Wf-XaVwr5w&usqp=CAU',
          rating: '4,0',
        },
        {
          id: 3,
          name: 'Alaga Alagić',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgIUF7SE6CROioPfFm3jxwN5cPMxD_MobRdw&usqp=CAU',
          rating: '4,0',
        },
      ],
    },
    {
      id: 2,
      driver: {
        id: 2,
        name: 'Suljo Suljić',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lvcb27aJRUsvtQwAasjUB9z7Wf-XaVwr5w&usqp=CAU',
        rating: '4,0',
      },
      start: 'Zagreb',
      destination: 'Kaštel Stari',
      price: 40,
      startTime: '12:00',
      endTime: '14:00',
    },
    {
      id: 3,
      driver: {
        id: 3,
        name: 'Alaga Alagić',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgIUF7SE6CROioPfFm3jxwN5cPMxD_MobRdw&usqp=CAU',
        rating: '4,0',
      },
      start: 'Zagreb',
      destination: 'Dugopolje',
      price: 30,
      startTime: '13:00',
      endTime: '15:00',
    },
  ];
  private config: any;
  constructor(private httpClient: HttpClient,
    private envConfigService: EnvironmentconfigService) {
      this.config = envConfigService.getConfig();
    }

  getAll() {
    return this.rides;
  }

  getById(rideId: number) {
    return this.rides.find((ride) => ride.id === rideId);
  }

  getAllWithFilters(perPage: number, page: number, sort: string, destination: string, origin: string, date:string): Observable<IRide[]>{
    return this.httpClient.get<IRide[]>(this.config.apiUrl + `/drives?per-page=${perPage}&page=${page}$sort=${sort}&destination=${destination}&origin=${origin}&date=${date}`);
  }

  get(id: number): Observable<IRide>{
    return this.httpClient.get<IRide>(this.config.apiUrl + `/drives/${id}`);
  }
}
