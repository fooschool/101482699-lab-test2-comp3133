import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/mission';

const API = 'https://api.spacexdata.com/v3';

@Injectable({ providedIn: 'root' })
export class SpacexApiService {
  private http = inject(HttpClient);

  getLaunches() {
    return this.http.get<Mission[]>(`${API}/launches`);
  }

  getLaunchesByYear(year: string) {
    return this.http.get<Mission[]>(`${API}/launches?launch_year=${year}`);
  }

  getLaunchByFlight(flightNumber: number) {
    return this.http.get<Mission>(`${API}/launches/${flightNumber}`);
  }
}
