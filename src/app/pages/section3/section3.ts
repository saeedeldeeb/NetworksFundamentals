import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DhcpFlowComponent } from './animations/dhcp-flow.component';
import { GatewayRoutingComponent } from './animations/gateway-routing.component';
import { SubnetCheckComponent } from './animations/subnet-check.component';
import { TtlAnimationComponent } from './animations/ttl-animation.component';
import { TracerouteAnimationComponent } from './animations/traceroute-animation.component';
import { EcnAnimationComponent } from './animations/ecn-animation.component';
import { PingTracerouteComponent } from './animations/ping-traceroute.component';
import { ArpFlowComponent } from './animations/arp-flow.component';
import { RoutingExampleComponent } from './animations/routing-example.component';
import { BlackholeAnimationComponent } from './animations/blackhole-animation.component';
import { VrrpAnimationComponent } from './animations/vrrp-animation.component';

@Component({
  selector: 'app-section3',
  imports: [
    RouterLink,
    DhcpFlowComponent,
    GatewayRoutingComponent,
    SubnetCheckComponent,
    TtlAnimationComponent,
    TracerouteAnimationComponent,
    EcnAnimationComponent,
    PingTracerouteComponent,
    ArpFlowComponent,
    RoutingExampleComponent,
    BlackholeAnimationComponent,
    VrrpAnimationComponent,
  ],
  templateUrl: './section3.html',
  styleUrl: './section3.css',
})
export class Section3 {}
