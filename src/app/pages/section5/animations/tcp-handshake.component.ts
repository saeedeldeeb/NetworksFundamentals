import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-handshake',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-hs {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-hs svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-hs">
      <svg viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="hs-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="hs-arrow-cyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#22d3ee" />
          </marker>
          <marker id="hs-arrow-indigo" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#6366f1" />
          </marker>
          <marker id="hs-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="24" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Three-Way Handshake</text>

        <!-- Client -->
        <g class="hs-client" opacity="0">
          <rect x="40" y="50" width="130" height="80" rx="14" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2.5" />
          <text x="105" y="80" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Client</text>
          <text x="105" y="98" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">10.0.0.1:5555</text>
          <text x="105" y="116" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">seq = 1000</text>
        </g>

        <!-- Server -->
        <g class="hs-server" opacity="0">
          <rect x="530" y="50" width="130" height="80" rx="14" fill="#1f2937"
                stroke="#6366f1" stroke-width="2.5" />
          <text x="595" y="80" text-anchor="middle" fill="#6366f1"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Server</text>
          <text x="595" y="98" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">10.0.0.2:22</text>
          <text x="595" y="116" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">seq = 5000</text>
        </g>

        <!-- Vertical timeline lines -->
        <line class="hs-timeline-left" x1="105" y1="130" x2="105" y2="350"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />
        <line class="hs-timeline-right" x1="595" y1="130" x2="595" y2="350"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />

        <!-- Step 1: SYN -->
        <g class="hs-step1" opacity="0">
          <line x1="120" y1="170" x2="580" y2="195"
                stroke="#22d3ee" stroke-width="2" marker-end="url(#hs-arrow-cyan)" />
          <rect x="270" y="160" width="160" height="24" rx="5"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
          <text x="350" y="176" text-anchor="middle" fill="#22d3ee"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">SYN  seq=1000</text>
        </g>

        <!-- Step 1 label -->
        <g class="hs-label1" opacity="0">
          <rect x="10" y="162" width="18" height="18" rx="9" fill="#22d3ee" />
          <text x="19" y="175" text-anchor="middle" fill="#0f172a"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">1</text>
        </g>

        <!-- Step 2: SYN-ACK -->
        <g class="hs-step2" opacity="0">
          <line x1="580" y1="230" x2="120" y2="255"
                stroke="#6366f1" stroke-width="2" marker-end="url(#hs-arrow-indigo)" />
          <rect x="230" y="220" width="240" height="24" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1.5" />
          <text x="350" y="236" text-anchor="middle" fill="#6366f1"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">SYN-ACK  seq=5000, ack=1001</text>
        </g>

        <!-- Step 2 label -->
        <g class="hs-label2" opacity="0">
          <rect x="672" y="222" width="18" height="18" rx="9" fill="#6366f1" />
          <text x="681" y="235" text-anchor="middle" fill="#ffffff"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">2</text>
        </g>

        <!-- Step 3: ACK -->
        <g class="hs-step3" opacity="0">
          <line x1="120" y1="290" x2="580" y2="315"
                stroke="#10b981" stroke-width="2" marker-end="url(#hs-arrow-green)" />
          <rect x="280" y="280" width="140" height="24" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
          <text x="350" y="296" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">ACK  ack=5001</text>
        </g>

        <!-- Step 3 label -->
        <g class="hs-label3" opacity="0">
          <rect x="10" y="282" width="18" height="18" rx="9" fill="#10b981" />
          <text x="19" y="295" text-anchor="middle" fill="#0f172a"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">3</text>
        </g>

        <!-- Connection established -->
        <g class="hs-established" opacity="0">
          <rect x="200" y="350" width="300" height="30" rx="8"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1.5" />
          <text x="350" y="370" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">CONNECTION ESTABLISHED</text>
        </g>

        <!-- File descriptor labels -->
        <g class="hs-fd-client" opacity="0">
          <text x="105" y="400" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">fd created</text>
        </g>
        <g class="hs-fd-server" opacity="0">
          <text x="595" y="400" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">fd created</text>
        </g>

        <!-- Animated packet dots -->
        <circle class="hs-pkt1" cx="120" cy="170" r="6" fill="#22d3ee" opacity="0" filter="url(#hs-glow)" />
        <circle class="hs-pkt2" cx="580" cy="230" r="6" fill="#6366f1" opacity="0" filter="url(#hs-glow)" />
        <circle class="hs-pkt3" cx="120" cy="290" r="6" fill="#10b981" opacity="0" filter="url(#hs-glow)" />
      </svg>
    </div>
  `,
})
export class TcpHandshakeComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-hs');
    const tl = this.createScrollTimeline(container);

    // 1. Client and server appear
    tl.fromTo(
      this.q('.hs-client'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.hs-server'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );

    // 2. Timeline lines
    tl.to(this.q('.hs-timeline-left'), { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.to(this.q('.hs-timeline-right'), { opacity: 1, duration: 0.3 }, '-=0.2');

    // 3. Start handshake loop
    tl.add(() => this.startHandshakeLoop());
  }

  private startHandshakeLoop(): void {
    const container = this.q('.tcp-hs');
    const loop = this.createLoopingTimeline(container);

    const pkt1 = this.q('.hs-pkt1');
    const pkt2 = this.q('.hs-pkt2');
    const pkt3 = this.q('.hs-pkt3');
    const step1 = this.q('.hs-step1');
    const step2 = this.q('.hs-step2');
    const step3 = this.q('.hs-step3');
    const label1 = this.q('.hs-label1');
    const label2 = this.q('.hs-label2');
    const label3 = this.q('.hs-label3');
    const established = this.q('.hs-established');
    const fdClient = this.q('.hs-fd-client');
    const fdServer = this.q('.hs-fd-server');

    // === Step 1: SYN (Client → Server) ===
    loop.fromTo(label1, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
    loop.fromTo(step1, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
    loop.set(pkt1, { attr: { cx: 120, cy: 170 }, opacity: 0 }, 0);
    loop.to(pkt1, { opacity: 1, duration: 0.05 }, 0.1);
    loop.to(
      pkt1,
      { attr: { cx: 580, cy: 195 }, duration: 0.6, ease: 'power2.inOut' },
      0.1,
    );
    loop.to(pkt1, { opacity: 0, duration: 0.05 }, 0.7);

    // === Step 2: SYN-ACK (Server → Client) ===
    loop.fromTo(label2, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.9);
    loop.fromTo(step2, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9);
    loop.set(pkt2, { attr: { cx: 580, cy: 230 }, opacity: 0 }, 0.9);
    loop.to(pkt2, { opacity: 1, duration: 0.05 }, 1.0);
    loop.to(
      pkt2,
      { attr: { cx: 120, cy: 255 }, duration: 0.6, ease: 'power2.inOut' },
      1.0,
    );
    loop.to(pkt2, { opacity: 0, duration: 0.05 }, 1.6);

    // === Step 3: ACK (Client → Server) ===
    loop.fromTo(label3, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.8);
    loop.fromTo(step3, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.8);
    loop.set(pkt3, { attr: { cx: 120, cy: 290 }, opacity: 0 }, 1.8);
    loop.to(pkt3, { opacity: 1, duration: 0.05 }, 1.9);
    loop.to(
      pkt3,
      { attr: { cx: 580, cy: 315 }, duration: 0.6, ease: 'power2.inOut' },
      1.9,
    );
    loop.to(pkt3, { opacity: 0, duration: 0.05 }, 2.5);

    // === Connection Established ===
    loop.fromTo(
      established,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3 },
      2.7,
    );
    loop.fromTo(fdClient, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.8);
    loop.fromTo(fdServer, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.8);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out everything for loop reset
    loop.to(
      [step1, step2, step3, label1, label2, label3, established, fdClient, fdServer],
      { opacity: 0, duration: 0.4 },
    );
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
