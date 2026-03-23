import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-slow-start',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .slow-start {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .slow-start svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="slow-start">
      <svg viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ss-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="ss-arr-r" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#22d3ee" />
          </marker>
          <marker id="ss-arr-l" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Slow Start — Exponential Growth</text>

        <!-- Sender -->
        <g class="ss-sender" opacity="0">
          <rect x="20" y="38" width="90" height="44" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="65" y="58" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="65" y="72" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">cwnd grows</text>
        </g>

        <!-- Receiver -->
        <g class="ss-receiver" opacity="0">
          <rect x="590" y="38" width="90" height="44" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="635" y="58" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Receiver</text>
          <text x="635" y="72" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">sends ACKs</text>
        </g>

        <!-- Timeline lines -->
        <line class="ss-tl-l" x1="65" y1="82" x2="65" y2="395"
              stroke="#374151" stroke-width="1" stroke-dasharray="3,3" opacity="0" />
        <line class="ss-tl-r" x1="635" y1="82" x2="635" y2="395"
              stroke="#374151" stroke-width="1" stroke-dasharray="3,3" opacity="0" />

        <!-- ===== ROUND 1: cwnd=1, send 1 ===== -->
        <!-- cwnd badge -->
        <g class="ss-r1-badge" opacity="0">
          <rect x="5" y="95" width="52" height="22" rx="5"
                fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" stroke-width="1" />
          <text x="31" y="110" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=1</text>
        </g>
        <!-- 1 segment -->
        <g class="ss-r1-seg" opacity="0">
          <line x1="80" y1="106" x2="620" y2="112" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <rect x="310" y="95" width="80" height="16" rx="4" fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="350" y="106" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 1</text>
        </g>
        <!-- 1 ACK back -->
        <g class="ss-r1-ack" opacity="0">
          <line x1="620" y1="125" x2="80" y2="131" stroke="#10b981" stroke-width="1.5" marker-end="url(#ss-arr-l)" />
          <rect x="300" y="119" width="100" height="16" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="350" y="130" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">ACK 1 (+1)</text>
        </g>

        <!-- ===== ROUND 2: cwnd=2, send 2 ===== -->
        <g class="ss-r2-badge" opacity="0">
          <rect x="5" y="148" width="52" height="22" rx="5"
                fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" stroke-width="1" />
          <text x="31" y="163" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=2</text>
        </g>
        <g class="ss-r2-seg1" opacity="0">
          <line x1="80" y1="155" x2="620" y2="160" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="350" y="153" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 2</text>
        </g>
        <g class="ss-r2-seg2" opacity="0">
          <line x1="80" y1="170" x2="620" y2="175" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="350" y="168" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 3</text>
        </g>
        <!-- 2 ACKs back -->
        <g class="ss-r2-ack" opacity="0">
          <line x1="620" y1="188" x2="80" y2="194" stroke="#10b981" stroke-width="1.5" marker-end="url(#ss-arr-l)" />
          <rect x="280" y="182" width="140" height="16" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="350" y="193" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">ACK 2, ACK 3 (+2)</text>
        </g>

        <!-- ===== ROUND 3: cwnd=4, send 4 ===== -->
        <g class="ss-r3-badge" opacity="0">
          <rect x="5" y="210" width="52" height="22" rx="5"
                fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" stroke-width="1" />
          <text x="31" y="225" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=4</text>
        </g>
        <g class="ss-r3-seg1" opacity="0">
          <line x1="80" y1="216" x2="620" y2="220" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="250" y="214" fill="#22d3ee" font-size="7" font-weight="600"
                font-family="'JetBrains Mono', monospace">Seg 4</text>
        </g>
        <g class="ss-r3-seg2" opacity="0">
          <line x1="80" y1="228" x2="620" y2="232" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="250" y="226" fill="#22d3ee" font-size="7" font-weight="600"
                font-family="'JetBrains Mono', monospace">Seg 5</text>
        </g>
        <g class="ss-r3-seg3" opacity="0">
          <line x1="80" y1="240" x2="620" y2="244" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="250" y="238" fill="#22d3ee" font-size="7" font-weight="600"
                font-family="'JetBrains Mono', monospace">Seg 6</text>
        </g>
        <g class="ss-r3-seg4" opacity="0">
          <line x1="80" y1="252" x2="620" y2="256" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ss-arr-r)" />
          <text x="250" y="250" fill="#22d3ee" font-size="7" font-weight="600"
                font-family="'JetBrains Mono', monospace">Seg 7</text>
        </g>
        <g class="ss-r3-ack" opacity="0">
          <line x1="620" y1="268" x2="80" y2="274" stroke="#10b981" stroke-width="1.5" marker-end="url(#ss-arr-l)" />
          <rect x="270" y="262" width="160" height="16" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="350" y="273" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">ACKs 4,5,6,7 (+4)</text>
        </g>

        <!-- ===== ROUND 4: cwnd=8 ===== -->
        <g class="ss-r4-badge" opacity="0">
          <rect x="5" y="290" width="52" height="22" rx="5"
                fill="rgba(34, 211, 238, 0.15)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="31" y="305" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd=8</text>
        </g>
        <!-- 8 tiny segment lines -->
        <g class="ss-r4-segs" opacity="0">
          <line x1="80" y1="296" x2="620" y2="299" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="302" x2="620" y2="305" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="308" x2="620" y2="311" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="314" x2="620" y2="317" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="320" x2="620" y2="323" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="326" x2="620" y2="329" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="332" x2="620" y2="335" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <line x1="80" y1="338" x2="620" y2="341" stroke="#22d3ee" stroke-width="1" marker-end="url(#ss-arr-r)" />
          <text x="350" y="325" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">8 segments</text>
        </g>

        <!-- Growth summary -->
        <g class="ss-summary" opacity="0">
          <rect x="140" y="368" width="420" height="34" rx="8"
                fill="rgba(34, 211, 238, 0.06)" stroke="#22d3ee" stroke-width="1" />
          <text x="350" y="382" text-anchor="middle" fill="#22d3ee"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            1 → 2 → 4 → 8 → 16 → 32 → ...  (doubles every round trip)
          </text>
          <text x="350" y="396" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            Each ACK adds 1 MSS — exponential because more ACKs arrive each round
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class SlowStartComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.slow-start');
    const tl = this.createScrollTimeline(container);

    // Actors
    tl.fromTo(this.q('.ss-sender'), { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.35 });
    tl.fromTo(this.q('.ss-receiver'), { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.35 }, '-=0.2');
    tl.to(this.q('.ss-tl-l'), { opacity: 1, duration: 0.2 }, '-=0.1');
    tl.to(this.q('.ss-tl-r'), { opacity: 1, duration: 0.2 }, '-=0.15');

    // Start loop
    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.slow-start');
    const loop = this.createLoopingTimeline(container);

    // Round 1: cwnd=1
    loop.fromTo(this.q('.ss-r1-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 0);
    loop.fromTo(this.q('.ss-r1-seg'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1);
    loop.fromTo(this.q('.ss-r1-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5);

    // Round 2: cwnd=2
    loop.fromTo(this.q('.ss-r2-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 0.9);
    loop.fromTo(this.q('.ss-r2-seg1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.0);
    loop.fromTo(this.q('.ss-r2-seg2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);
    loop.fromTo(this.q('.ss-r2-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.5);

    // Round 3: cwnd=4
    loop.fromTo(this.q('.ss-r3-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 1.9);
    loop.fromTo(this.q('.ss-r3-seg1'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 2.0);
    loop.fromTo(this.q('.ss-r3-seg2'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 2.08);
    loop.fromTo(this.q('.ss-r3-seg3'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 2.16);
    loop.fromTo(this.q('.ss-r3-seg4'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 2.24);
    loop.fromTo(this.q('.ss-r3-ack'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.6);

    // Round 4: cwnd=8
    loop.fromTo(this.q('.ss-r4-badge'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 3.0);
    loop.fromTo(this.q('.ss-r4-segs'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.1);

    // Summary
    loop.fromTo(this.q('.ss-summary'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 3.5);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade out
    const allEls = [
      '.ss-r1-badge', '.ss-r1-seg', '.ss-r1-ack',
      '.ss-r2-badge', '.ss-r2-seg1', '.ss-r2-seg2', '.ss-r2-ack',
      '.ss-r3-badge', '.ss-r3-seg1', '.ss-r3-seg2', '.ss-r3-seg3', '.ss-r3-seg4', '.ss-r3-ack',
      '.ss-r4-badge', '.ss-r4-segs', '.ss-summary',
    ].map(s => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
