import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MuxDemuxComponent } from './animations/mux-demux.component';
import { UdpCommComponent } from './animations/udp-comm.component';

@Component({
  selector: 'app-section4',
  imports: [RouterLink, MuxDemuxComponent, UdpCommComponent],
  templateUrl: './section4.html',
  styleUrl: './section4.css',
})
export class Section4 {}
