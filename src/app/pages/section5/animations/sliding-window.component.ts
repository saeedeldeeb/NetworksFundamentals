import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-sliding-window',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .slide-win {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .slide-win svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="slide-win">
      <svg viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">The Sliding Window</text>

        <!-- Segment boxes (1-10) -->
        @for (i of segments; track i) {
          <g class="sw-seg sw-seg-{{ i }}" opacity="0">
            <rect [attr.x]="60 + (i - 1) * 58" y="60" width="52" height="44" rx="8"
                  fill="#1f2937" stroke="#374151" stroke-width="1.5" />
            <text [attr.x]="86 + (i - 1) * 58" y="87" text-anchor="middle" fill="#94a3b8"
                  font-size="13" font-weight="700" font-family="'JetBrains Mono', monospace">{{ i }}</text>
          </g>
        }

        <!-- Window bracket (will slide) -->
        <g class="sw-bracket" opacity="0">
          <rect class="sw-win-rect" x="60" y="55" width="174" height="54" rx="10"
                fill="none" stroke="#22d3ee" stroke-width="2.5" />
          <text class="sw-win-label" x="147" y="128" text-anchor="middle" fill="#22d3ee"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Window (size=3)</text>
        </g>

        <!-- State labels -->
        <g class="sw-state" opacity="0">
          <text class="sw-acked-label" x="60" y="148" fill="#10b981"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace" opacity="0">Acked</text>
          <text class="sw-can-label" x="147" y="148" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Can send</text>
          <text class="sw-wait-label" x="240" y="148" fill="#64748b"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Cannot send yet</text>
        </g>

        <!-- Status messages -->
        <g class="sw-status" opacity="0">
          <rect class="sw-status-bg" x="170" y="170" width="360" height="30" rx="8"
                fill="#0f172a" stroke="#374151" stroke-width="1" />
          <text class="sw-status-text" x="350" y="190" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="'JetBrains Mono', monospace">
            Initial: segments 1, 2, 3 can be sent
          </text>
        </g>

        <!-- Key points -->
        <g class="sw-keys" opacity="0">
          <text x="100" y="230" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            &#8226; Window slides right as ACKs arrive
          </text>
          <text x="100" y="248" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            &#8226; Acked data can be discarded from buffer
          </text>
          <text x="100" y="266" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            &#8226; New data enters the window as it moves forward
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class SlidingWindowComponent extends GsapAnimationBase {
  segments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected initAnimation(): void {
    const container = this.q('.slide-win');
    const tl = this.createScrollTimeline(container);

    // Show segments
    const segs = this.qa('.sw-seg');
    segs.forEach((seg, i) => {
      tl.fromTo(
        seg,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
        i === 0 ? undefined : '-=0.08',
      );
    });

    // Show window bracket
    tl.to(this.q('.sw-bracket'), { opacity: 1, duration: 0.3 });
    tl.to(this.q('.sw-state'), { opacity: 1, duration: 0.3 }, '-=0.15');
    tl.to(this.q('.sw-status'), { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.to(this.q('.sw-keys'), { opacity: 1, duration: 0.3 });

    // Start sliding loop
    tl.add(() => this.startSlideLoop());
  }

  private startSlideLoop(): void {
    const container = this.q('.slide-win');
    const loop = this.createLoopingTimeline(container);

    const winRect = this.q('.sw-win-rect');
    const winLabel = this.q('.sw-win-label');
    const ackedLabel = this.q('.sw-acked-label');
    const canLabel = this.q('.sw-can-label');
    const waitLabel = this.q('.sw-wait-label');
    const statusText = this.q('.sw-status-text');

    const segW = 58; // width per segment slot

    // Color segments inside window as cyan, acked as green
    const segs = this.qa('.sw-seg rect');
    const segTexts = this.qa('.sw-seg text');

    // Helper to set segment colors
    const colorSeg = (idx: number, color: string, textColor: string) => {
      if (segs[idx]) {
        loop.to(segs[idx], { attr: { stroke: color }, duration: 0.15 }, '<');
        loop.to(segTexts[idx], { attr: { fill: textColor }, duration: 0.15 }, '<');
      }
    };

    // Initial state: window at [1,2,3]
    // Highlight window segments
    loop.to(segs[0], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, 0);
    loop.to(segs[1], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, 0);
    loop.to(segs[2], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, 0);
    loop.to(segTexts[0], { attr: { fill: '#22d3ee' }, duration: 0.2 }, 0);
    loop.to(segTexts[1], { attr: { fill: '#22d3ee' }, duration: 0.2 }, 0);
    loop.to(segTexts[2], { attr: { fill: '#22d3ee' }, duration: 0.2 }, 0);

    // Hold initial
    loop.to({}, { duration: 1.0 });

    // === ACK 2 received: slide window to [3,4,5] ===
    // Mark 1,2 as acked (green)
    loop.to(segs[0], { attr: { stroke: '#10b981', fill: 'rgba(16,185,129,0.08)' }, duration: 0.2 });
    loop.to(segTexts[0], { attr: { fill: '#10b981' }, duration: 0.2 }, '<');
    loop.to(segs[1], { attr: { stroke: '#10b981', fill: 'rgba(16,185,129,0.08)' }, duration: 0.2 }, '<');
    loop.to(segTexts[1], { attr: { fill: '#10b981' }, duration: 0.2 }, '<');

    // Slide window right by 2
    loop.to(winRect, { attr: { x: 60 + 2 * segW }, duration: 0.5, ease: 'power2.inOut' });
    loop.to(winLabel, { attr: { x: 147 + 2 * segW }, duration: 0.5, ease: 'power2.inOut' }, '<');
    loop.to(canLabel, { attr: { x: 147 + 2 * segW }, duration: 0.5, ease: 'power2.inOut' }, '<');
    loop.to(waitLabel, { x: 2 * segW, duration: 0.5, ease: 'power2.inOut' }, '<');

    // Show acked label
    loop.to(ackedLabel, { opacity: 1, duration: 0.2 }, '<');

    // New window segments cyan [3,4,5]
    loop.to(segs[3], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, '-=0.3');
    loop.to(segTexts[3], { attr: { fill: '#22d3ee' }, duration: 0.2 }, '<');
    loop.to(segs[4], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, '<');
    loop.to(segTexts[4], { attr: { fill: '#22d3ee' }, duration: 0.2 }, '<');

    // Update status text
    loop.add(() => {
      statusText.textContent = 'ACK 2 received → window slides to segments 3, 4, 5';
    });

    // Hold
    loop.to({}, { duration: 1.2 });

    // === ACK 4 received: slide window to [5,6,7] ===
    loop.to(segs[2], { attr: { stroke: '#10b981', fill: 'rgba(16,185,129,0.08)' }, duration: 0.2 });
    loop.to(segTexts[2], { attr: { fill: '#10b981' }, duration: 0.2 }, '<');
    loop.to(segs[3], { attr: { stroke: '#10b981', fill: 'rgba(16,185,129,0.08)' }, duration: 0.2 }, '<');
    loop.to(segTexts[3], { attr: { fill: '#10b981' }, duration: 0.2 }, '<');

    loop.to(winRect, { attr: { x: 60 + 4 * segW }, duration: 0.5, ease: 'power2.inOut' });
    loop.to(winLabel, { attr: { x: 147 + 4 * segW }, duration: 0.5, ease: 'power2.inOut' }, '<');
    loop.to(canLabel, { attr: { x: 147 + 4 * segW }, duration: 0.5, ease: 'power2.inOut' }, '<');
    loop.to(waitLabel, { x: 4 * segW, duration: 0.5, ease: 'power2.inOut' }, '<');

    loop.to(segs[5], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, '-=0.3');
    loop.to(segTexts[5], { attr: { fill: '#22d3ee' }, duration: 0.2 }, '<');
    loop.to(segs[6], { attr: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.08)' }, duration: 0.2 }, '<');
    loop.to(segTexts[6], { attr: { fill: '#22d3ee' }, duration: 0.2 }, '<');

    loop.add(() => {
      statusText.textContent = 'ACK 4 received → window slides to segments 5, 6, 7';
    });

    // Hold
    loop.to({}, { duration: 1.5 });

    // Reset everything for loop
    // Reset segment colors
    const allSegs = this.qa('.sw-seg rect');
    const allTexts = this.qa('.sw-seg text');
    loop.to(allSegs, { attr: { stroke: '#374151', fill: '#1f2937' }, duration: 0.3 });
    loop.to(allTexts, { attr: { fill: '#94a3b8' }, duration: 0.3 }, '<');
    // Reset window position
    loop.to(winRect, { attr: { x: 60 }, duration: 0.3 }, '<');
    loop.to(winLabel, { attr: { x: 147 }, duration: 0.3 }, '<');
    loop.to(canLabel, { attr: { x: 147 }, duration: 0.3 }, '<');
    loop.to(waitLabel, { x: 0, duration: 0.3 }, '<');
    loop.to(ackedLabel, { opacity: 0, duration: 0.2 }, '<');
    loop.add(() => {
      statusText.textContent = 'Initial: segments 1, 2, 3 can be sent';
    });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
