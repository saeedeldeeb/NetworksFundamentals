import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-hol-blocking',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hol-block {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .hol-block svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="hol-block">
      <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="hol-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="20" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Head-of-Line Blocking</text>

        <!-- 4 segments sent -->
        <g class="hol-sent" opacity="0">
          <text x="50" y="52" fill="#64748b" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">SENT</text>

          <rect x="100" y="38" width="120" height="30" rx="6"
                fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="1.5" />
          <text x="160" y="57" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 1: /request1</text>

          <rect x="230" y="38" width="120" height="30" rx="6"
                fill="rgba(34, 211, 238, 0.08)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="290" y="57" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 2: /request2</text>

          <rect x="360" y="38" width="120" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" />
          <text x="420" y="57" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 3: /request3</text>

          <rect x="490" y="38" width="120" height="30" rx="6"
                fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="550" y="57" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 4: /request4</text>
        </g>

        <!-- Arrival status -->
        <g class="hol-arrive" opacity="0">
          <text x="50" y="102" fill="#64748b" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">ARRIVED</text>

          <!-- Seg 1 LOST -->
          <rect x="100" y="88" width="120" height="30" rx="6"
                fill="rgba(239, 68, 68, 0.06)" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" />
          <text x="160" y="107" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">LOST</text>

          <!-- Seg 2,3,4 arrived OK -->
          <rect x="230" y="88" width="120" height="30" rx="6"
                fill="rgba(34, 211, 238, 0.08)" stroke="#22d3ee" stroke-width="1.5" />
          <text x="290" y="107" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 2 OK</text>

          <rect x="360" y="88" width="120" height="30" rx="6"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" />
          <text x="420" y="107" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 3 OK</text>

          <rect x="490" y="88" width="120" height="30" rx="6"
                fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.5" />
          <text x="550" y="107" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 4 OK</text>
        </g>

        <!-- BLOCKED banner -->
        <g class="hol-blocked" opacity="0">
          <rect x="220" y="132" width="310" height="28" rx="6"
                fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="1.5" />
          <text x="375" y="150" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            BLOCKED — waiting for Seg 1 retransmit
          </text>

          <!-- Lock icons on seg 2,3,4 -->
          <text x="290" y="127" text-anchor="middle" fill="#ef4444"
                font-size="12" font-family="Inter, sans-serif">&#128274;</text>
          <text x="420" y="127" text-anchor="middle" fill="#ef4444"
                font-size="12" font-family="Inter, sans-serif">&#128274;</text>
          <text x="550" y="127" text-anchor="middle" fill="#ef4444"
                font-size="12" font-family="Inter, sans-serif">&#128274;</text>
        </g>

        <!-- Retransmit + deliver -->
        <g class="hol-resolved" opacity="0">
          <rect x="100" y="175" width="120" height="30" rx="6"
                fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="160" y="194" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Seg 1 retransmit</text>

          <text x="240" y="194" fill="#10b981" font-size="10"
                font-weight="700" font-family="Inter, sans-serif">&rarr;</text>

          <text x="270" y="194" fill="#10b981" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">NOW deliver all 4</text>
        </g>

        <!-- Timeline -->
        <g class="hol-timeline" opacity="0">
          <line x1="100" y1="225" x2="620" y2="225"
                stroke="#374151" stroke-width="1.5" />

          <line x1="100" y1="220" x2="100" y2="230" stroke="#64748b" stroke-width="1" />
          <text x="100" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">0ms</text>

          <line x1="230" y1="220" x2="230" y2="230" stroke="#64748b" stroke-width="1" />
          <text x="230" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">50ms</text>
          <text x="230" y="254" text-anchor="middle" fill="#ef4444"
                font-size="6.5" font-family="Inter, sans-serif">2,3,4 arrive</text>

          <line x1="430" y1="220" x2="430" y2="230" stroke="#64748b" stroke-width="1" />
          <text x="430" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">150ms</text>
          <text x="430" y="254" text-anchor="middle" fill="#f59e0b"
                font-size="6.5" font-family="Inter, sans-serif">retransmit</text>

          <line x1="530" y1="220" x2="530" y2="230" stroke="#64748b" stroke-width="1" />
          <text x="530" y="242" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">200ms</text>
          <text x="530" y="254" text-anchor="middle" fill="#10b981"
                font-size="6.5" font-family="Inter, sans-serif">deliver all</text>

          <!-- Wasted time bracket -->
          <line x1="230" y1="264" x2="530" y2="264" stroke="#ef4444" stroke-width="1.5" />
          <line x1="230" y1="260" x2="230" y2="268" stroke="#ef4444" stroke-width="1.5" />
          <line x1="530" y1="260" x2="530" y2="268" stroke="#ef4444" stroke-width="1.5" />
          <text x="380" y="280" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            150ms wasted — 3 good requests delayed for nothing
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class HolBlockingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.hol-block');
    const tl = this.createScrollTimeline(container);

    tl.fromTo(this.q('.hol-sent'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(this.q('.hol-arrive'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(this.q('.hol-blocked'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.hol-resolved'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
    tl.fromTo(this.q('.hol-timeline'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.4 });
  }
}
