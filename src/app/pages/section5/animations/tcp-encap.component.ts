import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-encap',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-encap {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-encap svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-encap">
      <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
        <!-- Title -->
        <text x="350" y="24" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Segment Inside an IP Packet</text>

        <!-- Outer: IP Packet -->
        <g class="te-ip" opacity="0">
          <rect x="40" y="48" width="620" height="190" rx="12"
                fill="none" stroke="#6366f1" stroke-width="2" />
          <text x="60" y="72" fill="#6366f1"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">IP Packet</text>
        </g>

        <!-- IP Header -->
        <g class="te-ip-hdr" opacity="0">
          <rect x="60" y="84" width="140" height="138" rx="8"
                fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="130" y="108" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">IP Header</text>
          <text x="130" y="126" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">20 bytes</text>
          <text x="80" y="150" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Src IP</text>
          <text x="80" y="165" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Dst IP</text>
          <text x="80" y="180" fill="#22d3ee"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Proto: 6 (TCP)</text>
          <text x="80" y="195" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">TTL, Checksum...</text>
        </g>

        <!-- TCP Segment outer -->
        <g class="te-tcp" opacity="0">
          <rect x="220" y="84" width="420" height="138" rx="8"
                fill="none" stroke="#22d3ee" stroke-width="1.5" />
          <text x="240" y="104" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">TCP Segment</text>
        </g>

        <!-- TCP Header -->
        <g class="te-tcp-hdr" opacity="0">
          <rect x="240" y="112" width="160" height="96" rx="6"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="320" y="132" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">TCP Header</text>
          <text x="320" y="148" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">20–60 bytes</text>
          <text x="255" y="166" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Ports, Seq, Ack</text>
          <text x="255" y="179" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Flags, Window</text>
          <text x="255" y="192" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Checksum, Options</text>
        </g>

        <!-- TCP Data -->
        <g class="te-tcp-data" opacity="0">
          <rect x="418" y="112" width="204" height="96" rx="6"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="520" y="148" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">TCP Data</text>
          <text x="520" y="166" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Your payload</text>
          <text x="520" y="182" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">MSS: up to 1460 B</text>
        </g>

        <!-- Size breakdown -->
        <g class="te-sizes" opacity="0">
          <line x1="60" y1="248" x2="200" y2="248"
                stroke="#6366f1" stroke-width="2" />
          <text x="130" y="265" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">20 B</text>

          <line x1="240" y1="248" x2="400" y2="248"
                stroke="#22d3ee" stroke-width="2" />
          <text x="320" y="265" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">20–60 B</text>

          <line x1="418" y1="248" x2="622" y2="248"
                stroke="#10b981" stroke-width="2" />
          <text x="520" y="265" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">≤ 1460 B</text>
        </g>

        <!-- Total -->
        <g class="te-total" opacity="0">
          <text x="350" y="290" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">
            Total must fit within MTU (1500 bytes) — worst case: 120 bytes of headers alone
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class TcpEncapComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-encap');
    const tl = this.createScrollTimeline(container);

    // IP Packet outline
    tl.fromTo(
      this.q('.te-ip'),
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
    );

    // IP Header
    tl.fromTo(
      this.q('.te-ip-hdr'),
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1',
    );

    // TCP Segment outline
    tl.fromTo(
      this.q('.te-tcp'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.1',
    );

    // TCP Header
    tl.fromTo(
      this.q('.te-tcp-hdr'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
    );

    // TCP Data
    tl.fromTo(
      this.q('.te-tcp-data'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
      '-=0.15',
    );

    // Size breakdown
    tl.fromTo(
      this.q('.te-sizes'),
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3 },
    );

    // Total
    tl.fromTo(
      this.q('.te-total'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );
  }
}
