import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './missionfilter.component.html',
})
export class MissionFilterComponent implements OnInit {
  @Output() yearChange = new EventEmitter<string>();
  yearControl = new FormControl('');
  years = Array.from({ length: 14 }, (_, i) => String(2006 + i));

  ngOnInit() {
    this.yearControl.valueChanges.subscribe((v) =>
      this.yearChange.emit(v ?? ''),
    );
  }

  clear() {
    this.yearControl.setValue('');
  }
}
