import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HolBlockingComponent } from '../animations/hol-blocking.component';

@Component({
  selector: 'app-section5-lesson8',
  imports: [RouterLink, HolBlockingComponent],
  templateUrl: './lesson8.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson8 {}
