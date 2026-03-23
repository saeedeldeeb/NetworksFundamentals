import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowControlComponent } from '../animations/flow-control.component';
import { SlidingWindowComponent } from '../animations/sliding-window.component';

@Component({
  selector: 'app-section5-lesson3',
  imports: [RouterLink, FlowControlComponent, SlidingWindowComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson3 {}
