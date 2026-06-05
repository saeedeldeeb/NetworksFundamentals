import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { L4VsL7RoutingComponent } from '../animations/l4-vs-l7-routing.component';
import { TlsTerminationComponent } from '../animations/tls-termination.component';

@Component({
  selector: 'app-section7-lesson10',
  imports: [RouterLink, L4VsL7RoutingComponent, TlsTerminationComponent],
  templateUrl: './lesson10.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson10 {}
