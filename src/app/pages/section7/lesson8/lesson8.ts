import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TcpHolbComponent } from '../animations/tcp-holb.component';
import { QuicVsTcpComponent } from '../animations/quic-vs-tcp.component';

@Component({
  selector: 'app-section7-lesson8',
  imports: [RouterLink, TcpHolbComponent, QuicVsTcpComponent],
  templateUrl: './lesson8.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson8 {}
