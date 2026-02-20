import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-multi-client-scaling',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .multi-cs {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .multi-cs svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="multi-cs">
      <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="multi-pulse-grad">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
          </radialGradient>
          <!-- Connection paths from each client to server center (300, 210) -->
          <path id="multi-path-0" d="M 100,80 C 160,120 240,170 290,205" fill="none" />
          <path id="multi-path-1" d="M 500,80 C 440,120 360,170 310,205" fill="none" />
          <path id="multi-path-2" d="M 100,340 C 160,300 240,250 290,215" fill="none" />
          <path id="multi-path-3" d="M 500,340 C 440,300 360,250 310,215" fill="none" />
        </defs>

        <!-- Connection lines (solid, drawn in via GSAP) -->
        <path class="multi-conn" d="M 100,80 C 160,120 240,170 290,205"
              stroke="#374151" stroke-width="1.5" fill="none" />
        <path class="multi-conn" d="M 500,80 C 440,120 360,170 310,205"
              stroke="#374151" stroke-width="1.5" fill="none" />
        <path class="multi-conn" d="M 100,340 C 160,300 240,250 290,215"
              stroke="#374151" stroke-width="1.5" fill="none" />
        <path class="multi-conn" d="M 500,340 C 440,300 360,250 310,215"
              stroke="#374151" stroke-width="1.5" fill="none" />

        <!-- Server (center) -->
        <g class="multi-server" opacity="0">
          <circle class="multi-server-pulse" cx="300" cy="210" r="40"
                  fill="url(#multi-pulse-grad)" opacity="0" />
          <rect x="265" y="175" width="70" height="70" rx="8" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <!-- Server slots -->
          <rect x="275" y="185" width="50" height="12" rx="2" fill="#374151" />
          <circle cx="317" cy="191" r="3" fill="#10b981" opacity="0.8" />
          <rect x="275" y="202" width="50" height="12" rx="2" fill="#374151" />
          <circle cx="317" cy="208" r="3" fill="#10b981" opacity="0.8" />
          <rect x="275" y="219" width="50" height="12" rx="2" fill="#374151" />
          <circle cx="317" cy="225" r="3" fill="#6366f1" opacity="0.8" />
          <text x="300" y="265" text-anchor="middle" fill="#f1f5f9"
                font-size="13" font-weight="600" font-family="Inter, sans-serif">Server</text>
        </g>

        <!-- Client 0: top-left -->
        <g class="multi-client" opacity="0">
          <rect x="60" y="50" width="80" height="50" rx="5" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <line x1="72" y1="65" x2="118" y2="65" stroke="#22d3ee" stroke-width="1" opacity="0.4" />
          <line x1="72" y1="73" x2="110" y2="73" stroke="#22d3ee" stroke-width="1" opacity="0.25" />
          <line x1="72" y1="81" x2="114" y2="81" stroke="#22d3ee" stroke-width="1" opacity="0.15" />
          <rect x="55" y="102" width="90" height="5" rx="2.5" fill="#374151" />
          <text x="100" y="123" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">Client 1</text>
        </g>

        <!-- Client 1: top-right -->
        <g class="multi-client" opacity="0">
          <rect x="460" y="50" width="80" height="50" rx="5" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <line x1="472" y1="65" x2="518" y2="65" stroke="#22d3ee" stroke-width="1" opacity="0.4" />
          <line x1="472" y1="73" x2="510" y2="73" stroke="#22d3ee" stroke-width="1" opacity="0.25" />
          <line x1="472" y1="81" x2="514" y2="81" stroke="#22d3ee" stroke-width="1" opacity="0.15" />
          <rect x="455" y="102" width="90" height="5" rx="2.5" fill="#374151" />
          <text x="500" y="123" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">Client 2</text>
        </g>

        <!-- Client 2: bottom-left -->
        <g class="multi-client" opacity="0">
          <rect x="60" y="310" width="80" height="50" rx="5" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <line x1="72" y1="325" x2="118" y2="325" stroke="#22d3ee" stroke-width="1" opacity="0.4" />
          <line x1="72" y1="333" x2="110" y2="333" stroke="#22d3ee" stroke-width="1" opacity="0.25" />
          <line x1="72" y1="341" x2="114" y2="341" stroke="#22d3ee" stroke-width="1" opacity="0.15" />
          <rect x="55" y="362" width="90" height="5" rx="2.5" fill="#374151" />
          <text x="100" y="383" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">Client 3</text>
        </g>

        <!-- Client 3: bottom-right -->
        <g class="multi-client" opacity="0">
          <rect x="460" y="310" width="80" height="50" rx="5" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <line x1="472" y1="325" x2="518" y2="325" stroke="#22d3ee" stroke-width="1" opacity="0.4" />
          <line x1="472" y1="333" x2="510" y2="333" stroke="#22d3ee" stroke-width="1" opacity="0.25" />
          <line x1="472" y1="341" x2="514" y2="341" stroke="#22d3ee" stroke-width="1" opacity="0.15" />
          <rect x="455" y="362" width="90" height="5" rx="2.5" fill="#374151" />
          <text x="500" y="383" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">Client 4</text>
        </g>

        <!-- Packets (one per client) -->
        <circle class="multi-pkt" r="5" fill="#22d3ee" opacity="0" />
        <circle class="multi-pkt" r="5" fill="#22d3ee" opacity="0" />
        <circle class="multi-pkt" r="5" fill="#22d3ee" opacity="0" />
        <circle class="multi-pkt" r="5" fill="#22d3ee" opacity="0" />

        <!-- Response packets -->
        <circle class="multi-res-pkt" r="5" fill="#6366f1" opacity="0" />
        <circle class="multi-res-pkt" r="5" fill="#6366f1" opacity="0" />
        <circle class="multi-res-pkt" r="5" fill="#6366f1" opacity="0" />
        <circle class="multi-res-pkt" r="5" fill="#6366f1" opacity="0" />
      </svg>
    </div>
  `,
})
export class MultiClientScalingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.multi-cs');
    const tl = this.createScrollTimeline(container);

    const server = this.q('.multi-server');
    const clients = this.qa('.multi-client');
    const conns = this.qa('.multi-conn');
    const pulse = this.q('.multi-server-pulse');

    // 1. Server fades + scales in (use svgOrigin for correct center)
    tl.fromTo(server,
      { opacity: 0, scale: 0.4, svgOrigin: '300 210' },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
    );

    // 2. Connection lines draw in
    conns.forEach((conn) => {
      const path = conn as unknown as SVGPathElement;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(path, {
        strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut',
      }, '-=0.4');
    });

    // 3. Clients appear with stagger
    clients.forEach((client) => {
      tl.to(client, { opacity: 1, duration: 0.4, ease: 'power2.out' }, `-=${0.3}`);
    });

    // 4. Looping packet flow
    const loop = this.createLoopingTimeline(container);
    const pkts = this.qa('.multi-pkt');
    const resPkts = this.qa('.multi-res-pkt');

    // Request phase: all clients send packets to server
    pkts.forEach((pkt, i) => {
      const pathId = `#multi-path-${i}`;
      loop.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.1 }, i * 0.2);
      loop.to(pkt, {
        motionPath: { path: pathId, align: pathId, alignOrigin: [0.5, 0.5] },
        duration: 1.2, ease: 'power1.inOut',
      }, i * 0.2);
      loop.to(pkt, { opacity: 0, duration: 0.15 }, i * 0.2 + 1.1);
    });

    // Server pulse
    loop.fromTo(pulse,
      { opacity: 0, attr: { r: 40 } },
      { opacity: 0.7, attr: { r: 55 }, duration: 0.25, ease: 'power2.out' },
      1.3);
    loop.to(pulse,
      { opacity: 0, attr: { r: 75 }, duration: 0.5, ease: 'power2.out' },
      1.55);

    // Response phase: server sends responses back
    resPkts.forEach((pkt, i) => {
      const pathId = `#multi-path-${i}`;
      const offset = 2.0 + i * 0.15;
      loop.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.1 }, offset);
      loop.to(pkt, {
        motionPath: {
          path: pathId, align: pathId, alignOrigin: [0.5, 0.5],
          start: 1, end: 0,
        },
        duration: 1.2, ease: 'power1.inOut',
      }, offset);
      loop.to(pkt, { opacity: 0, duration: 0.15 }, offset + 1.1);
    });

    // Pause before repeat
    loop.to({}, { duration: 1.0 });

    tl.add(() => { loop.play(); });
  }
}
