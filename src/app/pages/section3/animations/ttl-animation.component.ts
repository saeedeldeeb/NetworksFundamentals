import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-ttl-animation',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ttl-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .ttl-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="ttl-anim">
      <svg viewBox="0 0 640 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ttl-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ttl-glow-purple">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ttl-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Sender -->
        <g class="ttl-src" opacity="0">
          <rect x="20" y="60" width="70" height="55" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="55" y="85" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="55" y="102" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">TTL=64</text>
        </g>

        <!-- Router 1 -->
        <g class="ttl-r1" opacity="0">
          <rect x="155" y="65" width="60" height="45" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="185" y="92" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R1</text>
        </g>
        <rect class="ttl-r1-glow" x="155" y="65" width="60" height="45" rx="8"
              fill="none" stroke="#a855f7" stroke-width="2.5" opacity="0" filter="url(#ttl-glow-purple)" />

        <!-- Router 2 -->
        <g class="ttl-r2" opacity="0">
          <rect x="280" y="65" width="60" height="45" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="310" y="92" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R2</text>
        </g>
        <rect class="ttl-r2-glow" x="280" y="65" width="60" height="45" rx="8"
              fill="none" stroke="#a855f7" stroke-width="2.5" opacity="0" filter="url(#ttl-glow-purple)" />

        <!-- Router 3 -->
        <g class="ttl-r3" opacity="0">
          <rect x="405" y="65" width="60" height="45" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="435" y="92" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R3</text>
        </g>
        <rect class="ttl-r3-glow" x="405" y="65" width="60" height="45" rx="8"
              fill="none" stroke="#a855f7" stroke-width="2.5" opacity="0" filter="url(#ttl-glow-purple)" />

        <!-- Destination -->
        <g class="ttl-dst" opacity="0">
          <rect x="530" y="60" width="90" height="55" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="575" y="85" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Destination</text>
          <text x="575" y="102" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">Received!</text>
        </g>
        <rect class="ttl-dst-glow" x="530" y="60" width="90" height="55" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#ttl-glow-green)" />

        <!-- Connection lines -->
        <line class="ttl-line1" x1="90" y1="87" x2="155" y2="87"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="ttl-line2" x1="215" y1="87" x2="280" y2="87"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="ttl-line3" x1="340" y1="87" x2="405" y2="87"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="ttl-line4" x1="465" y1="87" x2="530" y2="87"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packet dot -->
        <circle class="ttl-pkt" r="8" fill="#f59e0b" opacity="0" />

        <!-- TTL counter label -->
        <g class="ttl-counter" opacity="0">
          <rect x="-28" y="-36" width="56" height="22" rx="6"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text class="ttl-counter-text" x="0" y="-21" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">TTL=64</text>
        </g>

        <!-- Decrement labels that flash at each router -->
        <text class="ttl-dec1" x="185" y="130" text-anchor="middle" fill="#f59e0b"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">-1</text>
        <text class="ttl-dec2" x="310" y="130" text-anchor="middle" fill="#f59e0b"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">-1</text>
        <text class="ttl-dec3" x="435" y="130" text-anchor="middle" fill="#f59e0b"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">-1</text>

        <!-- Title -->
        <text x="320" y="180" text-anchor="middle" fill="#64748b"
              font-size="11" font-family="Inter, sans-serif">
          Each router decrements TTL by 1. If TTL reaches 0, packet is dropped.
        </text>
      </svg>
    </div>
  `,
})
export class TtlAnimationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ttl-anim');
    const tl = this.createScrollTimeline(container);

    // Appear: nodes and lines
    const nodes = [
      this.q('.ttl-src'), this.q('.ttl-r1'), this.q('.ttl-r2'),
      this.q('.ttl-r3'), this.q('.ttl-dst'),
    ];
    const lines = [
      this.q('.ttl-line1'), this.q('.ttl-line2'),
      this.q('.ttl-line3'), this.q('.ttl-line4'),
    ];

    nodes.forEach((n, i) => {
      tl.to(n, { opacity: 1, duration: 0.3 }, i * 0.1);
    });
    lines.forEach((l, i) => {
      const el = l as unknown as SVGLineElement;
      const len = Math.abs(parseFloat(el.getAttribute('x2')!) - parseFloat(el.getAttribute('x1')!));
      tl.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, { opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' }, i * 0.1 + 0.15);
    });

    tl.add(() => { this.startTtlLoop(); });
  }

  private startTtlLoop(): void {
    const container = this.q('.ttl-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt = this.q('.ttl-pkt');
    const counter = this.q('.ttl-counter');
    const counterText = this.q('.ttl-counter-text');
    const r1Glow = this.q('.ttl-r1-glow');
    const r2Glow = this.q('.ttl-r2-glow');
    const r3Glow = this.q('.ttl-r3-glow');
    const dstGlow = this.q('.ttl-dst-glow');
    const dec1 = this.q('.ttl-dec1');
    const dec2 = this.q('.ttl-dec2');
    const dec3 = this.q('.ttl-dec3');

    const stops = [
      { x: 90, label: 'TTL=64' },
      { x: 185, label: 'TTL=63' },
      { x: 310, label: 'TTL=62' },
      { x: 435, label: 'TTL=61' },
      { x: 530, label: 'TTL=61' },
    ];

    const glows = [null, r1Glow, r2Glow, r3Glow, dstGlow];
    const decs = [null, dec1, dec2, dec3, null];

    // Packet appears at sender
    loop.set(counterText, { textContent: 'TTL=64' });
    loop.fromTo(pkt,
      { attr: { cx: 55, cy: 87 }, opacity: 0 },
      { opacity: 1, duration: 0.15 },
      0,
    );
    loop.fromTo(counter,
      { x: 55, y: 87, opacity: 0 },
      { opacity: 1, duration: 0.15 },
      0,
    );

    let t = 0.3;
    for (let i = 0; i < stops.length; i++) {
      const s = stops[i];
      // Move packet
      loop.to(pkt, { attr: { cx: s.x, cy: 87 }, duration: 0.5, ease: 'power2.inOut' }, t);
      loop.to(counter, { x: s.x, y: 87, duration: 0.5, ease: 'power2.inOut' }, t);

      // At router: glow + decrement
      if (glows[i]) {
        loop.to(glows[i]!, { opacity: 0.8, duration: 0.15 }, t + 0.5);
        loop.to(glows[i]!, { opacity: 0, duration: 0.3 }, t + 0.7);
      }
      if (decs[i]) {
        loop.fromTo(decs[i]!,
          { opacity: 0, y: 120 },
          { opacity: 1, y: 130, duration: 0.2 },
          t + 0.5,
        );
        loop.to(decs[i]!, { opacity: 0, duration: 0.3 }, t + 0.8);
      }
      if (i < stops.length - 1) {
        loop.set(counterText, { textContent: s.label }, t + 0.55);
      }
      t += 0.9;
    }

    // Destination glow
    loop.to(dstGlow, { opacity: 0.8, duration: 0.2 }, t - 0.4);
    loop.to(dstGlow, { opacity: 0, duration: 0.5 }, t);

    // Fade out
    loop.to([pkt, counter], { opacity: 0, duration: 0.2 }, t + 0.3);
    loop.to({}, { duration: 1.0 });

    loop.play();
  }
}
