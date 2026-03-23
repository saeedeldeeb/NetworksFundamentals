import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DnsAmplificationComponent } from '../animations/dns-amplification.component';
import { UdpFloodComponent } from '../animations/udp-flood.component';

@Component({
  selector: 'app-section4-lesson3',
  imports: [RouterLink, DnsAmplificationComponent, UdpFloodComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section4.css',
})
export class Section4Lesson3 {}
