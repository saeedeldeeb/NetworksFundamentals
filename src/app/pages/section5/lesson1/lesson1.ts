import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TcpHandshakeComponent } from '../animations/tcp-handshake.component';
import { TcpDataFlowComponent } from '../animations/tcp-data-flow.component';
import { TcpCloseComponent } from '../animations/tcp-close.component';

@Component({
  selector: 'app-section5-lesson1',
  imports: [RouterLink, TcpHandshakeComponent, TcpDataFlowComponent, TcpCloseComponent],
  templateUrl: './lesson1.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson1 {}
