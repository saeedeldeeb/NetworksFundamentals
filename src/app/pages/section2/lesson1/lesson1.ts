import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroClientServerComponent } from '../animations/hero-client-server.component';
import { MultiClientScalingComponent } from '../animations/multi-client-scaling.component';
import { ThreeTierFlowComponent } from '../animations/three-tier-flow.component';
import { RpcTimelineComponent } from '../animations/rpc-timeline.component';

@Component({
  selector: 'app-section2-lesson1',
  imports: [
    RouterLink,
    HeroClientServerComponent,
    MultiClientScalingComponent,
    ThreeTierFlowComponent,
    RpcTimelineComponent,
  ],
  templateUrl: './lesson1.html',
  styleUrl: '../section2.css',
})
export class Section2Lesson1 {}
