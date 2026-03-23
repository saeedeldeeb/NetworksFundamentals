import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TcpHeaderComponent } from '../animations/tcp-header.component';
import { TcpEncapComponent } from '../animations/tcp-encap.component';
import { EcnFlowComponent } from '../animations/ecn-flow.component';

@Component({
  selector: 'app-section5-lesson2',
  imports: [RouterLink, TcpHeaderComponent, TcpEncapComponent, EcnFlowComponent],
  templateUrl: './lesson2.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson2 {}
