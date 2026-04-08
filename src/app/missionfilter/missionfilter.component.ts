import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './missionfilter.component.html'
})
export class MissionFilterComponent {
  @Output() yearChange = new EventEmitter<string>();
  year = '';
  years = Array.from({ length: 14 }, (_, i) => String(2006 + i));

  emit() {
    this.yearChange.emit(this.year);
  }

  clear() {
    this.year = '';
    this.emit();
  }
}
