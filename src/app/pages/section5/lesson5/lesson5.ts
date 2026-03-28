import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CongestionCycleComponent } from '../animations/congestion-cycle.component';

@Component({
  selector: 'app-section5-lesson5',
  imports: [RouterLink, CongestionCycleComponent],
  templateUrl: './lesson5.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson5 {}
