import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BridgeFlowComponent } from '../animations/bridge-flow.component';

@Component({
  selector: 'app-section7-lesson1',
  imports: [RouterLink, BridgeFlowComponent],
  templateUrl: './lesson1.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson1 {}
