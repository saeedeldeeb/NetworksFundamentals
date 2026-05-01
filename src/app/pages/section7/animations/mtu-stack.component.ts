import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-mtu-stack',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ms-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem 1.75rem 1.25rem;
      overflow: hidden;
    }
    .ms-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="ms-wrap">
      <svg viewBox="0 0 680 204" preserveAspectRatio="xMidYMid meet">

        <!-- ===== FRAME LABEL ===== -->
        <text class="ms-frame-label" x="340" y="16" text-anchor="middle"
              fill="#64748b" font-size="8" font-weight="700"
              font-family="Inter, sans-serif" letter-spacing="0.08em" opacity="0">
          ETHERNET FRAME — 1518 BYTES TOTAL
        </text>

        <!-- ===== ETHERNET HEADER ===== -->
        <g class="ms-eth" opacity="0">
          <rect x="18" y="24" width="52" height="60" rx="4"
                fill="rgba(71,85,105,0.25)" stroke="#475569" stroke-width="1.5"/>
          <text x="44" y="46" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Eth</text>
          <text x="44" y="58" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Hdr</text>
          <text x="44" y="75" text-anchor="middle" fill="#64748b" font-size="7.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">14B</text>
        </g>

        <!-- ===== IP HEADER ===== -->
        <g class="ms-ip" opacity="0">
          <rect x="70" y="24" width="64" height="60" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="102" y="46" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">IP</text>
          <text x="102" y="57" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Header</text>
          <text x="102" y="75" text-anchor="middle" fill="#a78bfa" font-size="7.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">20B</text>
        </g>

        <!-- ===== TCP HEADER ===== -->
        <g class="ms-tcp-hdr" opacity="0">
          <rect x="134" y="24" width="64" height="60" rx="4"
                fill="rgba(34,211,238,0.14)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="166" y="46" text-anchor="middle" fill="#67e8f9" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">TCP</text>
          <text x="166" y="57" text-anchor="middle" fill="#67e8f9" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">Header</text>
          <text x="166" y="75" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">20B</text>
        </g>

        <!-- ===== TCP PAYLOAD (MSS) ===== -->
        <g class="ms-payload" opacity="0">
          <rect x="198" y="24" width="428" height="60" rx="4"
                fill="rgba(16,185,129,0.14)" stroke="#10b981" stroke-width="1.5"/>
          <text x="412" y="47" text-anchor="middle" fill="#6ee7b7" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">TCP Payload — Application Data</text>
          <text x="412" y="63" text-anchor="middle" fill="#10b981" font-size="9.5"
                font-weight="800" font-family="'JetBrains Mono', monospace">1460 bytes</text>
          <text x="412" y="76" text-anchor="middle" fill="#064e3b" font-size="7"
                font-family="Inter, sans-serif">(Maximum Segment Size — MSS)</text>
        </g>

        <!-- ===== FCS TRAILER ===== -->
        <g class="ms-fcs" opacity="0">
          <rect x="626" y="24" width="36" height="60" rx="4"
                fill="rgba(71,85,105,0.25)" stroke="#475569" stroke-width="1.5"/>
          <text x="644" y="48" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">FCS</text>
          <text x="644" y="75" text-anchor="middle" fill="#64748b" font-size="7.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">4B</text>
        </g>

        <!-- ===== MTU BRACKET (IP packet = 1500B) ===== -->
        <g class="ms-mtu-br" opacity="0">
          <!-- left tick -->
          <line x1="70" y1="90" x2="70" y2="100" stroke="#a78bfa" stroke-width="1.5"/>
          <!-- horizontal line -->
          <line x1="70" y1="95" x2="626" y2="95" stroke="#a78bfa" stroke-width="1.5"/>
          <!-- right tick -->
          <line x1="626" y1="90" x2="626" y2="100" stroke="#a78bfa" stroke-width="1.5"/>
          <!-- label -->
          <rect x="275" y="100" width="210" height="14" rx="3" fill="rgba(167,139,250,0.1)"/>
          <text x="380" y="111" text-anchor="middle" fill="#a78bfa" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">
            ◄──── MTU = 1500 bytes (IP packet) ────►
          </text>
        </g>

        <!-- ===== MSS BRACKET (TCP payload = 1460B) ===== -->
        <g class="ms-mss-br" opacity="0">
          <!-- left tick -->
          <line x1="198" y1="118" x2="198" y2="128" stroke="#10b981" stroke-width="1.5"/>
          <!-- horizontal line -->
          <line x1="198" y1="123" x2="626" y2="123" stroke="#10b981" stroke-width="1.5"/>
          <!-- right tick -->
          <line x1="626" y1="118" x2="626" y2="128" stroke="#10b981" stroke-width="1.5"/>
          <!-- label -->
          <rect x="276" y="128" width="210" height="14" rx="3" fill="rgba(16,185,129,0.1)"/>
          <text x="381" y="139" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">
            ◄────── MSS = 1460 bytes (TCP payload) ──────►
          </text>
        </g>

        <!-- ===== FORMULA ===== -->
        <g class="ms-formula" opacity="0">
          <rect x="18" y="152" width="644" height="22" rx="6"
                fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.15)" stroke-width="1"/>
          <text x="340" y="167" text-anchor="middle" fill="#475569" font-size="8"
                font-family="'JetBrains Mono', monospace">
            MSS = MTU (1500) − IP Header (20) − TCP Header (20) =
            <tspan fill="#10b981" font-weight="700"> 1460 bytes</tspan>
          </text>
        </g>

        <!-- ===== PERFORMANCE NOTE ===== -->
        <g class="ms-perf" opacity="0">
          <rect x="18" y="180" width="644" height="20" rx="6"
                fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.25)" stroke-width="1"/>
          <text x="340" y="194" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">
            Data ≤ 1460 bytes → fits in ONE segment → minimum latency, minimum overhead
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class MtuStackComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ms-wrap');
    const tl = this.createScrollTimeline(container);

    // Frame label
    tl.fromTo(this.q('.ms-frame-label'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Ethernet header
    tl.fromTo(this.q('.ms-eth'),
      { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, '+=0.05');

    // IP header
    tl.fromTo(this.q('.ms-ip'),
      { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.1');

    // TCP header
    tl.fromTo(this.q('.ms-tcp-hdr'),
      { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.1');

    // Payload — the star of the show
    tl.fromTo(this.q('.ms-payload'),
      { opacity: 0, scaleX: 0.92 }, { opacity: 1, scaleX: 1, duration: 0.45, ease: 'back.out(1.4)', transformOrigin: 'left center' }, '-=0.1');

    // FCS trailer
    tl.fromTo(this.q('.ms-fcs'),
      { opacity: 0, x: 8 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, '-=0.15');

    // MTU bracket
    tl.fromTo(this.q('.ms-mtu-br'),
      { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.15');

    // MSS bracket
    tl.fromTo(this.q('.ms-mss-br'),
      { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');

    // Formula
    tl.fromTo(this.q('.ms-formula'),
      { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');

    // Performance note
    tl.fromTo(this.q('.ms-perf'),
      { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.05');
  }
}
