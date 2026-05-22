import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-handshake-cost',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hc-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .hc-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="hc-wrap">
      <svg viewBox="0 0 720 290" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="hc-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
          <marker id="hc-arr-v" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
          <marker id="hc-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="hc-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- ===== NODES ===== -->
        <g class="hc-nodes" opacity="0">
          <rect x="8" y="10" width="150" height="44" rx="8"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="83" y="30" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="83" y="44" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">California</text>

          <rect x="562" y="10" width="150" height="44" rx="8"
                fill="rgba(167,139,250,0.08)" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="637" y="30" text-anchor="middle" fill="#a78bfa" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">SERVER</text>
          <text x="637" y="44" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">China</text>
        </g>

        <!-- ===== TIMELINE AXES ===== -->
        <g class="hc-axes" opacity="0">
          <line x1="83" y1="54" x2="83" y2="244"
                stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="637" y1="54" x2="637" y2="244"
                stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,4" opacity="0.35"/>
        </g>

        <!-- ===== STEP 1: SYN ===== -->
        <g class="hc-step" opacity="0">
          <line x1="85" y1="70" x2="635" y2="104" stroke="#f59e0b" stroke-width="1.8"
                marker-end="url(#hc-arr-o)"/>
          <rect x="265" y="74" width="190" height="24" rx="5"
                fill="#0d1424" stroke="rgba(245,158,11,0.4)" stroke-width="1"/>
          <text x="360" y="85" text-anchor="middle" fill="#f59e0b" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SYN &#8594;</text>
          <text x="360" y="94" text-anchor="middle" fill="#94a3b8" font-size="6"
                font-family="'JetBrains Mono', monospace">+150 ms one-way &#183; elapsed 150 ms</text>
        </g>

        <!-- ===== STEP 2: SYN-ACK ===== -->
        <g class="hc-step" opacity="0">
          <line x1="635" y1="112" x2="85" y2="146" stroke="#a78bfa" stroke-width="1.8"
                marker-end="url(#hc-arr-v)"/>
          <rect x="265" y="116" width="190" height="24" rx="5"
                fill="#0d1424" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
          <text x="360" y="127" text-anchor="middle" fill="#a78bfa" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">&#8592; SYN-ACK</text>
          <text x="360" y="136" text-anchor="middle" fill="#94a3b8" font-size="6"
                font-family="'JetBrains Mono', monospace">+150 ms one-way &#183; elapsed 300 ms</text>
        </g>

        <!-- ===== STEP 3: ACK ===== -->
        <g class="hc-step" opacity="0">
          <line x1="85" y1="154" x2="635" y2="188" stroke="#22d3ee" stroke-width="1.8"
                marker-end="url(#hc-arr-c)"/>
          <rect x="265" y="158" width="190" height="24" rx="5"
                fill="#0d1424" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
          <text x="360" y="169" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">ACK &#8594;</text>
          <text x="360" y="178" text-anchor="middle" fill="#94a3b8" font-size="6"
                font-family="'JetBrains Mono', monospace">+150 ms one-way &#183; elapsed 450 ms</text>
        </g>

        <!-- ===== STEP 4: DATA (finally) ===== -->
        <g class="hc-data" opacity="0">
          <line x1="85" y1="196" x2="635" y2="230" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#hc-arr-g)"/>
          <rect x="255" y="200" width="210" height="24" rx="5"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.45)" stroke-width="1"/>
          <text x="360" y="211" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">&#10003; First byte of application data</text>
          <text x="360" y="220" text-anchor="middle" fill="#6ee7b7" font-size="6"
                font-family="Inter, sans-serif">finally — 450 ms after the request began</text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="hc-result" opacity="0">
          <rect x="8" y="244" width="704" height="36" rx="8"
                fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="360" y="259" text-anchor="middle" fill="#f87171" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">
            3 one-way trips = 1.5 RTT = ~450 ms of pure waiting before any data is processed
          </text>
          <text x="360" y="272" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">
            And slow start still limits throughput for the next several round-trips.
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class HandshakeCostComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.hc-wrap');
    const tl = this.createScrollTimeline(container);

    // Nodes + axes
    tl.fromTo(this.q('.hc-nodes'), { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(this.q('.hc-axes'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

    // Handshake steps — slow stagger to let each round-trip register
    tl.fromTo(
      this.qa('.hc-step'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.55, ease: 'power2.out' },
      '+=0.15',
    );

    // Data finally flows
    tl.fromTo(
      this.q('.hc-data'),
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.2',
    );

    // Result banner
    tl.fromTo(
      this.q('.hc-result'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.15',
    );
  }
}
