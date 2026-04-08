import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpacexApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [RouterLink, MissionFilterComponent],
  templateUrl: './missionlist.component.html',
})
export class MissionListComponent implements OnInit {
  private api = inject(SpacexApiService);
  missions = signal<Mission[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.load('');
  }

  onYearChange(year: string) {
    this.load(year);
  }

  load(year: string) {
    this.loading.set(true);
    const obs = year
      ? this.api.getLaunchesByYear(year)
      : this.api.getLaunches();
    obs.subscribe({
      next: (data) => {
        this.missions.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
