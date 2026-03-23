import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-header',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-header-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-header-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-header-anim">
      <svg viewBox="0 0 700 520" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="th-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="th-purple" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="th-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="th-amber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="th-red" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#ef4444" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="th-pink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.12" />
            <stop offset="100%" stop-color="#ec4899" stop-opacity="0.04" />
          </linearGradient>
          <linearGradient id="th-data" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.03" />
          </linearGradient>
        </defs>

        <!-- Title -->
        <text x="350" y="24" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Header Structure (20–60 bytes)</text>

        <!-- Bit ruler -->
        <g class="th-ruler" opacity="0">
          <text x="100" y="55" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">0</text>
          <text x="250" y="55" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">8</text>
          <text x="350" y="55" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16</text>
          <text x="450" y="55" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">24</text>
          <text x="600" y="55" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">31</text>
          <line x1="100" y1="58" x2="600" y2="58" stroke="#374151" stroke-width="1" />
        </g>

        <!-- Row 1: Source Port + Dest Port (4 bytes) -->
        <g class="th-row1" opacity="0">
          <rect x="100" y="64" width="250" height="44" rx="6"
                fill="url(#th-cyan)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="225" y="83" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Source Port</text>
          <text x="225" y="98" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16 bits</text>

          <rect x="350" y="64" width="250" height="44" rx="6"
                fill="url(#th-cyan)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="475" y="83" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Dest Port</text>
          <text x="475" y="98" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16 bits</text>
        </g>

        <!-- Row 1 size label -->
        <text class="th-sz1" x="640" y="90" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">4 B</text>

        <!-- Row 2: Sequence Number (4 bytes) -->
        <g class="th-row2" opacity="0">
          <rect x="100" y="112" width="500" height="44" rx="6"
                fill="url(#th-purple)" stroke="#6366f1" stroke-width="1.5" />
          <text x="350" y="131" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Sequence Number</text>
          <text x="350" y="146" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">32 bits — tracks data order (0 to ~4 billion)</text>
        </g>
        <text class="th-sz2" x="640" y="138" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">4 B</text>

        <!-- Row 3: Acknowledgment Number (4 bytes) -->
        <g class="th-row3" opacity="0">
          <rect x="100" y="160" width="500" height="44" rx="6"
                fill="url(#th-green)" stroke="#10b981" stroke-width="1.5" />
          <text x="350" y="179" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Acknowledgment Number</text>
          <text x="350" y="194" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">32 bits — confirms receipt (valid when ACK flag set)</text>
        </g>
        <text class="th-sz3" x="640" y="186" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">4 B</text>

        <!-- Row 4: Offset + Flags + Window Size (4 bytes) -->
        <g class="th-row4" opacity="0">
          <!-- Data Offset -->
          <rect x="100" y="208" width="75" height="44" rx="6"
                fill="url(#th-amber)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="137" y="227" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="Inter, sans-serif">Offset</text>
          <text x="137" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">4 bits</text>

          <!-- Reserved -->
          <rect x="175" y="208" width="45" height="44" rx="6"
                fill="rgba(71, 85, 105, 0.1)" stroke="#475569" stroke-width="1" />
          <text x="197" y="227" text-anchor="middle" fill="#475569"
                font-size="8" font-weight="600" font-family="Inter, sans-serif">Res</text>
          <text x="197" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">3 bits</text>

          <!-- Flags -->
          <rect x="220" y="208" width="150" height="44" rx="6"
                fill="url(#th-red)" stroke="#ef4444" stroke-width="1.5" />
          <text x="295" y="227" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="Inter, sans-serif">9 Flags</text>
          <text x="295" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">NS CWR ECE URG ACK PSH RST SYN FIN</text>

          <!-- Window Size -->
          <rect x="370" y="208" width="230" height="44" rx="6"
                fill="url(#th-pink)" stroke="#ec4899" stroke-width="1.5" />
          <text x="485" y="227" text-anchor="middle" fill="#ec4899"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Window Size</text>
          <text x="485" y="242" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16 bits — flow control</text>
        </g>
        <text class="th-sz4" x="640" y="234" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">4 B</text>

        <!-- Row 5: Checksum + Urgent Pointer (4 bytes) -->
        <g class="th-row5" opacity="0">
          <rect x="100" y="256" width="250" height="44" rx="6"
                fill="url(#th-amber)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="225" y="275" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Checksum</text>
          <text x="225" y="290" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16 bits</text>

          <rect x="350" y="256" width="250" height="44" rx="6"
                fill="url(#th-amber)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="475" y="275" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Urgent Pointer</text>
          <text x="475" y="290" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">16 bits</text>
        </g>
        <text class="th-sz5" x="640" y="282" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">4 B</text>

        <!-- Row 6: Options (0-40 bytes) -->
        <g class="th-row6" opacity="0">
          <rect x="100" y="304" width="500" height="40" rx="6"
                fill="url(#th-data)" stroke="#64748b" stroke-width="1" stroke-dasharray="5,3" />
          <text x="350" y="326" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Options (variable: 0–40 bytes)</text>
        </g>
        <text class="th-sz6" x="640" y="328" fill="#475569" opacity="0"
              font-size="8" font-family="'JetBrains Mono', monospace">0-40 B</text>

        <!-- Row 7: Data -->
        <g class="th-data" opacity="0">
          <rect x="100" y="348" width="500" height="48" rx="6"
                fill="url(#th-data)" stroke="#475569" stroke-width="1.5" />
          <text x="350" y="376" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">TCP Data (Your Payload)</text>
        </g>

        <!-- Total size label -->
        <g class="th-total" opacity="0">
          <rect x="180" y="416" width="340" height="30" rx="8"
                fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="350" y="436" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            Min: 20 bytes (5 rows × 4 B)  |  Max: 60 bytes
          </text>
        </g>

        <!-- MSS label -->
        <g class="th-mss" opacity="0">
          <text x="350" y="472" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">
            MSS = MTU (1500) − IP Header (20) − TCP Header (20) = 1460 bytes max data
          </text>

          <!-- Size comparison -->
          <rect x="150" y="484" width="60" height="18" rx="4"
                fill="rgba(239, 68, 68, 0.1)" />
          <text x="180" y="497" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">TCP 20B</text>

          <text x="230" y="497" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">vs</text>

          <rect x="250" y="484" width="60" height="18" rx="4"
                fill="rgba(34, 211, 238, 0.1)" />
          <text x="280" y="497" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">UDP 8B</text>

          <text x="340" y="497" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">— 12 extra bytes for reliability</text>
        </g>
      </svg>
    </div>
  `,
})
export class TcpHeaderComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-header-anim');
    const tl = this.createScrollTimeline(container);

    // Ruler
    tl.to(this.q('.th-ruler'), { opacity: 1, duration: 0.3 });

    // Row 1: Ports
    tl.fromTo(
      this.q('.th-row1'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz1'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Row 2: Sequence Number
    tl.fromTo(
      this.q('.th-row2'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz2'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Row 3: Acknowledgment Number
    tl.fromTo(
      this.q('.th-row3'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz3'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Row 4: Offset + Flags + Window
    tl.fromTo(
      this.q('.th-row4'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz4'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Row 5: Checksum + Urgent
    tl.fromTo(
      this.q('.th-row5'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz5'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Row 6: Options
    tl.fromTo(
      this.q('.th-row6'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
    );
    tl.to(this.q('.th-sz6'), { opacity: 1, duration: 0.2 }, '-=0.2');

    // Data
    tl.fromTo(
      this.q('.th-data'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
    );

    // Total
    tl.fromTo(
      this.q('.th-total'),
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    );

    // MSS
    tl.fromTo(
      this.q('.th-mss'),
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    );
  }
}
