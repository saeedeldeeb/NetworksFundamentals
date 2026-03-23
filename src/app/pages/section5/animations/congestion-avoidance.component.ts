import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-congestion-avoidance',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cong-avoid {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .cong-avoid svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="cong-avoid">
      <svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="ca-arr-r" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#10b981" />
          </marker>
          <marker id="ca-arr-l" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#6366f1" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Congestion Avoidance — Linear Growth</text>

        <!-- Sender -->
        <g class="ca-sender" opacity="0">
          <rect x="20" y="38" width="90" height="44" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="65" y="58" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="65" y="72" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">past ssthresh</text>
        </g>

        <!-- Receiver -->
        <g class="ca-receiver" opacity="0">
          <rect x="590" y="38" width="90" height="44" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="635" y="58" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Receiver</text>
          <text x="635" y="72" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">ACKs all</text>
        </g>

        <!-- Timeline -->
        <line class="ca-tl-l" x1="65" y1="82" x2="65" y2="370"
              stroke="#374151" stroke-width="1" stroke-dasharray="3,3" opacity="0" />
        <line class="ca-tl-r" x1="635" y1="82" x2="635" y2="370"
              stroke="#374151" stroke-width="1" stroke-dasharray="3,3" opacity="0" />

        <!-- ===== RTT 1: cwnd=8, send 8, get 8 ACKs → cwnd=9 ===== -->
        <g class="ca-rtt1-badge" opacity="0">
          <rect x="5" y="92" width="52" height="22" rx="5"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1" />
          <text x="31" y="107" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=8</text>
        </g>
        <!-- 8 segments shown as a group of parallel lines -->
        <g class="ca-rtt1-segs" opacity="0">
          <line x1="80" y1="96" x2="620" y2="99" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="101" x2="620" y2="104" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="106" x2="620" y2="109" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="111" x2="620" y2="114" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="116" x2="620" y2="119" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="121" x2="620" y2="124" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="126" x2="620" y2="129" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="131" x2="620" y2="134" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <text x="350" y="118" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">8 segments</text>
        </g>
        <!-- All 8 ACKs come back -->
        <g class="ca-rtt1-ack" opacity="0">
          <line x1="620" y1="148" x2="80" y2="154" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ca-arr-l)" />
          <rect x="250" y="140" width="200" height="18" rx="4" fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="153" text-anchor="middle" fill="#6366f1"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">All 8 ACKs → cwnd += 1 = 9</text>
        </g>

        <!-- ===== RTT 2: cwnd=9, send 9 → cwnd=10 ===== -->
        <g class="ca-rtt2-badge" opacity="0">
          <rect x="5" y="172" width="52" height="22" rx="5"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1" />
          <text x="31" y="187" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=9</text>
        </g>
        <g class="ca-rtt2-segs" opacity="0">
          <line x1="80" y1="176" x2="620" y2="179" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="181" x2="620" y2="184" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="186" x2="620" y2="189" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="191" x2="620" y2="194" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="196" x2="620" y2="199" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="201" x2="620" y2="204" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="206" x2="620" y2="209" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="211" x2="620" y2="214" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="216" x2="620" y2="219" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <text x="350" y="200" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">9 segments</text>
        </g>
        <g class="ca-rtt2-ack" opacity="0">
          <line x1="620" y1="232" x2="80" y2="238" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ca-arr-l)" />
          <rect x="250" y="224" width="200" height="18" rx="4" fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="237" text-anchor="middle" fill="#6366f1"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">All 9 ACKs → cwnd += 1 = 10</text>
        </g>

        <!-- ===== RTT 3: cwnd=10 → cwnd=11 ===== -->
        <g class="ca-rtt3-badge" opacity="0">
          <rect x="5" y="255" width="55" height="22" rx="5"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1" />
          <text x="32" y="270" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=10</text>
        </g>
        <g class="ca-rtt3-segs" opacity="0">
          <line x1="80" y1="259" x2="620" y2="261" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="264" x2="620" y2="266" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="269" x2="620" y2="271" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="274" x2="620" y2="276" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="279" x2="620" y2="281" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="284" x2="620" y2="286" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="289" x2="620" y2="291" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="294" x2="620" y2="296" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="299" x2="620" y2="301" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <line x1="80" y1="304" x2="620" y2="306" stroke="#10b981" stroke-width="1" marker-end="url(#ca-arr-r)" />
          <text x="350" y="285" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">10 segments</text>
        </g>
        <g class="ca-rtt3-ack" opacity="0">
          <line x1="620" y1="318" x2="80" y2="324" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ca-arr-l)" />
          <rect x="245" y="310" width="210" height="18" rx="4" fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="323" text-anchor="middle" fill="#6366f1"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">All 10 ACKs → cwnd += 1 = 11</text>
        </g>

        <!-- Summary comparison with Slow Start -->
        <g class="ca-summary" opacity="0">
          <rect x="100" y="348" width="500" height="40" rx="8"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="350" y="364" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            8 → 9 → 10 → 11 → 12 → ...  (+1 per complete RTT)
          </text>
          <text x="350" y="380" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            Compare to Slow Start: 1 → 2 → 4 → 8 (doubles each RTT) — much more cautious here
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class CongestionAvoidanceComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cong-avoid');
    const tl = this.createScrollTimeline(container);

    tl.fromTo(this.q('.ca-sender'), { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.35 });
    tl.fromTo(this.q('.ca-receiver'), { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.35 }, '-=0.2');
    tl.to(this.q('.ca-tl-l'), { opacity: 1, duration: 0.2 }, '-=0.1');
    tl.to(this.q('.ca-tl-r'), { opacity: 1, duration: 0.2 }, '-=0.15');

    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.cong-avoid');
    const loop = this.createLoopingTimeline(container);

    // RTT 1: cwnd=8 → 9
    loop.fromTo(this.q('.ca-rtt1-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 0);
    loop.fromTo(this.q('.ca-rtt1-segs'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
    loop.fromTo(this.q('.ca-rtt1-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.6);

    // RTT 2: cwnd=9 → 10
    loop.fromTo(this.q('.ca-rtt2-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 1.0);
    loop.fromTo(this.q('.ca-rtt2-segs'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.1);
    loop.fromTo(this.q('.ca-rtt2-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.6);

    // RTT 3: cwnd=10 → 11
    loop.fromTo(this.q('.ca-rtt3-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 2.0);
    loop.fromTo(this.q('.ca-rtt3-segs'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.1);
    loop.fromTo(this.q('.ca-rtt3-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.6);

    // Summary
    loop.fromTo(this.q('.ca-summary'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 3.0);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade out
    const allEls = [
      '.ca-rtt1-badge', '.ca-rtt1-segs', '.ca-rtt1-ack',
      '.ca-rtt2-badge', '.ca-rtt2-segs', '.ca-rtt2-ack',
      '.ca-rtt3-badge', '.ca-rtt3-segs', '.ca-rtt3-ack',
      '.ca-summary',
    ].map(s => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
