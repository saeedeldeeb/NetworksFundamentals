import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TlsHandshakeComponent } from '../animations/tls-handshake.component';
import { DhExchangeComponent } from '../animations/dh-exchange.component';

@Component({
  selector: 'app-section6-lesson3',
  imports: [RouterLink, TlsHandshakeComponent, DhExchangeComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section6.css',
})
export class Section6Lesson3 {}
