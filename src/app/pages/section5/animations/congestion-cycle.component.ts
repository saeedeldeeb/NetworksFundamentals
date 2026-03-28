import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-congestion-cycle',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cong-cycle {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .cong-cycle svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="cong-cycle">
      <svg viewBox="0 0 720 440" preserveAspectRatio="xMidYMid meet">
        <!-- Title -->
        <text x="360" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">The Congestion Control Cycle — Sawtooth Pattern</text>

        <!-- Y-axis -->
        <g class="cy-yaxis" opacity="0">
          <line x1="70" y1="45" x2="70" y2="340" stroke="#374151" stroke-width="1.5" />
          <text x="30" y="192" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif"
                transform="rotate(-90, 30, 192)">cwnd (MSS)</text>
          <text x="62" y="336" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">1</text>
          <text x="62" y="304" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">2</text>
          <text x="62" y="272" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">4</text>
          <text x="62" y="222" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">8</text>
          <text x="62" y="172" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">12</text>
          <text x="62" y="122" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">16</text>
          <text x="62" y="72" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">20</text>
        </g>

        <!-- X-axis -->
        <g class="cy-xaxis" opacity="0">
          <line x1="70" y1="340" x2="690" y2="340" stroke="#374151" stroke-width="1.5" />
          <text x="380" y="368" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Time (Round Trips)</text>
        </g>

        <!-- ===== CYCLE 1 ===== -->
        <!-- ssthresh 1 = 8 MSS -->
        <g class="cy-ssth1" opacity="0">
          <line x1="70" y1="222" x2="345" y2="222"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,3" />
          <text x="75" y="217" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">ssthresh₁ = 8</text>
        </g>

        <!-- Slow Start 1: 1→2→4→8 (exponential) -->
        <polyline class="cy-ss1"
                  points="70,332 105,310 140,272 175,222"
                  fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />
        <g class="cy-ss1-lbl" opacity="0">
          <text x="115" y="265" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif" transform="rotate(-50, 115, 265)">Slow Start</text>
        </g>

        <!-- Congestion Avoidance 1: 8→9→10→11→12→13→14 (linear) -->
        <polyline class="cy-ca1"
                  points="175,222 210,210 245,198 280,186 315,174 345,165"
                  fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />
        <g class="cy-ca1-lbl" opacity="0">
          <text x="260" y="164" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif">Cong. Avoidance</text>
        </g>

        <!-- Congestion event 1 -->
        <g class="cy-loss1" opacity="0">
          <line x1="345" y1="165" x2="345" y2="332"
                stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,2" />
          <circle cx="345" cy="332" r="4" fill="#ef4444" />
          <text x="350" y="260" fill="#ef4444" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace"
                transform="rotate(-90, 350, 260)">LOSS!</text>
        </g>

        <!-- flight_size annotation -->
        <g class="cy-flight1" opacity="0">
          <line x1="349" y1="170" x2="369" y2="170"
                stroke="#ec4899" stroke-width="1" />
          <line x1="349" y1="165" x2="349" y2="175"
                stroke="#ec4899" stroke-width="1" />
          <text x="372" y="168" fill="#ec4899" font-size="6.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">flight = 14</text>
          <text x="372" y="178" fill="#ec4899" font-size="6" font-weight="600"
                font-family="'JetBrains Mono', monospace">ssthresh = 14/2 = 7</text>
        </g>

        <!-- ===== CYCLE 2 ===== -->
        <!-- ssthresh 2 = 7 -->
        <g class="cy-ssth2" opacity="0">
          <line x1="345" y1="228" x2="560" y2="228"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,3" />
          <text x="350" y="239" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">ssthresh₂ = 7</text>
        </g>

        <!-- Slow Start 2: 1→2→4→7 -->
        <polyline class="cy-ss2"
                  points="345,332 375,310 405,272 430,228"
                  fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Congestion Avoidance 2: 7→8→9→10→11 -->
        <polyline class="cy-ca2"
                  points="430,228 460,218 490,208 520,198 550,188"
                  fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Congestion event 2 -->
        <g class="cy-loss2" opacity="0">
          <line x1="550" y1="188" x2="550" y2="332"
                stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,2" />
          <circle cx="550" cy="332" r="4" fill="#ef4444" />
        </g>

        <g class="cy-flight2" opacity="0">
          <text x="556" y="195" fill="#ec4899" font-size="6.5" font-weight="600"
                font-family="'JetBrains Mono', monospace">ssthresh = 11/2 ≈ 6</text>
        </g>

        <!-- ===== CYCLE 3 (partial) ===== -->
        <!-- ssthresh 3 = 6 -->
        <g class="cy-ssth3" opacity="0">
          <line x1="550" y1="240" x2="690" y2="240"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,3" />
          <text x="555" y="251" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">ssthresh₃ = 6</text>
        </g>

        <polyline class="cy-ss3"
                  points="550,332 580,310 610,272 630,240"
                  fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <polyline class="cy-ca3"
                  points="630,240 660,230 690,220"
                  fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Tracing dot -->
        <circle class="cy-dot" cx="70" cy="332" r="5.5" fill="#22d3ee" opacity="0" />

        <!-- Minimum ssthresh annotation -->
        <g class="cy-min-note" opacity="0">
          <rect x="140" y="295" width="220" height="30" rx="6"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1" />
          <text x="250" y="310" text-anchor="middle" fill="#f59e0b"
                font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">
            min ssthresh = max(flight/2, 2 × MSS)
          </text>
          <text x="250" y="321" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="Inter, sans-serif">
            Threshold can never go below 2 MSS
          </text>
        </g>

        <!-- Legend -->
        <g class="cy-legend" opacity="0">
          <rect x="90" y="388" width="10" height="10" rx="2" fill="#22d3ee" />
          <text x="105" y="397" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Slow Start (exponential)</text>

          <rect x="260" y="388" width="10" height="10" rx="2" fill="#10b981" />
          <text x="275" y="397" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Congestion Avoidance (linear)</text>

          <rect x="450" y="388" width="10" height="10" rx="2" fill="#ef4444" />
          <text x="465" y="397" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Packet loss → cwnd = 1</text>

          <line x1="90" y1="414" x2="120" y2="414"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,3" />
          <text x="125" y="418" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">ssthresh (halves on each loss)</text>

          <circle cx="315" cy="414" r="4" fill="#ec4899" />
          <text x="324" y="418" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">flight_size / 2 determines new ssthresh</text>
        </g>
      </svg>
    </div>
  `,
})
export class CongestionCycleComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cong-cycle');
    const tl = this.createScrollTimeline(container);

    tl.to(this.q('.cy-yaxis'), { opacity: 1, duration: 0.3 });
    tl.to(this.q('.cy-xaxis'), { opacity: 1, duration: 0.3 }, '-=0.15');
    tl.to(this.q('.cy-legend'), { opacity: 1, duration: 0.3 });

    tl.add(() => this.startCycleLoop());
  }

  private startCycleLoop(): void {
    const container = this.q('.cong-cycle');
    const loop = this.createLoopingTimeline(container);
    const dot = this.q('.cy-dot');

    // Cycle 1: ssthresh line
    loop.fromTo(this.q('.cy-ssth1'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);

    // Dot appears and traces Slow Start 1
    loop.set(dot, { attr: { cx: 70, cy: 332, fill: '#22d3ee' }, opacity: 0 }, 0.2);
    loop.to(dot, { opacity: 1, duration: 0.1 }, 0.2);

    const ss1 = this.q('.cy-ss1') as unknown as SVGPolylineElement;
    loop.set(ss1, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 1 }, 0.3);
    loop.to(ss1, { strokeDashoffset: 0, duration: 0.8, ease: 'power1.in' }, 0.3);
    loop.fromTo(this.q('.cy-ss1-lbl'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5);
    loop.to(dot, { attr: { cx: 105, cy: 310 }, duration: 0.2 }, 0.3);
    loop.to(dot, { attr: { cx: 140, cy: 272 }, duration: 0.2 }, 0.5);
    loop.to(dot, { attr: { cx: 175, cy: 222 }, duration: 0.2 }, 0.7);

    // CA 1
    loop.to(dot, { attr: { fill: '#10b981' }, duration: 0.05 }, 0.95);
    const ca1 = this.q('.cy-ca1') as unknown as SVGPolylineElement;
    loop.set(ca1, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 1 }, 0.95);
    loop.to(ca1, { strokeDashoffset: 0, duration: 1.0, ease: 'none' }, 0.95);
    loop.fromTo(this.q('.cy-ca1-lbl'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.1);
    loop.to(dot, { attr: { cx: 210, cy: 210 }, duration: 0.2 }, 0.95);
    loop.to(dot, { attr: { cx: 245, cy: 198 }, duration: 0.2 }, 1.15);
    loop.to(dot, { attr: { cx: 280, cy: 186 }, duration: 0.2 }, 1.35);
    loop.to(dot, { attr: { cx: 315, cy: 174 }, duration: 0.2 }, 1.55);
    loop.to(dot, { attr: { cx: 345, cy: 165 }, duration: 0.2 }, 1.75);

    // Loss 1
    loop.fromTo(this.q('.cy-loss1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.95);
    loop.fromTo(this.q('.cy-flight1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.0);
    loop.to(dot, { attr: { fill: '#ef4444' }, duration: 0.05 }, 1.95);
    loop.to(dot, { attr: { cx: 345, cy: 332 }, duration: 0.3, ease: 'power2.in' }, 2.0);

    // Min note
    loop.fromTo(this.q('.cy-min-note'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, 2.2);

    // Cycle 2: ssthresh 2
    loop.fromTo(this.q('.cy-ssth2'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.5);

    // SS 2
    loop.to(dot, { attr: { fill: '#22d3ee' }, duration: 0.05 }, 2.7);
    const ss2 = this.q('.cy-ss2') as unknown as SVGPolylineElement;
    loop.set(ss2, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 1 }, 2.7);
    loop.to(ss2, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.in' }, 2.7);
    loop.to(dot, { attr: { cx: 375, cy: 310 }, duration: 0.2 }, 2.7);
    loop.to(dot, { attr: { cx: 405, cy: 272 }, duration: 0.2 }, 2.9);
    loop.to(dot, { attr: { cx: 430, cy: 228 }, duration: 0.2 }, 3.1);

    // CA 2
    loop.to(dot, { attr: { fill: '#10b981' }, duration: 0.05 }, 3.3);
    const ca2 = this.q('.cy-ca2') as unknown as SVGPolylineElement;
    loop.set(ca2, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 1 }, 3.3);
    loop.to(ca2, { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, 3.3);
    loop.to(dot, { attr: { cx: 460, cy: 218 }, duration: 0.2 }, 3.3);
    loop.to(dot, { attr: { cx: 490, cy: 208 }, duration: 0.2 }, 3.5);
    loop.to(dot, { attr: { cx: 520, cy: 198 }, duration: 0.2 }, 3.7);
    loop.to(dot, { attr: { cx: 550, cy: 188 }, duration: 0.2 }, 3.9);

    // Loss 2
    loop.fromTo(this.q('.cy-loss2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 4.1);
    loop.fromTo(this.q('.cy-flight2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 4.15);
    loop.to(dot, { attr: { fill: '#ef4444' }, duration: 0.05 }, 4.1);
    loop.to(dot, { attr: { cx: 550, cy: 332 }, duration: 0.3, ease: 'power2.in' }, 4.15);

    // Cycle 3 (partial)
    loop.fromTo(this.q('.cy-ssth3'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 4.5);
    loop.to(dot, { attr: { fill: '#22d3ee' }, duration: 0.05 }, 4.7);
    const ss3 = this.q('.cy-ss3') as unknown as SVGPolylineElement;
    loop.set(ss3, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 1 }, 4.7);
    loop.to(ss3, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.in' }, 4.7);
    loop.to(dot, { attr: { cx: 580, cy: 310 }, duration: 0.2 }, 4.7);
    loop.to(dot, { attr: { cx: 610, cy: 272 }, duration: 0.2 }, 4.9);
    loop.to(dot, { attr: { cx: 630, cy: 240 }, duration: 0.2 }, 5.1);

    loop.to(dot, { attr: { fill: '#10b981' }, duration: 0.05 }, 5.3);
    const ca3 = this.q('.cy-ca3') as unknown as SVGPolylineElement;
    loop.set(ca3, { strokeDasharray: 100, strokeDashoffset: 100, opacity: 1 }, 5.3);
    loop.to(ca3, { strokeDashoffset: 0, duration: 0.4, ease: 'none' }, 5.3);
    loop.to(dot, { attr: { cx: 660, cy: 230 }, duration: 0.2 }, 5.3);
    loop.to(dot, { attr: { cx: 690, cy: 220 }, duration: 0.2 }, 5.5);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade out
    const allEls = [
      '.cy-ssth1', '.cy-ss1', '.cy-ss1-lbl', '.cy-ca1', '.cy-ca1-lbl',
      '.cy-loss1', '.cy-flight1', '.cy-min-note',
      '.cy-ssth2', '.cy-ss2', '.cy-ca2', '.cy-loss2', '.cy-flight2',
      '.cy-ssth3', '.cy-ss3', '.cy-ca3',
    ].map((s) => this.q(s));
    loop.to([...allEls, dot], { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
