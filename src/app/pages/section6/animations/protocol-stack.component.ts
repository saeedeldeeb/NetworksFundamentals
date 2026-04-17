import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-protocol-stack',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ps-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .ps-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="ps-wrap">
      <svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="ps-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#475569" />
          </marker>
        </defs>

        <!-- Layer 4: Link (L2) — bottom -->
        <g class="ps-l2" opacity="0">
          <rect x="20" y="270" width="600" height="52" rx="8"
                fill="rgba(100,116,139,0.12)" stroke="#475569" stroke-width="1.5" />
          <text x="36" y="291" fill="#94a3b8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">L2 · LINK</text>
          <text x="36" y="308" fill="#64748b" font-size="8.5" font-family="Inter, sans-serif">
            Ethernet · Wi-Fi · Fiber
          </text>
        </g>

        <!-- Layer 3: IP (L3) -->
        <g class="ps-l3" opacity="0">
          <rect x="20" y="210" width="600" height="52" rx="8"
                fill="rgba(99,102,241,0.10)" stroke="#6366f1" stroke-width="1.5" />
          <text x="36" y="231" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">L3 · NETWORK</text>
          <text x="36" y="248" fill="#6366f1" font-size="10" font-weight="700"
                font-family="'JetBrains Mono', monospace">IP</text>
          <text x="72" y="248" fill="#64748b" font-size="8.5" font-family="Inter, sans-serif">
            — routes packets between networks
          </text>
        </g>

        <!-- Layer 4: Transport (L4) -->
        <g class="ps-l4" opacity="0">
          <rect x="20" y="148" width="600" height="54" rx="8"
                fill="rgba(34,211,238,0.09)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="36" y="169" fill="#67e8f9" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">L4 · TRANSPORT</text>
          <!-- TCP chip -->
          <rect x="36" y="176" width="52" height="18" rx="5"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1" />
          <text x="62" y="189" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="700"
                font-family="'JetBrains Mono', monospace">TCP</text>
          <!-- UDP chip -->
          <rect x="98" y="176" width="52" height="18" rx="5"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1" />
          <text x="124" y="189" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="700"
                font-family="'JetBrains Mono', monospace">UDP</text>
        </g>

        <!-- Layer 5+: Application -->
        <g class="ps-l5" opacity="0">
          <rect x="20" y="20" width="600" height="120" rx="8"
                fill="rgba(16,185,129,0.07)" stroke="#10b981" stroke-width="1.5" />
          <text x="36" y="41" fill="#6ee7b7" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.06em">L5–7 · APPLICATION</text>

          <!-- TCP-based protocols -->
          <text x="36" y="62" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">via TCP</text>

          <!-- protocol chips - TCP side -->
          <g class="ps-chips-tcp" opacity="0">
            <rect x="36"  y="68" width="56" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="64"  y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">HTTP</text>

            <rect x="100" y="68" width="62" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="131" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">HTTPS</text>

            <rect x="170" y="68" width="42" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="191" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">SSH</text>

            <rect x="220" y="68" width="38" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="239" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">TLS</text>

            <rect x="266" y="68" width="76" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="304" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">WebSocket</text>

            <rect x="350" y="68" width="40" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="370" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">FTP</text>

            <rect x="398" y="68" width="50" height="18" rx="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" />
            <text x="423" y="81" text-anchor="middle" fill="#10b981" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">SMTP</text>
          </g>

          <!-- UDP-based protocols -->
          <text x="36" y="111" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">via UDP</text>

          <g class="ps-chips-udp" opacity="0">
            <rect x="36"  y="117" width="40" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="56"  y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">DNS</text>

            <rect x="84"  y="117" width="50" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="109" y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">DHCP</text>

            <rect x="142" y="117" width="48" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="166" y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">QUIC</text>

            <rect x="198" y="117" width="58" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="227" y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">HTTP/3</text>

            <rect x="264" y="117" width="58" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="293" y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">WebRTC</text>

            <rect x="330" y="117" width="38" height="18" rx="5" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1" />
            <text x="349" y="130" text-anchor="middle" fill="#a78bfa" font-size="8.5" font-weight="700" font-family="'JetBrains Mono', monospace">RTP</text>
          </g>
        </g>
      </svg>
    </div>
  `,
})
export class ProtocolStackComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ps-wrap');
    const tl = this.createScrollTimeline(container);

    // Layers slide up from below and fade in
    tl.fromTo(this.q('.ps-l2'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    tl.fromTo(this.q('.ps-l3'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15');
    tl.fromTo(this.q('.ps-l4'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15');
    tl.fromTo(this.q('.ps-l5'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15');

    // Protocol chips appear
    tl.fromTo(this.q('.ps-chips-tcp'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }, '+=0.1');
    tl.fromTo(this.q('.ps-chips-udp'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }, '-=0.1');
  }
}
