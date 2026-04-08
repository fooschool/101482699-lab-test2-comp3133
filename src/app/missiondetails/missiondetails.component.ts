import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpacexApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './missiondetails.component.html'
})
export class MissionDetailsComponent implements OnInit {
  private api = inject(SpacexApiService);
  private route = inject(ActivatedRoute);
  mission = signal<Mission | undefined>(undefined);
  loading = signal(true);

  ngOnInit() {
    const flight = Number(this.route.snapshot.paramMap.get('flightNumber'));
    this.api.getLaunchByFlight(flight).subscribe({
      next: (m) => {
        this.mission.set(m);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
