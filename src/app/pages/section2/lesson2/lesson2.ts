import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section2-lesson2',
  imports: [RouterLink],
  templateUrl: './lesson2.html',
  styleUrl: '../section2.css',
})
export class Section2Lesson2 {
  activeOsiLayer = signal<number | null>(null);

  osiLayers = [
    {
      num: 7, name: 'Application', unit: 'Data', color: '#6366f1',
      protocols: 'HTTP, FTP, gRPC',
      description: 'Where your app lives. To network engineers: everything above is just "the application". To backend engineers: many sub-layers exist above.',
      insight: 'As a backend engineer, this is your home layer alongside Layer 4.',
    },
    {
      num: 6, name: 'Presentation', unit: 'Data', color: '#8b5cf6',
      protocols: 'SSL/TLS encoding, JPEG, JSON serialization',
      description: 'Serialization: JSON object → string → bytes. Encoding: UTF-8. Encryption/decryption. Happens automatically in most frameworks.',
      insight: 'You rarely interact with this layer directly — your framework handles it.',
    },
    {
      num: 5, name: 'Session', unit: 'Data', color: '#a855f7',
      protocols: 'TLS Handshake, TCP Session',
      description: 'Connection establishment and state management. TLS lives here. TCP is stateful (has session); UDP is stateless (no session).',
      insight: 'Some proxies like Linkerd operate only at this layer — managing connection pooling.',
    },
    {
      num: 4, name: 'Transport', unit: 'Segment / Datagram', color: '#22d3ee',
      protocols: 'TCP, UDP, QUIC',
      description: 'TCP: reliable, ordered, connection-oriented. UDP: unreliable, unordered, connectionless. Ports exist here. Flow control, congestion control.',
      insight: 'As a backend engineer, you mostly live in Layer 4 and Layer 7.',
    },
    {
      num: 3, name: 'Network', unit: 'Packet', color: '#10b981',
      protocols: 'IP, ICMP, IPSec',
      description: 'IP addresses (source and destination). Routing decisions happen here. No concept of ports — only addresses.',
      insight: 'Routers operate at this layer. VPN is a Layer 3 protocol.',
    },
    {
      num: 2, name: 'Data Link', unit: 'Frame', color: '#f59e0b',
      protocols: 'Ethernet, Wi-Fi (802.11)',
      description: 'MAC addresses. Frames sent between physical devices on the same network segment.',
      insight: 'Switches operate at this layer — they only see MAC addresses.',
    },
    {
      num: 1, name: 'Physical', unit: 'Bits', color: '#ef4444',
      protocols: 'Ethernet cable, Wi-Fi radio, Fiber optics',
      description: 'The actual medium: electrical signals, radio waves, light. Converts bits to physical signals and vice versa.',
      insight: 'Hubs operate at this layer — they broadcast to all ports.',
    },
  ];

  setActiveLayer(num: number) {
    this.activeOsiLayer.update((current) => (current === num ? null : num));
  }
}
