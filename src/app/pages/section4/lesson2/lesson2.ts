import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UdpEncapComponent } from '../animations/udp-encap.component';
import { UdpHeaderComponent } from '../animations/udp-header.component';

@Component({
  selector: 'app-section4-lesson2',
  imports: [RouterLink, UdpEncapComponent, UdpHeaderComponent],
  templateUrl: './lesson2.html',
  styleUrl: '../section4.css',
})
export class Section4Lesson2 {}
