import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-syn-flood',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .syn-flood {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .syn-flood svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="syn-flood">
      <svg viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sf-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="sf-arr" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="#ef4444" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="20" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">SYN Flood Attack</text>

        <!-- Attacker -->
        <g class="sf-attacker" opacity="0">
          <rect x="30" y="50" width="120" height="50" rx="10" fill="#1f2937"
                stroke="#ef4444" stroke-width="2" />
          <text x="90" y="73" text-anchor="middle" fill="#ef4444"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Attacker</text>
          <text x="90" y="88" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">never sends ACK</text>
        </g>

        <!-- Server -->
        <g class="sf-server" opacity="0">
          <rect x="530" y="40" width="140" height="70" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="600" y="66" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Server</text>
          <text x="600" y="82" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">SYN Queue</text>
          <!-- Queue bar -->
          <rect x="550" y="90" width="100" height="10" rx="3"
                fill="#0f172a" stroke="#374151" stroke-width="1" />
          <rect class="sf-bar" x="551" y="91" width="5" height="8" rx="2"
                fill="#f59e0b" />
        </g>

        <!-- SYN arrows (stagger in) -->
        <g class="sf-syn1" opacity="0">
          <line x1="150" y1="68" x2="528" y2="68"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#sf-arr)" />
          <text x="340" y="64" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">SYN</text>
        </g>
        <g class="sf-syn2" opacity="0">
          <line x1="150" y1="82" x2="528" y2="82"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#sf-arr)" />
          <text x="340" y="78" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">SYN</text>
        </g>
        <g class="sf-syn3" opacity="0">
          <line x1="150" y1="96" x2="528" y2="96"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#sf-arr)" />
          <text x="340" y="92" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">SYN</text>
        </g>

        <!-- Queue status labels -->
        <g class="sf-filling" opacity="0">
          <text x="600" y="128" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Queue filling...</text>
        </g>

        <g class="sf-full" opacity="0">
          <rect x="545" y="118" width="110" height="22" rx="5"
                fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" stroke-width="1.5" />
          <text x="600" y="133" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">QUEUE FULL!</text>
        </g>

        <!-- Legitimate client blocked -->
        <g class="sf-legit" opacity="0">
          <rect x="30" y="170" width="120" height="50" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="90" y="193" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Real Client</text>
          <text x="90" y="208" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">wants to connect</text>

          <line x1="150" y1="195" x2="420" y2="195"
                stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3" />
          <text x="440" y="199" fill="#ef4444"
                font-size="12" font-weight="900" font-family="Inter, sans-serif">&#10005;</text>
          <text x="470" y="199" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">DROPPED</text>
        </g>

        <!-- Solutions -->
        <g class="sf-solutions" opacity="0">
          <text x="50" y="250" fill="#64748b"
                font-size="8" font-weight="600" font-family="Inter, sans-serif">Solutions:</text>
          <text x="130" y="250" fill="#10b981"
                font-size="7.5" font-family="'JetBrains Mono', monospace">SYN cookies</text>
          <text x="260" y="250" fill="#10b981"
                font-size="7.5" font-family="'JetBrains Mono', monospace">Timeouts (~100ms)</text>
          <text x="420" y="250" fill="#10b981"
                font-size="7.5" font-family="'JetBrains Mono', monospace">Rate limiting</text>
        </g>

        <!-- Animated dots -->
        <circle class="sf-dot" cx="150" cy="68" r="5" fill="#ef4444" opacity="0" filter="url(#sf-glow)" />
      </svg>
    </div>
  `,
})
export class SynFloodComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.syn-flood');
    const tl = this.createScrollTimeline(container);

    tl.fromTo(this.q('.sf-attacker'), { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.35 });
    tl.fromTo(this.q('.sf-server'), { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.35 }, '-=0.15');
    tl.fromTo(this.q('.sf-solutions'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.syn-flood');
    const loop = this.createLoopingTimeline(container);
    const bar = this.q('.sf-bar');
    const dot = this.q('.sf-dot');

    // SYN 1
    loop.fromTo(this.q('.sf-syn1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
    loop.set(dot, { attr: { cx: 150, cy: 68 }, opacity: 0 }, 0);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 0);
    loop.to(dot, { attr: { cx: 528 }, duration: 0.4 }, 0.05);
    loop.to(dot, { opacity: 0, duration: 0.05 }, 0.45);
    loop.to(bar, { attr: { width: 30 }, duration: 0.15 }, 0.5);

    // SYN 2
    loop.fromTo(this.q('.sf-syn2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.6);
    loop.set(dot, { attr: { cx: 150, cy: 82 }, opacity: 0 }, 0.6);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 0.6);
    loop.to(dot, { attr: { cx: 528 }, duration: 0.4 }, 0.65);
    loop.to(dot, { opacity: 0, duration: 0.05 }, 1.05);
    loop.to(bar, { attr: { width: 60 }, duration: 0.15 }, 1.1);
    loop.fromTo(this.q('.sf-filling'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);

    // SYN 3
    loop.fromTo(this.q('.sf-syn3'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.3);
    loop.set(dot, { attr: { cx: 150, cy: 96 }, opacity: 0 }, 1.3);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 1.3);
    loop.to(dot, { attr: { cx: 528 }, duration: 0.4 }, 1.35);
    loop.to(dot, { opacity: 0, duration: 0.05 }, 1.75);
    loop.to(bar, { attr: { width: 98, fill: '#ef4444' }, duration: 0.15 }, 1.8);

    // Queue full
    loop.to(this.q('.sf-filling'), { opacity: 0, duration: 0.1 }, 1.9);
    loop.fromTo(this.q('.sf-full'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.0);

    // Legit client blocked
    loop.fromTo(this.q('.sf-legit'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 }, 2.3);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade out
    const allEls = [
      '.sf-syn1', '.sf-syn2', '.sf-syn3', '.sf-filling', '.sf-full', '.sf-legit',
    ].map(s => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.4 });
    loop.to(bar, { attr: { width: 5, fill: '#f59e0b' }, duration: 0.2 }, '<');
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
