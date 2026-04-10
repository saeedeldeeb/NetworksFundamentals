import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-packet-timeline',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .pt-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .pt-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="pt-wrap">
      <svg viewBox="0 0 680 542" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pt-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#475569" />
          </marker>
          <marker id="pt-arr-c" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" />
          </marker>
          <marker id="pt-arr-g" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
          </marker>
          <marker id="pt-arr-p" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#ec4899" />
          </marker>
          <marker id="pt-arr-o" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>

        <!-- ===== ENDPOINTS ===== -->
        <g class="pt-endpoints" opacity="0">
          <!-- Client -->
          <rect x="10" y="8" width="120" height="36" rx="8"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="70" y="30" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">CLIENT</text>
          <!-- Server -->
          <rect x="550" y="8" width="120" height="36" rx="8"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="610" y="30" text-anchor="middle" fill="#6366f1" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">SERVER</text>
          <!-- Timeline axes -->
          <line x1="70" y1="44" x2="70" y2="518" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3" />
          <line x1="610" y1="44" x2="610" y2="518" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3" />
        </g>

        <!-- ===== PHASE BANNERS ===== -->
        <g class="pt-phases" opacity="0">
          <!-- Handshake -->
          <rect x="10" y="52" width="660" height="18" rx="4"
                fill="rgba(34,211,238,0.07)" />
          <text x="340" y="65" text-anchor="middle" fill="#22d3ee" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.08em">HANDSHAKE</text>

          <!-- Data Transfer -->
          <rect x="10" y="182" width="660" height="18" rx="4"
                fill="rgba(16,185,129,0.07)" />
          <text x="340" y="195" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.08em">DATA TRANSFER</text>

          <!-- Idle -->
          <rect x="220" y="355" width="240" height="18" rx="4"
                fill="rgba(255,255,255,0.03)" stroke="#1e293b" stroke-width="1" />
          <text x="340" y="368" text-anchor="middle" fill="#475569" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">&#8230; 30 seconds idle &#8230;</text>

          <!-- Teardown -->
          <rect x="10" y="381" width="660" height="18" rx="4"
                fill="rgba(245,158,11,0.07)" />
          <text x="340" y="394" text-anchor="middle" fill="#f59e0b" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.08em">TEARDOWN</text>
        </g>

        <!-- ===== PACKETS ===== -->

        <!-- 1. SYN: C→S (y=100) -->
        <g class="pt-pkt pt-p1" opacity="0">
          <line x1="78" y1="100" x2="600" y2="100" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#pt-arr-c)" />
          <rect x="296" y="85" width="88" height="18" rx="4" fill="rgba(34,211,238,0.15)" />
          <text x="340" y="98" text-anchor="middle" fill="#22d3ee" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[S]  seq=1000</text>
          <text x="340" y="116" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">SYN — initiate connection (64 B)</text>
        </g>

        <!-- 2. SYN-ACK: S→C (y=140) -->
        <g class="pt-pkt pt-p2" opacity="0">
          <line x1="602" y1="140" x2="80" y2="140" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#pt-arr-c)" />
          <rect x="276" y="125" width="128" height="18" rx="4" fill="rgba(34,211,238,0.15)" />
          <text x="340" y="138" text-anchor="middle" fill="#22d3ee" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[S.]  seq=5000 ack=1001</text>
          <text x="340" y="156" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">SYN-ACK — accepted (60 B)</text>
        </g>

        <!-- 3. ACK: C→S (y=170, tighter) -->
        <g class="pt-pkt pt-p3" opacity="0">
          <line x1="78" y1="168" x2="600" y2="168" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#pt-arr-c)" />
          <rect x="296" y="155" width="88" height="16" rx="4" fill="rgba(34,211,238,0.12)" />
          <text x="340" y="167" text-anchor="middle" fill="#7dd3fc" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">[.]  ack=5001</text>
          <text x="340" y="182" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">ACK — handshake complete (52 B)</text>
        </g>

        <!-- 4. HTTP GET: C→S (y=220) -->
        <g class="pt-pkt pt-p4" opacity="0">
          <line x1="78" y1="220" x2="600" y2="220" stroke="#10b981" stroke-width="2"
                marker-end="url(#pt-arr-g)" />
          <rect x="268" y="205" width="144" height="18" rx="4" fill="rgba(16,185,129,0.15)" />
          <text x="340" y="218" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[P.]  HTTP GET /</text>
          <text x="340" y="236" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Request — 360 B data, 412 B total</text>
        </g>

        <!-- 5. ACK (server acks GET): S→C (y=257) -->
        <g class="pt-pkt pt-p5" opacity="0">
          <line x1="602" y1="257" x2="80" y2="257" stroke="#475569" stroke-width="1.5"
                marker-end="url(#pt-arr)" />
          <rect x="296" y="244" width="88" height="16" rx="4" fill="rgba(71,85,105,0.15)" />
          <text x="340" y="256" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">[.]  ack=361</text>
          <text x="340" y="271" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">ACK — processing (52 B, no data)</text>
        </g>

        <!-- 6. HTTP 200: S→C (y=295) -->
        <g class="pt-pkt pt-p6" opacity="0">
          <line x1="602" y1="295" x2="80" y2="295" stroke="#ec4899" stroke-width="2"
                marker-end="url(#pt-arr-p)" />
          <rect x="250" y="280" width="180" height="18" rx="4" fill="rgba(236,72,153,0.15)" />
          <text x="340" y="293" text-anchor="middle" fill="#ec4899" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[P.]  HTTP/1.1 200 OK</text>
          <text x="340" y="311" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Response — 1022 B data, 1074 B total</text>
        </g>

        <!-- 7. ACK (client acks response): C→S (y=325, compact) -->
        <g class="pt-pkt pt-p7" opacity="0">
          <line x1="78" y1="323" x2="600" y2="323" stroke="#475569" stroke-width="1.5"
                marker-end="url(#pt-arr)" />
          <rect x="296" y="311" width="88" height="16" rx="4" fill="rgba(71,85,105,0.12)" />
          <text x="340" y="323" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">[.]  ack=1023</text>
          <text x="340" y="337" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">ACK — got response (52 B)</text>
        </g>

        <!-- 8. FIN: C→S (y=418) -->
        <g class="pt-pkt pt-p8" opacity="0">
          <line x1="78" y1="418" x2="600" y2="418" stroke="#f59e0b" stroke-width="1.5"
                marker-end="url(#pt-arr-o)" />
          <rect x="284" y="404" width="112" height="18" rx="4" fill="rgba(245,158,11,0.15)" />
          <text x="340" y="417" text-anchor="middle" fill="#f59e0b" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[F.]  seq=361</text>
          <text x="340" y="434" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">FIN — client initiates close (52 B)</text>
        </g>

        <!-- 9. FIN-ACK: S→C (y=456) -->
        <g class="pt-pkt pt-p9" opacity="0">
          <line x1="602" y1="456" x2="80" y2="456" stroke="#f59e0b" stroke-width="1.5"
                marker-end="url(#pt-arr-o)" />
          <rect x="280" y="442" width="120" height="18" rx="4" fill="rgba(245,158,11,0.15)" />
          <text x="340" y="455" text-anchor="middle" fill="#f59e0b" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">[F.]  ack=362</text>
          <text x="340" y="472" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">FIN-ACK — server also closes (52 B)</text>
        </g>

        <!-- 10. Final ACK: C→S (y=490) -->
        <g class="pt-pkt pt-p10" opacity="0">
          <line x1="78" y1="490" x2="600" y2="490" stroke="#475569" stroke-width="1.5"
                marker-end="url(#pt-arr)" />
          <rect x="284" y="477" width="112" height="16" rx="4" fill="rgba(71,85,105,0.12)" />
          <text x="340" y="489" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">[.]  ack=1024</text>
          <text x="340" y="505" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">ACK — goodbye (52 B) → TIME_WAIT</text>
        </g>

        <!-- ===== SUMMARY BAR ===== -->
        <g class="pt-summary" opacity="0">
          <rect x="10" y="519" width="660" height="18" rx="5"
                fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.2)" stroke-width="1" />
          <text x="340" y="532" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">
            10 packets · 1922 B total · 1382 B user data · 72% efficiency
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class PacketTimelineComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.pt-wrap');
    const tl = this.createScrollTimeline(container);

    // Static structure
    tl.fromTo(this.q('.pt-endpoints'), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    tl.fromTo(this.q('.pt-phases'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

    // Packets appear one by one
    const packets = [
      '.pt-p1', '.pt-p2', '.pt-p3',
      '.pt-p4', '.pt-p5', '.pt-p6', '.pt-p7',
      '.pt-p8', '.pt-p9', '.pt-p10',
    ].map(s => this.q(s));

    packets.forEach((pkt, i) => {
      tl.fromTo(pkt,
        { opacity: 0, x: i % 2 === 0 ? -8 : 8 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
        `>-0.1`,
      );
    });

    tl.fromTo(this.q('.pt-summary'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.1');
  }
}
