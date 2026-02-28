import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-udp-comm',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .udp-comm {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .udp-comm svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="udp-comm">
      <svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="udp-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="28" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.6">UDP Stateless Communication</text>

        <!-- Client -->
        <g class="udp-client" opacity="0">
          <rect x="50" y="100" width="120" height="100" rx="14" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2.5" />
          <text x="110" y="135" text-anchor="middle" fill="#22d3ee"
                font-size="13" font-weight="700" font-family="Inter, sans-serif">Client</text>
          <text x="110" y="155" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="'JetBrains Mono', monospace">10.0.0.1</text>
          <text x="110" y="175" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">App1 :5555</text>
        </g>

        <!-- Server -->
        <g class="udp-server" opacity="0">
          <rect x="530" y="100" width="120" height="100" rx="14" fill="#1f2937"
                stroke="#6366f1" stroke-width="2.5" />
          <text x="590" y="135" text-anchor="middle" fill="#6366f1"
                font-size="13" font-weight="700" font-family="Inter, sans-serif">DNS Server</text>
          <text x="590" y="155" text-anchor="middle" fill="#94a3b8"
                font-size="10" font-family="'JetBrains Mono', monospace">10.0.0.2</text>
          <text x="590" y="175" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">AppX :53</text>
        </g>

        <!-- Connection line -->
        <line class="udp-conn" x1="170" y1="150" x2="530" y2="150"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />

        <!-- No handshake label -->
        <g class="udp-no-handshake" opacity="0">
          <rect x="270" y="62" width="160" height="26" rx="6"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="350" y="80" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">No Handshake Needed</text>
        </g>

        <!-- REQUEST packet info -->
        <g class="udp-req-info" opacity="0">
          <rect x="200" y="210" width="300" height="72" rx="8"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
          <text x="215" y="230" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">REQUEST</text>
          <text x="215" y="248" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">Src: 10.0.0.1:5555</text>
          <text x="215" y="264" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">Dst: 10.0.0.2:53</text>
          <text x="385" y="248" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">Data: DNS Query</text>
          <text x="385" y="264" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">No connection state</text>
        </g>

        <!-- RESPONSE packet info -->
        <g class="udp-res-info" opacity="0">
          <rect x="200" y="295" width="300" height="72" rx="8"
                fill="#0f172a" stroke="#6366f1" stroke-width="1.5" />
          <text x="215" y="315" fill="#6366f1"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">RESPONSE</text>
          <text x="215" y="333" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">Src: 10.0.0.2:53</text>
          <text x="215" y="349" fill="#94a3b8"
                font-size="9" font-family="'JetBrains Mono', monospace">Dst: 10.0.0.1:5555</text>
          <text x="385" y="333" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">Data: DNS Response</text>
          <text x="385" y="349" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">IPs &amp; ports flipped</text>
        </g>

        <!-- Packet dots -->
        <circle class="udp-pkt-req" r="8" fill="#22d3ee" opacity="0" filter="url(#udp-glow)" />
        <circle class="udp-pkt-res" r="8" fill="#6366f1" opacity="0" filter="url(#udp-glow)" />

        <!-- "Send & Forget" label -->
        <g class="udp-forget-label" opacity="0">
          <text x="350" y="390" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="Inter, sans-serif">
            No acknowledgment, no retransmission — send and forget
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class UdpCommComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.udp-comm');
    const tl = this.createScrollTimeline(container);

    const client = this.q('.udp-client');
    const server = this.q('.udp-server');
    const conn = this.q('.udp-conn');
    const noHandshake = this.q('.udp-no-handshake');
    const forgetLabel = this.q('.udp-forget-label');

    // 1. Client and server appear
    tl.fromTo(client, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    tl.fromTo(
      server,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3',
    );

    // 2. Connection line
    const connEl = conn as unknown as SVGLineElement;
    tl.set(connEl, { strokeDasharray: 360, strokeDashoffset: 360 });
    tl.to(connEl, { opacity: 1, strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.2');

    // 3. No handshake label
    tl.fromTo(
      noHandshake,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );

    // 4. Forget label
    tl.to(forgetLabel, { opacity: 1, duration: 0.3 });

    // 5. Start packet loop
    tl.add(() => {
      this.startCommLoop();
    });
  }

  private startCommLoop(): void {
    const container = this.q('.udp-comm');
    const loop = this.createLoopingTimeline(container);

    const pktReq = this.q('.udp-pkt-req');
    const pktRes = this.q('.udp-pkt-res');
    const reqInfo = this.q('.udp-req-info');
    const resInfo = this.q('.udp-res-info');

    const clientX = 170;
    const serverX = 530;
    const lineY = 150;

    // === REQUEST ===
    // Show request info
    loop.fromTo(reqInfo, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 0);

    // Packet travels right
    loop.fromTo(
      pktReq,
      { attr: { cx: clientX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0.1,
    );
    loop.to(pktReq, { attr: { cx: serverX }, duration: 0.8, ease: 'power2.inOut' }, 0.2);
    loop.to(pktReq, { opacity: 0, duration: 0.1 }, 1.0);

    // Dim request info
    loop.to(reqInfo, { opacity: 0.3, duration: 0.3 }, 1.3);

    // === RESPONSE ===
    // Show response info
    loop.fromTo(resInfo, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 1.5);

    // Packet travels left
    loop.fromTo(
      pktRes,
      { attr: { cx: serverX, cy: lineY }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      1.6,
    );
    loop.to(pktRes, { attr: { cx: clientX }, duration: 0.8, ease: 'power2.inOut' }, 1.7);
    loop.to(pktRes, { opacity: 0, duration: 0.1 }, 2.5);

    // Hold
    loop.to({}, { duration: 1.2 });

    // Fade out everything
    loop.to([reqInfo, resInfo], { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
