import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-holb',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hb-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .hb-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="hb-wrap">
      <svg viewBox="0 0 720 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="hb-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="hb-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="hb-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- Endpoints -->
        <g class="hb-nodes" opacity="0">
          <rect x="14" y="14" width="120" height="34" rx="6"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="74" y="36" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">SENDER</text>

          <rect x="586" y="14" width="120" height="34" rx="6"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1"/>
          <text x="646" y="36" text-anchor="middle" fill="#a78bfa" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">RECEIVER</text>

          <!-- Timeline axes -->
          <line x1="74" y1="48" x2="74" y2="288" stroke="#22d3ee" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.3"/>
          <line x1="646" y1="48" x2="646" y2="288" stroke="#a78bfa" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.3"/>
        </g>

        <!-- Segment 1: LOST -->
        <g class="hb-s1" opacity="0">
          <line x1="76" y1="68" x2="380" y2="68" stroke="#ef4444" stroke-width="1.6"
                stroke-dasharray="4,3"/>
          <rect x="180" y="56" width="58" height="22" rx="5"
                fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="1"/>
          <text x="209" y="70" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 1</text>
        </g>
        <g class="hb-s1lost" opacity="0">
          <line x1="372" y1="60" x2="388" y2="76" stroke="#ef4444" stroke-width="2.4"/>
          <line x1="388" y1="60" x2="372" y2="76" stroke="#ef4444" stroke-width="2.4"/>
          <text x="380" y="92" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">LOST</text>
        </g>

        <!-- Segments 2-6 arrive -->
        <g class="hb-s2" opacity="0">
          <line x1="76" y1="106" x2="644" y2="106" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#hb-arr-c)"/>
          <rect x="331" y="94" width="58" height="22" rx="5"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="360" y="108" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 2</text>
        </g>
        <g class="hb-s3" opacity="0">
          <line x1="76" y1="132" x2="644" y2="132" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#hb-arr-c)"/>
          <rect x="331" y="120" width="58" height="22" rx="5"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="360" y="134" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 3</text>
        </g>
        <g class="hb-s4" opacity="0">
          <line x1="76" y1="158" x2="644" y2="158" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#hb-arr-c)"/>
          <rect x="331" y="146" width="58" height="22" rx="5"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="360" y="160" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 4</text>
        </g>
        <g class="hb-s5" opacity="0">
          <line x1="76" y1="184" x2="644" y2="184" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#hb-arr-c)"/>
          <rect x="331" y="172" width="58" height="22" rx="5"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="360" y="186" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 5</text>
        </g>
        <g class="hb-s6" opacity="0">
          <line x1="76" y1="210" x2="644" y2="210" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#hb-arr-c)"/>
          <rect x="331" y="198" width="58" height="22" rx="5"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="360" y="212" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SEG 6</text>
        </g>

        <!-- Receiver buffer state -->
        <g class="hb-buf" opacity="0">
          <text x="360" y="244" text-anchor="middle" fill="#94a3b8" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">RECEIVER BUFFER:</text>
          <g>
            <rect x="226" y="252" width="36" height="26" rx="4"
                  fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="3,2"/>
            <text x="244" y="268" text-anchor="middle" fill="#ef4444" font-size="9"
                  font-weight="700" font-family="Inter, sans-serif">?</text>
            <text x="244" y="290" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                  font-family="Inter, sans-serif">missing</text>
          </g>
          <rect x="266" y="252" width="36" height="26" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="284" y="268" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">2</text>
          <rect x="306" y="252" width="36" height="26" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="324" y="268" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">3</text>
          <rect x="346" y="252" width="36" height="26" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="364" y="268" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">4</text>
          <rect x="386" y="252" width="36" height="26" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="404" y="268" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">5</text>
          <rect x="426" y="252" width="36" height="26" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1"/>
          <text x="444" y="268" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">6</text>
        </g>

        <!-- App-layer blocked banner -->
        <g class="hb-block" opacity="0">
          <rect x="180" y="300" width="360" height="38" rx="7"
                fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.55)" stroke-width="1.3"/>
          <text x="360" y="318" text-anchor="middle" fill="#ef4444" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">APPLICATION SEES: NOTHING</text>
          <text x="360" y="332" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">TCP refuses to deliver out-of-order data — five complete segments held hostage</text>
        </g>

        <!-- NACK -->
        <g class="hb-nack" opacity="0">
          <line x1="644" y1="350" x2="76" y2="350" stroke="#f59e0b" stroke-width="1.4"
                stroke-dasharray="3,3" marker-end="url(#hb-arr-c)"/>
          <text x="360" y="345" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">
            &#8592; ACK 1 missing — please retransmit segment 1
          </text>
        </g>

        <!-- Retransmit -->
        <g class="hb-retx" opacity="0">
          <line x1="76" y1="376" x2="644" y2="376" stroke="#10b981" stroke-width="2.2"
                marker-end="url(#hb-arr-g)"/>
          <rect x="331" y="364" width="80" height="22" rx="5"
                fill="rgba(16,185,129,0.16)" stroke="#10b981" stroke-width="1.2"/>
          <text x="371" y="378" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 1 retx</text>
          <text x="360" y="395" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">
            +1 RTT later — only NOW does the app receive segments 1–6 all at once
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class TcpHolbComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.hb-wrap');
    const tl = this.createScrollTimeline(container);

    tl.fromTo(this.q('.hb-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.4 });

    // Segment 1 — fly out then die
    tl.fromTo(
      this.q('.hb-s1'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.hb-s1lost'),
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: 'center' },
      '-=0.1',
    );

    // Segments 2-6 arrive
    tl.fromTo(
      this.qa('.hb-s2, .hb-s3, .hb-s4, .hb-s5, .hb-s6'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.18, ease: 'power2.out' },
      '+=0.15',
    );

    // Buffer state appears
    tl.fromTo(
      this.q('.hb-buf'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5 },
      '+=0.1',
    );

    // Blocked banner
    tl.fromTo(
      this.q('.hb-block'),
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.1',
    );

    // NACK back
    tl.fromTo(
      this.q('.hb-nack'),
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.5 },
      '+=0.25',
    );

    // Retransmit
    tl.fromTo(
      this.q('.hb-retx'),
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.55 },
      '+=0.2',
    );
  }
}
