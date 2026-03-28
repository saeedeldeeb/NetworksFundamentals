import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface Section {
  id: number;
  title: string;
  path: string;
  available: boolean;
  lessons?: { title: string; path: string }[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sidebarOpen = signal(true);

  sections: Section[] = [
    {
      id: 1,
      title: 'Introduction',
      path: '/section/1',
      available: true,
      lessons: [
        { title: 'Welcome', path: '/section/1/1' },
        { title: 'Who Is This Course For?', path: '/section/1/2' },
        { title: 'Course Outline', path: '/section/1/3' },
      ],
    },
    {
      id: 2,
      title: 'Fundamentals',
      path: '/section/2',
      available: true,
      lessons: [
        { title: 'Client-Server Architecture', path: '/section/2/1' },
        { title: 'OSI Model', path: '/section/2/2' },
        { title: 'Host-to-Host Communication', path: '/section/2/3' },
      ],
    },
    {
      id: 3,
      title: 'Internet Protocol',
      path: '/section/3',
      available: true,
      lessons: [
        { title: 'IP Building Blocks', path: '/section/3/1' },
        { title: 'The IP Packet', path: '/section/3/2' },
        { title: 'ICMP, Ping, Traceroute', path: '/section/3/3' },
        { title: 'ARP', path: '/section/3/4' },
        { title: 'Capturing Packets', path: '/section/3/5' },
        { title: 'Routing Example', path: '/section/3/6' },
        { title: 'Private IP Addresses', path: '/section/3/7' },
      ],
    },
    {
      id: 4,
      title: 'UDP',
      path: '/section/4',
      available: true,
      lessons: [
        { title: 'What Is UDP?', path: '/section/4/1' },
        { title: 'UDP Datagram Structure', path: '/section/4/2' },
        { title: 'UDP Pros & Cons', path: '/section/4/3' },
        { title: 'UDP Server with Node.js', path: '/section/4/4' },
        { title: 'UDP Server with C', path: '/section/4/5' },
        { title: 'Capturing UDP Traffic', path: '/section/4/6' },
      ],
    },
    {
      id: 5,
      title: 'TCP',
      path: '/section/5',
      available: true,
      lessons: [
        { title: 'What Is TCP?', path: '/section/5/1' },
        { title: 'TCP Segment', path: '/section/5/2' },
        { title: 'Flow Control', path: '/section/5/3' },
        { title: 'Congestion Control', path: '/section/5/4' },
        { title: 'Slow Start Deep Dive', path: '/section/5/5' },
      ],
    },
    { id: 6, title: 'Protocols Overview', path: '/section/6', available: false },
    { id: 7, title: 'Network Performance', path: '/section/7', available: false },
    { id: 8, title: 'Routing', path: '/section/8', available: false },
    { id: 9, title: 'Wireshark Analysis', path: '/section/9', available: false },
    { id: 10, title: 'Q&A', path: '/section/10', available: false },
    { id: 12, title: 'Extras', path: '/section/12', available: false },
  ];

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }
}
