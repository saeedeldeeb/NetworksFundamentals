import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sidebarOpen = signal(true);

  sections = [
    { id: 1, title: 'Introduction', path: '/section/1', available: true },
    { id: 2, title: 'Fundamentals', path: '/section/2', available: true },
    { id: 3, title: 'Internet Protocol', path: '/section/3', available: true },
    { id: 4, title: 'UDP', path: '/section/4', available: false },
    { id: 5, title: 'TCP', path: '/section/5', available: false },
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
