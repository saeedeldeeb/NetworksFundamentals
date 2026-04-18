import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-mitm-ca',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .mc-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .mc-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="mc-wrap">
      <svg viewBox="0 0 720 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="mc-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="mc-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="mc-arr-y" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
        </defs>

        <!-- ===== PHASE LABELS ===== -->
        <g class="mc-labels" opacity="0">
          <text x="8" y="22" fill="#10b981" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">NORMAL HTTPS</text>
          <text x="8" y="228" fill="#ef4444" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">MITM WITH FAKE ROOT CA (Kazakhstan, 2019)</text>
          <line x1="8" y1="232" x2="712" y2="232" stroke="rgba(239,68,68,0.3)" stroke-width="1"/>
        </g>

        <!-- ===== PHASE 1: NORMAL HTTPS ===== -->

        <!-- Nodes -->
        <g class="mc-normal-nodes" opacity="0">
          <rect x="8" y="36" width="80" height="34" rx="7"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="48" y="54" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">USER</text>
          <text x="48" y="65" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">browser</text>

          <rect x="620" y="36" width="92" height="34" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="666" y="54" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">google.com</text>
          <text x="666" y="65" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">real server</text>
        </g>

        <!-- Normal flow arrows -->
        <g class="mc-normal-flow" opacity="0">
          <!-- Request arrow -->
          <line x1="90" y1="50" x2="618" y2="50" stroke="#10b981" stroke-width="2"
                marker-end="url(#mc-arr-g)"/>
          <rect x="240" y="38" width="200" height="13" rx="3" fill="rgba(16,185,129,0.1)"/>
          <text x="340" y="49" text-anchor="middle" fill="#10b981" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">TLS encrypted — only google.com can decrypt</text>

          <!-- Response arrow -->
          <line x1="618" y1="68" x2="90" y2="68" stroke="#10b981" stroke-width="2"
                marker-end="url(#mc-arr-g)"/>
          <text x="340" y="64" text-anchor="middle" fill="#10b981" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">encrypted response</text>
        </g>

        <!-- Trust chain (normal) -->
        <g class="mc-normal-chain" opacity="0">
          <rect x="140" y="88" width="400" height="50" rx="7"
                fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.25)" stroke-width="1"/>
          <text x="156" y="105" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">Certificate chain:</text>

          <!-- Chain chips -->
          <rect x="244" y="93" width="100" height="18" rx="4" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.3)" stroke-width="1"/>
          <text x="294" y="106" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">google.com cert</text>

          <text x="348" y="105" fill="#475569" font-size="9">→</text>

          <rect x="358" y="93" width="80" height="18" rx="4" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.3)" stroke-width="1"/>
          <text x="398" y="106" text-anchor="middle" fill="#f59e0b" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">GTS CA 1C3</text>

          <text x="441" y="105" fill="#475569" font-size="9">→</text>

          <rect x="451" y="93" width="72" height="18" rx="4" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="487" y="106" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">GTS Root R1</text>

          <text x="156" y="128" fill="#10b981" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">GTS Root R1 is in OS trust store ✓ — browser shows 🔒 and data is truly private</text>
        </g>

        <!-- ===== PHASE 2: MITM WITH FAKE CA ===== -->

        <!-- Nodes -->
        <g class="mc-mitm-nodes" opacity="0">
          <rect x="8" y="248" width="80" height="34" rx="7"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="48" y="261" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">USER</text>
          <text x="48" y="273" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">browser</text>

          <!-- GOVT ISP (MITM) -->
          <rect x="300" y="240" width="120" height="50" rx="7"
                fill="rgba(239,68,68,0.08)" stroke="#ef4444" stroke-width="2"/>
          <text x="360" y="259" text-anchor="middle" fill="#f87171" font-size="9.5" font-weight="700"
                font-family="Inter, sans-serif">GOVT ISP</text>
          <text x="360" y="272" text-anchor="middle" fill="#ef4444" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">INTERCEPTS ALL TLS</text>
          <text x="360" y="283" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">man-in-the-middle</text>

          <rect x="620" y="248" width="92" height="34" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="666" y="261" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">google.com</text>
          <text x="666" y="273" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">real server</text>
        </g>

        <!-- MITM flow arrows -->
        <g class="mc-mitm-flow" opacity="0">
          <!-- User → ISP (user thinks it's encrypted to google) -->
          <line x1="90" y1="256" x2="298" y2="256" stroke="#ef4444" stroke-width="2"
                marker-end="url(#mc-arr-r)"/>
          <rect x="98" y="244" width="112" height="12" rx="3" fill="rgba(239,68,68,0.1)"/>
          <text x="154" y="254" text-anchor="middle" fill="#f87171" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">"encrypted" to ISP cert</text>

          <!-- ISP → google (ISP re-encrypts) -->
          <line x1="422" y1="256" x2="618" y2="256" stroke="#f59e0b" stroke-width="2"
                marker-end="url(#mc-arr-y)"/>
          <rect x="432" y="244" width="112" height="12" rx="3" fill="rgba(245,158,11,0.1)"/>
          <text x="488" y="254" text-anchor="middle" fill="#f59e0b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">re-encrypted to google</text>

          <!-- ISP reads plaintext label -->
          <text x="360" y="308" text-anchor="middle" fill="#ef4444" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif">ISP sees PLAINTEXT — passwords, messages, everything</text>
        </g>

        <!-- Fake cert chain -->
        <g class="mc-fake-chain" opacity="0">
          <rect x="80" y="320" width="560" height="58" rx="7"
                fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.3)" stroke-width="1"
                stroke-dasharray="5,3"/>
          <text x="96" y="337" fill="#f87171" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif">ISP presents a FAKE certificate chain:</text>

          <rect x="240" y="342" width="100" height="18" rx="4" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <text x="290" y="355" text-anchor="middle" fill="#f87171" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">fake google.com</text>

          <text x="343" y="355" fill="#475569" font-size="9">→</text>

          <rect x="354" y="342" width="90" height="18" rx="4" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" stroke-width="1.5"/>
          <text x="399" y="355" text-anchor="middle" fill="#ef4444" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">GOVT ROOT CA</text>

          <text x="448" y="355" fill="#475569" font-size="9">→</text>
          <text x="460" y="356" fill="#ef4444" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">pre-installed in OS on all devices sold in country!</text>

          <text x="96" y="370" fill="#64748b" font-size="7.5" font-family="Inter, sans-serif">
            GOVT ROOT CA is in trust store → browser shows 🔒 — user has no idea the connection is intercepted
          </text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="mc-result" opacity="0">
          <rect x="8" y="392" width="704" height="40" rx="8"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.4)" stroke-width="1.5"/>
          <text x="360" y="408" text-anchor="middle" fill="#f87171" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">
            This is why browsers (Chrome, Firefox) maintain their own list of trusted CAs
          </text>
          <text x="360" y="424" text-anchor="middle" fill="#64748b" font-size="8"
                font-family="Inter, sans-serif">
            and can explicitly distrust government-controlled CAs — even if the OS trusts them.
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class MitmCaComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.mc-wrap');
    const tl = this.createScrollTimeline(container);

    // Phase labels
    tl.fromTo(this.q('.mc-labels'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Normal HTTPS phase
    tl.fromTo(this.q('.mc-normal-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.1');
    tl.fromTo(this.q('.mc-normal-flow'), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    tl.fromTo(this.q('.mc-normal-chain'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');

    // MITM phase
    tl.fromTo(this.q('.mc-mitm-nodes'),
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.3');
    tl.fromTo(this.q('.mc-mitm-flow'), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    tl.fromTo(this.q('.mc-fake-chain'),
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '+=0.15');

    // Result
    tl.fromTo(this.q('.mc-result'),
      { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.15');
  }
}
