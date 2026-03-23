import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DhcpFlowComponent } from '../animations/dhcp-flow.component';
import { SubnetCheckComponent } from '../animations/subnet-check.component';
import { GatewayRoutingComponent } from '../animations/gateway-routing.component';

@Component({
  selector: 'app-section3-lesson1',
  imports: [RouterLink, DhcpFlowComponent, SubnetCheckComponent, GatewayRoutingComponent],
  templateUrl: './lesson1.html',
  styleUrl: '../section3.css',
})
export class Section3Lesson1 {}
