import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-nat-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .nat-flow {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .nat-flow svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="nat-flow">
      <svg viewBox="0 0 720 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="nat-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="nat-arr-out" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#22d3ee" />
          </marker>
          <marker id="nat-arr-in" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="360" y="20" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">NAT — Network Address Translation</text>

        <!-- ====== TOP ROW: Laptop → Router → Server (horizontal) ====== -->

        <!-- Laptop -->
        <g class="nat-laptop" opacity="0">
          <rect x="30" y="50" width="130" height="70" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="95" y="74" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Laptop</text>
          <text x="95" y="92" text-anchor="middle" fill="#94a3b8"
                font-size="7.5" font-family="'JetBrains Mono', monospace">192.168.1.20</text>
          <text x="95" y="106" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">port 8992</text>
        </g>

        <!-- Other devices (small, below laptop) -->
        <g class="nat-others" opacity="0">
          <rect x="30" y="128" width="58" height="22" rx="5" fill="#1f2937"
                stroke="#374151" stroke-width="1" />
          <text x="59" y="142" text-anchor="middle" fill="#475569"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Phone</text>
          <rect x="96" y="128" width="64" height="22" rx="5" fill="#1f2937"
                stroke="#374151" stroke-width="1" />
          <text x="128" y="142" text-anchor="middle" fill="#475569"
                font-size="6.5" font-family="'JetBrains Mono', monospace">TV, IoT...</text>
          <text x="95" y="163" text-anchor="middle" fill="#374151"
                font-size="6.5" font-style="italic" font-family="Inter, sans-serif">All share 1 public IP</text>
        </g>

        <!-- NAT Router -->
        <g class="nat-router" opacity="0">
          <rect x="270" y="42" width="180" height="86" rx="12" fill="#1f2937"
                stroke="#f59e0b" stroke-width="2.5" />
          <text x="360" y="66" text-anchor="middle" fill="#f59e0b"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">NAT Router</text>
          <line x1="290" y1="78" x2="430" y2="78" stroke="#374151" stroke-width="1" />
          <text x="310" y="94" fill="#94a3b8"
                font-size="7" font-family="'JetBrains Mono', monospace">Priv: 192.168.1.1</text>
          <text x="310" y="108" fill="#10b981"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Pub:  44.11.5.17</text>
        </g>

        <!-- Google Server -->
        <g class="nat-server" opacity="0">
          <rect x="560" y="50" width="130" height="70" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="625" y="74" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Google</text>
          <text x="625" y="92" text-anchor="middle" fill="#94a3b8"
                font-size="7.5" font-family="'JetBrains Mono', monospace">55.11.22.33</text>
          <text x="625" y="106" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">port 443</text>
        </g>

        <!-- Static connection lines (always visible after init) -->
        <line class="nat-link-l" x1="160" y1="85" x2="270" y2="85"
              stroke="#374151" stroke-width="1" stroke-dasharray="4,3" opacity="0" />
        <line class="nat-link-r" x1="450" y1="85" x2="560" y2="85"
              stroke="#374151" stroke-width="1" stroke-dasharray="4,3" opacity="0" />

        <!-- ====== OUTGOING PATH (top arrows) ====== -->

        <!-- Step 1 label: packet leaves laptop -->
        <g class="nat-out-1" opacity="0">
          <rect x="42" y="180" width="108" height="36" rx="5"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="96" y="194" text-anchor="middle" fill="#22d3ee"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">Src 192.168.1.20:8992</text>
          <text x="96" y="208" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Dst 55.11.22.33:443</text>
        </g>

        <!-- Outgoing arrow: laptop → router -->
        <g class="nat-out-arr1" opacity="0">
          <line x1="160" y1="198" x2="268" y2="198"
                stroke="#22d3ee" stroke-width="2" marker-end="url(#nat-arr-out)" />
          <text x="214" y="192" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="700" font-family="Inter, sans-serif">1</text>
        </g>

        <!-- Step 2 label: router rewrites -->
        <g class="nat-out-2" opacity="0">
          <rect x="280" y="180" width="160" height="36" rx="5"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="360" y="194" text-anchor="middle" fill="#f59e0b"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">REWRITE &rarr; Src 44.11.5.17:7777</text>
          <text x="360" y="208" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Dst 55.11.22.33:443</text>
        </g>

        <!-- Outgoing arrow: router → server -->
        <g class="nat-out-arr2" opacity="0">
          <line x1="440" y1="198" x2="558" y2="198"
                stroke="#22d3ee" stroke-width="2" marker-end="url(#nat-arr-out)" />
          <text x="499" y="192" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="700" font-family="Inter, sans-serif">2</text>
        </g>

        <!-- Arrived label at server -->
        <g class="nat-out-3" opacity="0">
          <rect x="568" y="180" width="114" height="36" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="625" y="194" text-anchor="middle" fill="#6366f1"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">Server sees only</text>
          <text x="625" y="208" text-anchor="middle" fill="#94a3b8"
                font-size="6.5" font-family="'JetBrains Mono', monospace">44.11.5.17:7777</text>
        </g>

        <!-- ====== NAT TABLE (center) ====== -->
        <g class="nat-table" opacity="0">
          <rect x="155" y="230" width="410" height="36" rx="7"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="360" y="244" text-anchor="middle" fill="#f59e0b"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">NAT Table</text>
          <text x="210" y="258" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">192.168.1.20:8992</text>
          <text x="340" y="258" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="'JetBrains Mono', monospace">&harr;</text>
          <text x="380" y="258" fill="#10b981" font-size="6.5"
                font-family="'JetBrains Mono', monospace">44.11.5.17:7777</text>
          <text x="492" y="258" fill="#6366f1" font-size="6.5"
                font-family="'JetBrains Mono', monospace">55.11.22.33:443</text>
        </g>

        <!-- ====== RETURN PATH (bottom arrows) ====== -->

        <!-- Step 3 label: server responds -->
        <g class="nat-ret-1" opacity="0">
          <rect x="568" y="284" width="114" height="36" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="625" y="298" text-anchor="middle" fill="#6366f1"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">Src 55.11.22.33:443</text>
          <text x="625" y="312" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Dst 44.11.5.17:7777</text>
        </g>

        <!-- Return arrow: server → router -->
        <g class="nat-ret-arr1" opacity="0">
          <line x1="558" y1="302" x2="442" y2="302"
                stroke="#10b981" stroke-width="2" marker-end="url(#nat-arr-in)" />
          <text x="500" y="296" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="700" font-family="Inter, sans-serif">3</text>
        </g>

        <!-- Step 4 label: router translates back -->
        <g class="nat-ret-2" opacity="0">
          <rect x="280" y="284" width="160" height="36" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
          <text x="360" y="298" text-anchor="middle" fill="#10b981"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">REWRITE &rarr; Dst 192.168.1.20:8992</text>
          <text x="360" y="312" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Src 55.11.22.33:443</text>
        </g>

        <!-- Return arrow: router → laptop -->
        <g class="nat-ret-arr2" opacity="0">
          <line x1="268" y1="302" x2="152" y2="302"
                stroke="#10b981" stroke-width="2" marker-end="url(#nat-arr-in)" />
          <text x="210" y="296" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="700" font-family="Inter, sans-serif">4</text>
        </g>

        <!-- Delivered label at laptop -->
        <g class="nat-ret-3" opacity="0">
          <rect x="42" y="284" width="108" height="36" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="96" y="298" text-anchor="middle" fill="#10b981"
                font-size="6.5" font-weight="700" font-family="'JetBrains Mono', monospace">Delivered!</text>
          <text x="96" y="312" text-anchor="middle" fill="#94a3b8"
                font-size="6.5" font-family="'JetBrains Mono', monospace">Dst 192.168.1.20:8992</text>
        </g>

        <!-- ====== LEGEND ====== -->
        <g class="nat-legend" opacity="0">
          <line x1="120" y1="350" x2="150" y2="350"
                stroke="#22d3ee" stroke-width="2" marker-end="url(#nat-arr-out)" />
          <text x="158" y="354" fill="#94a3b8" font-size="7.5"
                font-family="Inter, sans-serif">Outgoing (private &rarr; public)</text>

          <line x1="370" y1="350" x2="400" y2="350"
                stroke="#10b981" stroke-width="2" marker-end="url(#nat-arr-in)" />
          <text x="408" y="354" fill="#94a3b8" font-size="7.5"
                font-family="Inter, sans-serif">Return (public &rarr; private)</text>

          <text x="360" y="382" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="Inter, sans-serif">
            Google never sees 192.168.1.20 — it only communicates with 44.11.5.17
          </text>
        </g>

        <!-- Animated packet dots -->
        <circle class="nat-pkt-out" cx="160" cy="198" r="5" fill="#22d3ee" opacity="0" filter="url(#nat-glow)" />
        <circle class="nat-pkt-ret" cx="558" cy="302" r="5" fill="#10b981" opacity="0" filter="url(#nat-glow)" />
      </svg>
    </div>
  `,
})
export class NatFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.nat-flow');
    const tl = this.createScrollTimeline(container);

    // Show topology: left to right
    tl.fromTo(this.q('.nat-laptop'), { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.35 });
    tl.fromTo(this.q('.nat-others'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.15');
    tl.to(this.q('.nat-link-l'), { opacity: 1, duration: 0.2 }, '-=0.1');
    tl.fromTo(this.q('.nat-router'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.to(this.q('.nat-link-r'), { opacity: 1, duration: 0.2 }, '-=0.1');
    tl.fromTo(this.q('.nat-server'), { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.nat-legend'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Start loop
    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.nat-flow');
    const loop = this.createLoopingTimeline(container);

    const pktOut = this.q('.nat-pkt-out');
    const pktRet = this.q('.nat-pkt-ret');

    // ===== OUTGOING PATH =====

    // Step 1: Packet leaves laptop
    loop.fromTo(this.q('.nat-out-1'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2 }, 0);
    loop.fromTo(this.q('.nat-out-arr1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.15);

    // Dot: laptop → router
    loop.set(pktOut, { attr: { cx: 160, cy: 198 }, opacity: 0 }, 0.15);
    loop.to(pktOut, { opacity: 1, duration: 0.05 }, 0.15);
    loop.to(pktOut, { attr: { cx: 268 }, duration: 0.35, ease: 'power1.in' }, 0.2);
    loop.to(pktOut, { opacity: 0, duration: 0.05 }, 0.55);

    // Step 2: Router rewrites
    loop.fromTo(this.q('.nat-out-2'), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.2 }, 0.6);
    loop.fromTo(this.q('.nat-out-arr2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.75);

    // Dot: router → server
    loop.set(pktOut, { attr: { cx: 440, cy: 198 }, opacity: 0 }, 0.75);
    loop.to(pktOut, { opacity: 1, duration: 0.05 }, 0.75);
    loop.to(pktOut, { attr: { cx: 558 }, duration: 0.35, ease: 'power1.in' }, 0.8);
    loop.to(pktOut, { opacity: 0, duration: 0.05 }, 1.15);

    // Server receives
    loop.fromTo(this.q('.nat-out-3'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.2);

    // NAT table appears
    loop.fromTo(this.q('.nat-table'), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.25 }, 1.4);

    // ===== RETURN PATH =====

    // Step 3: Server responds
    loop.fromTo(this.q('.nat-ret-1'), { opacity: 0, x: 8 }, { opacity: 1, x: 0, duration: 0.2 }, 1.8);
    loop.fromTo(this.q('.nat-ret-arr1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.95);

    // Dot: server → router
    loop.set(pktRet, { attr: { cx: 558, cy: 302 }, opacity: 0 }, 1.95);
    loop.to(pktRet, { opacity: 1, duration: 0.05 }, 1.95);
    loop.to(pktRet, { attr: { cx: 442 }, duration: 0.35, ease: 'power1.in' }, 2.0);
    loop.to(pktRet, { opacity: 0, duration: 0.05 }, 2.35);

    // Step 4: Router translates back
    loop.fromTo(this.q('.nat-ret-2'), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.2 }, 2.4);
    loop.fromTo(this.q('.nat-ret-arr2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.55);

    // Dot: router → laptop
    loop.set(pktRet, { attr: { cx: 268, cy: 302 }, opacity: 0 }, 2.55);
    loop.to(pktRet, { opacity: 1, duration: 0.05 }, 2.55);
    loop.to(pktRet, { attr: { cx: 152 }, duration: 0.35, ease: 'power1.in' }, 2.6);
    loop.to(pktRet, { opacity: 0, duration: 0.05 }, 2.95);

    // Delivered!
    loop.fromTo(this.q('.nat-ret-3'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 3.0);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade out all step elements
    const allEls = [
      '.nat-out-1', '.nat-out-arr1', '.nat-out-2', '.nat-out-arr2', '.nat-out-3',
      '.nat-table',
      '.nat-ret-1', '.nat-ret-arr1', '.nat-ret-2', '.nat-ret-arr2', '.nat-ret-3',
    ].map(s => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
