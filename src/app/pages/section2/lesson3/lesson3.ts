import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BroadcastProblemComponent } from '../animations/broadcast-problem.component';
import { RouterVisualComponent } from '../animations/router-visual.component';

@Component({
  selector: 'app-section2-lesson3',
  imports: [RouterLink, BroadcastProblemComponent, RouterVisualComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section2.css',
})
export class Section2Lesson3 {}
