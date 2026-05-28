import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-port-binding',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .pb-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .pb-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="pb-wrap">
      <svg viewBox="0 0 720 470" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pb-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="pb-arr-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="pb-arr-i" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
        </defs>

        <!-- ============ ROW 1: same port, different IPs = OK ============ -->
        <g class="pb-r1box" opacity="0">
          <rect x="8" y="8" width="704" height="140" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
        </g>
        <g class="pb-r1hdr" opacity="0">
          <text x="22" y="30" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">SAME PORT, DIFFERENT IPs &#8594; all three coexist</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">A listening socket is identified by the (IP, Port) pair — not the port alone</text>
        </g>

        <!-- 3 processes on same port, different IPs -->
        <g class="pb-r1p1" opacity="0">
          <rect x="40" y="62" width="190" height="68" rx="8"
                fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="135" y="82" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">App A</text>
          <text x="135" y="100" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">listen(8080,</text>
          <text x="135" y="113" text-anchor="middle" fill="#fcd34d" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">'127.0.0.1')</text>
          <text x="135" y="125" text-anchor="middle" fill="#10b981" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">&#10003; OK</text>
        </g>
        <g class="pb-r1p2" opacity="0">
          <rect x="265" y="62" width="190" height="68" rx="8"
                fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="360" y="82" text-anchor="middle" fill="#a78bfa" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">App B</text>
          <text x="360" y="100" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">listen(8080,</text>
          <text x="360" y="113" text-anchor="middle" fill="#fcd34d" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">'::1')</text>
          <text x="360" y="125" text-anchor="middle" fill="#10b981" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">&#10003; OK</text>
        </g>
        <g class="pb-r1p3" opacity="0">
          <rect x="490" y="62" width="190" height="68" rx="8"
                fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.5)" stroke-width="1.2"/>
          <text x="585" y="82" text-anchor="middle" fill="#f59e0b" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">App C</text>
          <text x="585" y="100" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">listen(8080,</text>
          <text x="585" y="113" text-anchor="middle" fill="#fcd34d" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">'192.168.1.10')</text>
          <text x="585" y="125" text-anchor="middle" fill="#10b981" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">&#10003; OK</text>
        </g>

        <!-- ============ ROW 2: same IP:Port = error ============ -->
        <g class="pb-r2box" opacity="0">
          <rect x="8" y="160" width="704" height="140" rx="10"
                fill="rgba(239,68,68,0.03)" stroke="rgba(239,68,68,0.35)" stroke-width="1.5"/>
        </g>
        <g class="pb-r2hdr" opacity="0">
          <text x="22" y="182" fill="#ef4444" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">SAME IP + SAME PORT &#8594; collision</text>
          <text x="22" y="196" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Two processes can't share the exact same (IP, Port) socket</text>
        </g>

        <g class="pb-r2p1" opacity="0">
          <rect x="80" y="214" width="220" height="68" rx="8"
                fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="190" y="234" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">App A — started first</text>
          <text x="190" y="252" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-family="Inter, sans-serif">listen(8080, '127.0.0.1')</text>
          <text x="190" y="270" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">&#10003; holds the socket</text>
        </g>

        <g class="pb-r2arr" opacity="0">
          <line x1="304" y1="248" x2="416" y2="248" stroke="#64748b" stroke-width="1.2"
                stroke-dasharray="3,3"/>
        </g>

        <g class="pb-r2p2" opacity="0">
          <rect x="420" y="214" width="220" height="68" rx="8"
                fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="530" y="234" text-anchor="middle" fill="#fca5a5" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">App B — tries the same</text>
          <text x="530" y="252" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-family="Inter, sans-serif">listen(8080, '127.0.0.1')</text>
        </g>

        <g class="pb-r2err" opacity="0">
          <rect x="420" y="262" width="220" height="22" rx="5"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.2"/>
          <text x="530" y="275" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#215; EADDRINUSE — address already in use</text>
        </g>

        <!-- ============ ROW 3: SO_REUSEPORT ============ -->
        <g class="pb-r3box" opacity="0">
          <rect x="8" y="312" width="704" height="150" rx="10"
                fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.35)" stroke-width="1.5"/>
        </g>
        <g class="pb-r3hdr" opacity="0">
          <text x="22" y="334" fill="#a78bfa" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">EXCEPTION — SO_REUSEPORT: kernel-side load balancing</text>
          <text x="22" y="348" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Multiple processes share one port — the kernel hashes the 4-tuple and routes each new connection to one of them</text>
        </g>

        <!-- Clients -->
        <g class="pb-r3c1" opacity="0">
          <rect x="22" y="362" width="100" height="22" rx="5"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="72" y="376" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Client 155.5.5.5</text>
        </g>
        <g class="pb-r3c2" opacity="0">
          <rect x="22" y="392" width="100" height="22" rx="5"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="72" y="406" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Client 177.1.1.2</text>
        </g>
        <g class="pb-r3c3" opacity="0">
          <rect x="22" y="422" width="100" height="22" rx="5"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.5)" stroke-width="1"/>
          <text x="72" y="436" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Client 92.9.4.1</text>
        </g>

        <!-- Kernel hash box -->
        <g class="pb-r3kernel" opacity="0">
          <rect x="240" y="370" width="160" height="78" rx="8"
                fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="320" y="388" text-anchor="middle" fill="#fcd34d" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">KERNEL</text>
          <text x="320" y="404" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">hash(srcIP, srcPort,</text>
          <text x="320" y="416" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">dstIP, dstPort)</text>
          <text x="320" y="436" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">port 8080</text>
        </g>

        <!-- 3 worker processes -->
        <g class="pb-r3w1" opacity="0">
          <rect x="510" y="362" width="180" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="600" y="376" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Worker X — listen(8080)</text>
        </g>
        <g class="pb-r3w2" opacity="0">
          <rect x="510" y="392" width="180" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="600" y="406" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Worker Y — listen(8080)</text>
        </g>
        <g class="pb-r3w3" opacity="0">
          <rect x="510" y="422" width="180" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="600" y="436" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Worker Z — listen(8080)</text>
        </g>

        <!-- Client → kernel arrows -->
        <g class="pb-r3in1" opacity="0">
          <line x1="124" y1="373" x2="238" y2="385" stroke="#22d3ee" stroke-width="1.4"
                marker-end="url(#pb-arr-g)"/>
        </g>
        <g class="pb-r3in2" opacity="0">
          <line x1="124" y1="403" x2="238" y2="408" stroke="#22d3ee" stroke-width="1.4"
                marker-end="url(#pb-arr-g)"/>
        </g>
        <g class="pb-r3in3" opacity="0">
          <line x1="124" y1="433" x2="238" y2="430" stroke="#22d3ee" stroke-width="1.4"
                marker-end="url(#pb-arr-g)"/>
        </g>

        <!-- Kernel → worker arrows (interleaved by hash) -->
        <g class="pb-r3out1" opacity="0">
          <line x1="402" y1="395" x2="508" y2="373" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#pb-arr-i)"/>
        </g>
        <g class="pb-r3out2" opacity="0">
          <line x1="402" y1="409" x2="508" y2="403" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#pb-arr-i)"/>
        </g>
        <g class="pb-r3out3" opacity="0">
          <line x1="402" y1="423" x2="508" y2="433" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#pb-arr-i)"/>
        </g>
      </svg>
    </div>
  `,
})
export class PortBindingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.pb-wrap');
    const tl = this.createScrollTimeline(container);

    // Row 1
    tl.fromTo(this.q('.pb-r1box'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.pb-r1hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.pb-r1p1, .pb-r1p2, .pb-r1p3'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.18,
        ease: 'back.out(1.6)',
        transformOrigin: 'center',
      },
      '+=0.05',
    );

    // Row 2
    tl.fromTo(this.q('.pb-r2box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.25');
    tl.fromTo(this.q('.pb-r2hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.q('.pb-r2p1'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(this.q('.pb-r2arr'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '+=0.1');
    tl.fromTo(
      this.q('.pb-r2p2'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.pb-r2err'),
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.15',
    );

    // Row 3 — SO_REUSEPORT
    tl.fromTo(this.q('.pb-r3box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.3');
    tl.fromTo(this.q('.pb-r3hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.pb-r3c1, .pb-r3c2, .pb-r3c3'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.pb-r3kernel'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.qa('.pb-r3w1, .pb-r3w2, .pb-r3w3'),
      { opacity: 0, x: 6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 },
      '-=0.2',
    );

    // arrows in flowing pairs
    tl.fromTo(this.q('.pb-r3in1'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.1');
    tl.fromTo(this.q('.pb-r3out1'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.05');
    tl.fromTo(this.q('.pb-r3in2'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.15');
    tl.fromTo(this.q('.pb-r3out2'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.05');
    tl.fromTo(this.q('.pb-r3in3'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.15');
    tl.fromTo(this.q('.pb-r3out3'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, '+=0.05');
  }
}
