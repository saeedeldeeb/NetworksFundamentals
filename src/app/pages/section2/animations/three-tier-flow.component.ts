import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-three-tier-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tier-flow {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tier-flow svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tier-flow">
      <svg viewBox="0 0 820 240" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="tier-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tier-glow-indigo">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tier-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Connection lines (bright, visible) -->
        <line class="tier-line" x1="200" y1="110" x2="280" y2="110"
              stroke="#4b5563" stroke-width="2.5" />
        <line class="tier-line" x1="540" y1="110" x2="620" y2="110"
              stroke="#4b5563" stroke-width="2.5" />

        <!-- Arrow heads -->
        <polygon class="tier-arrow" points="275,104 288,110 275,116" fill="#6b7280" />
        <polygon class="tier-arrow" points="615,104 628,110 615,116" fill="#6b7280" />

        <!-- Tier 1: Client -->
        <g class="tier-box" opacity="0">
          <rect x="15" y="60" width="185" height="100" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <circle cx="45" cy="90" r="14" fill="rgba(34,211,238,0.1)"
                  stroke="#22d3ee" stroke-width="1.5" />
          <text x="45" y="95" text-anchor="middle" fill="#22d3ee"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">1</text>
          <text x="107" y="93" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="600"
                font-family="Inter, sans-serif">Client</text>
          <text x="107" y="120" text-anchor="middle" fill="#64748b" font-size="11"
                font-family="Inter, sans-serif">Presentation Layer</text>
        </g>

        <!-- Tier 2: Server -->
        <g class="tier-box" opacity="0">
          <rect x="290" y="60" width="250" height="100" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <circle cx="325" cy="90" r="14" fill="rgba(99,102,241,0.1)"
                  stroke="#6366f1" stroke-width="1.5" />
          <text x="325" y="95" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">2</text>
          <text x="415" y="93" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="600"
                font-family="Inter, sans-serif">Server</text>
          <text x="415" y="120" text-anchor="middle" fill="#64748b" font-size="11"
                font-family="Inter, sans-serif">Business Logic Layer</text>
        </g>

        <!-- Tier 3: Database -->
        <g class="tier-box" opacity="0">
          <rect x="630" y="60" width="175" height="100" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <circle cx="660" cy="90" r="14" fill="rgba(16,185,129,0.1)"
                  stroke="#10b981" stroke-width="1.5" />
          <text x="660" y="95" text-anchor="middle" fill="#10b981"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">3</text>
          <text x="717" y="93" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="600"
                font-family="Inter, sans-serif">Database</text>
          <text x="717" y="120" text-anchor="middle" fill="#64748b" font-size="11"
                font-family="Inter, sans-serif">Data Layer</text>
        </g>

        <!-- The traveling packet group -->
        <g class="tier-packet" opacity="0">
          <circle class="tier-pkt-circle" cx="0" cy="0" r="10" fill="#22d3ee" />
          <!-- Label with background pill -->
          <rect class="tier-pkt-bg" x="-58" y="-38" width="116" height="22" rx="6"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" opacity="0.9" />
          <text class="tier-pkt-label" x="0" y="-22" text-anchor="middle"
                fill="#22d3ee" font-size="12" font-weight="700"
                font-family="'JetBrains Mono', monospace"></text>
        </g>

        <!-- Highlight borders (glow overlays) -->
        <rect class="tier-hl-client" x="15" y="60" width="185" height="100" rx="10"
              fill="none" stroke="#22d3ee" stroke-width="3" opacity="0"
              filter="url(#tier-glow-cyan)" />
        <rect class="tier-hl-server" x="290" y="60" width="250" height="100" rx="10"
              fill="none" stroke="#6366f1" stroke-width="3" opacity="0"
              filter="url(#tier-glow-indigo)" />
        <rect class="tier-hl-db" x="630" y="60" width="175" height="100" rx="10"
              fill="none" stroke="#10b981" stroke-width="3" opacity="0"
              filter="url(#tier-glow-green)" />
      </svg>
    </div>
  `,
})
export class ThreeTierFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tier-flow');

    // Intro timeline (plays once on scroll)
    const intro = this.createScrollTimeline(container);

    const boxes = this.qa('.tier-box');
    const lines = this.qa('.tier-line');
    const arrows = this.qa('.tier-arrow');

    // 1. Boxes appear
    boxes.forEach((box, i) => {
      intro.to(box, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.15 * i);
      intro.from(box, { y: 12, duration: 0.4, ease: 'power2.out' }, '<');
    });

    // 2. Lines draw in
    lines.forEach((line) => {
      const el = line as unknown as SVGLineElement;
      // For <line> elements, calculate length manually
      const x1 = parseFloat(el.getAttribute('x1') || '0');
      const y1 = parseFloat(el.getAttribute('y1') || '0');
      const x2 = parseFloat(el.getAttribute('x2') || '0');
      const y2 = parseFloat(el.getAttribute('y2') || '0');
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      intro.to(el, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.3');
    });

    // 3. Arrows appear
    intro.to(arrows, { opacity: 1, duration: 0.2, stagger: 0.1 });

    // 4. Start looping flow after intro
    intro.add(() => { this.startPacketLoop(); });
  }

  private startPacketLoop(): void {
    const container = this.q('.tier-flow');
    const loop = this.createLoopingTimeline(container);

    const packet = this.q('.tier-packet');
    const pktCircle = this.q('.tier-pkt-circle');
    const pktLabel = this.q('.tier-pkt-label');
    const pktBg = this.q('.tier-pkt-bg');
    const hlClient = this.q('.tier-hl-client');
    const hlServer = this.q('.tier-hl-server');
    const hlDb = this.q('.tier-hl-db');

    // Helper to set label + colors
    const setLabel = (text: string, color: string, t: number) => {
      loop.to(pktLabel, { opacity: 0, duration: 0.12 }, t);
      loop.set(pktLabel, { textContent: text, attr: { fill: color } }, t + 0.12);
      loop.set(pktBg, { attr: { stroke: color } }, t + 0.12);
      loop.set(pktCircle, { attr: { fill: color } }, t + 0.12);
      loop.to(pktLabel, { opacity: 1, duration: 0.12 }, t + 0.12);
    };

    // === REQUEST: Client → Server → Database ===

    // Appear at client
    loop.set(packet, { x: 107, y: 110 });
    loop.set(pktLabel, { textContent: 'HTTP Request', attr: { fill: '#22d3ee' } });
    loop.set(pktBg, { attr: { stroke: '#22d3ee' } });
    loop.set(pktCircle, { attr: { fill: '#22d3ee' } });
    loop.to(packet, { opacity: 1, duration: 0.25 }, 0);

    // Highlight client
    loop.to(hlClient, { opacity: 1, duration: 0.2 }, 0);
    loop.to(hlClient, { opacity: 0, duration: 0.4 }, 0.4);

    // Travel to Server
    loop.to(packet, { x: 415, duration: 1.2, ease: 'power2.inOut' }, 0.5);

    // At server: morph label
    loop.to(hlServer, { opacity: 1, duration: 0.2 }, 1.6);
    setLabel('SQL Query', '#6366f1', 1.7);
    loop.to(hlServer, { opacity: 0, duration: 0.3 }, 2.0);

    // Travel to Database
    loop.to(packet, { x: 717, duration: 1.2, ease: 'power2.inOut' }, 2.2);

    // At database: highlight + pulse
    loop.to(hlDb, { opacity: 1, duration: 0.2 }, 3.3);
    loop.to(hlDb, { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 2 }, 3.5);
    loop.to(hlDb, { opacity: 0, duration: 0.2 }, 3.9);

    // === RESPONSE: Database → Server → Client ===

    setLabel('Result Set', '#10b981', 4.0);

    // Travel back to Server
    loop.to(packet, { x: 415, duration: 1.2, ease: 'power2.inOut' }, 4.2);

    // At server: morph label
    loop.to(hlServer, { opacity: 1, duration: 0.2 }, 5.3);
    setLabel('JSON Response', '#6366f1', 5.4);
    loop.to(hlServer, { opacity: 0, duration: 0.3 }, 5.7);

    // Travel back to Client
    loop.to(packet, { x: 107, duration: 1.2, ease: 'power2.inOut' }, 5.9);

    // At client: glow + dissolve
    loop.to(hlClient, { opacity: 1, duration: 0.2 }, 7.0);
    loop.to(packet, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 7.2);
    loop.to(hlClient, { opacity: 0, duration: 0.3 }, 7.3);

    // Gap before restart
    loop.to({}, { duration: 1.0 });

    loop.play();
  }
}
