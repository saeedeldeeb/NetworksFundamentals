import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArpFlowComponent } from '../animations/arp-flow.component';
import { VrrpAnimationComponent } from '../animations/vrrp-animation.component';

@Component({
  selector: 'app-section3-lesson4',
  imports: [RouterLink, ArpFlowComponent, VrrpAnimationComponent],
  templateUrl: './lesson4.html',
  styleUrl: '../section3.css',
})
export class Section3Lesson4 {}
