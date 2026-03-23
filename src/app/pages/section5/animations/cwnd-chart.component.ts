import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-cwnd-chart',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cwnd-chart {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .cwnd-chart svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="cwnd-chart">
      <svg viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Congestion Window (cwnd) Over Time</text>

        <!-- Y-axis -->
        <g class="cc-yaxis" opacity="0">
          <line x1="80" y1="50" x2="80" y2="310" stroke="#374151" stroke-width="1.5" />
          <text x="40" y="180" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif"
                transform="rotate(-90, 40, 180)">cwnd (MSS)</text>
          <!-- Y ticks -->
          <text x="72" y="304" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">1</text>
          <text x="72" y="264" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">4</text>
          <text x="72" y="204" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">8</text>
          <text x="72" y="144" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">12</text>
          <text x="72" y="84" text-anchor="end" fill="#64748b" font-size="7"
                font-family="'JetBrains Mono', monospace">16</text>
        </g>

        <!-- X-axis -->
        <g class="cc-xaxis" opacity="0">
          <line x1="80" y1="310" x2="660" y2="310" stroke="#374151" stroke-width="1.5" />
          <text x="370" y="338" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-weight="600" font-family="Inter, sans-serif">Time (Round Trips)</text>
        </g>

        <!-- ssthresh line (first) -->
        <g class="cc-ssthresh1" opacity="0">
          <line x1="80" y1="200" x2="380" y2="200"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="6,3" />
          <text x="85" y="195" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">ssthresh = 8</text>
        </g>

        <!-- Slow Start curve (exponential: 1→2→4→8) -->
        <polyline class="cc-ss1"
                  points="80,300 120,280 160,260 200,200"
                  fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Slow Start label -->
        <g class="cc-ss1-label" opacity="0">
          <text x="140" y="245" fill="#22d3ee" font-size="8" font-weight="700"
                font-family="Inter, sans-serif" transform="rotate(-45, 140, 245)">Slow Start</text>
        </g>

        <!-- Congestion Avoidance (linear: 8→9→10→11→12) -->
        <polyline class="cc-ca1"
                  points="200,200 240,188 280,176 320,164 360,152"
                  fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- CA label -->
        <g class="cc-ca1-label" opacity="0">
          <text x="280" y="148" fill="#10b981" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">Congestion Avoidance</text>
        </g>

        <!-- Congestion event (packet loss) -->
        <g class="cc-loss1" opacity="0">
          <line x1="360" y1="152" x2="360" y2="300"
                stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2" />
          <text x="370" y="230" fill="#ef4444" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace" transform="rotate(-90, 370, 230)">PACKET LOSS!</text>
        </g>

        <!-- Reset marker -->
        <g class="cc-reset1" opacity="0">
          <circle cx="360" cy="300" r="5" fill="#ef4444" />
          <text x="380" y="304" fill="#ef4444" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">cwnd = 1</text>
        </g>

        <!-- ssthresh line (second, halved) -->
        <g class="cc-ssthresh2" opacity="0">
          <line x1="360" y1="240" x2="660" y2="240"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="6,3" />
          <text x="365" y="235" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">ssthresh = 6 (halved)</text>
        </g>

        <!-- Second Slow Start curve -->
        <polyline class="cc-ss2"
                  points="360,300 400,280 440,240"
                  fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Second Congestion Avoidance -->
        <polyline class="cc-ca2"
                  points="440,240 480,228 520,216 560,204 600,192"
                  fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
                  opacity="0" />

        <!-- Second loss -->
        <g class="cc-loss2" opacity="0">
          <line x1="600" y1="192" x2="600" y2="300"
                stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2" />
          <circle cx="600" cy="300" r="5" fill="#ef4444" />
        </g>

        <!-- Dot that traces the curve -->
        <circle class="cc-dot" cx="80" cy="300" r="6" fill="#22d3ee" opacity="0" />

        <!-- Legend -->
        <g class="cc-legend" opacity="0">
          <rect x="120" y="350" width="10" height="10" rx="2" fill="#22d3ee" />
          <text x="135" y="359" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Slow Start (exponential)</text>

          <rect x="300" y="350" width="10" height="10" rx="2" fill="#10b981" />
          <text x="315" y="359" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Congestion Avoidance (linear)</text>

          <rect x="490" y="350" width="10" height="10" rx="2" fill="#ef4444" />
          <text x="505" y="359" fill="#94a3b8" font-size="8"
                font-family="Inter, sans-serif">Packet loss → reset</text>
        </g>
      </svg>
    </div>
  `,
})
export class CwndChartComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cwnd-chart');
    const tl = this.createScrollTimeline(container);

    // Axes
    tl.to(this.q('.cc-yaxis'), { opacity: 1, duration: 0.3 });
    tl.to(this.q('.cc-xaxis'), { opacity: 1, duration: 0.3 }, '-=0.15');

    // Legend
    tl.to(this.q('.cc-legend'), { opacity: 1, duration: 0.3 });

    // Start chart animation loop
    tl.add(() => this.startChartLoop());
  }

  private startChartLoop(): void {
    const container = this.q('.cwnd-chart');
    const loop = this.createLoopingTimeline(container);

    const dot = this.q('.cc-dot');

    // ssthresh1
    loop.fromTo(this.q('.cc-ssthresh1'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);

    // Slow Start 1: draw curve with tracing dot
    loop.set(dot, { attr: { cx: 80, cy: 300 }, opacity: 0 }, 0.2);
    loop.to(dot, { opacity: 1, duration: 0.1 }, 0.2);
    loop.to(dot, { attr: { fill: '#22d3ee' }, duration: 0.01 }, 0.2);

    // Animate the polyline by revealing it
    const ss1 = this.q('.cc-ss1') as unknown as SVGPolylineElement;
    loop.set(ss1, { strokeDasharray: 400, strokeDashoffset: 400, opacity: 1 }, 0.3);
    loop.to(ss1, { strokeDashoffset: 0, duration: 1.0, ease: 'power1.in' }, 0.3);
    loop.fromTo(this.q('.cc-ss1-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.6);

    // Dot follows the curve
    loop.to(dot, { attr: { cx: 120, cy: 280 }, duration: 0.25 }, 0.3);
    loop.to(dot, { attr: { cx: 160, cy: 260 }, duration: 0.25 }, 0.55);
    loop.to(dot, { attr: { cx: 200, cy: 200 }, duration: 0.25 }, 0.8);

    // Congestion Avoidance 1
    loop.to(dot, { attr: { fill: '#10b981' }, duration: 0.1 }, 1.1);
    const ca1 = this.q('.cc-ca1') as unknown as SVGPolylineElement;
    loop.set(ca1, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 1 }, 1.1);
    loop.to(ca1, { strokeDashoffset: 0, duration: 1.0, ease: 'none' }, 1.1);
    loop.fromTo(this.q('.cc-ca1-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.3);

    loop.to(dot, { attr: { cx: 240, cy: 188 }, duration: 0.25 }, 1.1);
    loop.to(dot, { attr: { cx: 280, cy: 176 }, duration: 0.25 }, 1.35);
    loop.to(dot, { attr: { cx: 320, cy: 164 }, duration: 0.25 }, 1.6);
    loop.to(dot, { attr: { cx: 360, cy: 152 }, duration: 0.25 }, 1.85);

    // Packet loss 1
    loop.fromTo(this.q('.cc-loss1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.1);
    loop.to(dot, { attr: { fill: '#ef4444' }, duration: 0.05 }, 2.1);
    loop.to(dot, { attr: { cx: 360, cy: 300 }, duration: 0.3, ease: 'power2.in' }, 2.15);
    loop.fromTo(this.q('.cc-reset1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.3);

    // ssthresh2
    loop.fromTo(this.q('.cc-ssthresh2'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.5);

    // Slow Start 2
    loop.to(dot, { attr: { fill: '#22d3ee' }, duration: 0.05 }, 2.7);
    const ss2 = this.q('.cc-ss2') as unknown as SVGPolylineElement;
    loop.set(ss2, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 1 }, 2.7);
    loop.to(ss2, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.in' }, 2.7);
    loop.to(dot, { attr: { cx: 400, cy: 280 }, duration: 0.3 }, 2.7);
    loop.to(dot, { attr: { cx: 440, cy: 240 }, duration: 0.3 }, 3.0);

    // Congestion Avoidance 2
    loop.to(dot, { attr: { fill: '#10b981' }, duration: 0.05 }, 3.3);
    const ca2 = this.q('.cc-ca2') as unknown as SVGPolylineElement;
    loop.set(ca2, { strokeDasharray: 250, strokeDashoffset: 250, opacity: 1 }, 3.3);
    loop.to(ca2, { strokeDashoffset: 0, duration: 1.0, ease: 'none' }, 3.3);
    loop.to(dot, { attr: { cx: 480, cy: 228 }, duration: 0.25 }, 3.3);
    loop.to(dot, { attr: { cx: 520, cy: 216 }, duration: 0.25 }, 3.55);
    loop.to(dot, { attr: { cx: 560, cy: 204 }, duration: 0.25 }, 3.8);
    loop.to(dot, { attr: { cx: 600, cy: 192 }, duration: 0.25 }, 4.05);

    // Packet loss 2
    loop.fromTo(this.q('.cc-loss2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 4.3);
    loop.to(dot, { attr: { fill: '#ef4444' }, duration: 0.05 }, 4.3);
    loop.to(dot, { attr: { cx: 600, cy: 300 }, duration: 0.3, ease: 'power2.in' }, 4.35);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out all chart elements
    const allEls = [
      '.cc-ssthresh1', '.cc-ss1', '.cc-ss1-label',
      '.cc-ca1', '.cc-ca1-label', '.cc-loss1', '.cc-reset1',
      '.cc-ssthresh2', '.cc-ss2', '.cc-ca2', '.cc-loss2',
    ].map(s => this.q(s));
    loop.to([...allEls, dot], { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
