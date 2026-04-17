import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProtocolStackComponent } from '../animations/protocol-stack.component';

@Component({
  selector: 'app-section6-lesson1',
  imports: [RouterLink, ProtocolStackComponent],
  templateUrl: './lesson1.html',
  styleUrl: '../section6.css',
})
export class Section6Lesson1 {}
