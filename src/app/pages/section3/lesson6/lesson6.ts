import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutingExampleComponent } from '../animations/routing-example.component';

@Component({
  selector: 'app-section3-lesson6',
  imports: [RouterLink, RoutingExampleComponent],
  templateUrl: './lesson6.html',
  styleUrl: '../section3.css',
})
export class Section3Lesson6 {}
