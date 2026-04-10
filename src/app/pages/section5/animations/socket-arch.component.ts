import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-socket-arch',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .sock-arch {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .sock-arch svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="sock-arch">
      <svg viewBox="0 0 740 580" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sa-glow-c">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feFlood flood-color="#22d3ee" flood-opacity="0.35" />
            <feComposite in2="b" operator="in" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sa-glow-g">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feFlood flood-color="#10b981" flood-opacity="0.35" />
            <feComposite in2="b" operator="in" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sa-glow-p">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feFlood flood-color="#ec4899" flood-opacity="0.35" />
            <feComposite in2="b" operator="in" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="370" y="20" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.4">Complete Picture: Live Connection Architecture</text>

        <!-- ============ CLIENTS (left column) ============ -->
        <g class="sa-clients" opacity="0">
          <text x="46" y="52" fill="#64748b"
                font-size="8" font-weight="700" font-family="Inter, sans-serif">CLIENTS</text>

          <!-- Client 1 (Germany) -->
          <rect x="20" y="62" width="110" height="42" rx="8" fill="#1a2332"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="75" y="80" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Germany</text>
          <text x="75" y="96" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">85.1.2.3:50001</text>

          <!-- Client 2 (India) -->
          <rect x="20" y="114" width="110" height="42" rx="8" fill="#1a2332"
                stroke="#10b981" stroke-width="1.5" />
          <text x="75" y="132" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">India</text>
          <text x="75" y="148" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">103.4.5.6:50002</text>

          <!-- Client 3 (Lebanon) -->
          <rect x="20" y="166" width="110" height="42" rx="8" fill="#1a2332"
                stroke="#ec4899" stroke-width="1.5" />
          <text x="75" y="184" text-anchor="middle" fill="#ec4899"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Lebanon</text>
          <text x="75" y="200" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">78.7.8.9:50003</text>

          <!-- New client (connecting) -->
          <rect class="sa-new-client" x="20" y="220" width="110" height="42" rx="8" fill="#1a2332"
                stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3" opacity="0" />
          <text class="sa-new-client-txt" x="75" y="238" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">Brazil</text>
          <text class="sa-new-client-ip" x="75" y="254" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace" opacity="0">200.1.2.3:50004</text>
        </g>

        <!-- ============ BACKEND PROCESS ============ -->
        <g class="sa-process" opacity="0">
          <rect x="160" y="38" width="560" height="80" rx="12"
                fill="rgba(99, 102, 241, 0.04)" stroke="#6366f1" stroke-width="1.5" />
          <text x="180" y="58" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">BACKEND PROCESS</text>

          <!-- fd table -->
          <rect x="175" y="66" width="530" height="38" rx="6"
                fill="#0c1222" stroke="#1e293b" stroke-width="1" />
          <text x="190" y="82" fill="#475569"
                font-size="6.5" font-weight="600" font-family="'JetBrains Mono', monospace">fds:</text>

          <rect x="218" y="72" width="78" height="26" rx="5"
                fill="rgba(245, 158, 11, 0.06)" stroke="#f59e0b" stroke-width="1" />
          <text x="257" y="89" text-anchor="middle" fill="#f59e0b"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">fd=3 Listen</text>

          <rect x="304" y="72" width="95" height="26" rx="5"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="351" y="89" text-anchor="middle" fill="#22d3ee"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">fd=4 Germany</text>

          <rect x="407" y="72" width="85" height="26" rx="5"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="449" y="89" text-anchor="middle" fill="#10b981"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">fd=5 India</text>

          <rect x="500" y="72" width="95" height="26" rx="5"
                fill="rgba(236, 72, 153, 0.06)" stroke="#ec4899" stroke-width="1" />
          <text x="547" y="89" text-anchor="middle" fill="#ec4899"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">fd=6 Lebanon</text>

          <!-- New fd slot (animated) -->
          <rect class="sa-new-fd" x="603" y="72" width="90" height="26" rx="5"
                fill="rgba(245, 158, 11, 0.06)" stroke="#f59e0b" stroke-width="1"
                stroke-dasharray="4,2" opacity="0" />
          <text class="sa-new-fd-txt" x="648" y="89" text-anchor="middle" fill="#f59e0b"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">fd=7 Brazil</text>
        </g>

        <!-- ============ KERNEL ============ -->
        <g class="sa-kernel" opacity="0">
          <rect x="160" y="136" width="560" height="420" rx="12"
                fill="rgba(245, 158, 11, 0.02)" stroke="rgba(245, 158, 11, 0.15)" stroke-width="1" />
          <text x="180" y="158" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">KERNEL</text>
        </g>

        <!-- Listening Socket -->
        <g class="sa-listen" opacity="0">
          <rect x="180" y="168" width="220" height="110" rx="10"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1.5" />
          <text x="290" y="188" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Listening Socket (fd=3)</text>
          <text x="290" y="202" text-anchor="middle" fill="#475569"
                font-size="7" font-family="'JetBrains Mono', monospace">0.0.0.0:8080</text>

          <!-- SYN Queue -->
          <rect x="192" y="214" width="96" height="50" rx="6"
                fill="rgba(245, 158, 11, 0.06)" stroke="#f59e0b" stroke-width="1" />
          <text x="240" y="230" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">SYN Queue</text>
          <!-- Slots -->
          <rect x="200" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="222" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="244" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="266" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />

          <!-- Accept Queue -->
          <rect x="296" y="214" width="96" height="50" rx="6"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="344" y="230" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Accept Queue</text>
          <rect x="304" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="326" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
          <rect x="348" y="238" width="18" height="18" rx="3" fill="#141e2e" stroke="#1e293b" stroke-width="1" />
        </g>

        <!-- SYN Queue slot fill (animated) -->
        <rect class="sa-syn-fill" x="200" y="238" width="18" height="18" rx="3"
              fill="#f59e0b" opacity="0" />

        <!-- Accept Queue slot fill (animated) -->
        <rect class="sa-acc-fill" x="304" y="238" width="18" height="18" rx="3"
              fill="#10b981" opacity="0" />

        <!-- Connection 1 (Germany) -->
        <g class="sa-conn1" opacity="0">
          <rect x="420" y="168" width="140" height="76" rx="8"
                fill="#0c1222" stroke="#22d3ee" stroke-width="1.5" />
          <text x="490" y="186" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">fd=4 Germany</text>
          <rect x="432" y="196" width="56" height="18" rx="3"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="460" y="209" text-anchor="middle" fill="#22d3ee"
                font-size="6" font-family="'JetBrains Mono', monospace">Send Q</text>
          <rect x="494" y="196" width="56" height="18" rx="3"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="522" y="209" text-anchor="middle" fill="#10b981"
                font-size="6" font-family="'JetBrains Mono', monospace">Recv Q</text>
          <!-- Data indicator bars -->
          <rect class="sa-c1-send" x="434" y="218" width="0" height="4" rx="2" fill="#22d3ee" />
          <rect class="sa-c1-recv" x="496" y="218" width="0" height="4" rx="2" fill="#10b981" />
        </g>

        <!-- Connection 2 (India) -->
        <g class="sa-conn2" opacity="0">
          <rect x="420" y="256" width="140" height="76" rx="8"
                fill="#0c1222" stroke="#10b981" stroke-width="1.5" />
          <text x="490" y="274" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">fd=5 India</text>
          <rect x="432" y="284" width="56" height="18" rx="3"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="460" y="297" text-anchor="middle" fill="#22d3ee"
                font-size="6" font-family="'JetBrains Mono', monospace">Send Q</text>
          <rect x="494" y="284" width="56" height="18" rx="3"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="522" y="297" text-anchor="middle" fill="#10b981"
                font-size="6" font-family="'JetBrains Mono', monospace">Recv Q</text>
          <rect class="sa-c2-send" x="434" y="306" width="0" height="4" rx="2" fill="#22d3ee" />
          <rect class="sa-c2-recv" x="496" y="306" width="0" height="4" rx="2" fill="#10b981" />
        </g>

        <!-- Connection 3 (Lebanon) -->
        <g class="sa-conn3" opacity="0">
          <rect x="420" y="344" width="140" height="76" rx="8"
                fill="#0c1222" stroke="#ec4899" stroke-width="1.5" />
          <text x="490" y="362" text-anchor="middle" fill="#ec4899"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">fd=6 Lebanon</text>
          <rect x="432" y="372" width="56" height="18" rx="3"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="460" y="385" text-anchor="middle" fill="#22d3ee"
                font-size="6" font-family="'JetBrains Mono', monospace">Send Q</text>
          <rect x="494" y="372" width="56" height="18" rx="3"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="522" y="385" text-anchor="middle" fill="#10b981"
                font-size="6" font-family="'JetBrains Mono', monospace">Recv Q</text>
          <rect class="sa-c3-send" x="434" y="394" width="0" height="4" rx="2" fill="#22d3ee" />
          <rect class="sa-c3-recv" x="496" y="394" width="0" height="4" rx="2" fill="#10b981" />
        </g>

        <!-- New connection (Brazil) - animated -->
        <g class="sa-conn-new" opacity="0">
          <rect x="420" y="432" width="140" height="76" rx="8"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3" />
          <text x="490" y="450" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">fd=7 Brazil</text>
          <rect x="432" y="460" width="56" height="18" rx="3"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="460" y="473" text-anchor="middle" fill="#22d3ee"
                font-size="6" font-family="'JetBrains Mono', monospace">Send Q</text>
          <rect x="494" y="460" width="56" height="18" rx="3"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="522" y="473" text-anchor="middle" fill="#10b981"
                font-size="6" font-family="'JetBrains Mono', monospace">Recv Q</text>
        </g>

        <!-- Connection lines: clients → kernel connections -->
        <line class="sa-line1" x1="130" y1="83" x2="420" y2="206"
              stroke="rgba(34, 211, 238, 0.2)" stroke-width="1" stroke-dasharray="3,3" opacity="0" />
        <line class="sa-line2" x1="130" y1="135" x2="420" y2="294"
              stroke="rgba(16, 185, 129, 0.2)" stroke-width="1" stroke-dasharray="3,3" opacity="0" />
        <line class="sa-line3" x1="130" y1="187" x2="420" y2="382"
              stroke="rgba(236, 72, 153, 0.2)" stroke-width="1" stroke-dasharray="3,3" opacity="0" />

        <!-- Animated data dots -->
        <circle class="sa-dot1" cx="130" cy="83" r="4" fill="#22d3ee" opacity="0" filter="url(#sa-glow-c)" />
        <circle class="sa-dot2" cx="130" cy="135" r="4" fill="#10b981" opacity="0" filter="url(#sa-glow-g)" />
        <circle class="sa-dot3" cx="130" cy="187" r="4" fill="#ec4899" opacity="0" filter="url(#sa-glow-p)" />

        <!-- Bottom note -->
        <g class="sa-note" opacity="0">
          <text x="450" y="540" text-anchor="middle" fill="#475569"
                font-size="8" font-family="Inter, sans-serif">
            Listening socket: SYN + Accept queues  |  Each connection: Send + Recv queues  |  New clients go through the queues first
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class SocketArchComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.sock-arch');
    const tl = this.createScrollTimeline(container);

    // Structure reveals
    tl.fromTo(this.q('.sa-clients'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 });
    tl.fromTo(this.q('.sa-process'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    tl.fromTo(this.q('.sa-kernel'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    tl.fromTo(this.q('.sa-listen'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35 });
    tl.fromTo(this.q('.sa-conn1'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');
    tl.fromTo(this.q('.sa-conn2'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');
    tl.fromTo(this.q('.sa-conn3'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');

    // Connection lines
    tl.to(this.q('.sa-line1'), { opacity: 1, duration: 0.2 });
    tl.to(this.q('.sa-line2'), { opacity: 1, duration: 0.2 }, '-=0.1');
    tl.to(this.q('.sa-line3'), { opacity: 1, duration: 0.2 }, '-=0.1');

    tl.fromTo(this.q('.sa-note'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Start the live loop
    tl.add(() => this.startLiveLoop());
  }

  private startLiveLoop(): void {
    const container = this.q('.sock-arch');
    const loop = this.createLoopingTimeline(container);

    const dot1 = this.q('.sa-dot1');
    const dot2 = this.q('.sa-dot2');
    const dot3 = this.q('.sa-dot3');

    // === Phase 1: Existing connections pulse with data ===

    // Data flowing on conn 1 (Germany)
    loop.set(dot1, { attr: { cx: 130, cy: 83 }, opacity: 0 }, 0);
    loop.to(dot1, { opacity: 1, duration: 0.05 }, 0);
    loop.to(dot1, { attr: { cx: 420, cy: 206 }, duration: 0.6, ease: 'power1.in' }, 0.05);
    loop.to(dot1, { opacity: 0, duration: 0.05 }, 0.65);
    loop.to(this.q('.sa-c1-recv'), { attr: { width: 40 }, duration: 0.2 }, 0.6);

    // Data flowing on conn 2 (India)
    loop.set(dot2, { attr: { cx: 130, cy: 135 }, opacity: 0 }, 0.2);
    loop.to(dot2, { opacity: 1, duration: 0.05 }, 0.2);
    loop.to(dot2, { attr: { cx: 420, cy: 294 }, duration: 0.6, ease: 'power1.in' }, 0.25);
    loop.to(dot2, { opacity: 0, duration: 0.05 }, 0.85);
    loop.to(this.q('.sa-c2-recv'), { attr: { width: 30 }, duration: 0.2 }, 0.8);

    // Response from conn 3 (Lebanon)
    loop.to(this.q('.sa-c3-send'), { attr: { width: 50 }, duration: 0.3 }, 0.4);
    loop.set(dot3, { attr: { cx: 420, cy: 382 }, opacity: 0 }, 0.7);
    loop.to(dot3, { opacity: 1, duration: 0.05 }, 0.7);
    loop.to(dot3, { attr: { cx: 130, cy: 187 }, duration: 0.6, ease: 'power1.in' }, 0.75);
    loop.to(dot3, { opacity: 0, duration: 0.05 }, 1.35);
    loop.to(this.q('.sa-c3-send'), { attr: { width: 0 }, duration: 0.2 }, 1.2);

    // Drain recv queues (app reads data)
    loop.to(this.q('.sa-c1-recv'), { attr: { width: 0 }, duration: 0.3 }, 1.0);
    loop.to(this.q('.sa-c2-recv'), { attr: { width: 0 }, duration: 0.3 }, 1.1);

    // Send responses
    loop.to(this.q('.sa-c1-send'), { attr: { width: 35 }, duration: 0.2 }, 1.2);
    loop.to(this.q('.sa-c2-send'), { attr: { width: 25 }, duration: 0.2 }, 1.3);

    // Response dots back to clients
    loop.set(dot1, { attr: { cx: 420, cy: 206 }, opacity: 0 }, 1.5);
    loop.to(dot1, { opacity: 1, duration: 0.05 }, 1.5);
    loop.to(dot1, { attr: { cx: 130, cy: 83 }, duration: 0.6, ease: 'power1.in' }, 1.55);
    loop.to(dot1, { opacity: 0, duration: 0.05 }, 2.15);
    loop.to(this.q('.sa-c1-send'), { attr: { width: 0 }, duration: 0.2 }, 2.0);

    loop.set(dot2, { attr: { cx: 420, cy: 294 }, opacity: 0 }, 1.6);
    loop.to(dot2, { opacity: 1, duration: 0.05 }, 1.6);
    loop.to(dot2, { attr: { cx: 130, cy: 135 }, duration: 0.6, ease: 'power1.in' }, 1.65);
    loop.to(dot2, { opacity: 0, duration: 0.05 }, 2.25);
    loop.to(this.q('.sa-c2-send'), { attr: { width: 0 }, duration: 0.2 }, 2.1);

    // === Phase 2: New client (Brazil) connects ===

    // New client appears
    loop.to(this.q('.sa-new-client'), { opacity: 1, duration: 0.2 }, 2.5);
    loop.to(this.q('.sa-new-client-txt'), { opacity: 1, duration: 0.2 }, 2.5);
    loop.to(this.q('.sa-new-client-ip'), { opacity: 1, duration: 0.2 }, 2.5);

    // SYN enters queue
    loop.to(this.q('.sa-syn-fill'), { opacity: 1, duration: 0.2 }, 2.8);

    // Moves to accept queue
    loop.to(this.q('.sa-syn-fill'), { opacity: 0, duration: 0.15 }, 3.2);
    loop.to(this.q('.sa-acc-fill'), { opacity: 1, duration: 0.15 }, 3.3);

    // accept() → new connection created
    loop.to(this.q('.sa-acc-fill'), { opacity: 0, duration: 0.15 }, 3.6);
    loop.fromTo(this.q('.sa-conn-new'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, 3.7);
    loop.to(this.q('.sa-new-fd'), { opacity: 1, duration: 0.2 }, 3.8);
    loop.to(this.q('.sa-new-fd-txt'), { opacity: 1, duration: 0.2 }, 3.8);

    // Hold
    loop.to({}, { duration: 2.5 });

    // Fade out animated elements for reset
    const animated = [
      '.sa-new-client', '.sa-new-client-txt', '.sa-new-client-ip',
      '.sa-conn-new', '.sa-new-fd', '.sa-new-fd-txt',
    ].map(s => this.q(s));
    loop.to(animated, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
