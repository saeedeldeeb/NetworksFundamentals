import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-data-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-df {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-df svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-df">
      <svg viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="df-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="df-arrow-r" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#22d3ee" />
          </marker>
          <marker id="df-arrow-l" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Data Flow &amp; Retransmission</text>

        <!-- Client -->
        <g class="df-client" opacity="0">
          <rect x="40" y="42" width="110" height="60" rx="12" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="95" y="68" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Client</text>
          <text x="95" y="86" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Sender</text>
        </g>

        <!-- Server -->
        <g class="df-server" opacity="0">
          <rect x="550" y="42" width="110" height="60" rx="12" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="605" y="68" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Server</text>
          <text x="605" y="86" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Receiver</text>
        </g>

        <!-- Timeline lines -->
        <line class="df-tl-l" x1="95" y1="102" x2="95" y2="340"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />
        <line class="df-tl-r" x1="605" y1="102" x2="605" y2="340"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />

        <!-- Segment 1 -->
        <g class="df-seg1" opacity="0">
          <line x1="110" y1="130" x2="590" y2="148" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#df-arrow-r)" />
          <text x="350" y="127" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 1 (seq=1)</text>
        </g>

        <!-- Segment 2 -->
        <g class="df-seg2" opacity="0">
          <line x1="110" y1="155" x2="590" y2="173" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#df-arrow-r)" />
          <text x="350" y="152" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 2 (seq=2)</text>
        </g>

        <!-- Segment 3 (will get lost) -->
        <g class="df-seg3" opacity="0">
          <line x1="110" y1="180" x2="360" y2="189" stroke="#ef4444" stroke-width="1.5"
                stroke-dasharray="5,3" />
          <text x="350" y="177" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 3 (seq=3)</text>
        </g>

        <!-- Lost X marker -->
        <g class="df-lost" opacity="0">
          <text x="370" y="196" text-anchor="middle" fill="#ef4444"
                font-size="16" font-weight="900" font-family="Inter, sans-serif">&#10005;</text>
          <text x="405" y="196" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">LOST</text>
        </g>

        <!-- ACK 2 (server only got 1 and 2) -->
        <g class="df-ack2" opacity="0">
          <line x1="590" y1="218" x2="110" y2="236" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#df-arrow-l)" />
          <text x="350" y="215" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK 2 ("got 1 &amp; 2")</text>
        </g>

        <!-- Timeout notice -->
        <g class="df-timeout" opacity="0">
          <rect x="15" y="243" width="160" height="20" rx="4"
                fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1" />
          <text x="95" y="257" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">Timeout: Where's ACK 3?</text>
        </g>

        <!-- Retransmit Segment 3 -->
        <g class="df-retransmit" opacity="0">
          <line x1="110" y1="280" x2="590" y2="298" stroke="#f59e0b" stroke-width="2"
                marker-end="url(#df-arrow-r)" />
          <text x="350" y="277" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 3 (retransmit)</text>
        </g>

        <!-- ACK 3 -->
        <g class="df-ack3" opacity="0">
          <line x1="590" y1="318" x2="110" y2="336" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#df-arrow-l)" />
          <text x="350" y="315" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK 3 ("got all 3")</text>
        </g>

        <!-- Animated packet dots -->
        <circle class="df-dot1" cx="110" cy="130" r="5" fill="#22d3ee" opacity="0" filter="url(#df-glow)" />
        <circle class="df-dot2" cx="110" cy="155" r="5" fill="#22d3ee" opacity="0" filter="url(#df-glow)" />
        <circle class="df-dot3" cx="110" cy="180" r="5" fill="#ef4444" opacity="0" filter="url(#df-glow)" />
        <circle class="df-dot-ack2" cx="590" cy="218" r="5" fill="#10b981" opacity="0" filter="url(#df-glow)" />
        <circle class="df-dot-rt" cx="110" cy="280" r="5" fill="#f59e0b" opacity="0" filter="url(#df-glow)" />
        <circle class="df-dot-ack3" cx="590" cy="318" r="5" fill="#10b981" opacity="0" filter="url(#df-glow)" />

        <!-- Bottom legend -->
        <g class="df-legend" opacity="0">
          <text x="350" y="368" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">
            Lost segments are automatically retransmitted — this is TCP's reliability guarantee
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class TcpDataFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-df');
    const tl = this.createScrollTimeline(container);

    // 1. Client and server
    tl.fromTo(
      this.q('.df-client'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.df-server'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );

    // 2. Timeline lines
    tl.to(this.q('.df-tl-l'), { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.to(this.q('.df-tl-r'), { opacity: 1, duration: 0.3 }, '-=0.2');

    // 3. Legend
    tl.to(this.q('.df-legend'), { opacity: 1, duration: 0.3 });

    // 4. Start data flow loop
    tl.add(() => this.startDataLoop());
  }

  private startDataLoop(): void {
    const container = this.q('.tcp-df');
    const loop = this.createLoopingTimeline(container);

    const dot1 = this.q('.df-dot1');
    const dot2 = this.q('.df-dot2');
    const dot3 = this.q('.df-dot3');
    const dotAck2 = this.q('.df-dot-ack2');
    const dotRt = this.q('.df-dot-rt');
    const dotAck3 = this.q('.df-dot-ack3');

    const seg1 = this.q('.df-seg1');
    const seg2 = this.q('.df-seg2');
    const seg3 = this.q('.df-seg3');
    const lost = this.q('.df-lost');
    const ack2 = this.q('.df-ack2');
    const timeout = this.q('.df-timeout');
    const retransmit = this.q('.df-retransmit');
    const ack3 = this.q('.df-ack3');

    // Seg 1: send
    loop.fromTo(seg1, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
    loop.set(dot1, { attr: { cx: 110, cy: 130 }, opacity: 0 }, 0);
    loop.to(dot1, { opacity: 1, duration: 0.05 }, 0);
    loop.to(dot1, { attr: { cx: 590, cy: 148 }, duration: 0.5, ease: 'power1.in' }, 0.05);
    loop.to(dot1, { opacity: 0, duration: 0.05 }, 0.55);

    // Seg 2: send (slightly after)
    loop.fromTo(seg2, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15);
    loop.set(dot2, { attr: { cx: 110, cy: 155 }, opacity: 0 }, 0.15);
    loop.to(dot2, { opacity: 1, duration: 0.05 }, 0.15);
    loop.to(dot2, { attr: { cx: 590, cy: 173 }, duration: 0.5, ease: 'power1.in' }, 0.2);
    loop.to(dot2, { opacity: 0, duration: 0.05 }, 0.7);

    // Seg 3: send and LOSE
    loop.fromTo(seg3, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.3);
    loop.set(dot3, { attr: { cx: 110, cy: 180 }, opacity: 0 }, 0.3);
    loop.to(dot3, { opacity: 1, duration: 0.05 }, 0.3);
    loop.to(dot3, { attr: { cx: 360, cy: 189 }, duration: 0.3, ease: 'power1.in' }, 0.35);
    loop.to(dot3, { opacity: 0, duration: 0.05 }, 0.65);
    loop.fromTo(lost, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.7);

    // ACK 2
    loop.fromTo(ack2, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.0);
    loop.set(dotAck2, { attr: { cx: 590, cy: 218 }, opacity: 0 }, 1.0);
    loop.to(dotAck2, { opacity: 1, duration: 0.05 }, 1.0);
    loop.to(dotAck2, { attr: { cx: 110, cy: 236 }, duration: 0.5, ease: 'power1.in' }, 1.05);
    loop.to(dotAck2, { opacity: 0, duration: 0.05 }, 1.55);

    // Timeout
    loop.fromTo(timeout, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.7);

    // Retransmit
    loop.fromTo(retransmit, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.1);
    loop.set(dotRt, { attr: { cx: 110, cy: 280 }, opacity: 0 }, 2.1);
    loop.to(dotRt, { opacity: 1, duration: 0.05 }, 2.1);
    loop.to(dotRt, { attr: { cx: 590, cy: 298 }, duration: 0.5, ease: 'power1.in' }, 2.15);
    loop.to(dotRt, { opacity: 0, duration: 0.05 }, 2.65);

    // ACK 3
    loop.fromTo(ack3, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.8);
    loop.set(dotAck3, { attr: { cx: 590, cy: 318 }, opacity: 0 }, 2.8);
    loop.to(dotAck3, { opacity: 1, duration: 0.05 }, 2.8);
    loop.to(dotAck3, { attr: { cx: 110, cy: 336 }, duration: 0.5, ease: 'power1.in' }, 2.85);
    loop.to(dotAck3, { opacity: 0, duration: 0.05 }, 3.35);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out
    loop.to(
      [seg1, seg2, seg3, lost, ack2, timeout, retransmit, ack3],
      { opacity: 0, duration: 0.4 },
    );
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
