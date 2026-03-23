import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CwndChartComponent } from '../animations/cwnd-chart.component';
import { SlowStartComponent } from '../animations/slow-start.component';
import { CongestionAvoidanceComponent } from '../animations/congestion-avoidance.component';

@Component({
  selector: 'app-section5-lesson4',
  imports: [RouterLink, CwndChartComponent, SlowStartComponent, CongestionAvoidanceComponent],
  templateUrl: './lesson4.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson4 {}
