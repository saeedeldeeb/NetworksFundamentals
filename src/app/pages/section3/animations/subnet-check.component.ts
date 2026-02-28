import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-subnet-check',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .subnet-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .subnet-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="subnet-anim">
      <svg viewBox="0 0 640 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sub-glow-green">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sub-glow-red">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="30" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          Subnet Mask: Bitwise AND Operation
        </text>

        <!-- ====== Example: SAME SUBNET ====== -->
        <!-- Source IP Row -->
        <g class="sub-src-row" opacity="0">
          <text x="40" y="80" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif">Source IP</text>
          <rect x="150" y="62" width="200" height="28" rx="6" fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.3)" stroke-width="1" />
          <text class="sub-src-ip" x="250" y="82" text-anchor="middle" fill="#22d3ee"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">192.168.1.3</text>
        </g>

        <!-- Dest IP Row -->
        <g class="sub-dst-row" opacity="0">
          <text x="40" y="120" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif">Dest IP</text>
          <rect x="150" y="102" width="200" height="28" rx="6" fill="rgba(99,102,241,0.08)"
                stroke="rgba(99,102,241,0.3)" stroke-width="1" />
          <text class="sub-dst-ip" x="250" y="122" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">192.168.1.2</text>
        </g>

        <!-- Mask Row -->
        <g class="sub-mask-row" opacity="0">
          <text x="40" y="160" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif">Subnet Mask</text>
          <rect x="150" y="142" width="200" height="28" rx="6" fill="rgba(168,85,247,0.08)"
                stroke="rgba(168,85,247,0.3)" stroke-width="1" />
          <text x="250" y="162" text-anchor="middle" fill="#a855f7"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">255.255.255.0</text>
        </g>

        <!-- AND divider -->
        <line class="sub-divider" x1="150" y1="185" x2="350" y2="185"
              stroke="#374151" stroke-width="2" opacity="0" />
        <text class="sub-and-label" x="130" y="189" fill="#f59e0b" font-size="12" font-weight="700"
              font-family="'JetBrains Mono', monospace" opacity="0">AND</text>

        <!-- Source AND result -->
        <g class="sub-src-result" opacity="0">
          <text x="40" y="220" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif">Source AND</text>
          <rect x="150" y="202" width="200" height="28" rx="6" fill="rgba(34,211,238,0.1)"
                stroke="rgba(34,211,238,0.4)" stroke-width="1.5" />
          <text class="sub-src-result-ip" x="250" y="222" text-anchor="middle" fill="#22d3ee"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">192.168.1.0</text>
        </g>

        <!-- Dest AND result -->
        <g class="sub-dst-result" opacity="0">
          <text x="40" y="260" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif">Dest AND</text>
          <rect class="sub-dst-result-box" x="150" y="242" width="200" height="28" rx="6" fill="rgba(99,102,241,0.1)"
                stroke="rgba(99,102,241,0.4)" stroke-width="1.5" />
          <text class="sub-dst-result-ip" x="250" y="262" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">192.168.1.0</text>
        </g>

        <!-- Comparison arrow -->
        <g class="sub-compare" opacity="0">
          <text x="370" y="222" fill="#64748b" font-size="20" font-family="Inter, sans-serif">&#125;</text>
          <line x1="382" y1="210" x2="382" y2="260" stroke="#64748b" stroke-width="1.5" />
        </g>

        <!-- Verdict box -->
        <g class="sub-verdict" opacity="0">
          <rect class="sub-verdict-box" x="400" y="218" width="210" height="40" rx="10"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2" />
          <text class="sub-verdict-text" x="505" y="244" text-anchor="middle" fill="#10b981"
                font-size="14" font-weight="700" font-family="'JetBrains Mono', monospace">MATCH → Direct</text>
        </g>

        <!-- Action box -->
        <g class="sub-action" opacity="0">
          <rect class="sub-action-box" x="150" y="310" width="340" height="40" rx="10"
                fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
          <text class="sub-action-text" x="320" y="336" text-anchor="middle" fill="#94a3b8"
                font-size="12" font-family="Inter, sans-serif">
            <tspan class="sub-action-content" font-weight="600">Send directly using MAC address (Layer 2)</tspan>
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class SubnetCheckComponent extends GsapAnimationBase {
  private phase = 0; // 0 = same subnet, 1 = different subnet

  protected initAnimation(): void {
    const container = this.q('.subnet-anim');
    const tl = this.createScrollTimeline(container);

    // Initial appearance
    const srcRow = this.q('.sub-src-row');
    const dstRow = this.q('.sub-dst-row');
    const maskRow = this.q('.sub-mask-row');

    tl.fromTo(srcRow, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
    tl.fromTo(dstRow, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    tl.fromTo(maskRow, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

    tl.add(() => { this.startCheckLoop(); });
  }

  private startCheckLoop(): void {
    const container = this.q('.subnet-anim');
    const loop = this.createLoopingTimeline(container);

    const divider = this.q('.sub-divider');
    const andLabel = this.q('.sub-and-label');
    const srcResult = this.q('.sub-src-result');
    const dstResult = this.q('.sub-dst-result');
    const compare = this.q('.sub-compare');
    const verdict = this.q('.sub-verdict');
    const action = this.q('.sub-action');
    const dstIp = this.q('.sub-dst-ip');
    const dstResultIp = this.q('.sub-dst-result-ip');
    const verdictBox = this.q('.sub-verdict-box');
    const verdictText = this.q('.sub-verdict-text');
    const actionBox = this.q('.sub-action-box');
    const actionContent = this.q('.sub-action-content');

    // ===  Same subnet demo ===
    // Set texts for same subnet
    loop.set(dstIp, { textContent: '192.168.1.2' });
    loop.set(dstResultIp, { textContent: '192.168.1.0' });
    loop.set(verdictText, { textContent: 'MATCH → Direct' });
    loop.set(actionContent, { textContent: 'Send directly using MAC address (Layer 2)' });

    // Style for match
    loop.set(verdictBox, { attr: { fill: 'rgba(16,185,129,0.1)', stroke: '#10b981' } });
    loop.set(verdictText, { fill: '#10b981' });
    loop.set(actionBox, { attr: { fill: 'rgba(16,185,129,0.06)', stroke: 'rgba(16,185,129,0.2)' } });

    // Divider draws in
    loop.fromTo(divider, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.2);
    loop.fromTo(andLabel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.3);

    // Results appear
    loop.fromTo(srcResult, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6);
    loop.fromTo(dstResult, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 }, 0.8);

    // Comparison
    loop.fromTo(compare, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.2);

    // Verdict
    loop.fromTo(verdict,
      { opacity: 0, scale: 0.8, svgOrigin: '505 238' },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
      1.4,
    );

    // Action
    loop.fromTo(action, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, 1.7);

    // Hold
    loop.to({}, { duration: 2.5 });

    // Fade out
    loop.to([divider, andLabel, srcResult, dstResult, compare, verdict, action],
      { opacity: 0, duration: 0.4 },
    );

    // ===  Different subnet demo ===
    loop.set(dstIp, { textContent: '192.168.2.2' });
    loop.set(dstResultIp, { textContent: '192.168.2.0' });
    loop.set(verdictText, { textContent: 'MISMATCH → Gateway' });
    loop.set(actionContent, { textContent: 'Send to default gateway (router)' });

    // Style for mismatch
    loop.set(verdictBox, { attr: { fill: 'rgba(239,68,68,0.1)', stroke: '#ef4444' } });
    loop.set(verdictText, { fill: '#ef4444' });
    loop.set(actionBox, { attr: { fill: 'rgba(239,68,68,0.06)', stroke: 'rgba(239,68,68,0.2)' } });

    // Replay
    loop.fromTo(divider, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    loop.fromTo(andLabel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.2');
    loop.fromTo(srcResult, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');
    loop.fromTo(dstResult, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    loop.fromTo(compare, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');
    loop.fromTo(verdict,
      { opacity: 0, scale: 0.8, svgOrigin: '505 238' },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
      '-=0.1',
    );
    loop.fromTo(action, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

    // Hold
    loop.to({}, { duration: 2.5 });

    // Fade out for loop restart
    loop.to([divider, andLabel, srcResult, dstResult, compare, verdict, action],
      { opacity: 0, duration: 0.4 },
    );

    // Reset dest IP for next loop
    loop.set(dstIp, { textContent: '192.168.1.2' });

    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
