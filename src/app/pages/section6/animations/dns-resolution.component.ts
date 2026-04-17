import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

// Node centers (x): CLIENT=58, RESOLVER=210, ROOT=350, TLD=488, AUTH=642

@Component({
  selector: 'app-dns-resolution',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .dr-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .dr-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="dr-wrap">
      <svg viewBox="0 0 720 430" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="dr-arr-q" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#22d3ee" />
          </marker>
          <marker id="dr-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#10b981" />
          </marker>
        </defs>

        <!-- ===== NODE BOXES ===== -->
        <g class="dr-nodes" opacity="0">
          <!-- CLIENT -->
          <rect x="8"   y="8" width="100" height="36" rx="8"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="58"  y="30" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">CLIENT</text>

          <!-- RESOLVER -->
          <rect x="152" y="8" width="116" height="36" rx="8"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="210" y="26" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">RESOLVER</text>
          <text x="210" y="39" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">ISP / 1.1.1.1</text>

          <!-- ROOT -->
          <rect x="308" y="8" width="84" height="36" rx="8"
                fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="350" y="26" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">ROOT</text>
          <text x="350" y="39" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">13 servers</text>

          <!-- TLD -->
          <rect x="446" y="8" width="84" height="36" rx="8"
                fill="rgba(236,72,153,0.08)" stroke="#ec4899" stroke-width="1.5"/>
          <text x="488" y="26" text-anchor="middle" fill="#f472b6" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">TLD</text>
          <text x="488" y="39" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">.com / .org</text>

          <!-- AUTHORITATIVE -->
          <rect x="572" y="8" width="140" height="36" rx="8"
                fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.5"/>
          <text x="642" y="26" text-anchor="middle" fill="#34d399" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">AUTHORITATIVE</text>
          <text x="642" y="39" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">GoDaddy / Cloudflare</text>

          <!-- Timeline axes -->
          <line x1="58"  y1="44" x2="58"  y2="298" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="210" y1="44" x2="210" y2="298" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="350" y1="44" x2="350" y2="298" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="488" y1="44" x2="488" y2="298" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="642" y1="44" x2="642" y2="298" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
        </g>

        <!-- ===== STEP 1: CLIENT → RESOLVER ===== -->
        <g class="dr-s1" opacity="0">
          <line x1="66" y1="72" x2="200" y2="72" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#dr-arr-q)"/>
          <rect x="72" y="59" width="78" height="14" rx="3" fill="rgba(34,211,238,0.12)"/>
          <text x="111" y="70" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">google.com?</text>
          <text x="111" y="84" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">① query</text>
        </g>

        <!-- ===== STEP 2: RESOLVER → ROOT ===== -->
        <g class="dr-s2" opacity="0">
          <line x1="218" y1="104" x2="340" y2="104" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#dr-arr-q)"/>
          <rect x="220" y="91" width="82" height="14" rx="3" fill="rgba(34,211,238,0.12)"/>
          <text x="261" y="102" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">who has .com?</text>
          <text x="261" y="116" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">② query</text>
        </g>

        <!-- ===== STEP 3: ROOT → RESOLVER ===== -->
        <g class="dr-s3" opacity="0">
          <line x1="342" y1="134" x2="222" y2="134" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#dr-arr-r)"/>
          <rect x="222" y="121" width="60" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="252" y="132" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">TLD addr</text>
          <text x="252" y="146" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">③ reply</text>
        </g>

        <!-- ===== STEP 4: RESOLVER → TLD ===== -->
        <g class="dr-s4" opacity="0">
          <line x1="218" y1="163" x2="478" y2="163" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#dr-arr-q)"/>
          <rect x="282" y="150" width="92" height="14" rx="3" fill="rgba(34,211,238,0.12)"/>
          <text x="328" y="161" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">google.com NS?</text>
          <text x="328" y="175" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">④ query</text>
        </g>

        <!-- ===== STEP 5: TLD → RESOLVER ===== -->
        <g class="dr-s5" opacity="0">
          <line x1="480" y1="192" x2="222" y2="192" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#dr-arr-r)"/>
          <rect x="282" y="179" width="94" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="329" y="190" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">NS server addr</text>
          <text x="329" y="204" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">⑤ reply</text>
        </g>

        <!-- ===== STEP 6: RESOLVER → AUTH ===== -->
        <g class="dr-s6" opacity="0">
          <line x1="218" y1="222" x2="630" y2="222" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#dr-arr-q)"/>
          <rect x="366" y="209" width="88" height="14" rx="3" fill="rgba(34,211,238,0.12)"/>
          <text x="410" y="220" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">google.com A?</text>
          <text x="410" y="234" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">⑥ query</text>
        </g>

        <!-- ===== STEP 7: AUTH → RESOLVER ===== -->
        <g class="dr-s7" opacity="0">
          <line x1="634" y1="251" x2="222" y2="251" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#dr-arr-r)"/>
          <rect x="366" y="238" width="88" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="410" y="249" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">142.250.80.46</text>
          <text x="410" y="263" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">⑦ authoritative answer</text>
        </g>

        <!-- ===== STEP 8: RESOLVER → CLIENT ===== -->
        <g class="dr-s8" opacity="0">
          <line x1="202" y1="280" x2="70" y2="280" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#dr-arr-r)"/>
          <rect x="72" y="267" width="90" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="117" y="278" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">142.250.80.46</text>
          <text x="117" y="292" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">⑧ cached &amp; returned</text>
        </g>

        <!-- ===== SUMMARY ===== -->
        <g class="dr-summary" opacity="0">
          <rect x="8" y="308" width="704" height="110" rx="8"
                fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.2)" stroke-width="1"/>

          <text x="24" y="332" fill="#94a3b8" font-size="8.5" font-weight="600"
                font-family="Inter, sans-serif">First request (uncached):</text>
          <text x="200" y="332" fill="#f59e0b" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">7–8 UDP round trips</text>
          <text x="400" y="332" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">before TCP handshake can even begin</text>

          <text x="24" y="354" fill="#94a3b8" font-size="8.5" font-weight="600"
                font-family="Inter, sans-serif">Cached response:</text>
          <text x="200" y="354" fill="#10b981" font-size="8.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">1 UDP round trip</text>
          <text x="400" y="354" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">resolver answers directly from cache</text>

          <line x1="24" y1="366" x2="692" y2="366" stroke="#1e293b" stroke-width="1"/>
          <text x="24" y="382" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">
            Resolvers cache by TTL — repeat queries skip Root → TLD → Authoritative entirely.
          </text>
          <text x="24" y="397" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">
            Resolver IP must be hardcoded (e.g. 1.1.1.1) — using a domain name would cause an infinite loop.
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class DnsResolutionComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.dr-wrap');
    const tl = this.createScrollTimeline(container);

    tl.fromTo(this.q('.dr-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.4 });

    const steps = [
      '.dr-s1', '.dr-s2', '.dr-s3',
      '.dr-s4', '.dr-s5',
      '.dr-s6', '.dr-s7', '.dr-s8',
    ];

    steps.forEach((s) => {
      tl.fromTo(this.q(s),
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        '>-0.05',
      );
    });

    tl.fromTo(this.q('.dr-summary'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.15');

    // Loop: fade out step arrows, replay them
    const loop = this.createLoopingTimeline(container);
    loop.to(steps.map(s => this.q(s)), { opacity: 0, duration: 0.3, stagger: 0.04 }, '+=2');
    steps.forEach((s) => {
      loop.fromTo(this.q(s),
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        '>-0.05',
      );
    });
    loop.to({}, { duration: 2 });
  }
}
