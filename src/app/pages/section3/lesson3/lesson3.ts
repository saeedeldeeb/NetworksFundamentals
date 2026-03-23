import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PingTracerouteComponent } from '../animations/ping-traceroute.component';
import { BlackholeAnimationComponent } from '../animations/blackhole-animation.component';

@Component({
  selector: 'app-section3-lesson3',
  imports: [RouterLink, PingTracerouteComponent, BlackholeAnimationComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section3.css',
})
export class Section3Lesson3 {}
