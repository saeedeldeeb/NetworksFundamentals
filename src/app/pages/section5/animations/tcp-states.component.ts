import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-states',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-states {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-states svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-states">
      <svg viewBox="0 0 720 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="st-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood flood-color="#22d3ee" flood-opacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="st-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood flood-color="#10b981" flood-opacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="st-glow-amber">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood flood-color="#f59e0b" flood-opacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="st-arr" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#475569" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="360" y="20" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Connection State Machine</text>

        <!-- Column labels -->
        <g class="st-cols" opacity="0">
          <text x="180" y="46" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Client (Active Close)</text>
          <text x="540" y="46" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Server (Passive Close)</text>
        </g>

        <!-- Timeline lines -->
        <line class="st-tl-l" x1="180" y1="55" x2="180" y2="455"
              stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4" opacity="0" />
        <line class="st-tl-r" x1="540" y1="55" x2="540" y2="455"
              stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4" opacity="0" />

        <!-- ===== State Nodes ===== -->

        <!-- ESTABLISHED (both) -->
        <g class="st-established" opacity="0">
          <rect x="105" y="60" width="150" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.5" />
          <text x="180" y="80" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">ESTABLISHED</text>

          <rect x="465" y="60" width="150" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.5" />
          <text x="540" y="80" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">ESTABLISHED</text>
        </g>

        <!-- FIN arrow → -->
        <g class="st-fin1" opacity="0">
          <line x1="210" y1="110" x2="510" y2="130"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#st-arr)" />
          <rect x="310" y="104" width="100" height="18" rx="4"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="360" y="116" text-anchor="middle" fill="#ef4444"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">FIN</text>
        </g>

        <!-- FIN_WAIT_1 -->
        <g class="st-finwait1" opacity="0">
          <rect x="105" y="120" width="150" height="30" rx="6"
                fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="180" y="140" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">FIN_WAIT_1</text>
        </g>

        <!-- CLOSE_WAIT -->
        <g class="st-closewait" opacity="0">
          <rect x="465" y="130" width="150" height="30" rx="6"
                fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" stroke-width="1.5" />
          <text x="540" y="150" text-anchor="middle" fill="#ec4899"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">CLOSE_WAIT</text>
        </g>

        <!-- ACK ← -->
        <g class="st-ack1" opacity="0">
          <line x1="510" y1="180" x2="210" y2="200"
                stroke="#6366f1" stroke-width="1.5" marker-end="url(#st-arr)" />
          <rect x="310" y="174" width="100" height="18" rx="4"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="360" y="186" text-anchor="middle" fill="#6366f1"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">ACK</text>
        </g>

        <!-- FIN_WAIT_2 -->
        <g class="st-finwait2" opacity="0">
          <rect x="105" y="200" width="150" height="30" rx="6"
                fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="180" y="220" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">FIN_WAIT_2</text>
        </g>

        <!-- Server finishes label -->
        <g class="st-server-finish" opacity="0">
          <text x="540" y="210" text-anchor="middle" fill="#475569"
                font-size="7" font-style="italic" font-family="Inter, sans-serif">Server finishes up...</text>
        </g>

        <!-- FIN ← -->
        <g class="st-fin2" opacity="0">
          <line x1="510" y1="250" x2="210" y2="270"
                stroke="#6366f1" stroke-width="1.5" marker-end="url(#st-arr)" />
          <rect x="310" y="244" width="100" height="18" rx="4"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="360" y="256" text-anchor="middle" fill="#6366f1"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">FIN</text>
        </g>

        <!-- LAST_ACK -->
        <g class="st-lastack" opacity="0">
          <rect x="465" y="245" width="150" height="30" rx="6"
                fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" stroke-width="1.5" />
          <text x="540" y="265" text-anchor="middle" fill="#ec4899"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">LAST_ACK</text>
        </g>

        <!-- TIME_WAIT -->
        <g class="st-timewait" opacity="0">
          <rect x="95" y="280" width="170" height="36" rx="8"
                fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="2" />
          <text x="180" y="302" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">TIME_WAIT</text>
        </g>

        <!-- ACK → -->
        <g class="st-ack2" opacity="0">
          <line x1="210" y1="330" x2="510" y2="350"
                stroke="#22d3ee" stroke-width="1.5" marker-end="url(#st-arr)" />
          <rect x="310" y="324" width="100" height="18" rx="4"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="360" y="336" text-anchor="middle" fill="#22d3ee"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">ACK (final)</text>
        </g>

        <!-- Server CLOSED -->
        <g class="st-server-closed" opacity="0">
          <rect x="465" y="350" width="150" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" />
          <text x="540" y="370" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">CLOSED</text>
        </g>

        <!-- 2xMSL wait -->
        <g class="st-msl" opacity="0">
          <line x1="180" y1="318" x2="180" y2="395"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2" />
          <text x="180" y="388" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">wait 2 × MSL (~4 min)</text>
        </g>

        <!-- Client CLOSED -->
        <g class="st-client-closed" opacity="0">
          <rect x="105" y="400" width="150" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" />
          <text x="180" y="420" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">CLOSED</text>
        </g>

        <!-- Active state highlight (moves to current state) -->
        <rect class="st-highlight" x="105" y="60" width="150" height="30" rx="6"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" />

        <!-- Bottom rule -->
        <g class="st-rule" opacity="0">
          <rect x="140" y="448" width="440" height="24" rx="6"
                fill="rgba(245, 158, 11, 0.06)" stroke="#f59e0b" stroke-width="1" />
          <text x="360" y="464" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            Whoever sends the first FIN ends up in TIME_WAIT
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class TcpStatesComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-states');
    const tl = this.createScrollTimeline(container);

    // Columns + timelines
    tl.to(this.q('.st-cols'), { opacity: 1, duration: 0.3 });
    tl.to(this.q('.st-tl-l'), { opacity: 1, duration: 0.2 }, '-=0.15');
    tl.to(this.q('.st-tl-r'), { opacity: 1, duration: 0.2 }, '-=0.15');
    tl.to(this.q('.st-rule'), { opacity: 1, duration: 0.3 });

    // Start animation loop
    tl.add(() => this.startStateLoop());
  }

  private startStateLoop(): void {
    const container = this.q('.tcp-states');
    const loop = this.createLoopingTimeline(container);
    const hl = this.q('.st-highlight');

    // ESTABLISHED
    loop.fromTo(this.q('.st-established'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
    loop.set(hl, { attr: { x: 105, y: 60, width: 150, height: 30 }, opacity: 0 }, 0);
    loop.to(hl, { opacity: 1, duration: 0.2 }, 0.1);

    // FIN →
    loop.fromTo(this.q('.st-fin1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.6);

    // FIN_WAIT_1
    loop.fromTo(this.q('.st-finwait1'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 0.8);
    loop.to(hl, { attr: { x: 105, y: 120 }, duration: 0.3, ease: 'power2.inOut' }, 0.8);

    // CLOSE_WAIT
    loop.fromTo(this.q('.st-closewait'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 0.9);

    // ACK ←
    loop.fromTo(this.q('.st-ack1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.2);

    // FIN_WAIT_2
    loop.fromTo(this.q('.st-finwait2'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 1.4);
    loop.to(hl, { attr: { x: 105, y: 200 }, duration: 0.3, ease: 'power2.inOut' }, 1.4);
    loop.fromTo(this.q('.st-server-finish'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.5);

    // FIN ←
    loop.fromTo(this.q('.st-fin2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.9);

    // LAST_ACK
    loop.fromTo(this.q('.st-lastack'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 2.0);

    // TIME_WAIT (highlight becomes amber)
    loop.fromTo(this.q('.st-timewait'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 2.1);
    loop.to(hl, { attr: { x: 95, y: 280, width: 170, height: 36, stroke: '#f59e0b' }, duration: 0.3, ease: 'power2.inOut' }, 2.1);

    // ACK → (final)
    loop.fromTo(this.q('.st-ack2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.5);

    // Server CLOSED
    loop.fromTo(this.q('.st-server-closed'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 2.7);

    // 2xMSL wait
    loop.fromTo(this.q('.st-msl'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.9);

    // Client CLOSED
    loop.fromTo(this.q('.st-client-closed'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 3.4);
    loop.to(hl, { attr: { x: 105, y: 400, width: 150, height: 30, stroke: '#10b981' }, duration: 0.4, ease: 'power2.inOut' }, 3.4);

    // Hold
    loop.to({}, { duration: 2.5 });

    // Fade out
    const allEls = [
      '.st-established', '.st-fin1', '.st-finwait1', '.st-closewait',
      '.st-ack1', '.st-finwait2', '.st-server-finish', '.st-fin2',
      '.st-lastack', '.st-timewait', '.st-ack2', '.st-server-closed',
      '.st-msl', '.st-client-closed',
    ].map(s => this.q(s));
    loop.to([...allEls, hl], { opacity: 0, duration: 0.4 });
    // Reset highlight color for next loop
    loop.set(hl, { attr: { stroke: '#22d3ee' } });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
