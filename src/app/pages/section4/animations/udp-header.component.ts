import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-udp-header',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .udp-header-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .udp-header-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="udp-header-anim">
      <svg viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="udph-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="udph-grad-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="udph-grad-purple" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="udph-grad-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="udph-grad-amber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="udph-grad-data" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#ec4899" stop-opacity="0.03" />
          </linearGradient>
        </defs>

        <!-- Title -->
        <text x="350" y="24" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">UDP Datagram Structure</text>

        <!-- Bit ruler -->
        <g class="udph-ruler" opacity="0">
          <text x="100" y="58" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">0</text>
          <text x="250" y="58" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">8</text>
          <text x="350" y="58" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16</text>
          <text x="450" y="58" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">24</text>
          <text x="600" y="58" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">31</text>
          <line x1="100" y1="62" x2="600" y2="62" stroke="#374151" stroke-width="1" />
        </g>

        <!-- Row 1: Source Port + Destination Port -->
        <g class="udph-row1" opacity="0">
          <!-- Source Port -->
          <rect x="100" y="68" width="250" height="52" rx="4"
                fill="url(#udph-grad-cyan)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="225" y="90" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Source Port</text>
          <text x="225" y="108" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">16 bits (2 bytes)</text>

          <!-- Destination Port -->
          <rect x="350" y="68" width="250" height="52" rx="4"
                fill="url(#udph-grad-purple)" stroke="#6366f1" stroke-width="1.5" />
          <text x="475" y="90" text-anchor="middle" fill="#6366f1"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Destination Port</text>
          <text x="475" y="108" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">16 bits (2 bytes)</text>
        </g>

        <!-- Row 1 byte marker -->
        <g class="udph-bytes1" opacity="0">
          <text x="620" y="98" fill="#64748b" font-size="9"
                font-family="'JetBrains Mono', monospace">4 bytes</text>
        </g>

        <!-- Row 2: Length + Checksum -->
        <g class="udph-row2" opacity="0">
          <!-- Length -->
          <rect x="100" y="126" width="250" height="52" rx="4"
                fill="url(#udph-grad-green)" stroke="#10b981" stroke-width="1.5" />
          <text x="225" y="148" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Length</text>
          <text x="225" y="166" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">16 bits (2 bytes)</text>

          <!-- Checksum -->
          <rect x="350" y="126" width="250" height="52" rx="4"
                fill="url(#udph-grad-amber)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="475" y="148" text-anchor="middle" fill="#f59e0b"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Checksum</text>
          <text x="475" y="166" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">16 bits (2 bytes)</text>
        </g>

        <!-- Row 2 byte marker -->
        <g class="udph-bytes2" opacity="0">
          <text x="620" y="156" fill="#64748b" font-size="9"
                font-family="'JetBrains Mono', monospace">4 bytes</text>
        </g>

        <!-- Data -->
        <g class="udph-data" opacity="0">
          <rect x="100" y="184" width="500" height="52" rx="4"
                fill="url(#udph-grad-data)" stroke="#ec4899" stroke-width="1.5"
                stroke-dasharray="6,3" />
          <text x="350" y="206" text-anchor="middle" fill="#ec4899"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Data (Payload)</text>
          <text x="350" y="224" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">Variable length</text>
        </g>

        <!-- Total header badge -->
        <g class="udph-total" opacity="0">
          <rect x="240" y="252" width="220" height="34" rx="8"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
          <text x="350" y="274" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">
            Total Header = 8 bytes
          </text>
        </g>

        <!-- Header brace -->
        <g class="udph-brace" opacity="0">
          <line x1="80" y1="68" x2="80" y2="178" stroke="#64748b"
                stroke-width="1.5" stroke-dasharray="4,2" />
          <text x="68" y="128" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace"
                transform="rotate(-90,68,128)">HEADER</text>
        </g>

        <!-- Annotations that appear on scroll -->
        <g class="udph-ann-src" opacity="0">
          <rect x="110" y="310" width="200" height="46" rx="6"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="120" y="328" fill="#22d3ee"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Source Port</text>
          <text x="120" y="346" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Sender's app (e.g. 58635)</text>
          <line x1="210" y1="310" x2="210" y2="120" stroke="#22d3ee"
                stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4" />
        </g>

        <g class="udph-ann-dst" opacity="0">
          <rect x="390" y="310" width="200" height="46" rx="6"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="400" y="328" fill="#6366f1"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Destination Port</text>
          <text x="400" y="346" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Target app (e.g. 53 = DNS)</text>
          <line x1="490" y1="310" x2="490" y2="120" stroke="#6366f1"
                stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4" />
        </g>

        <g class="udph-ann-len" opacity="0">
          <rect x="110" y="370" width="200" height="46" rx="6"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="120" y="388" fill="#10b981"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Length</text>
          <text x="120" y="406" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Header + Data (min 8 bytes)</text>
          <line x1="210" y1="370" x2="210" y2="178" stroke="#10b981"
                stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4" />
        </g>

        <g class="udph-ann-chk" opacity="0">
          <rect x="390" y="370" width="200" height="46" rx="6"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="400" y="388" fill="#f59e0b"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Checksum</text>
          <text x="400" y="406" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Error detection (optional v4)</text>
          <line x1="490" y1="370" x2="490" y2="178" stroke="#f59e0b"
                stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4" />
        </g>
      </svg>
    </div>
  `,
})
export class UdpHeaderComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.udp-header-anim');
    const tl = this.createScrollTimeline(container);

    // 1. Ruler
    tl.fromTo(
      this.q('.udph-ruler'),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );

    // 2. Row 1 (ports)
    tl.fromTo(
      this.q('.udph-row1'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.udph-bytes1'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.2',
    );

    // 3. Row 2 (length + checksum)
    tl.fromTo(
      this.q('.udph-row2'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.udph-bytes2'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.2',
    );

    // 4. Data section
    tl.fromTo(
      this.q('.udph-data'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    );

    // 5. Header brace
    tl.fromTo(
      this.q('.udph-brace'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.3',
    );

    // 6. Total badge
    tl.fromTo(
      this.q('.udph-total'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    );

    // 7. Annotations stagger in
    const anns = [
      this.q('.udph-ann-src'),
      this.q('.udph-ann-dst'),
      this.q('.udph-ann-len'),
      this.q('.udph-ann-chk'),
    ];
    tl.fromTo(
      anns,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out' },
    );
  }
}
