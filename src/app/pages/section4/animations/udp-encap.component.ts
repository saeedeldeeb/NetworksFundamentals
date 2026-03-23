import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-udp-encap',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .udp-encap {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .udp-encap svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="udp-encap">
      <svg viewBox="0 0 700 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="enc-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="24" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">UDP Encapsulation in IP Packet</text>

        <!-- Outer: IP Packet -->
        <g class="enc-ip" opacity="0">
          <rect x="40" y="50" width="620" height="200" rx="12"
                fill="none" stroke="#6366f1" stroke-width="2" />
          <text x="60" y="74" fill="#6366f1"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">IP Packet</text>
        </g>

        <!-- IP Header -->
        <g class="enc-ip-hdr" opacity="0">
          <rect x="60" y="88" width="140" height="146" rx="8"
                fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="130" y="112" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">IP Header</text>
          <text x="130" y="130" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">20 bytes</text>

          <text x="80" y="155" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Src IP</text>
          <text x="80" y="170" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Dst IP</text>
          <text x="80" y="185" fill="#f59e0b"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Proto: 17 (UDP)</text>
          <text x="80" y="200" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">TTL, Length...</text>
        </g>

        <!-- Arrow between IP header and UDP -->
        <g class="enc-arrow" opacity="0">
          <text x="218" y="165" text-anchor="middle" fill="#374151"
                font-size="18" font-family="Inter, sans-serif">=</text>
        </g>

        <!-- IP Data label -->
        <g class="enc-ip-data-label" opacity="0">
          <text x="240" y="82" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">IP Data</text>
          <line x1="240" y1="85" x2="636" y2="85"
                stroke="#374151" stroke-width="1" stroke-dasharray="3,3" />
        </g>

        <!-- UDP Datagram outline -->
        <g class="enc-udp" opacity="0">
          <rect x="236" y="88" width="404" height="146" rx="8"
                fill="none" stroke="#22d3ee" stroke-width="1.5" />
          <text x="256" y="108" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">UDP Datagram</text>
        </g>

        <!-- UDP Header -->
        <g class="enc-udp-hdr" opacity="0">
          <rect x="252" y="118" width="100" height="100" rx="6"
                fill="rgba(34, 211, 238, 0.08)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="302" y="140" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">UDP Hdr</text>
          <text x="302" y="156" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">8 bytes</text>
          <text x="266" y="175" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Src Port</text>
          <text x="266" y="188" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Dst Port</text>
          <text x="266" y="201" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Len / Chk</text>
        </g>

        <!-- UDP Data (payload) -->
        <g class="enc-udp-data" opacity="0">
          <rect x="364" y="118" width="260" height="100" rx="6"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1.5"
                stroke-dasharray="6,3" />
          <text x="494" y="162" text-anchor="middle" fill="#10b981"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Your Data</text>
          <text x="494" y="180" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">(Application payload)</text>
        </g>

        <!-- Bottom: Size breakdown -->
        <g class="enc-sizes" opacity="0">
          <rect x="100" y="270" width="500" height="32" rx="6"
                fill="#0f172a" stroke="#374151" stroke-width="1" />

          <!-- IP header portion -->
          <rect x="100" y="270" width="100" height="32" rx="6"
                fill="rgba(99, 102, 241, 0.15)" />
          <text x="150" y="290" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">20 B</text>

          <!-- UDP header portion -->
          <rect x="200" y="270" width="40" height="32"
                fill="rgba(34, 211, 238, 0.15)" />
          <text x="220" y="290" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">8 B</text>

          <!-- Data portion -->
          <rect x="240" y="270" width="360" height="32" rx="6"
                fill="rgba(16, 185, 129, 0.08)" />
          <text x="420" y="290" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Up to 65,507 bytes of data</text>

          <!-- labels below -->
          <text x="150" y="316" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">IP Hdr</text>
          <text x="220" y="316" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">UDP</text>
          <text x="420" y="316" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">65,535 - 20 - 8 = 65,507 max payload</text>
        </g>
      </svg>
    </div>
  `,
})
export class UdpEncapComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.udp-encap');
    const tl = this.createScrollTimeline(container);

    // 1. IP packet outline
    tl.fromTo(
      this.q('.enc-ip'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
    );

    // 2. IP header
    tl.fromTo(
      this.q('.enc-ip-hdr'),
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
    );

    // 3. Arrow + IP data label
    tl.fromTo(
      this.q('.enc-arrow'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );
    tl.fromTo(
      this.q('.enc-ip-data-label'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.2',
    );

    // 4. UDP datagram outline
    tl.fromTo(
      this.q('.enc-udp'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
    );

    // 5. UDP header
    tl.fromTo(
      this.q('.enc-udp-hdr'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );

    // 6. UDP data / payload
    tl.fromTo(
      this.q('.enc-udp-data'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );

    // 7. Size breakdown bar
    tl.fromTo(
      this.q('.enc-sizes'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    );
  }
}
