import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TcpStatesComponent } from '../animations/tcp-states.component';

@Component({
  selector: 'app-section5-lesson7',
  imports: [RouterLink, TcpStatesComponent],
  templateUrl: './lesson7.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson7 {}
