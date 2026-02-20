import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-router-visual',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .router-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .router-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="router-anim">
      <svg viewBox="0 0 760 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="rtr-glow-indigo">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rtr-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rtr-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <!-- Packet paths -->
          <path id="rtr-path-req" d="M 135,230 C 200,230 250,170 380,170" fill="none" />
          <path id="rtr-path-fwd" d="M 380,170 C 510,170 560,230 625,230" fill="none" />
          <path id="rtr-path-res-1" d="M 625,230 C 560,230 510,170 380,170" fill="none" />
          <path id="rtr-path-res-2" d="M 380,170 C 250,170 200,230 135,230" fill="none" />
        </defs>

        <!-- Network 1 boundary -->
        <rect class="rtr-net" x="20" y="60" width="270" height="260" rx="12"
              fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="8 4"
              opacity="0" />
        <text class="rtr-net-label" x="155" y="90" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="600" font-family="Inter, sans-serif"
              opacity="0">Network 1</text>
        <text class="rtr-net-label" x="155" y="110" text-anchor="middle" fill="#64748b"
              font-size="11" font-family="'JetBrains Mono', monospace"
              opacity="0">192.168.1.x/24</text>

        <!-- Network 2 boundary -->
        <rect class="rtr-net" x="470" y="60" width="270" height="260" rx="12"
              fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="8 4"
              opacity="0" />
        <text class="rtr-net-label" x="605" y="90" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="600" font-family="Inter, sans-serif"
              opacity="0">Network 2</text>
        <text class="rtr-net-label" x="605" y="110" text-anchor="middle" fill="#64748b"
              font-size="11" font-family="'JetBrains Mono', monospace"
              opacity="0">192.168.2.x/24</text>

        <!-- Connection lines to router -->
        <line class="rtr-conn" x1="200" y1="200" x2="345" y2="170"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="rtr-conn" x1="415" y1="170" x2="560" y2="200"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Router (center) -->
        <g class="rtr-router" opacity="0">
          <rect x="345" y="140" width="70" height="60" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2.5" />
          <!-- Router crosshair icon -->
          <circle cx="380" cy="170" r="12" fill="none" stroke="#6366f1"
                  stroke-width="1.5" />
          <circle cx="380" cy="170" r="3" fill="#6366f1" />
          <!-- 4 directional arrows -->
          <line x1="380" y1="153" x2="380" y2="158" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" />
          <line x1="380" y1="182" x2="380" y2="187" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" />
          <line x1="363" y1="170" x2="368" y2="170" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" />
          <line x1="392" y1="170" x2="397" y2="170" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" />
          <!-- Arrowheads -->
          <polyline points="377,155 380,153 383,155" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <polyline points="377,185 380,187 383,185" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <polyline points="365,167 363,170 365,173" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <polyline points="395,167 397,170 395,173" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <text x="380" y="220" text-anchor="middle" fill="#f1f5f9"
                font-size="13" font-weight="600" font-family="Inter, sans-serif">Router</text>
        </g>
        <!-- Router glow -->
        <rect class="rtr-router-glow" x="345" y="140" width="70" height="60" rx="10"
              fill="none" stroke="#6366f1" stroke-width="3" opacity="0"
              filter="url(#rtr-glow-indigo)" />

        <!-- Host A (Network 1) -->
        <g class="rtr-host" opacity="0">
          <rect x="60" y="200" width="55" height="65" rx="6" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="87" y="226" text-anchor="middle" fill="#22d3ee"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">A</text>
          <text x="87" y="248" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="'JetBrains Mono', monospace">.1</text>
        </g>
        <rect class="rtr-hl-a" x="60" y="200" width="55" height="65" rx="6"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0"
              filter="url(#rtr-glow-cyan)" />

        <!-- Host B (Network 1) -->
        <g class="rtr-host" opacity="0">
          <rect x="130" y="200" width="55" height="65" rx="6" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="157" y="226" text-anchor="middle" fill="#22d3ee"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">B</text>
          <text x="157" y="248" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="'JetBrains Mono', monospace">.2</text>
        </g>

        <!-- Host C (Network 1) -->
        <g class="rtr-host" opacity="0">
          <rect x="200" y="200" width="55" height="65" rx="6" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="227" y="226" text-anchor="middle" fill="#22d3ee"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">C</text>
          <text x="227" y="248" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="'JetBrains Mono', monospace">.3</text>
        </g>

        <!-- Host D (Network 2) -->
        <g class="rtr-host" opacity="0">
          <rect x="555" y="200" width="55" height="65" rx="6" fill="#1f2937"
                stroke="#10b981" stroke-width="1.5" />
          <text x="582" y="226" text-anchor="middle" fill="#10b981"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">D</text>
          <text x="582" y="248" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="'JetBrains Mono', monospace">.1</text>
        </g>
        <rect class="rtr-hl-d" x="555" y="200" width="55" height="65" rx="6"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0"
              filter="url(#rtr-glow-green)" />

        <!-- Host E (Network 2) -->
        <g class="rtr-host" opacity="0">
          <rect x="625" y="200" width="55" height="65" rx="6" fill="#1f2937"
                stroke="#10b981" stroke-width="1.5" />
          <text x="652" y="226" text-anchor="middle" fill="#10b981"
                font-size="16" font-weight="700" font-family="Inter, sans-serif">E</text>
          <text x="652" y="248" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="'JetBrains Mono', monospace">.2</text>
        </g>

        <!-- Request packet -->
        <circle class="rtr-pkt-req" r="7" fill="#22d3ee" opacity="0" />
        <!-- Forward packet (after router) -->
        <circle class="rtr-pkt-fwd" r="7" fill="#6366f1" opacity="0" />
        <!-- Response packet back -->
        <circle class="rtr-pkt-res1" r="7" fill="#10b981" opacity="0" />
        <circle class="rtr-pkt-res2" r="7" fill="#6366f1" opacity="0" />

        <!-- Floating label -->
        <g class="rtr-label-group" opacity="0">
          <rect class="rtr-label-bg" x="-60" y="-15" width="120" height="24" rx="6"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" opacity="0.9" />
          <text class="rtr-label-text" x="0" y="3" text-anchor="middle"
                fill="#22d3ee" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">A → D</text>
        </g>
      </svg>
    </div>
  `,
})
export class RouterVisualComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.router-anim');
    const tl = this.createScrollTimeline(container);

    const nets = this.qa('.rtr-net');
    const netLabels = this.qa('.rtr-net-label');
    const router = this.q('.rtr-router');
    const hosts = this.qa('.rtr-host');
    const conns = this.qa('.rtr-conn');

    // 1. Network boundaries appear
    nets.forEach((net, i) => {
      tl.to(net, { opacity: 0.6, duration: 0.4, ease: 'power2.out' }, i * 0.15);
    });

    // 2. Network labels
    netLabels.forEach((label, i) => {
      tl.to(label, { opacity: 1, duration: 0.3 }, i * 0.08);
    });

    // 3. Router appears with bounce
    tl.fromTo(router,
      { opacity: 0, scale: 0.4, svgOrigin: '380 170' },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.3',
    );

    // 4. Connection lines draw in
    conns.forEach((conn) => {
      const el = conn as unknown as SVGLineElement;
      const x1 = parseFloat(el.getAttribute('x1') || '0');
      const y1 = parseFloat(el.getAttribute('y1') || '0');
      const x2 = parseFloat(el.getAttribute('x2') || '0');
      const y2 = parseFloat(el.getAttribute('y2') || '0');
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, {
        opacity: 1, strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut',
      }, '-=0.3');
    });

    // 5. Hosts appear
    hosts.forEach((host, i) => {
      tl.to(host, { opacity: 1, duration: 0.3, ease: 'power2.out' }, `-=${i === 0 ? 0.2 : 0.25}`);
    });

    // 6. Start loop
    tl.add(() => { this.startPacketLoop(); });
  }

  private startPacketLoop(): void {
    const container = this.q('.router-anim');
    const loop = this.createLoopingTimeline(container);

    const reqPkt = this.q('.rtr-pkt-req');
    const fwdPkt = this.q('.rtr-pkt-fwd');
    const resPkt1 = this.q('.rtr-pkt-res1');
    const resPkt2 = this.q('.rtr-pkt-res2');
    const routerGlow = this.q('.rtr-router-glow');
    const hlA = this.q('.rtr-hl-a');
    const hlD = this.q('.rtr-hl-d');
    const labelGroup = this.q('.rtr-label-group');
    const labelBg = this.q('.rtr-label-bg');
    const labelText = this.q('.rtr-label-text');

    const reqPath = '#rtr-path-req';
    const fwdPath = '#rtr-path-fwd';
    const resPath1 = '#rtr-path-res-1';
    const resPath2 = '#rtr-path-res-2';

    // Helper to change label
    const setLabel = (text: string, color: string, t: number) => {
      loop.to(labelGroup, { opacity: 0, duration: 0.1 }, t);
      loop.set(labelText, { textContent: text, attr: { fill: color } }, t + 0.1);
      loop.set(labelBg, { attr: { stroke: color } }, t + 0.1);
      loop.to(labelGroup, { opacity: 1, duration: 0.1 }, t + 0.1);
    };

    // === REQUEST: A → Router ===

    // Highlight Host A
    loop.to(hlA, { opacity: 1, duration: 0.2 }, 0);
    loop.to(hlA, { opacity: 0, duration: 0.3 }, 0.4);

    // Show label
    loop.set(labelGroup, { x: 155, y: 185 });
    loop.set(labelText, { textContent: 'A \u2192 D', attr: { fill: '#22d3ee' } });
    loop.set(labelBg, { attr: { stroke: '#22d3ee' } });
    loop.fromTo(labelGroup,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
      0,
    );

    // Packet travels A → Router
    loop.fromTo(reqPkt,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.1,
        motionPath: { path: reqPath, align: reqPath, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
      },
      0.2,
    );
    loop.to(reqPkt, {
      motionPath: { path: reqPath, align: reqPath, alignOrigin: [0.5, 0.5] },
      duration: 1.0, ease: 'power1.inOut',
    }, 0.3);
    loop.to(reqPkt, { opacity: 0, duration: 0.1 }, 1.2);

    // Move label with packet
    loop.fromTo(labelGroup,
      { x: 155, y: 185 },
      { x: 260, y: 145, duration: 0.8, ease: 'power1.inOut' },
      0.3,
    );
    loop.to(labelGroup, { opacity: 0, duration: 0.15 }, 1.1);

    // === Router processes: glow + label change ===
    loop.to(routerGlow, { opacity: 1, duration: 0.15 }, 1.3);
    loop.to(routerGlow, { opacity: 0.3, duration: 0.12, yoyo: true, repeat: 1 }, 1.45);
    loop.to(routerGlow, { opacity: 0, duration: 0.2 }, 1.7);

    // === FORWARD: Router → D ===
    setLabel('Routing \u2192 D', '#6366f1', 1.5);
    loop.fromTo(labelGroup,
      { x: 380, y: 135 },
      { x: 500, y: 145, duration: 0.8, ease: 'power1.inOut' },
      1.7,
    );

    loop.fromTo(fwdPkt,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.1,
        motionPath: { path: fwdPath, align: fwdPath, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
      },
      1.7,
    );
    loop.to(fwdPkt, {
      motionPath: { path: fwdPath, align: fwdPath, alignOrigin: [0.5, 0.5] },
      duration: 1.0, ease: 'power1.inOut',
    }, 1.8);
    loop.to(fwdPkt, { opacity: 0, duration: 0.1 }, 2.7);
    loop.to(labelGroup, { opacity: 0, duration: 0.15 }, 2.5);

    // Highlight Host D
    loop.to(hlD, { opacity: 1, duration: 0.2 }, 2.8);
    loop.to(hlD, { opacity: 0.4, duration: 0.15, yoyo: true, repeat: 1 }, 3.0);
    loop.to(hlD, { opacity: 0, duration: 0.3 }, 3.4);

    // === RESPONSE: D → Router ===
    setLabel('D \u2192 A', '#10b981', 3.5);
    loop.fromTo(labelGroup,
      { x: 600, y: 185 },
      { x: 490, y: 145, duration: 0.8, ease: 'power1.inOut' },
      3.6,
    );

    loop.fromTo(resPkt1,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.1,
        motionPath: { path: resPath1, align: resPath1, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
      },
      3.6,
    );
    loop.to(resPkt1, {
      motionPath: { path: resPath1, align: resPath1, alignOrigin: [0.5, 0.5] },
      duration: 1.0, ease: 'power1.inOut',
    }, 3.7);
    loop.to(resPkt1, { opacity: 0, duration: 0.1 }, 4.6);
    loop.to(labelGroup, { opacity: 0, duration: 0.15 }, 4.4);

    // Router processes response
    loop.to(routerGlow, { opacity: 0.8, duration: 0.15 }, 4.7);
    loop.to(routerGlow, { opacity: 0, duration: 0.2 }, 4.9);

    // === FORWARD BACK: Router → A ===
    setLabel('Routing \u2192 A', '#6366f1', 4.9);
    loop.fromTo(labelGroup,
      { x: 380, y: 135 },
      { x: 260, y: 145, duration: 0.8, ease: 'power1.inOut' },
      5.1,
    );

    loop.fromTo(resPkt2,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.1,
        motionPath: { path: resPath2, align: resPath2, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
      },
      5.1,
    );
    loop.to(resPkt2, {
      motionPath: { path: resPath2, align: resPath2, alignOrigin: [0.5, 0.5] },
      duration: 1.0, ease: 'power1.inOut',
    }, 5.2);
    loop.to(resPkt2, { opacity: 0, duration: 0.1 }, 6.1);
    loop.to(labelGroup, { opacity: 0, duration: 0.15 }, 5.9);

    // Highlight Host A on receive
    loop.to(hlA, { opacity: 1, duration: 0.2 }, 6.2);
    loop.to(hlA, { opacity: 0.4, duration: 0.15, yoyo: true, repeat: 1 }, 6.4);
    loop.to(hlA, { opacity: 0, duration: 0.3 }, 6.7);

    // Gap before restart
    loop.to({}, { duration: 1.2 });

    loop.play();
  }
}
