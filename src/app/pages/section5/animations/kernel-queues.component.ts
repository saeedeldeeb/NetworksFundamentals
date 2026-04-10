import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-kernel-queues',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .kern-q {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .kern-q svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="kern-q">
      <svg viewBox="0 0 740 560" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="kq-glow-c">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feFlood flood-color="#22d3ee" flood-opacity="0.5" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="kq-glow-a">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feFlood flood-color="#f59e0b" flood-opacity="0.5" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="kq-glow-g">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feFlood flood-color="#10b981" flood-opacity="0.5" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="kq-glow-p">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feFlood flood-color="#6366f1" flood-opacity="0.5" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="370" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.4">The Full Journey: Connection &rarr; Kernel &rarr; App</text>

        <!-- ===== THREE ZONE COLUMNS ===== -->

        <!-- CLIENT -->
        <g class="kq-zone-c" opacity="0">
          <rect x="20" y="44" width="160" height="480" rx="12"
                fill="rgba(34, 211, 238, 0.02)" stroke="rgba(34, 211, 238, 0.12)" stroke-width="1" />
          <text x="100" y="68" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <rect x="40" y="82" width="120" height="48" rx="10" fill="#1a2332"
                stroke="#22d3ee" stroke-width="2" />
          <text x="100" y="104" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Browser</text>
          <text x="100" y="120" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">10.0.0.5:54321</text>
        </g>

        <!-- KERNEL -->
        <g class="kq-zone-k" opacity="0">
          <rect x="210" y="44" width="310" height="480" rx="12"
                fill="rgba(245, 158, 11, 0.02)" stroke="rgba(245, 158, 11, 0.12)" stroke-width="1" />
          <text x="365" y="68" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">KERNEL (OS)</text>
          <rect x="245" y="82" width="240" height="28" rx="6"
                fill="rgba(245, 158, 11, 0.08)" />
          <text x="365" y="101" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Listening Socket fd=3 :8080</text>
        </g>

        <!-- APP -->
        <g class="kq-zone-a" opacity="0">
          <rect x="550" y="44" width="170" height="480" rx="12"
                fill="rgba(99, 102, 241, 0.02)" stroke="rgba(99, 102, 241, 0.12)" stroke-width="1" />
          <text x="635" y="68" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">BACKEND APP</text>
          <rect x="570" y="82" width="130" height="48" rx="10" fill="#1a2332"
                stroke="#6366f1" stroke-width="2" />
          <text x="635" y="104" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Node.js</text>
          <text x="635" y="120" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">server.listen(8080)</text>
        </g>

        <!-- ===== SYN QUEUE ===== -->
        <g class="kq-synq" opacity="0">
          <rect x="235" y="128" width="260" height="80" rx="10"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1.5" />
          <text x="255" y="148" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">SYN Queue</text>
          <text x="400" y="148" fill="#475569"
                font-size="7" font-family="Inter, sans-serif">Incomplete handshakes</text>
          <!-- slots -->
          <rect x="250" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="288" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="326" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="364" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="402" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="440" y="158" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
        </g>

        <!-- SYN slot fill -->
        <g class="kq-syn-fill" opacity="0">
          <rect x="250" y="158" width="32" height="34" rx="5"
                fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="266" y="178" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">SYN</text>
        </g>

        <!-- ===== ACCEPT QUEUE ===== -->
        <g class="kq-accq" opacity="0">
          <rect x="235" y="230" width="260" height="80" rx="10"
                fill="#0c1222" stroke="#10b981" stroke-width="1.5" />
          <text x="255" y="250" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Accept Queue</text>
          <text x="408" y="250" fill="#475569"
                font-size="7" font-family="Inter, sans-serif">Completed, ready for app</text>
          <rect x="250" y="260" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="288" y="260" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="326" y="260" width="32" height="34" rx="5" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
        </g>

        <!-- Accept slot fill -->
        <g class="kq-acc-fill" opacity="0">
          <rect x="250" y="260" width="32" height="34" rx="5"
                fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1.5" />
          <text x="266" y="280" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">OK</text>
        </g>

        <!-- ===== CONNECTION FD ===== -->
        <g class="kq-conn-fd" opacity="0">
          <rect x="235" y="340" width="260" height="86" rx="10"
                fill="#0c1222" stroke="#6366f1" stroke-width="1.5" />
          <text x="365" y="362" text-anchor="middle" fill="#6366f1"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Connection Socket fd=4</text>
          <rect x="250" y="374" width="110" height="38" rx="6"
                fill="rgba(34, 211, 238, 0.04)" stroke="#22d3ee" stroke-width="1" />
          <text x="305" y="394" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Send Queue</text>
          <rect x="374" y="374" width="110" height="38" rx="6"
                fill="rgba(16, 185, 129, 0.04)" stroke="#10b981" stroke-width="1" />
          <text x="429" y="394" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Recv Queue</text>
        </g>

        <!-- App fd=4 box -->
        <g class="kq-app-fd" opacity="0">
          <rect x="574" y="340" width="122" height="46" rx="8"
                fill="#1a2332" stroke="#10b981" stroke-width="1.5" />
          <text x="635" y="362" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">fd=4 ready!</text>
          <text x="635" y="378" text-anchor="middle" fill="#475569"
                font-size="7" font-family="Inter, sans-serif">read/write data</text>
        </g>

        <!-- ===== DATA FLOW LINES ===== -->
        <g class="kq-data-lines" opacity="0">
          <!-- request in -->
          <line x1="100" y1="400" x2="372" y2="400"
                stroke="rgba(16, 185, 129, 0.3)" stroke-width="1" stroke-dasharray="4,3" />
          <text x="230" y="396" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">request data</text>
          <!-- response out -->
          <line x1="360" y1="416" x2="100" y2="416"
                stroke="rgba(34, 211, 238, 0.3)" stroke-width="1" stroke-dasharray="4,3" />
          <text x="230" y="428" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">response data</text>
        </g>

        <!-- ===== STEP BADGES ===== -->
        <g class="kq-badge1" opacity="0">
          <circle cx="42" cy="170" r="12" fill="#22d3ee" />
          <text x="42" y="174" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">1</text>
          <text x="62" y="174" fill="#22d3ee"
                font-size="7.5" font-weight="600" font-family="Inter, sans-serif">SYN</text>
        </g>
        <g class="kq-badge2" opacity="0">
          <circle cx="42" cy="210" r="12" fill="#f59e0b" />
          <text x="42" y="214" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">2</text>
          <text x="62" y="214" fill="#f59e0b"
                font-size="7.5" font-weight="600" font-family="Inter, sans-serif">SYN-ACK</text>
        </g>
        <g class="kq-badge3" opacity="0">
          <circle cx="42" cy="275" r="12" fill="#22d3ee" />
          <text x="42" y="279" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">3</text>
          <text x="62" y="279" fill="#22d3ee"
                font-size="7.5" font-weight="600" font-family="Inter, sans-serif">ACK</text>
        </g>
        <g class="kq-badge4" opacity="0">
          <circle cx="42" cy="310" r="12" fill="#10b981" />
          <text x="42" y="314" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">4</text>
          <text x="62" y="314" fill="#10b981"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">Move to Accept Q</text>
        </g>
        <g class="kq-badge5" opacity="0">
          <circle cx="618" cy="276" r="12" fill="#6366f1" />
          <text x="618" y="280" text-anchor="middle" fill="#fff"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">5</text>
          <text x="638" y="280" fill="#6366f1"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">accept()</text>
        </g>
        <g class="kq-badge6" opacity="0">
          <circle cx="618" cy="330" r="12" fill="#10b981" />
          <text x="618" y="334" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">6</text>
          <text x="638" y="334" fill="#10b981"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">return fd</text>
        </g>
        <g class="kq-badge7" opacity="0">
          <circle cx="42" cy="408" r="12" fill="#ec4899" />
          <text x="42" y="412" text-anchor="middle" fill="#0f172a"
                font-size="10" font-weight="800" font-family="Inter, sans-serif">7</text>
          <text x="62" y="412" fill="#ec4899"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">Data flows</text>
        </g>

        <!-- Bottom bar -->
        <g class="kq-bottom" opacity="0">
          <rect x="60" y="448" width="620" height="40" rx="8"
                fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" stroke-width="1" />
          <text x="370" y="466" text-anchor="middle" fill="#f59e0b"
                font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">
            The kernel handles the entire 3-way handshake.
          </text>
          <text x="370" y="480" text-anchor="middle" fill="#64748b"
                font-size="7.5" font-family="Inter, sans-serif">
            Your app never sees SYN or SYN-ACK — it only calls accept() after the connection is ready.
          </text>
        </g>

        <!-- ===== ANIMATED PACKET DOTS ===== -->
        <circle class="kq-pkt" cx="100" cy="106" r="7" fill="#22d3ee" opacity="0" filter="url(#kq-glow-c)" />
      </svg>
    </div>
  `,
})
export class KernelQueuesComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.kern-q');
    const tl = this.createScrollTimeline(container);

    // Reveal zones
    tl.fromTo(this.q('.kq-zone-c'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 });
    tl.fromTo(this.q('.kq-zone-k'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    tl.fromTo(this.q('.kq-zone-a'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 }, '-=0.2');

    // Reveal queues
    tl.fromTo(this.q('.kq-synq'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
    tl.fromTo(this.q('.kq-accq'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15');
    tl.fromTo(this.q('.kq-bottom'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Start loop
    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.kern-q');
    const loop = this.createLoopingTimeline(container);
    const pkt = this.q('.kq-pkt');

    // ===== 1. SYN: Client → Kernel SYN Queue =====
    loop.fromTo(this.q('.kq-badge1'), { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.2 }, 0);
    // Packet starts at client, travels to SYN queue
    loop.set(pkt, { attr: { cx: 100, cy: 155, r: 7, fill: '#22d3ee' }, opacity: 0 }, 0);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 0.1);
    loop.to(pkt, { attr: { cx: 250, cy: 175 }, duration: 0.6, ease: 'power2.inOut' }, 0.2);
    loop.to(pkt, { attr: { r: 4 }, duration: 0.15 }, 0.8); // shrink into slot
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 0.95);
    // Slot fills
    loop.fromTo(this.q('.kq-syn-fill'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.95);

    // ===== 2. SYN-ACK: Kernel → Client =====
    loop.fromTo(this.q('.kq-badge2'), { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.2 }, 1.3);
    loop.set(pkt, { attr: { cx: 250, cy: 175, r: 7, fill: '#f59e0b' }, opacity: 0 }, 1.3);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 1.4);
    loop.to(pkt, { attr: { cx: 100, cy: 200 }, duration: 0.6, ease: 'power2.inOut' }, 1.5);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 2.1);

    // ===== 3. ACK: Client → Kernel =====
    loop.fromTo(this.q('.kq-badge3'), { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.2 }, 2.4);
    loop.set(pkt, { attr: { cx: 100, cy: 260, r: 7, fill: '#22d3ee' }, opacity: 0 }, 2.4);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 2.5);
    loop.to(pkt, { attr: { cx: 250, cy: 275 }, duration: 0.6, ease: 'power2.inOut' }, 2.6);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 3.2);

    // ===== 4. Move SYN slot → Accept slot =====
    loop.fromTo(this.q('.kq-badge4'), { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.2 }, 3.4);
    // SYN slot fades, packet moves down to accept queue
    loop.set(pkt, { attr: { cx: 266, cy: 175, r: 6, fill: '#10b981' }, opacity: 0 }, 3.4);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 3.5);
    loop.to(this.q('.kq-syn-fill'), { opacity: 0, duration: 0.2 }, 3.5);
    loop.to(pkt, { attr: { cy: 277 }, duration: 0.5, ease: 'power2.inOut' }, 3.6);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 4.1);
    // Accept slot fills
    loop.fromTo(this.q('.kq-acc-fill'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 4.1);

    // ===== 5. App calls accept() =====
    loop.fromTo(this.q('.kq-badge5'), { opacity: 0, x: 5 }, { opacity: 1, x: 0, duration: 0.2 }, 4.5);
    // Packet from accept queue to app
    loop.set(pkt, { attr: { cx: 266, cy: 277, r: 6, fill: '#6366f1' }, opacity: 0 }, 4.5);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 4.6);
    loop.to(pkt, { attr: { cx: 635, cy: 277 }, duration: 0.7, ease: 'power2.inOut' }, 4.7);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 5.4);
    loop.to(this.q('.kq-acc-fill'), { opacity: 0, duration: 0.15 }, 4.8);

    // ===== 6. Kernel creates connection fd =====
    loop.fromTo(this.q('.kq-badge6'), { opacity: 0, x: 5 }, { opacity: 1, x: 0, duration: 0.2 }, 5.5);
    loop.fromTo(this.q('.kq-conn-fd'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, 5.5);
    // fd returned to app
    loop.set(pkt, { attr: { cx: 365, cy: 380, r: 6, fill: '#10b981' }, opacity: 0 }, 5.8);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 5.8);
    loop.to(pkt, { attr: { cx: 635, cy: 363 }, duration: 0.5, ease: 'power2.inOut' }, 5.9);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 6.4);
    loop.fromTo(this.q('.kq-app-fd'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 6.3);

    // ===== 7. Data flows =====
    loop.fromTo(this.q('.kq-badge7'), { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.2 }, 6.8);
    loop.fromTo(this.q('.kq-data-lines'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 6.8);

    // Request data: client → recv queue
    loop.set(pkt, { attr: { cx: 100, cy: 400, r: 5, fill: '#10b981' }, opacity: 0 }, 7.0);
    loop.to(pkt, { opacity: 1, duration: 0.05 }, 7.0);
    loop.to(pkt, { attr: { cx: 429 }, duration: 0.6, ease: 'power1.inOut' }, 7.05);
    loop.to(pkt, { opacity: 0, duration: 0.05 }, 7.65);

    // Response data: send queue → client
    loop.set(pkt, { attr: { cx: 305, cy: 416, r: 5, fill: '#22d3ee' }, opacity: 0 }, 7.8);
    loop.to(pkt, { opacity: 1, duration: 0.05 }, 7.8);
    loop.to(pkt, { attr: { cx: 100 }, duration: 0.6, ease: 'power1.inOut' }, 7.85);
    loop.to(pkt, { opacity: 0, duration: 0.05 }, 8.45);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade animated elements
    const animated = [
      '.kq-badge1', '.kq-badge2', '.kq-badge3', '.kq-badge4',
      '.kq-badge5', '.kq-badge6', '.kq-badge7',
      '.kq-conn-fd', '.kq-app-fd', '.kq-data-lines',
    ].map(s => this.q(s));
    loop.to(animated, { opacity: 0, duration: 0.5 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
