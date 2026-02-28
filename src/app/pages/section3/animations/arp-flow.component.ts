import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-arp-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .arp-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .arp-anim svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="arp-anim">
      <svg viewBox="0 0 640 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="arp-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="arp-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="25" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          ARP: Resolving IP to MAC Address
        </text>

        <!-- Host A (sender) -->
        <g class="arp-host-a" opacity="0">
          <rect x="250" y="45" width="140" height="60" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="320" y="72" text-anchor="middle" fill="#22d3ee"
                font-size="13" font-weight="700" font-family="Inter, sans-serif">Host A (10.0.0.2)</text>
          <text x="320" y="92" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">Needs B's MAC</text>
        </g>

        <!-- Connection lines from A to all hosts -->
        <line class="arp-ln-b" x1="320" y1="105" x2="100" y2="200" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="arp-ln-c" x1="320" y1="105" x2="320" y2="200" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="arp-ln-d" x1="320" y1="105" x2="540" y2="200" stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Host B (target - will reply) -->
        <g class="arp-host-b" opacity="0">
          <rect x="35" y="200" width="130" height="60" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="100" y="227" text-anchor="middle" fill="#10b981"
                font-size="13" font-weight="700" font-family="Inter, sans-serif">Host B (10.0.0.5)</text>
          <text class="arp-b-mac" x="100" y="247" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">DD:DD:DD:DD:DD:DD</text>
        </g>
        <rect class="arp-b-glow" x="35" y="200" width="130" height="60" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#arp-glow-green)" />

        <!-- Host C (ignores) -->
        <g class="arp-host-c" opacity="0">
          <rect x="255" y="200" width="130" height="60" rx="10" fill="#1f2937"
                stroke="#4b5563" stroke-width="1.5" />
          <text x="320" y="227" text-anchor="middle" fill="#94a3b8"
                font-size="13" font-weight="600" font-family="Inter, sans-serif">Host C (10.0.0.6)</text>
          <text x="320" y="247" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">Not me</text>
        </g>

        <!-- Host D (ignores) -->
        <g class="arp-host-d" opacity="0">
          <rect x="475" y="200" width="130" height="60" rx="10" fill="#1f2937"
                stroke="#4b5563" stroke-width="1.5" />
          <text x="540" y="227" text-anchor="middle" fill="#94a3b8"
                font-size="13" font-weight="600" font-family="Inter, sans-serif">Host D (10.0.0.7)</text>
          <text x="540" y="247" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">Not me</text>
        </g>

        <!-- Broadcast wave rings from A -->
        <circle class="arp-wave1" cx="320" cy="105" r="20" fill="none"
                stroke="#f59e0b" stroke-width="2" opacity="0" />
        <circle class="arp-wave2" cx="320" cy="105" r="20" fill="none"
                stroke="#f59e0b" stroke-width="1.5" opacity="0" />

        <!-- Broadcast packets -->
        <circle class="arp-bcast-b" r="5" fill="#f59e0b" opacity="0" />
        <circle class="arp-bcast-c" r="5" fill="#f59e0b" opacity="0" />
        <circle class="arp-bcast-d" r="5" fill="#f59e0b" opacity="0" />

        <!-- Broadcast label -->
        <g class="arp-bcast-label" opacity="0">
          <rect x="160" y="128" width="320" height="22" rx="5"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="320" y="143" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            "Who has 10.0.0.5? Tell 10.0.0.2"
          </text>
        </g>

        <!-- Ignore labels -->
        <text class="arp-ignore-c" x="320" y="278" text-anchor="middle" fill="#ef4444"
              font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">IGNORES</text>
        <text class="arp-ignore-d" x="540" y="278" text-anchor="middle" fill="#ef4444"
              font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">IGNORES</text>

        <!-- Reply packet from B -->
        <circle class="arp-reply-pkt" r="5" fill="#10b981" opacity="0" />
        <g class="arp-reply-label" opacity="0">
          <rect x="40" y="168" width="280" height="22" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="180" y="183" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            "10.0.0.5 is at DD:DD:DD:DD:DD:DD"
          </text>
        </g>

        <!-- ARP table update -->
        <g class="arp-table" opacity="0">
          <rect x="170" y="310" width="300" height="55" rx="10"
                fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.3)" stroke-width="1" />
          <text x="320" y="332" text-anchor="middle" fill="#10b981"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">ARP Table Updated</text>
          <text x="320" y="352" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="'JetBrains Mono', monospace">
            10.0.0.5 &#8594; DD:DD:DD:DD:DD:DD
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class ArpFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.arp-anim');
    const tl = this.createScrollTimeline(container);

    const nodes = ['.arp-host-a', '.arp-host-b', '.arp-host-c', '.arp-host-d'];
    const lines = ['.arp-ln-b', '.arp-ln-c', '.arp-ln-d'];

    nodes.forEach((s, i) => tl.to(this.q(s), { opacity: 1, duration: 0.3 }, i * 0.08));
    lines.forEach((s, i) => {
      const el = this.q(s) as unknown as SVGLineElement;
      const x1 = parseFloat(el.getAttribute('x1')!);
      const y1 = parseFloat(el.getAttribute('y1')!);
      const x2 = parseFloat(el.getAttribute('x2')!);
      const y2 = parseFloat(el.getAttribute('y2')!);
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      tl.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, { opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' }, i * 0.08 + 0.1);
    });

    tl.add(() => { this.startArpLoop(); });
  }

  private startArpLoop(): void {
    const container = this.q('.arp-anim');
    const loop = this.createLoopingTimeline(container);

    const waves = [this.q('.arp-wave1'), this.q('.arp-wave2')];
    const bcastB = this.q('.arp-bcast-b');
    const bcastC = this.q('.arp-bcast-c');
    const bcastD = this.q('.arp-bcast-d');
    const bcastLabel = this.q('.arp-bcast-label');
    const ignoreC = this.q('.arp-ignore-c');
    const ignoreD = this.q('.arp-ignore-d');
    const bGlow = this.q('.arp-b-glow');
    const replyPkt = this.q('.arp-reply-pkt');
    const replyLabel = this.q('.arp-reply-label');
    const table = this.q('.arp-table');

    const aX = 320, aY = 105;
    const targets = [{ x: 100, y: 200 }, { x: 320, y: 200 }, { x: 540, y: 200 }];
    const bcasts = [bcastB, bcastC, bcastD];

    // Broadcast waves
    waves.forEach((w, i) => {
      loop.fromTo(w,
        { attr: { r: 20 }, opacity: 0.6 },
        { attr: { r: 150 }, opacity: 0, duration: 0.9, ease: 'power1.out' },
        i * 0.2,
      );
    });

    // Broadcast label
    loop.fromTo(bcastLabel, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1);

    // Packets fly to all hosts
    bcasts.forEach((pkt, i) => {
      loop.fromTo(pkt,
        { attr: { cx: aX, cy: aY }, opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.3,
      );
      loop.to(pkt,
        { attr: { cx: targets[i].x, cy: targets[i].y }, duration: 0.6, ease: 'power2.out' },
        0.4,
      );
      loop.to(pkt, { opacity: 0, duration: 0.1 }, 1.0);
    });

    loop.to(bcastLabel, { opacity: 0, duration: 0.2 }, 1.0);

    // C and D ignore
    loop.fromTo(ignoreC, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);
    loop.fromTo(ignoreD, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);
    loop.to([ignoreC, ignoreD], { opacity: 0, duration: 0.3 }, 1.8);

    // B glows and replies
    loop.to(bGlow, { opacity: 0.8, duration: 0.15 }, 1.1);

    // Reply label
    loop.fromTo(replyLabel, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.3);

    // Reply packet travels back
    loop.fromTo(replyPkt,
      { attr: { cx: 100, cy: 200 }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      1.5,
    );
    loop.to(replyPkt,
      { attr: { cx: aX, cy: aY }, duration: 0.6, ease: 'power2.inOut' },
      1.6,
    );
    loop.to(replyPkt, { opacity: 0, duration: 0.1 }, 2.2);
    loop.to(bGlow, { opacity: 0, duration: 0.3 }, 2.0);
    loop.to(replyLabel, { opacity: 0, duration: 0.2 }, 2.0);

    // ARP table updated
    loop.fromTo(table, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, 2.3);

    // Hold
    loop.to({}, { duration: 2.5 });

    // Fade
    loop.to(table, { opacity: 0, duration: 0.3 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
