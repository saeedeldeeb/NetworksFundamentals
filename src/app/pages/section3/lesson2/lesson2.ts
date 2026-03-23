import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TtlAnimationComponent } from '../animations/ttl-animation.component';
import { TracerouteAnimationComponent } from '../animations/traceroute-animation.component';
import { EcnAnimationComponent } from '../animations/ecn-animation.component';

@Component({
  selector: 'app-section3-lesson2',
  imports: [RouterLink, TtlAnimationComponent, TracerouteAnimationComponent, EcnAnimationComponent],
  templateUrl: './lesson2.html',
  styleUrl: '../section3.css',
})
export class Section3Lesson2 {}
