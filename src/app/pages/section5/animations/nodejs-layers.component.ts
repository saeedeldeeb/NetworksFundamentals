import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-nodejs-layers',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .nl-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .nl-wrap svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="nl-wrap">
      <svg viewBox="0 0 680 390" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="nl-glow-p">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feFlood flood-color="#6366f1" flood-opacity="0.6" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nl-glow-c">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feFlood flood-color="#22d3ee" flood-opacity="0.6" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nl-glow-g">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feFlood flood-color="#10b981" flood-opacity="0.6" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- ===== LAYER 4: YOUR NODE.JS CODE ===== -->
        <g class="nl-layer1" opacity="0">
          <rect x="20" y="20" width="640" height="82" rx="10"
                fill="rgba(99, 102, 241, 0.05)" stroke="rgba(99, 102, 241, 0.3)" stroke-width="1.5" />
          <text x="40" y="46" fill="#6366f1" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">YOUR NODE.JS CODE</text>
          <text x="40" y="64" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">net.createServer((socket) =&gt; &#123; ... &#125;)</text>
          <text x="40" y="82" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">socket.write(), socket.on('data', ...)</text>
          <!-- callback badge (hidden until animated) -->
          <g class="nl-callback" opacity="0">
            <rect x="400" y="30" width="248" height="56" rx="8"
                  fill="rgba(99, 102, 241, 0.18)" stroke="#6366f1" stroke-width="1.5" />
            <text x="524" y="52" text-anchor="middle" fill="#a5b4fc" font-size="9.5" font-weight="700"
                  font-family="Inter, sans-serif">callback fires!</text>
            <text x="524" y="70" text-anchor="middle" fill="#64748b" font-size="7.5"
                  font-family="'JetBrains Mono', monospace">socket.remoteAddress : 64409</text>
          </g>
        </g>

        <!-- ===== LAYER 3: NODE.JS / libuv ===== -->
        <g class="nl-layer2" opacity="0">
          <rect x="20" y="114" width="640" height="72" rx="10"
                fill="rgba(34, 211, 238, 0.04)" stroke="rgba(34, 211, 238, 0.2)" stroke-width="1.5" />
          <text x="40" y="140" fill="#22d3ee" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">NODE.JS / libuv</text>
          <text x="40" y="158" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">accept(), read(), write() — system calls to OS kernel</text>
          <!-- accept() badge -->
          <g class="nl-accept" opacity="0">
            <rect x="460" y="126" width="86" height="26" rx="5"
                  fill="rgba(34, 211, 238, 0.2)" stroke="#22d3ee" stroke-width="1.2" />
            <text x="503" y="143" text-anchor="middle" fill="#22d3ee" font-size="8.5" font-weight="700"
                  font-family="'JetBrains Mono', monospace">accept() ✓</text>
          </g>
        </g>

        <!-- ===== LAYER 2: OS KERNEL ===== -->
        <g class="nl-layer3" opacity="0">
          <rect x="20" y="198" width="640" height="96" rx="10"
                fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)" stroke-width="1.5" />
          <text x="40" y="224" fill="#f59e0b" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">OS KERNEL</text>
          <text x="40" y="242" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">Manages TCP handshake, SYN/Accept queues, connection table</text>

          <!-- Kernel pipeline: SYN Queue → Accept Queue → fd ready -->
          <rect x="186" y="256" width="90" height="26" rx="5" fill="#0c1222" stroke="#334155" stroke-width="1" />
          <text x="231" y="273" text-anchor="middle" fill="#475569" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">SYN Queue</text>
          <text x="283" y="272" fill="#334155" font-size="14" font-weight="700">&#8594;</text>
          <rect x="303" y="256" width="108" height="26" rx="5" fill="#0c1222" stroke="#334155" stroke-width="1" />
          <text x="357" y="273" text-anchor="middle" fill="#475569" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">Accept Queue</text>
          <text x="418" y="272" fill="#334155" font-size="14" font-weight="700">&#8594;</text>
          <rect x="438" y="256" width="76" height="26" rx="5" fill="#0c1222" stroke="#334155" stroke-width="1" />
          <text x="476" y="273" text-anchor="middle" fill="#475569" font-size="7.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">fd ready</text>

          <!-- Highlight overlays (animated) -->
          <g class="nl-syn-hi" opacity="0">
            <rect x="186" y="256" width="90" height="26" rx="5"
                  fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" stroke-width="1.5" />
            <text x="231" y="273" text-anchor="middle" fill="#f59e0b" font-size="7.5" font-weight="700"
                  font-family="'JetBrains Mono', monospace">SYN ✓</text>
          </g>
          <g class="nl-acc-hi" opacity="0">
            <rect x="303" y="256" width="108" height="26" rx="5"
                  fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" stroke-width="1.5" />
            <text x="357" y="273" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                  font-family="'JetBrains Mono', monospace">ESTABLISHED ✓</text>
          </g>
          <g class="nl-fd-hi" opacity="0">
            <rect x="438" y="256" width="76" height="26" rx="5"
                  fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" stroke-width="1.5" />
            <text x="476" y="273" text-anchor="middle" fill="#a5b4fc" font-size="7.5" font-weight="700"
                  font-family="'JetBrains Mono', monospace">fd=4 ✓</text>
          </g>
        </g>

        <!-- ===== LAYER 1: NETWORK INTERFACE ===== -->
        <g class="nl-layer4" opacity="0">
          <rect x="20" y="306" width="640" height="62" rx="10"
                fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1.5" />
          <text x="40" y="332" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">NETWORK INTERFACE (NIC)</text>
          <text x="40" y="350" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">Raw TCP segments on the wire</text>
          <!-- Client label -->
          <rect x="568" y="316" width="72" height="40" rx="7"
                fill="rgba(34, 211, 238, 0.07)" stroke="rgba(34, 211, 238, 0.25)" stroke-width="1" />
          <text x="604" y="333" text-anchor="middle" fill="#22d3ee" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif">CLIENT</text>
          <text x="604" y="348" text-anchor="middle" fill="#64748b" font-size="7.5"
                font-family="'JetBrains Mono', monospace">10.0.0.5</text>
        </g>

        <!-- Dashed connectors between layers -->
        <g class="nl-connectors" opacity="0">
          <line x1="340" y1="102" x2="340" y2="114" stroke="#334155" stroke-width="1" stroke-dasharray="3,2" />
          <line x1="340" y1="186" x2="340" y2="198" stroke="#334155" stroke-width="1" stroke-dasharray="3,2" />
          <line x1="340" y1="294" x2="340" y2="306" stroke="#334155" stroke-width="1" stroke-dasharray="3,2" />
        </g>

        <!-- Animated packet dot -->
        <circle class="nl-pkt" cx="604" cy="337" r="7" fill="#22d3ee" opacity="0"
                filter="url(#nl-glow-c)" />
      </svg>
    </div>
  `,
})
export class NodejsLayersComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.nl-wrap');
    const tl = this.createScrollTimeline(container);

    // Layers appear bottom → top (NIC first, Your Code last)
    tl.fromTo(this.q('.nl-layer4'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 });
    tl.fromTo(this.q('.nl-layer3'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.15');
    tl.fromTo(this.q('.nl-layer2'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.15');
    tl.fromTo(this.q('.nl-layer1'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.15');
    tl.fromTo(this.q('.nl-connectors'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.nl-wrap');
    const loop = this.createLoopingTimeline(container);
    const pkt = this.q('.nl-pkt');

    // ===== 1. SYN: Client → center of NIC =====
    loop.set(pkt, { attr: { cx: 604, cy: 337, r: 7, fill: '#22d3ee' }, opacity: 0 }, 0);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 0.2);
    loop.to(pkt, { attr: { cx: 340 }, duration: 0.5, ease: 'power2.inOut' }, 0.3);

    // ===== 2. Rise into Kernel =====
    loop.to(pkt, { attr: { cy: 269, r: 6 }, duration: 0.45, ease: 'power2.in' }, 0.85);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 1.28);

    // SYN queue lights up
    loop.fromTo(this.q('.nl-syn-hi'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.3);
    loop.to({}, { duration: 0.45 }, 1.3);

    // ===== 3. Handshake completes → Accept Queue =====
    loop.fromTo(this.q('.nl-acc-hi'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.8);
    loop.to({}, { duration: 0.35 }, 1.8);

    // ===== 4. fd created =====
    loop.fromTo(this.q('.nl-fd-hi'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.2);

    // ===== 5. fd rises to libuv =====
    loop.set(pkt, { attr: { cx: 476, cy: 269, r: 6, fill: '#6366f1' }, opacity: 0 }, 2.5);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 2.6);
    loop.to(pkt, { attr: { cy: 139, r: 5 }, duration: 0.4, ease: 'power2.inOut' }, 2.7);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 3.1);
    // accept() badge
    loop.fromTo(this.q('.nl-accept'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2 }, 3.1);

    // ===== 6. Callback fires in Your Code =====
    loop.set(pkt, { attr: { cx: 476, cy: 139, r: 5, fill: '#a5b4fc' }, opacity: 0 }, 3.4);
    loop.to(pkt, { opacity: 1, duration: 0.1 }, 3.5);
    loop.to(pkt, { attr: { cy: 61, r: 5 }, duration: 0.35, ease: 'power2.inOut' }, 3.6);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, 3.95);
    loop.fromTo(this.q('.nl-callback'), { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25 }, 3.95);

    // Hold
    loop.to({}, { duration: 2.2 });

    // Fade all badges for next cycle
    const badges = [
      this.q('.nl-syn-hi'), this.q('.nl-acc-hi'), this.q('.nl-fd-hi'),
      this.q('.nl-accept'), this.q('.nl-callback'),
    ];
    loop.to(badges, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
