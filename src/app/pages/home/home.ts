import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroNetworkComponent } from './animations/hero-network.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeroNetworkComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  sections = [
    { id: 1, title: 'Introduction', description: 'Welcome, course goals, and who this course is for', num: '01', color: '#6366f1' },
    { id: 2, title: 'Fundamentals', description: 'Client-server architecture, OSI model, host-to-host communication', num: '02', color: '#8b5cf6' },
    { id: 3, title: 'Internet Protocol', description: 'IP addressing, packets, ICMP, ARP, and routing basics', num: '03', color: '#22d3ee' },
    { id: 4, title: 'UDP', description: 'User Datagram Protocol, datagrams, pros & cons, hands-on coding', num: '04', color: '#10b981' },
    { id: 5, title: 'TCP', description: 'TCP segments, handshakes, flow control, congestion control', num: '05', color: '#f59e0b' },
    { id: 6, title: 'Protocols Overview', description: 'Popular networking protocols and their relationships', num: '06', color: '#ec4899' },
    { id: 7, title: 'Network Performance', description: 'MSS, MTU, latency, throughput, and backend performance', num: '07', color: '#ef4444' },
    { id: 8, title: 'Routing', description: 'Network routing fundamentals, switches, and learning bridges', num: '08', color: '#f97316' },
    { id: 9, title: 'Wireshark Analysis', description: 'Packet capture, protocol analysis, and hands-on debugging', num: '09', color: '#14b8a6' },
    { id: 10, title: 'Q&A', description: 'Answering common networking questions from developers', num: '10', color: '#a855f7' },
    { id: 12, title: 'Extras', description: 'Tunneling, exposing local servers, and advanced topics', num: '12', color: '#06b6d4' },
  ];
}
