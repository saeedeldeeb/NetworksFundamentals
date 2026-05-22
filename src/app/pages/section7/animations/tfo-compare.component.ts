import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tfo-compare',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tf-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .tf-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="tf-wrap">
      <svg viewBox="0 0 720 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="tf-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
          <marker id="tf-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="tf-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="tf-arr-m" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#475569"/>
          </marker>
        </defs>

        <!-- ===== HEADERS ===== -->
        <g class="tf-headers" opacity="0">
          <rect x="8" y="8" width="346" height="26" rx="6"
                fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="181" y="25" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.05em">
            NORMAL TCP HANDSHAKE
          </text>

          <rect x="366" y="8" width="346" height="26" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1.5"/>
          <text x="539" y="25" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.05em">
            TCP FAST OPEN — REPEAT CONNECTION
          </text>

          <line x1="360" y1="8" x2="360" y2="312" stroke="rgba(71,85,105,0.35)"
                stroke-width="1" stroke-dasharray="4,4"/>
        </g>

        <!-- ===== SUB LABELS ===== -->
        <text class="tf-sub" opacity="0" x="181" y="48" text-anchor="middle" fill="#475569"
              font-size="7" font-family="Inter, sans-serif">
          3 empty packets before any data
        </text>
        <text class="tf-sub" opacity="0" x="539" y="48" text-anchor="middle" fill="#475569"
              font-size="7" font-family="Inter, sans-serif">
          Request data rides on the SYN itself
        </text>

        <!-- ===== NODES ===== -->
        <g class="tf-nodes" opacity="0">
          <rect x="16" y="56" width="78" height="22" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="55" y="70" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <rect x="270" y="56" width="78" height="22" rx="5"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1"/>
          <text x="309" y="70" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER</text>

          <rect x="374" y="56" width="78" height="22" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="413" y="70" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <rect x="628" y="56" width="78" height="22" rx="5"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1"/>
          <text x="667" y="70" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER</text>
        </g>

        <!-- ===== TIMELINE AXES ===== -->
        <g class="tf-axes" opacity="0">
          <line x1="55" y1="78" x2="55" y2="222" stroke="#22d3ee" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="309" y1="78" x2="309" y2="222" stroke="#a78bfa" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="413" y1="78" x2="413" y2="222" stroke="#22d3ee" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="667" y1="78" x2="667" y2="222" stroke="#a78bfa" stroke-width="1"
                stroke-dasharray="3,4" opacity="0.35"/>
        </g>

        <!-- ===== LEFT: handshake (3 empty packets) ===== -->
        <g class="tf-lhs" opacity="0">
          <line x1="57" y1="100" x2="307" y2="100" stroke="#f59e0b" stroke-width="1.6"
                stroke-dasharray="4,3" marker-end="url(#tf-arr-o)"/>
          <text x="181" y="94" text-anchor="middle" fill="#fcd34d" font-size="6.8"
                font-family="Inter, sans-serif">SYN &#8594; empty packet — flags + seq only</text>
        </g>
        <g class="tf-lhs" opacity="0">
          <line x1="307" y1="124" x2="57" y2="124" stroke="#f59e0b" stroke-width="1.6"
                stroke-dasharray="4,3" marker-end="url(#tf-arr-o)"/>
          <text x="181" y="118" text-anchor="middle" fill="#fcd34d" font-size="6.8"
                font-family="Inter, sans-serif">&#8592; SYN-ACK — empty packet</text>
        </g>
        <g class="tf-lhs" opacity="0">
          <line x1="57" y1="148" x2="307" y2="148" stroke="#f59e0b" stroke-width="1.6"
                stroke-dasharray="4,3" marker-end="url(#tf-arr-o)"/>
          <text x="181" y="142" text-anchor="middle" fill="#fcd34d" font-size="6.8"
                font-family="Inter, sans-serif">ACK &#8594; empty packet</text>
        </g>

        <!-- ===== LEFT: 1.5 RTT separator ===== -->
        <g class="tf-lsep" opacity="0">
          <line x1="12" y1="160" x2="350" y2="160" stroke="rgba(239,68,68,0.4)"
                stroke-width="1" stroke-dasharray="5,3"/>
          <text x="181" y="172" text-anchor="middle" fill="#f87171" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">
            1.5 RTT elapsed — not one byte of data yet
          </text>
        </g>

        <!-- ===== LEFT: data + response ===== -->
        <g class="tf-ldata" opacity="0">
          <line x1="57" y1="190" x2="307" y2="190" stroke="#22d3ee" stroke-width="2"
                marker-end="url(#tf-arr-c)"/>
          <text x="181" y="184" text-anchor="middle" fill="#67e8f9" font-size="6.8"
                font-weight="600" font-family="Inter, sans-serif">Request DATA &#8594; finally sent</text>
        </g>
        <g class="tf-ldata" opacity="0">
          <line x1="307" y1="214" x2="57" y2="214" stroke="#10b981" stroke-width="2"
                marker-end="url(#tf-arr-g)"/>
          <text x="181" y="208" text-anchor="middle" fill="#6ee7b7" font-size="6.8"
                font-weight="600" font-family="Inter, sans-serif">&#8592; Response DATA</text>
        </g>

        <!-- ===== RIGHT: fast open (data on SYN) ===== -->
        <g class="tf-rseg" opacity="0">
          <line x1="415" y1="100" x2="665" y2="100" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#tf-arr-g)"/>
          <text x="539" y="94" text-anchor="middle" fill="#6ee7b7" font-size="6.8"
                font-weight="600" font-family="Inter, sans-serif">SYN + cookie + DATA &#8594; request rides along</text>
        </g>
        <g class="tf-rseg" opacity="0">
          <line x1="665" y1="124" x2="415" y2="124" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#tf-arr-g)"/>
          <text x="539" y="118" text-anchor="middle" fill="#6ee7b7" font-size="6.8"
                font-weight="600" font-family="Inter, sans-serif">&#8592; SYN-ACK + RESPONSE — answer rides back</text>
        </g>
        <g class="tf-rseg" opacity="0">
          <line x1="415" y1="148" x2="665" y2="148" stroke="#475569" stroke-width="1.6"
                stroke-dasharray="4,3" marker-end="url(#tf-arr-m)"/>
          <text x="539" y="142" text-anchor="middle" fill="#64748b" font-size="6.8"
                font-family="Inter, sans-serif">ACK &#8594; (confirms — no data needed)</text>
        </g>

        <!-- ===== RIGHT: note + saved badge ===== -->
        <g class="tf-rnote" opacity="0">
          <text x="539" y="172" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">
            Response already in hand — 0 RTT wasted on empty packets
          </text>
          <rect x="435" y="186" width="208" height="22" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
          <text x="539" y="200" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">&#10003; 1 full RTT saved</text>
        </g>

        <!-- ===== RESULT BOXES ===== -->
        <g class="tf-lresult" opacity="0">
          <rect x="8" y="230" width="346" height="46" rx="8"
                fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.3)" stroke-width="1.5"/>
          <text x="181" y="250" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Request sent after 1.5 RTT</text>
          <text x="181" y="265" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Response returns at ~2.5 RTT total</text>
        </g>
        <g class="tf-rresult" opacity="0">
          <rect x="366" y="230" width="346" height="46" rx="8"
                fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
          <text x="539" y="250" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Request sent with the SYN — 0 RTT</text>
          <text x="539" y="265" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Response returns at just ~1 RTT total</text>
        </g>

        <!-- ===== BANNER ===== -->
        <g class="tf-banner" opacity="0">
          <rect x="8" y="284" width="704" height="28" rx="7"
                fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)" stroke-width="1.5"/>
          <text x="360" y="302" text-anchor="middle" fill="#818cf8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">
            TCP Fast Open carries your request on the SYN packet — saving a full round-trip on every repeat connection
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class TfoCompareComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tf-wrap');
    const tl = this.createScrollTimeline(container);

    // Headers + intro scaffolding
    tl.fromTo(this.q('.tf-headers'), { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(this.qa('.tf-sub'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.1 }, '+=0.05');
    tl.fromTo(this.q('.tf-nodes'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.05');
    tl.fromTo(this.q('.tf-axes'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

    // LEFT handshake + RIGHT fast-open run together — right finishes a phase sooner
    tl.fromTo(
      this.qa('.tf-lhs'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.28, ease: 'power2.out' },
      '+=0.15',
    );
    tl.fromTo(
      this.qa('.tf-rseg'),
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.28, ease: 'power2.out' },
      '<',
    );

    // LEFT 1.5 RTT separator + RIGHT "already done" note (parallel)
    tl.fromTo(this.q('.tf-lsep'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.15');
    tl.fromTo(
      this.q('.tf-rnote'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '<',
    );

    // LEFT data finally moves (right is already finished)
    tl.fromTo(
      this.qa('.tf-ldata'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.25, ease: 'power2.out' },
      '+=0.15',
    );

    // Result boxes
    tl.fromTo(this.q('.tf-lresult'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.15');
    tl.fromTo(this.q('.tf-rresult'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, '<');

    // Banner
    tl.fromTo(this.q('.tf-banner'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.15');
  }
}
