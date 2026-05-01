import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-pmtud-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .pf-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .pf-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="pf-wrap">
      <svg viewBox="0 0 720 276" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pf-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="pf-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f97316"/>
          </marker>
          <marker id="pf-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- ===== NODE BOXES ===== -->
        <g class="pf-nodes" opacity="0">
          <!-- CLIENT -->
          <rect x="10" y="10" width="76" height="42" rx="7"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="48" y="28" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="48" y="42" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">MTU = 9000</text>

          <!-- ROUTER 1 -->
          <rect x="188" y="10" width="88" height="42" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="232" y="28" text-anchor="middle" fill="#818cf8" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">ROUTER 1</text>
          <text x="232" y="42" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">MTU = 9000</text>

          <!-- ROUTER 2 BOTTLENECK -->
          <rect x="362" y="6" width="112" height="50" rx="7"
                fill="rgba(239,68,68,0.08)" stroke="#ef4444" stroke-width="2"/>
          <text x="418" y="24" text-anchor="middle" fill="#f87171" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">ROUTER 2</text>
          <text x="418" y="36" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">MTU = 512</text>
          <text x="418" y="49" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">BOTTLENECK</text>

          <!-- SERVER -->
          <rect x="612" y="10" width="98" height="42" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="661" y="28" text-anchor="middle" fill="#818cf8" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">SERVER</text>
          <text x="661" y="42" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">MTU = 1500</text>
        </g>

        <!-- ===== TIMELINE AXES ===== -->
        <g class="pf-axes" opacity="0">
          <line x1="48" y1="52" x2="48" y2="230"
                stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="232" y1="52" x2="232" y2="230"
                stroke="#6366f1" stroke-width="1" stroke-dasharray="3,4" opacity="0.3"/>
          <line x1="418" y1="56" x2="418" y2="230"
                stroke="#ef4444" stroke-width="1" stroke-dasharray="3,4" opacity="0.35"/>
          <line x1="661" y1="52" x2="661" y2="230"
                stroke="#6366f1" stroke-width="1" stroke-dasharray="3,4" opacity="0.3"/>
        </g>

        <!-- ===== ATTEMPT 1 ===== -->
        <g class="pf-attempt1-label" opacity="0">
          <text x="8" y="73" fill="#f97316" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">ATTEMPT 1</text>
        </g>

        <g class="pf-step1-arrow" opacity="0">
          <!-- Arrow from CLIENT to ROUTER2 (orange - stopped/blocked) -->
          <line x1="50" y1="84" x2="360" y2="84" stroke="#f97316" stroke-width="2"
                marker-end="url(#pf-arr-o)"/>
          <rect x="98" y="72" width="168" height="12" rx="3" fill="rgba(249,115,22,0.1)"/>
          <text x="182" y="82" text-anchor="middle" fill="#fb923c" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">IP Packet [9000B] — DF=1 set</text>
        </g>

        <g class="pf-block" opacity="0">
          <!-- Block X at ROUTER2 -->
          <circle cx="418" cy="84" r="9" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1.5"/>
          <text x="418" y="89" text-anchor="middle" fill="#ef4444" font-size="11"
                font-weight="700" font-family="Inter, sans-serif">✕</text>
          <text x="418" y="103" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">9000 &gt; 512</text>
          <text x="418" y="114" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">DF set — cannot fragment</text>
        </g>

        <!-- ===== ICMP REPLY ===== -->
        <g class="pf-icmp" opacity="0">
          <line x1="416" y1="128" x2="52" y2="128" stroke="#ef4444" stroke-width="2"
                stroke-dasharray="5,3" marker-end="url(#pf-arr-r)"/>
          <rect x="102" y="116" width="220" height="12" rx="3" fill="rgba(239,68,68,0.08)"/>
          <text x="212" y="126" text-anchor="middle" fill="#f87171" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">ICMP: Fragmentation Needed — max_mtu=512</text>
        </g>

        <!-- ===== ATTEMPT 2 ===== -->
        <g class="pf-attempt2-label" opacity="0">
          <text x="8" y="151" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">ATTEMPT 2 — client reduces to 512B</text>
        </g>

        <g class="pf-step2-arrow" opacity="0">
          <!-- Arrow all the way from CLIENT to SERVER (green - success) -->
          <line x1="50" y1="164" x2="658" y2="164" stroke="#10b981" stroke-width="2"
                marker-end="url(#pf-arr-g)"/>
          <rect x="98" y="152" width="168" height="12" rx="3" fill="rgba(16,185,129,0.1)"/>
          <text x="182" y="162" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">IP Packet [512B] — DF=1 set</text>

          <!-- checkmarks at each router -->
          <text x="232" y="180" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">✓</text>
          <text x="418" y="180" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">✓</text>
          <text x="661" y="180" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">✓</text>
          <text x="232" y="190" text-anchor="middle" fill="#064e3b" font-size="6.5"
                font-family="Inter, sans-serif">512 ≤ 9000</text>
          <text x="418" y="190" text-anchor="middle" fill="#064e3b" font-size="6.5"
                font-family="Inter, sans-serif">512 ≤ 512</text>
          <text x="661" y="190" text-anchor="middle" fill="#064e3b" font-size="6.5"
                font-family="Inter, sans-serif">512 ≤ 1500</text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="pf-result" opacity="0">
          <rect x="8" y="202" width="704" height="66" rx="8"
                fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
          <text x="360" y="220" text-anchor="middle" fill="#10b981" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">
            Path MTU discovered: 512 bytes
          </text>
          <text x="360" y="236" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">
            All future packets capped at 512B — no fragmentation, no reassembly overhead.
          </text>
          <text x="360" y="252" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">
            PMTUD runs automatically in the TCP stack — you benefit without writing a line of code.
          </text>
          <text x="360" y="262" text-anchor="middle" fill="#334155" font-size="7"
                font-family="Inter, sans-serif">
            (Caveat: blocked ICMP = broken PMTUD. Some firewalls silently drop ICMP, causing mysterious stalls.)
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class PmtudFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.pf-wrap');
    const tl = this.createScrollTimeline(container);

    // Nodes + axes appear
    tl.fromTo(this.q('.pf-nodes'), { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    tl.fromTo(this.q('.pf-axes'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

    // Attempt 1 label
    tl.fromTo(this.q('.pf-attempt1-label'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '+=0.15');

    // Step 1 arrow — packet flies toward ROUTER2
    tl.fromTo(this.q('.pf-step1-arrow'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.05');

    // Block at ROUTER2
    tl.fromTo(this.q('.pf-block'),
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '+=0.1');

    // ICMP reply
    tl.fromTo(this.q('.pf-icmp'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.2');

    // Attempt 2 label
    tl.fromTo(this.q('.pf-attempt2-label'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '+=0.2');

    // Step 2 arrow — packet goes all the way
    tl.fromTo(this.q('.pf-step2-arrow'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, '+=0.05');

    // Result banner
    tl.fromTo(this.q('.pf-result'),
      { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.2');
  }
}
