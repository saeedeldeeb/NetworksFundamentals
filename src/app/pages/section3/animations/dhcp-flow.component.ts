import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-dhcp-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .dhcp-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .dhcp-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="dhcp-anim">
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="dhcp-glow-cyan">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dhcp-glow-green">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dhcp-glow-indigo">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Client (left side) -->
        <g class="dhcp-client" opacity="0">
          <rect x="60" y="160" width="100" height="100" rx="14" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2.5" />
          <text x="110" y="200" text-anchor="middle" fill="#22d3ee"
                font-size="28" font-weight="700" font-family="Inter, sans-serif">?</text>
          <text x="110" y="225" text-anchor="middle" fill="#94a3b8"
                font-size="11" font-family="Inter, sans-serif">New Device</text>
          <text x="110" y="245" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">No IP yet</text>
        </g>

        <!-- Server (right side) -->
        <g class="dhcp-server" opacity="0">
          <rect x="480" y="160" width="100" height="100" rx="14" fill="#1f2937"
                stroke="#6366f1" stroke-width="2.5" />
          <text x="530" y="196" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">DHCP</text>
          <text x="530" y="216" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">Server</text>
          <text x="530" y="245" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">192.168.1.1</text>
        </g>

        <!-- Connection line -->
        <line class="dhcp-conn" x1="160" y1="210" x2="480" y2="210"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />

        <!-- Step labels on the right side -->
        <g class="dhcp-step-label dhcp-step1-label" opacity="0">
          <rect x="190" y="126" width="260" height="28" rx="6"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="205" y="144" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">1. DISCOVER</text>
          <text x="305" y="144" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">"I need an IP!"</text>
        </g>

        <g class="dhcp-step-label dhcp-step2-label" opacity="0">
          <rect x="190" y="186" width="260" height="28" rx="6"
                fill="#0f172a" stroke="#6366f1" stroke-width="1.5" />
          <text x="205" y="204" fill="#6366f1"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">2. OFFER</text>
          <text x="280" y="204" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">"How about 192.168.1.50?"</text>
        </g>

        <g class="dhcp-step-label dhcp-step3-label" opacity="0">
          <rect x="190" y="246" width="260" height="28" rx="6"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
          <text x="205" y="264" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">3. REQUEST</text>
          <text x="295" y="264" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">"Yes, I'll take it!"</text>
        </g>

        <g class="dhcp-step-label dhcp-step4-label" opacity="0">
          <rect x="190" y="306" width="260" height="28" rx="6"
                fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
          <text x="205" y="324" fill="#10b981"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">4. ACK</text>
          <text x="262" y="324" fill="#94a3b8"
                font-size="10" font-family="Inter, sans-serif">"Confirmed. It's yours!"</text>
        </g>

        <!-- Packet dots -->
        <circle class="dhcp-pkt dhcp-pkt1" r="7" fill="#f59e0b" opacity="0" />
        <circle class="dhcp-pkt dhcp-pkt2" r="7" fill="#6366f1" opacity="0" />
        <circle class="dhcp-pkt dhcp-pkt3" r="7" fill="#22d3ee" opacity="0" />
        <circle class="dhcp-pkt dhcp-pkt4" r="7" fill="#10b981" opacity="0" />

        <!-- Broadcast waves for Discover -->
        <circle class="dhcp-wave" cx="160" cy="210" r="20" fill="none"
                stroke="#f59e0b" stroke-width="2" opacity="0" />
        <circle class="dhcp-wave" cx="160" cy="210" r="20" fill="none"
                stroke="#f59e0b" stroke-width="1.5" opacity="0" />

        <!-- Client glow -->
        <rect class="dhcp-client-glow" x="60" y="160" width="100" height="100" rx="14" fill="none"
              stroke="#10b981" stroke-width="3" opacity="0" filter="url(#dhcp-glow-green)" />

        <!-- Assigned IP text that appears at end -->
        <text class="dhcp-assigned-ip" x="110" y="290" text-anchor="middle" fill="#10b981"
              font-size="13" font-weight="700" font-family="'JetBrains Mono', monospace"
              opacity="0">192.168.1.50</text>

        <!-- Title -->
        <text x="320" y="30" text-anchor="middle" fill="#f1f5f9"
              font-size="15" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.6">DHCP: How Devices Get Their IP Address</text>

        <!-- DORA acronym -->
        <g class="dhcp-dora" opacity="0">
          <text x="320" y="400" text-anchor="middle" fill="#64748b"
                font-size="12" font-family="'JetBrains Mono', monospace">
            <tspan fill="#f59e0b" font-weight="700">D</tspan>iscover
            <tspan fill="#6366f1" font-weight="700"> O</tspan>ffer
            <tspan fill="#22d3ee" font-weight="700"> R</tspan>equest
            <tspan fill="#10b981" font-weight="700"> A</tspan>ck
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class DhcpFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.dhcp-anim');
    const tl = this.createScrollTimeline(container);

    const client = this.q('.dhcp-client');
    const server = this.q('.dhcp-server');
    const conn = this.q('.dhcp-conn');
    const dora = this.q('.dhcp-dora');

    // 1. Client and server appear
    tl.fromTo(client,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
    );
    tl.fromTo(server,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3',
    );

    // 2. Connection line draws
    const connEl = conn as unknown as SVGLineElement;
    const connLen = 320;
    tl.set(connEl, { strokeDasharray: connLen, strokeDashoffset: connLen });
    tl.to(connEl, { opacity: 1, strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.2');

    // 3. DORA label
    tl.to(dora, { opacity: 1, duration: 0.3 }, '-=0.2');

    // 4. Start the DORA loop
    tl.add(() => { this.startDoraLoop(); });
  }

  private startDoraLoop(): void {
    const container = this.q('.dhcp-anim');
    const loop = this.createLoopingTimeline(container);

    const waves = this.qa('.dhcp-wave');
    const pkt1 = this.q('.dhcp-pkt1');
    const pkt2 = this.q('.dhcp-pkt2');
    const pkt3 = this.q('.dhcp-pkt3');
    const pkt4 = this.q('.dhcp-pkt4');
    const step1Label = this.q('.dhcp-step1-label');
    const step2Label = this.q('.dhcp-step2-label');
    const step3Label = this.q('.dhcp-step3-label');
    const step4Label = this.q('.dhcp-step4-label');
    const clientGlow = this.q('.dhcp-client-glow');
    const assignedIp = this.q('.dhcp-assigned-ip');

    const clientX = 160;
    const serverX = 480;
    const lineY = 210;

    // ===  DISCOVER (client → broadcast) ===
    // Broadcast waves
    waves.forEach((wave, i) => {
      loop.fromTo(wave,
        { attr: { r: 20 }, opacity: 0.6 },
        { attr: { r: 120 }, opacity: 0, duration: 0.8, ease: 'power1.out' },
        i * 0.2,
      );
    });

    // Packet travels right
    loop.fromTo(pkt1,
      { attr: { cx: clientX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0.2,
    );
    loop.to(pkt1, { attr: { cx: serverX, cy: lineY }, duration: 0.7, ease: 'power2.inOut' }, 0.3);
    loop.to(pkt1, { opacity: 0, duration: 0.1 }, 1.0);

    // Step 1 label
    loop.fromTo(step1Label, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3 }, 0.1);
    loop.to(step1Label, { opacity: 0.3, duration: 0.3 }, 1.2);

    // === OFFER (server → client) ===
    loop.fromTo(pkt2,
      { attr: { cx: serverX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      1.3,
    );
    loop.to(pkt2, { attr: { cx: clientX, cy: lineY }, duration: 0.7, ease: 'power2.inOut' }, 1.4);
    loop.to(pkt2, { opacity: 0, duration: 0.1 }, 2.1);

    // Step 2 label
    loop.fromTo(step2Label, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3 }, 1.3);
    loop.to(step2Label, { opacity: 0.3, duration: 0.3 }, 2.3);

    // === REQUEST (client → server) ===
    loop.fromTo(pkt3,
      { attr: { cx: clientX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      2.5,
    );
    loop.to(pkt3, { attr: { cx: serverX, cy: lineY }, duration: 0.7, ease: 'power2.inOut' }, 2.6);
    loop.to(pkt3, { opacity: 0, duration: 0.1 }, 3.3);

    // Step 3 label
    loop.fromTo(step3Label, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3 }, 2.5);
    loop.to(step3Label, { opacity: 0.3, duration: 0.3 }, 3.5);

    // === ACK (server → client) ===
    loop.fromTo(pkt4,
      { attr: { cx: serverX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      3.7,
    );
    loop.to(pkt4, { attr: { cx: clientX, cy: lineY }, duration: 0.7, ease: 'power2.inOut' }, 3.8);
    loop.to(pkt4, { opacity: 0, duration: 0.1 }, 4.5);

    // Step 4 label
    loop.fromTo(step4Label, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3 }, 3.7);

    // === SUCCESS: Client gets IP ===
    loop.to(clientGlow, { opacity: 1, duration: 0.3 }, 4.6);
    loop.fromTo(assignedIp, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.4 }, 4.7);

    // Hold for a moment
    loop.to({}, { duration: 1.5 });

    // Fade out everything for next loop
    loop.to([step1Label, step2Label, step3Label, step4Label, clientGlow, assignedIp],
      { opacity: 0, duration: 0.4 },
    );
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
