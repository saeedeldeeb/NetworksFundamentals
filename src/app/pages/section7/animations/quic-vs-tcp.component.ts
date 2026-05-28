import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-quic-vs-tcp',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .qt-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .qt-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="qt-wrap">
      <svg viewBox="0 0 720 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="qt-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="qt-arr-v" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
          <marker id="qt-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="qt-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- ============ LEFT: HTTP/2 over TCP ============ -->
        <g class="qt-lbox" opacity="0">
          <rect x="8" y="8" width="348" height="364" rx="10"
                fill="rgba(239,68,68,0.03)" stroke="rgba(239,68,68,0.35)" stroke-width="1.5"/>
        </g>
        <g class="qt-lhdr" opacity="0">
          <text x="22" y="30" fill="#ef4444" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">HTTP/2 over TCP</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">One TCP connection · TCP sees one ordered byte stream</text>
        </g>

        <!-- TCP pipe label -->
        <g class="qt-ltcp" opacity="0">
          <rect x="22" y="58" width="320" height="22" rx="5"
                fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <text x="182" y="73" text-anchor="middle" fill="#fca5a5" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">SINGLE TCP CONNECTION — strict order</text>
        </g>

        <!-- 3 streams stacked over TCP -->
        <!-- Stream 1 (RED) -->
        <g class="qt-ls1lbl" opacity="0">
          <text x="22" y="100" fill="#ef4444" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 1 (HTML)</text>
        </g>
        <g class="qt-ls1p1" opacity="0">
          <rect x="118" y="90" width="40" height="20" rx="4"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1"/>
          <text x="138" y="103" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P1</text>
        </g>
        <g class="qt-ls1lost" opacity="0">
          <line x1="128" y1="92" x2="148" y2="108" stroke="#ef4444" stroke-width="2.4"/>
          <line x1="148" y1="92" x2="128" y2="108" stroke="#ef4444" stroke-width="2.4"/>
          <text x="138" y="120" text-anchor="middle" fill="#ef4444" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">LOST</text>
        </g>
        <g class="qt-ls1p2" opacity="0">
          <rect x="178" y="90" width="40" height="20" rx="4"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1"/>
          <text x="198" y="103" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P2</text>
        </g>

        <!-- Stream 2 (VIOLET) -->
        <g class="qt-ls2lbl" opacity="0">
          <text x="22" y="142" fill="#a78bfa" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 2 (CSS)</text>
        </g>
        <g class="qt-ls2p1" opacity="0">
          <rect x="118" y="132" width="40" height="20" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="138" y="145" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P3</text>
        </g>
        <g class="qt-ls2p2" opacity="0">
          <rect x="178" y="132" width="40" height="20" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="198" y="145" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P4</text>
        </g>

        <!-- Stream 3 (CYAN) -->
        <g class="qt-ls3lbl" opacity="0">
          <text x="22" y="184" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 3 (JS)</text>
        </g>
        <g class="qt-ls3p1" opacity="0">
          <rect x="118" y="174" width="40" height="20" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="138" y="187" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P5</text>
        </g>
        <g class="qt-ls3p2" opacity="0">
          <rect x="178" y="174" width="40" height="20" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="198" y="187" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P6</text>
        </g>

        <!-- Receiver app boxes (left) — all BLOCKED -->
        <g class="qt-lrecv" opacity="0">
          <text x="182" y="214" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">APPLICATION DELIVERY</text>
        </g>

        <g class="qt-lb1" opacity="0">
          <rect x="32" y="222" width="100" height="40" rx="6"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.5)" stroke-width="1.2"
                stroke-dasharray="4,3"/>
          <text x="82" y="238" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 1</text>
          <text x="82" y="253" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">BLOCKED</text>
        </g>
        <g class="qt-lb2" opacity="0">
          <rect x="132" y="222" width="100" height="40" rx="6"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.5)" stroke-width="1.2"
                stroke-dasharray="4,3"/>
          <text x="182" y="238" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 2</text>
          <text x="182" y="253" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">BLOCKED</text>
        </g>
        <g class="qt-lb3" opacity="0">
          <rect x="232" y="222" width="100" height="40" rx="6"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.5)" stroke-width="1.2"
                stroke-dasharray="4,3"/>
          <text x="282" y="238" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 3</text>
          <text x="282" y="253" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">BLOCKED</text>
        </g>

        <g class="qt-lwhy" opacity="0">
          <rect x="22" y="278" width="320" height="44" rx="7"
                fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="182" y="295" text-anchor="middle" fill="#ef4444" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">TCP only sees a byte stream</text>
          <text x="182" y="310" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">— it doesn't know streams 2 & 3 are independent</text>
        </g>

        <g class="qt-lsum" opacity="0">
          <rect x="22" y="332" width="320" height="32" rx="6"
                fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <text x="182" y="352" text-anchor="middle" fill="#fca5a5" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Wait = 1 RTT detect + 1 RTT retransmit</text>
        </g>

        <!-- ============ RIGHT: HTTP/3 over QUIC ============ -->
        <g class="qt-rbox" opacity="0">
          <rect x="364" y="8" width="348" height="364" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.35)" stroke-width="1.5"/>
        </g>
        <g class="qt-rhdr" opacity="0">
          <text x="378" y="30" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">HTTP/3 over QUIC (UDP)</text>
          <text x="378" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Streams are first-class — independent at the transport layer</text>
        </g>

        <g class="qt-rquic" opacity="0">
          <rect x="378" y="58" width="320" height="22" rx="5"
                fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
          <text x="538" y="73" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">QUIC — per-stream ordering, no shared head</text>
        </g>

        <!-- Stream 1 (RED) — lost -->
        <g class="qt-rs1lbl" opacity="0">
          <text x="378" y="100" fill="#ef4444" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 1 (HTML)</text>
        </g>
        <g class="qt-rs1p1" opacity="0">
          <rect x="474" y="90" width="40" height="20" rx="4"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1"/>
          <text x="494" y="103" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P1</text>
        </g>
        <g class="qt-rs1lost" opacity="0">
          <line x1="484" y1="92" x2="504" y2="108" stroke="#ef4444" stroke-width="2.4"/>
          <line x1="504" y1="92" x2="484" y2="108" stroke="#ef4444" stroke-width="2.4"/>
          <text x="494" y="120" text-anchor="middle" fill="#ef4444" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">LOST</text>
        </g>
        <g class="qt-rs1p2" opacity="0">
          <rect x="534" y="90" width="40" height="20" rx="4"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1"/>
          <text x="554" y="103" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P2</text>
        </g>

        <!-- Stream 2 (VIOLET) -->
        <g class="qt-rs2lbl" opacity="0">
          <text x="378" y="142" fill="#a78bfa" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 2 (CSS)</text>
        </g>
        <g class="qt-rs2p1" opacity="0">
          <rect x="474" y="132" width="40" height="20" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="494" y="145" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P3</text>
        </g>
        <g class="qt-rs2p2" opacity="0">
          <rect x="534" y="132" width="40" height="20" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="554" y="145" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P4</text>
        </g>

        <!-- Stream 3 (CYAN) -->
        <g class="qt-rs3lbl" opacity="0">
          <text x="378" y="184" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Stream 3 (JS)</text>
        </g>
        <g class="qt-rs3p1" opacity="0">
          <rect x="474" y="174" width="40" height="20" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="494" y="187" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P5</text>
        </g>
        <g class="qt-rs3p2" opacity="0">
          <rect x="534" y="174" width="40" height="20" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="554" y="187" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">P6</text>
        </g>

        <!-- Receiver app boxes (right) — stream 1 BLOCKED, 2 & 3 DELIVERED -->
        <g class="qt-rrecv" opacity="0">
          <text x="538" y="214" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">APPLICATION DELIVERY</text>
        </g>

        <g class="qt-rb1" opacity="0">
          <rect x="388" y="222" width="100" height="40" rx="6"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.5)" stroke-width="1.2"
                stroke-dasharray="4,3"/>
          <text x="438" y="238" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 1</text>
          <text x="438" y="253" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">BLOCKED</text>
        </g>
        <g class="qt-rb2" opacity="0">
          <rect x="488" y="222" width="100" height="40" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="538" y="238" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 2</text>
          <text x="538" y="253" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#10003; DELIVERED</text>
        </g>
        <g class="qt-rb3" opacity="0">
          <rect x="588" y="222" width="100" height="40" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="638" y="238" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Stream 3</text>
          <text x="638" y="253" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#10003; DELIVERED</text>
        </g>

        <g class="qt-rwhy" opacity="0">
          <rect x="378" y="278" width="320" height="44" rx="7"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="538" y="295" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">QUIC knows stream boundaries</text>
          <text x="538" y="310" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-family="Inter, sans-serif">— stream 1 is paused, streams 2 & 3 sail past it</text>
        </g>

        <g class="qt-rsum" opacity="0">
          <rect x="378" y="332" width="320" height="32" rx="6"
                fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
          <text x="538" y="352" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Only stream 1 waits — 2 & 3 render immediately</text>
        </g>
      </svg>
    </div>
  `,
})
export class QuicVsTcpComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.qt-wrap');
    const tl = this.createScrollTimeline(container);

    // Boxes + headers in parallel
    tl.fromTo(this.qa('.qt-lbox, .qt-rbox'), { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(
      this.qa('.qt-lhdr, .qt-rhdr'),
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.35 },
      '-=0.15',
    );
    tl.fromTo(
      this.qa('.qt-ltcp, .qt-rquic'),
      { opacity: 0, scaleX: 0.6 },
      { opacity: 1, scaleX: 1, duration: 0.4, transformOrigin: 'left center' },
      '+=0.05',
    );

    // Labels for both columns
    tl.fromTo(
      this.qa('.qt-ls1lbl, .qt-ls2lbl, .qt-ls3lbl, .qt-rs1lbl, .qt-rs2lbl, .qt-rs3lbl'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
      '+=0.05',
    );

    // Stream 1 packets — both columns (P1 sent, lost, P2 sent)
    tl.fromTo(
      this.qa('.qt-ls1p1, .qt-rs1p1'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.qa('.qt-ls1lost, .qt-rs1lost'),
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: 'center' },
      '-=0.1',
    );
    tl.fromTo(
      this.qa('.qt-ls1p2, .qt-rs1p2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );

    // Stream 2 packets
    tl.fromTo(
      this.qa('.qt-ls2p1, .qt-rs2p1'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.qa('.qt-ls2p2, .qt-rs2p2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );

    // Stream 3 packets
    tl.fromTo(
      this.qa('.qt-ls3p1, .qt-rs3p1'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.qa('.qt-ls3p2, .qt-rs3p2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );

    // Receiver headers
    tl.fromTo(
      this.qa('.qt-lrecv, .qt-rrecv'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '+=0.15',
    );

    // LEFT: all three blocked simultaneously (TCP collapses everything)
    tl.fromTo(
      this.qa('.qt-lb1, .qt-lb2, .qt-lb3'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        transformOrigin: 'center',
      },
      '+=0.1',
    );

    // RIGHT: stream 1 blocked, 2 & 3 delivered (per-stream)
    tl.fromTo(
      this.q('.qt-rb1'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '<',
    );
    tl.fromTo(
      this.qa('.qt-rb2, .qt-rb3'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: 'back.out(2)',
        transformOrigin: 'center',
      },
      '+=0.1',
    );

    // Why panels
    tl.fromTo(
      this.qa('.qt-lwhy, .qt-rwhy'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45 },
      '+=0.2',
    );

    // Summary banners
    tl.fromTo(
      this.qa('.qt-lsum, .qt-rsum'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.15',
    );
  }
}
