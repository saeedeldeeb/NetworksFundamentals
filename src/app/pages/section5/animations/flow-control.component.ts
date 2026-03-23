import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-flow-control',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .flow-ctrl {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .flow-ctrl svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="flow-ctrl">
      <svg viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="fc-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="fc-arr-r" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#22d3ee" />
          </marker>
          <marker id="fc-arr-l" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Flow Control in Action</text>

        <!-- Sender -->
        <g class="fc-sender" opacity="0">
          <rect x="30" y="42" width="110" height="55" rx="12" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="85" y="66" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="85" y="82" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Wants to send fast</text>
        </g>

        <!-- Receiver with buffer bar -->
        <g class="fc-receiver" opacity="0">
          <rect x="520" y="42" width="150" height="80" rx="12" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="595" y="64" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Receiver</text>

          <!-- Buffer bar -->
          <text x="540" y="84" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Buffer</text>
          <rect x="580" y="75" width="72" height="10" rx="3"
                fill="#0f172a" stroke="#374151" stroke-width="1" />
          <rect class="fc-buf-fill" x="581" y="76" width="5" height="8" rx="2"
                fill="#10b981" />

          <!-- Window display -->
          <text class="fc-rwnd-text" x="595" y="106" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">rwnd = 3</text>
        </g>

        <!-- Timeline lines -->
        <line class="fc-tl-l" x1="85" y1="97" x2="85" y2="395"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />
        <line class="fc-tl-r" x1="595" y1="122" x2="595" y2="395"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />

        <!-- Phase 1: Send 3 segments -->
        <g class="fc-p1-s1" opacity="0">
          <line x1="100" y1="145" x2="580" y2="152" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="340" y="142" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 1</text>
        </g>
        <g class="fc-p1-s2" opacity="0">
          <line x1="100" y1="160" x2="580" y2="167" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="340" y="157" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 2</text>
        </g>
        <g class="fc-p1-s3" opacity="0">
          <line x1="100" y1="175" x2="580" y2="182" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="340" y="172" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 3</text>
        </g>

        <!-- ACK 3, Window = 2 -->
        <g class="fc-ack1" opacity="0">
          <line x1="580" y1="200" x2="100" y2="210" stroke="#10b981" stroke-width="1.5" marker-end="url(#fc-arr-l)" />
          <rect x="240" y="188" width="220" height="18" rx="4"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="350" y="201" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK 3, Window = 2  "Slow down!"</text>
        </g>

        <!-- Phase 2: Send 2 segments -->
        <g class="fc-p2-s4" opacity="0">
          <line x1="100" y1="230" x2="580" y2="237" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="340" y="227" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 4</text>
        </g>
        <g class="fc-p2-s5" opacity="0">
          <line x1="100" y1="245" x2="580" y2="252" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="340" y="242" text-anchor="middle" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 5</text>
        </g>

        <!-- ACK 5, Window = 0 -->
        <g class="fc-ack2" opacity="0">
          <line x1="580" y1="270" x2="100" y2="280" stroke="#ef4444" stroke-width="1.5" marker-end="url(#fc-arr-l)" />
          <rect x="240" y="258" width="220" height="18" rx="4"
                fill="#0f172a" stroke="#ef4444" stroke-width="1.5" />
          <text x="350" y="271" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK 5, Window = 0  "STOP!"</text>
        </g>

        <!-- Sender waits -->
        <g class="fc-wait" opacity="0">
          <rect x="25" y="290" width="120" height="20" rx="5"
                fill="rgba(239, 68, 68, 0.1)" />
          <text x="85" y="304" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">Sender BLOCKED</text>
        </g>

        <!-- ACK 5, Window = 4  (receiver caught up) -->
        <g class="fc-ack3" opacity="0">
          <line x1="580" y1="330" x2="100" y2="340" stroke="#10b981" stroke-width="1.5" marker-end="url(#fc-arr-l)" />
          <rect x="225" y="318" width="250" height="18" rx="4"
                fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
          <text x="350" y="331" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK 5, Window = 4  "OK, continue!"</text>
        </g>

        <!-- Phase 3: Send 4 segments -->
        <g class="fc-p3-s6" opacity="0">
          <line x1="100" y1="355" x2="580" y2="360" stroke="#22d3ee" stroke-width="1" marker-end="url(#fc-arr-r)" />
          <text x="280" y="352" fill="#22d3ee"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">Seg 6, 7, 8, 9</text>
        </g>

        <!-- Legend -->
        <g class="fc-legend" opacity="0">
          <text x="350" y="400" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">
            The receiver dynamically adjusts the window — sender must respect it
          </text>
        </g>

        <!-- Animated dots -->
        <circle class="fc-dot1" cx="100" cy="160" r="4" fill="#22d3ee" opacity="0" filter="url(#fc-glow)" />
        <circle class="fc-dot2" cx="580" cy="200" r="4" fill="#10b981" opacity="0" filter="url(#fc-glow)" />
      </svg>
    </div>
  `,
})
export class FlowControlComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.flow-ctrl');
    const tl = this.createScrollTimeline(container);

    // Show sender + receiver
    tl.fromTo(this.q('.fc-sender'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
    tl.fromTo(this.q('.fc-receiver'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    tl.to(this.q('.fc-tl-l'), { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.to(this.q('.fc-tl-r'), { opacity: 1, duration: 0.3 }, '-=0.2');
    tl.to(this.q('.fc-legend'), { opacity: 1, duration: 0.3 });

    // Start loop
    tl.add(() => this.startFlowLoop());
  }

  private startFlowLoop(): void {
    const container = this.q('.flow-ctrl');
    const loop = this.createLoopingTimeline(container);

    const bufFill = this.q('.fc-buf-fill');
    const rwndText = this.q('.fc-rwnd-text');

    // Phase 1: Send 3 segments
    loop.fromTo(this.q('.fc-p1-s1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
    loop.fromTo(this.q('.fc-p1-s2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.1);
    loop.fromTo(this.q('.fc-p1-s3'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.2);

    // Buffer fills up
    loop.to(bufFill, { attr: { width: 35, fill: '#f59e0b' }, duration: 0.4 }, 0.3);
    loop.add(() => { rwndText.textContent = 'rwnd = 2'; }, 0.5);

    // ACK 3, Window = 2
    loop.fromTo(this.q('.fc-ack1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.7);

    // Phase 2: Send 2 segments
    loop.fromTo(this.q('.fc-p2-s4'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);
    loop.fromTo(this.q('.fc-p2-s5'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.2);

    // Buffer fills completely
    loop.to(bufFill, { attr: { width: 70, fill: '#ef4444' }, duration: 0.4 }, 1.3);
    loop.add(() => { rwndText.textContent = 'rwnd = 0'; }, 1.5);

    // ACK 5, Window = 0 (STOP!)
    loop.fromTo(this.q('.fc-ack2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.7);
    loop.fromTo(this.q('.fc-wait'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.9);

    // Pause...
    loop.to({}, { duration: 0.8 });

    // Buffer drains (app reads data)
    loop.to(bufFill, { attr: { width: 10, fill: '#10b981' }, duration: 0.5 }, 2.9);
    loop.add(() => { rwndText.textContent = 'rwnd = 4'; }, 3.2);

    // ACK 5, Window = 4 (continue!)
    loop.fromTo(this.q('.fc-ack3'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 3.3);
    loop.to(this.q('.fc-wait'), { opacity: 0, duration: 0.15 }, 3.3);

    // Phase 3: Send 4 segments
    loop.fromTo(this.q('.fc-p3-s6'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 3.7);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out and reset
    const allEls = [
      '.fc-p1-s1', '.fc-p1-s2', '.fc-p1-s3', '.fc-ack1',
      '.fc-p2-s4', '.fc-p2-s5', '.fc-ack2',
      '.fc-ack3', '.fc-p3-s6',
    ].map(s => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.3 });
    loop.to(bufFill, { attr: { width: 5, fill: '#10b981' }, duration: 0.2 }, '<');
    loop.add(() => { rwndText.textContent = 'rwnd = 3'; });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
