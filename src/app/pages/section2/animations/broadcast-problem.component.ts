import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-broadcast-problem',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .bcast-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .bcast-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="bcast-anim">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="bcast-glow-cyan">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bcast-glow-green">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bcast-glow-red">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="bcast-wave-grad">
            <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Broadcast waves (expanding rings from sender) -->
        <circle class="bcast-wave" cx="300" cy="200" r="30" fill="none"
                stroke="#22d3ee" stroke-width="2" opacity="0" />
        <circle class="bcast-wave" cx="300" cy="200" r="30" fill="none"
                stroke="#22d3ee" stroke-width="1.5" opacity="0" />
        <circle class="bcast-wave" cx="300" cy="200" r="30" fill="none"
                stroke="#22d3ee" stroke-width="1" opacity="0" />

        <!-- Connection lines from center to each receiver -->
        <line class="bcast-conn" x1="300" y1="200" x2="120" y2="100"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="bcast-conn" x1="300" y1="200" x2="480" y2="100"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="bcast-conn" x1="300" y1="200" x2="120" y2="310"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="bcast-conn" x1="300" y1="200" x2="480" y2="310"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packet dots traveling along each connection -->
        <circle class="bcast-pkt" r="6" fill="#22d3ee" opacity="0" />
        <circle class="bcast-pkt" r="6" fill="#22d3ee" opacity="0" />
        <circle class="bcast-pkt" r="6" fill="#22d3ee" opacity="0" />
        <circle class="bcast-pkt" r="6" fill="#22d3ee" opacity="0" />

        <!-- Sender: Host A (center) -->
        <g class="bcast-sender" opacity="0">
          <circle cx="300" cy="200" r="32" fill="#1f2937"
                  stroke="#22d3ee" stroke-width="2.5" />
          <text x="300" y="206" text-anchor="middle" fill="#22d3ee"
                font-size="18" font-weight="700" font-family="Inter, sans-serif">A</text>
        </g>
        <!-- Sender glow ring -->
        <circle class="bcast-sender-glow" cx="300" cy="200" r="32" fill="none"
                stroke="#22d3ee" stroke-width="3" opacity="0"
                filter="url(#bcast-glow-cyan)" />
        <!-- "Sender" label -->
        <text class="bcast-sender-label" x="300" y="248" text-anchor="middle"
              fill="#94a3b8" font-size="11" font-family="Inter, sans-serif"
              opacity="0">Sender</text>

        <!-- Receiver B: top-left (ACCEPTS) -->
        <g class="bcast-recv" opacity="0">
          <circle cx="120" cy="100" r="28" fill="#1f2937"
                  stroke="#4b5563" stroke-width="2" />
          <text x="120" y="106" text-anchor="middle" fill="#f1f5f9"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">B</text>
        </g>
        <circle class="bcast-hl-accept" cx="120" cy="100" r="28" fill="none"
                stroke="#10b981" stroke-width="3" opacity="0"
                filter="url(#bcast-glow-green)" />
        <text class="bcast-accept-label" x="120" y="145" text-anchor="middle"
              fill="#10b981" font-size="12" font-weight="700"
              font-family="'JetBrains Mono', monospace" opacity="0">ACCEPTS</text>

        <!-- Receiver C: top-right (DROPS) -->
        <g class="bcast-recv" opacity="0">
          <circle cx="480" cy="100" r="28" fill="#1f2937"
                  stroke="#4b5563" stroke-width="2" />
          <text x="480" y="106" text-anchor="middle" fill="#f1f5f9"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">C</text>
        </g>
        <circle class="bcast-hl-reject" cx="480" cy="100" r="28" fill="none"
                stroke="#ef4444" stroke-width="3" opacity="0"
                filter="url(#bcast-glow-red)" />
        <text class="bcast-drop-label" x="480" y="145" text-anchor="middle"
              fill="#ef4444" font-size="12" font-weight="700"
              font-family="'JetBrains Mono', monospace" opacity="0">DROPS</text>

        <!-- Receiver D: bottom-left (DROPS) -->
        <g class="bcast-recv" opacity="0">
          <circle cx="120" cy="310" r="28" fill="#1f2937"
                  stroke="#4b5563" stroke-width="2" />
          <text x="120" y="316" text-anchor="middle" fill="#f1f5f9"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">D</text>
        </g>
        <circle class="bcast-hl-reject" cx="120" cy="310" r="28" fill="none"
                stroke="#ef4444" stroke-width="3" opacity="0"
                filter="url(#bcast-glow-red)" />
        <text class="bcast-drop-label" x="120" y="355" text-anchor="middle"
              fill="#ef4444" font-size="12" font-weight="700"
              font-family="'JetBrains Mono', monospace" opacity="0">DROPS</text>

        <!-- Receiver E: bottom-right (DROPS) -->
        <g class="bcast-recv" opacity="0">
          <circle cx="480" cy="310" r="28" fill="#1f2937"
                  stroke="#4b5563" stroke-width="2" />
          <text x="480" y="316" text-anchor="middle" fill="#f1f5f9"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">E</text>
        </g>
        <circle class="bcast-hl-reject" cx="480" cy="310" r="28" fill="none"
                stroke="#ef4444" stroke-width="3" opacity="0"
                filter="url(#bcast-glow-red)" />
        <text class="bcast-drop-label" x="480" y="355" text-anchor="middle"
              fill="#ef4444" font-size="12" font-weight="700"
              font-family="'JetBrains Mono', monospace" opacity="0">DROPS</text>

        <!-- Floating frame label (travels with packets) -->
        <g class="bcast-frame-label" opacity="0">
          <rect x="-55" y="-15" width="110" height="24" rx="6"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" opacity="0.9" />
          <text x="0" y="3" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">Frame → B</text>
        </g>
      </svg>
    </div>
  `,
})
export class BroadcastProblemComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.bcast-anim');
    const tl = this.createScrollTimeline(container);

    const sender = this.q('.bcast-sender');
    const senderLabel = this.q('.bcast-sender-label');
    const recvs = this.qa('.bcast-recv');
    const conns = this.qa('.bcast-conn');

    // 1. Sender appears with scale bounce
    tl.fromTo(sender,
      { opacity: 0, scale: 0.3, svgOrigin: '300 200' },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
    );
    tl.to(senderLabel, { opacity: 1, duration: 0.3 }, '-=0.2');

    // 2. Connection lines draw in
    conns.forEach((conn) => {
      const el = conn as unknown as SVGLineElement;
      const x1 = parseFloat(el.getAttribute('x1') || '0');
      const y1 = parseFloat(el.getAttribute('y1') || '0');
      const x2 = parseFloat(el.getAttribute('x2') || '0');
      const y2 = parseFloat(el.getAttribute('y2') || '0');
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, {
        opacity: 1, strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut',
      }, '-=0.35');
    });

    // 3. Receivers appear with stagger
    recvs.forEach((recv, i) => {
      tl.to(recv, { opacity: 1, duration: 0.3, ease: 'power2.out' }, `-=${i === 0 ? 0.2 : 0.25}`);
    });

    // 4. Start looping broadcast
    tl.add(() => { this.startBroadcastLoop(); });
  }

  private startBroadcastLoop(): void {
    const container = this.q('.bcast-anim');
    const loop = this.createLoopingTimeline(container);

    const waves = this.qa('.bcast-wave');
    const pkts = this.qa('.bcast-pkt');
    const senderGlow = this.q('.bcast-sender-glow');
    const hlAccepts = this.qa('.bcast-hl-accept');
    const hlRejects = this.qa('.bcast-hl-reject');
    const acceptLabels = this.qa('.bcast-accept-label');
    const dropLabels = this.qa('.bcast-drop-label');
    const frameLabel = this.q('.bcast-frame-label');

    // Receiver endpoints
    const receivers = [
      { x: 120, y: 100 },  // B (accept)
      { x: 480, y: 100 },  // C (drop)
      { x: 120, y: 310 },  // D (drop)
      { x: 480, y: 310 },  // E (drop)
    ];

    // === Phase 1: Sender glows + broadcast waves expand ===
    loop.to(senderGlow, { opacity: 0.8, duration: 0.2 }, 0);
    loop.to(senderGlow, { opacity: 0, duration: 0.4 }, 0.3);

    // Show frame label above sender
    loop.fromTo(frameLabel,
      { x: 300, y: 175, opacity: 0 },
      { opacity: 1, duration: 0.2 },
      0,
    );

    // Expanding waves
    waves.forEach((wave, i) => {
      const delay = i * 0.25;
      loop.fromTo(wave,
        { attr: { r: 30 }, opacity: 0.6 },
        { attr: { r: 160 }, opacity: 0, duration: 1.2, ease: 'power1.out' },
        delay,
      );
    });

    // === Phase 2: Packets travel from center (A) outward to all receivers ===
    pkts.forEach((pkt, i) => {
      loop.fromTo(pkt,
        { attr: { cx: 300, cy: 200 }, opacity: 0 },
        { opacity: 0.9, duration: 0.15 },
        0.3,
      );
      loop.fromTo(pkt,
        { attr: { cx: 300, cy: 200 } },
        {
          attr: { cx: receivers[i].x, cy: receivers[i].y },
          duration: 1.0,
          ease: 'power2.out',
        },
        0.4,
      );
      loop.to(pkt, { opacity: 0, duration: 0.15 }, 1.3);
    });

    // Move frame label to follow first packet direction (toward B)
    loop.fromTo(frameLabel,
      { x: 300, y: 175 },
      { x: 210, y: 140, duration: 0.6, ease: 'power2.out' },
      0.4,
    );
    loop.to(frameLabel, { opacity: 0, duration: 0.2 }, 1.0);

    // === Phase 3: B accepts, C/D/E reject ===

    // B: green glow + "ACCEPTS"
    hlAccepts.forEach((hl) => {
      loop.to(hl, { opacity: 1, duration: 0.2 }, 1.4);
      loop.to(hl, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 1 }, 1.6);
      loop.to(hl, { opacity: 0, duration: 0.4 }, 2.2);
    });
    acceptLabels.forEach((label) => {
      loop.to(label, { opacity: 1, duration: 0.2 }, 1.45);
      loop.to(label, { opacity: 0, duration: 0.3 }, 2.4);
    });

    // C, D, E: red flash + "DROPS"
    hlRejects.forEach((hl) => {
      loop.to(hl, { opacity: 0.8, duration: 0.15 }, 1.4);
      loop.to(hl, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 1.6);
    });
    dropLabels.forEach((label) => {
      loop.to(label, { opacity: 1, duration: 0.15 }, 1.45);
      loop.to(label, { opacity: 0, duration: 0.3 }, 2.4);
    });

    // Gap before restart
    loop.to({}, { duration: 1.5 });

    loop.play();
  }
}
