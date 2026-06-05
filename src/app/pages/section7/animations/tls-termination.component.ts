import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tls-termination',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tt-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .tt-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="tt-wrap">
      <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="tt-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="tt-arr-s" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#94a3b8"/>
          </marker>
        </defs>

        <!-- ===== TOP: L4 PASS-THROUGH ===== -->
        <g class="tt-tbox" opacity="0">
          <rect x="8" y="8" width="704" height="160" rx="10"
                fill="rgba(245,158,11,0.03)" stroke="rgba(245,158,11,0.3)" stroke-width="1.5"/>
        </g>
        <g class="tt-thdr" opacity="0">
          <text x="22" y="30" fill="#f59e0b" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">LAYER 4 &mdash; TLS PASS-THROUGH</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">LB only forwards bytes &mdash; certificate lives on the backend, end-to-end encrypted</text>
        </g>

        <!-- Actors row -->
        <g class="tt-tclient" opacity="0">
          <rect x="36" y="68" width="100" height="72" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="86" y="90" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="86" y="108" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">opens TLS to</text>
          <text x="86" y="120" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">site.com</text>
          <text x="86" y="134" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">peer = backend</text>
        </g>

        <g class="tt-tlb" opacity="0">
          <rect x="310" y="68" width="100" height="72" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="360" y="90" text-anchor="middle" fill="#f59e0b" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">L4 LB</text>
          <text x="360" y="106" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">sees: encrypted</text>
          <text x="360" y="118" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">garbage</text>
          <text x="360" y="134" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">no cert needed</text>
        </g>

        <g class="tt-tback" opacity="0">
          <rect x="584" y="68" width="100" height="72" rx="7"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="634" y="90" text-anchor="middle" fill="#a78bfa" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">BACKEND</text>
          <text x="634" y="108" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">decrypts here</text>
          <text x="634" y="120" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">holds cert</text>
          <text x="634" y="134" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#128272; cert + key</text>
        </g>

        <!-- Encrypted leg 1: client → LB -->
        <g class="tt-tleg1" opacity="0">
          <line x1="136" y1="104" x2="308" y2="104" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#tt-arr-g)"/>
          <text x="222" y="98" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">TLS &#128274; (encrypted)</text>
        </g>

        <!-- Encrypted leg 2: LB → backend (still encrypted!) -->
        <g class="tt-tleg2" opacity="0">
          <line x1="410" y1="104" x2="582" y2="104" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#tt-arr-g)"/>
          <text x="496" y="98" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">TLS &#128274; (still encrypted)</text>
        </g>

        <!-- summary line -->
        <g class="tt-tsum" opacity="0">
          <text x="360" y="156" text-anchor="middle" fill="#f59e0b" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">End-to-end encryption &middot; cert lives on backend &middot; LB is &ldquo;blind&rdquo;</text>
        </g>

        <!-- ===== BOTTOM: L7 TERMINATION ===== -->
        <g class="tt-bbox" opacity="0">
          <rect x="8" y="180" width="704" height="172" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
        </g>
        <g class="tt-bhdr" opacity="0">
          <text x="22" y="202" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">LAYER 7 &mdash; TLS TERMINATION</text>
          <text x="22" y="216" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">LB decrypts at the edge &mdash; sees the full request, talks plain HTTP to backend</text>
        </g>

        <g class="tt-bclient" opacity="0">
          <rect x="36" y="240" width="100" height="72" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="86" y="262" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="86" y="280" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">opens TLS to</text>
          <text x="86" y="292" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">site.com</text>
          <text x="86" y="306" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">peer = LB</text>
        </g>

        <g class="tt-blb" opacity="0">
          <rect x="310" y="240" width="100" height="72" rx="7"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="360" y="262" text-anchor="middle" fill="#10b981" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">L7 LB</text>
          <text x="360" y="278" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">decrypts here</text>
          <text x="360" y="290" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">reads method,</text>
          <text x="360" y="300" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">path, headers</text>
          <text x="360" y="312" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#128272; cert + key</text>
        </g>

        <g class="tt-bback" opacity="0">
          <rect x="584" y="240" width="100" height="72" rx="7"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="634" y="262" text-anchor="middle" fill="#a78bfa" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">BACKEND</text>
          <text x="634" y="280" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">no TLS cost</text>
          <text x="634" y="292" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">no cert</text>
          <text x="634" y="306" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#10003; cpu saved</text>
        </g>

        <!-- Encrypted leg 1: client → LB -->
        <g class="tt-bleg1" opacity="0">
          <line x1="136" y1="276" x2="308" y2="276" stroke="#10b981" stroke-width="2.4"
                marker-end="url(#tt-arr-g)"/>
          <text x="222" y="270" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">TLS &#128274; (encrypted)</text>
        </g>

        <!-- Plain leg 2: LB → backend (dashed grey) -->
        <g class="tt-bleg2" opacity="0">
          <line x1="410" y1="276" x2="582" y2="276" stroke="#94a3b8" stroke-width="1.6"
                stroke-dasharray="4,3" marker-end="url(#tt-arr-s)"/>
          <text x="496" y="270" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">plain HTTP (trusted net)</text>
        </g>

        <g class="tt-bsum" opacity="0">
          <text x="360" y="332" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Decrypt once at the edge &middot; cert lives on LB &middot; LB sees full request</text>
        </g>
      </svg>
    </div>
  `,
})
export class TlsTerminationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tt-wrap');
    const tl = this.createScrollTimeline(container);

    // Top panel
    tl.fromTo(this.q('.tt-tbox'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.tt-thdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.tt-tclient, .tt-tlb, .tt-tback'),
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.tt-tleg1'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.tt-tleg2'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45 },
      '+=0.1',
    );
    tl.fromTo(this.q('.tt-tsum'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');

    // Bottom panel
    tl.fromTo(this.q('.tt-bbox'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.3');
    tl.fromTo(this.q('.tt-bhdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.tt-bclient, .tt-blb, .tt-bback'),
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.tt-bleg1'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.tt-bleg2'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45 },
      '+=0.1',
    );
    tl.fromTo(this.q('.tt-bsum'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
  }
}
