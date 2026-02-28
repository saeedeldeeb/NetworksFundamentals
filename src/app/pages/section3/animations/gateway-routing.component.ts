import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-gateway-routing',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .gw-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .gw-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="gw-anim">
      <svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="gw-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="gw-glow-indigo">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="gw-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Network 1 background -->
        <rect class="gw-net1-bg" x="20" y="60" width="230" height="220" rx="16"
              fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />
        <text class="gw-net1-title" x="135" y="90" text-anchor="middle" fill="#22d3ee"
              font-size="12" font-weight="700" font-family="Inter, sans-serif" opacity="0">
          Network 1 — 192.168.1.x/24
        </text>

        <!-- Network 2 background -->
        <rect class="gw-net2-bg" x="390" y="60" width="230" height="220" rx="16"
              fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />
        <text class="gw-net2-title" x="505" y="90" text-anchor="middle" fill="#10b981"
              font-size="12" font-weight="700" font-family="Inter, sans-serif" opacity="0">
          Network 2 — 192.168.2.x/24
        </text>

        <!-- Host A (left) -->
        <g class="gw-host-a" opacity="0">
          <rect x="60" y="140" width="90" height="80" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="105" y="172" text-anchor="middle" fill="#22d3ee"
                font-size="18" font-weight="700" font-family="Inter, sans-serif">Host A</text>
          <text x="105" y="198" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">192.168.1.3</text>
        </g>
        <rect class="gw-host-a-glow" x="60" y="140" width="90" height="80" rx="10"
              fill="none" stroke="#22d3ee" stroke-width="3" opacity="0" filter="url(#gw-glow-cyan)" />

        <!-- Router (center) -->
        <g class="gw-router" opacity="0">
          <rect x="270" y="130" width="100" height="100" rx="14" fill="#1f2937"
                stroke="#6366f1" stroke-width="2.5" />
          <text x="320" y="168" text-anchor="middle" fill="#6366f1"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <text x="320" y="188" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">.1.1 | .2.1</text>
          <text x="320" y="218" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="Inter, sans-serif">"Lives two lives"</text>
        </g>
        <rect class="gw-router-glow" x="270" y="130" width="100" height="100" rx="14"
              fill="none" stroke="#6366f1" stroke-width="3" opacity="0" filter="url(#gw-glow-indigo)" />

        <!-- Host B (right) -->
        <g class="gw-host-b" opacity="0">
          <rect x="450" y="140" width="90" height="80" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="495" y="172" text-anchor="middle" fill="#10b981"
                font-size="18" font-weight="700" font-family="Inter, sans-serif">Host B</text>
          <text x="495" y="198" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">192.168.2.2</text>
        </g>
        <rect class="gw-host-b-glow" x="450" y="140" width="90" height="80" rx="10"
              fill="none" stroke="#10b981" stroke-width="3" opacity="0" filter="url(#gw-glow-green)" />

        <!-- Connection lines -->
        <line class="gw-conn-left" x1="150" y1="180" x2="270" y2="180"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="gw-conn-right" x1="370" y1="180" x2="450" y2="180"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packet -->
        <circle class="gw-pkt" r="8" fill="#f59e0b" opacity="0" />

        <!-- Floating packet info label -->
        <g class="gw-pkt-label" opacity="0">
          <rect x="-90" y="-32" width="180" height="26" rx="6"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" opacity="0.9" />
          <text class="gw-pkt-label-l2" x="0" y="-14" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Dest MAC = Router's MAC
          </text>
        </g>

        <!-- IP stays the same label -->
        <g class="gw-ip-label" opacity="0">
          <rect x="195" y="290" width="250" height="26" rx="6"
                fill="#0f172a" stroke="#a855f7" stroke-width="1" opacity="0.9" />
          <text x="320" y="308" text-anchor="middle" fill="#a855f7"
                font-size="10" font-weight="600" font-family="'JetBrains Mono', monospace">
            IP Dest: 192.168.2.2 (unchanged)
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class GatewayRoutingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.gw-anim');
    const tl = this.createScrollTimeline(container);

    const net1Bg = this.q('.gw-net1-bg');
    const net2Bg = this.q('.gw-net2-bg');
    const net1Title = this.q('.gw-net1-title');
    const net2Title = this.q('.gw-net2-title');
    const hostA = this.q('.gw-host-a');
    const hostB = this.q('.gw-host-b');
    const router = this.q('.gw-router');
    const connLeft = this.q('.gw-conn-left');
    const connRight = this.q('.gw-conn-right');

    // Networks fade in
    tl.to([net1Bg, net1Title], { opacity: 1, duration: 0.4 });
    tl.to([net2Bg, net2Title], { opacity: 1, duration: 0.4 }, '-=0.2');

    // Devices appear
    tl.fromTo(hostA, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1');
    tl.fromTo(router, { opacity: 0, scale: 0.8, svgOrigin: '320 180' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }, '-=0.2');
    tl.fromTo(hostB, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

    // Connection lines draw
    [connLeft, connRight].forEach((conn) => {
      const el = conn as unknown as SVGLineElement;
      const x1 = parseFloat(el.getAttribute('x1') || '0');
      const x2 = parseFloat(el.getAttribute('x2') || '0');
      const len = Math.abs(x2 - x1);
      tl.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, { opacity: 1, strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.3');
    });

    // Start the routing loop
    tl.add(() => { this.startRoutingLoop(); });
  }

  private startRoutingLoop(): void {
    const container = this.q('.gw-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt = this.q('.gw-pkt');
    const pktLabel = this.q('.gw-pkt-label');
    const pktLabelL2 = this.q('.gw-pkt-label-l2');
    const hostAGlow = this.q('.gw-host-a-glow');
    const routerGlow = this.q('.gw-router-glow');
    const hostBGlow = this.q('.gw-host-b-glow');
    const ipLabel = this.q('.gw-ip-label');

    // === Phase 1: Host A sends packet to Router ===
    // Host A glows
    loop.to(hostAGlow, { opacity: 0.8, duration: 0.2 }, 0);
    loop.to(hostAGlow, { opacity: 0, duration: 0.3 }, 0.4);

    // Packet appears at Host A
    loop.fromTo(pkt,
      { attr: { cx: 150, cy: 180 }, opacity: 0 },
      { opacity: 1, duration: 0.15 },
      0.2,
    );

    // Label: Dest MAC = Router's MAC
    loop.set(pktLabelL2, { textContent: "Dest MAC = Router's MAC" });
    loop.fromTo(pktLabel,
      { x: 150, y: 155, opacity: 0 },
      { opacity: 1, duration: 0.15 },
      0.2,
    );

    // Packet travels to router
    loop.to(pkt, { attr: { cx: 270, cy: 180 }, duration: 0.8, ease: 'power2.inOut' }, 0.5);
    loop.to(pktLabel, { x: 270, y: 155, duration: 0.8, ease: 'power2.inOut' }, 0.5);

    // Show IP label
    loop.fromTo(ipLabel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.6);

    // === Phase 2: Router receives and processes ===
    loop.to(routerGlow, { opacity: 0.8, duration: 0.2 }, 1.4);
    loop.to(routerGlow, { opacity: 0, duration: 0.5 }, 1.8);

    // === Phase 3: Router forwards to Host B ===
    // Update label: Dest MAC = Host B's MAC
    loop.set(pktLabelL2, { textContent: "Dest MAC = Host B's MAC" }, 2.0);

    // Packet travels to Host B
    loop.to(pkt, { attr: { cx: 450, cy: 180 }, duration: 0.8, ease: 'power2.inOut' }, 2.0);
    loop.to(pktLabel, { x: 450, y: 155, duration: 0.8, ease: 'power2.inOut' }, 2.0);

    // Host B glows on receive
    loop.to(hostBGlow, { opacity: 0.8, duration: 0.2 }, 2.8);
    loop.to(hostBGlow, { opacity: 0, duration: 0.5 }, 3.2);

    // Fade out
    loop.to(pkt, { opacity: 0, duration: 0.2 }, 3.0);
    loop.to(pktLabel, { opacity: 0, duration: 0.2 }, 3.0);
    loop.to(ipLabel, { opacity: 0, duration: 0.3 }, 3.2);

    // Gap
    loop.to({}, { duration: 1.2 });

    loop.play();
  }
}
