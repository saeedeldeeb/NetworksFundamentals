import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-rpc-timeline',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .rpc-tl {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem 1.5rem 1rem;
      overflow: hidden;
    }
    .rpc-tl svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="rpc-tl">
      <svg viewBox="0 0 800 150" preserveAspectRatio="xMidYMid meet">
        <!-- Main timeline line -->
        <path class="rpc-line" d="M 60,80 L 740,80"
              stroke="#374151" stroke-width="2" fill="none" />

        <!-- Glowing active line (draws progressively) -->
        <path class="rpc-line-glow" d="M 60,80 L 740,80"
              stroke="#6366f1" stroke-width="2" fill="none" opacity="0.6" />

        <!-- Node 0: Raw TCP -->
        <g class="rpc-node" opacity="0">
          <circle cx="100" cy="80" r="12" fill="#1f2937" stroke="#ef4444" stroke-width="2" />
          <text x="100" y="84" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">TCP</text>
        </g>
        <text class="rpc-label" x="100" y="55" text-anchor="middle" fill="#f1f5f9"
              font-size="11" font-weight="600" font-family="Inter, sans-serif" opacity="0">Raw TCP</text>
        <text class="rpc-year" x="100" y="112" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="'JetBrains Mono', monospace" opacity="0">1960s</text>

        <!-- Node 1: XML-RPC -->
        <g class="rpc-node" opacity="0">
          <circle cx="310" cy="80" r="12" fill="#1f2937" stroke="#f59e0b" stroke-width="2" />
          <text x="310" y="84" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">XML</text>
        </g>
        <text class="rpc-label" x="310" y="55" text-anchor="middle" fill="#f1f5f9"
              font-size="11" font-weight="600" font-family="Inter, sans-serif" opacity="0">XML-RPC</text>
        <text class="rpc-year" x="310" y="112" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="'JetBrains Mono', monospace" opacity="0">1998</text>

        <!-- Node 2: REST -->
        <g class="rpc-node" opacity="0">
          <circle cx="500" cy="80" r="12" fill="#1f2937" stroke="#22d3ee" stroke-width="2" />
          <text x="500" y="84" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">REST</text>
        </g>
        <text class="rpc-label" x="500" y="55" text-anchor="middle" fill="#f1f5f9"
              font-size="11" font-weight="600" font-family="Inter, sans-serif" opacity="0">REST API</text>
        <text class="rpc-year" x="500" y="112" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="'JetBrains Mono', monospace" opacity="0">2000</text>

        <!-- Node 3: gRPC -->
        <g class="rpc-node" opacity="0">
          <circle cx="700" cy="80" r="14" fill="#1f2937" stroke="#6366f1" stroke-width="2.5" />
          <text x="700" y="84" text-anchor="middle" fill="#6366f1"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">gRPC</text>
        </g>
        <text class="rpc-label" x="700" y="55" text-anchor="middle" fill="#f1f5f9"
              font-size="11" font-weight="600" font-family="Inter, sans-serif" opacity="0">gRPC</text>
        <text class="rpc-year" x="700" y="112" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="'JetBrains Mono', monospace" opacity="0">2015</text>

        <!-- Final glow ring on gRPC -->
        <circle class="rpc-final-glow" cx="700" cy="80" r="14" fill="none"
                stroke="#6366f1" stroke-width="1" opacity="0" />
      </svg>
    </div>
  `,
})
export class RpcTimelineComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.rpc-tl');
    const tl = this.createScrollTimeline(container);

    const glowLine = this.q('.rpc-line-glow') as unknown as SVGPathElement;
    const lineLength = glowLine.getTotalLength();
    gsap.set(glowLine, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

    const nodes = this.qa('.rpc-node');
    const labels = this.qa('.rpc-label');
    const years = this.qa('.rpc-year');
    const finalGlow = this.q('.rpc-final-glow');

    // Node positions along the 680px line (from 60 to 740)
    // Node 0 at 100: (100-60)/680 = 0.059
    // Node 1 at 310: (310-60)/680 = 0.368
    // Node 2 at 500: (500-60)/680 = 0.647
    // Node 3 at 700: (700-60)/680 = 0.941
    const positions = [0.059, 0.368, 0.647, 0.941];
    const totalLineDuration = 2.5;

    // Draw line progressively, pop nodes as line reaches them
    tl.to(glowLine, {
      strokeDashoffset: 0, duration: totalLineDuration, ease: 'power1.inOut',
    });

    positions.forEach((pos, i) => {
      const t = pos * totalLineDuration;

      tl.to(nodes[i], {
        opacity: 1, duration: 0.3, ease: 'back.out(2)',
      }, t);
      tl.from(nodes[i], {
        scale: 0, transformOrigin: 'center',
        duration: 0.4, ease: 'back.out(2)',
      }, t);

      tl.to(labels[i], {
        opacity: 1, duration: 0.3,
      }, t + 0.1);
      tl.from(labels[i], { y: -8, duration: 0.3 }, t + 0.1);

      tl.to(years[i], {
        opacity: 1, duration: 0.3,
      }, t + 0.15);
      tl.from(years[i], { y: 8, duration: 0.3 }, t + 0.15);
    });

    // Final glow pulse on gRPC
    tl.to(finalGlow, {
      opacity: 0.8, attr: { r: 22 }, duration: 0.4, ease: 'power2.out',
    }, totalLineDuration + 0.2);
    tl.to(finalGlow, {
      opacity: 0, attr: { r: 30 }, duration: 0.6, ease: 'power2.out',
    });
    tl.to(finalGlow, {
      opacity: 0.5, attr: { r: 22 }, duration: 0.4, ease: 'power2.out',
    });
    tl.to(finalGlow, {
      opacity: 0, attr: { r: 30 }, duration: 0.8, ease: 'power2.out',
    });
  }
}
