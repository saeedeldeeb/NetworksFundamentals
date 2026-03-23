import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tcp-close',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .tcp-close {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .tcp-close svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="tcp-close">
      <svg viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="cl-arrow-r" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#ef4444" />
          </marker>
          <marker id="cl-arrow-l" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#6366f1" />
          </marker>
          <filter id="cl-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">TCP Four-Way Close (Connection Teardown)</text>

        <!-- Client -->
        <g class="cl-client" opacity="0">
          <rect x="40" y="42" width="110" height="55" rx="12" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="95" y="66" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Client</text>
          <text x="95" y="82" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Active Close</text>
        </g>

        <!-- Server -->
        <g class="cl-server" opacity="0">
          <rect x="550" y="42" width="110" height="55" rx="12" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="605" y="66" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Server</text>
          <text x="605" y="82" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Passive Close</text>
        </g>

        <!-- Timeline lines -->
        <line class="cl-tl-l" x1="95" y1="97" x2="95" y2="400"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />
        <line class="cl-tl-r" x1="605" y1="97" x2="605" y2="400"
              stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" opacity="0" />

        <!-- Step 1: FIN → -->
        <g class="cl-step1" opacity="0">
          <line x1="110" y1="135" x2="590" y2="155"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#cl-arrow-r)" />
          <rect x="290" y="123" width="120" height="22" rx="5"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="350" y="138" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">FIN  "I'm done"</text>
        </g>

        <!-- Client state: FIN_WAIT_1 -->
        <g class="cl-state1" opacity="0">
          <text x="95" y="152" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">FIN_WAIT_1</text>
        </g>

        <!-- Step 2: ← ACK -->
        <g class="cl-step2" opacity="0">
          <line x1="590" y1="185" x2="110" y2="205"
                stroke="#6366f1" stroke-width="1.5" marker-end="url(#cl-arrow-l)" />
          <rect x="300" y="173" width="100" height="22" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="188" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK  "Got it"</text>
        </g>

        <!-- Server state: CLOSE_WAIT / Client: FIN_WAIT_2 -->
        <g class="cl-state2" opacity="0">
          <text x="95" y="222" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">FIN_WAIT_2</text>
          <text x="605" y="172" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">CLOSE_WAIT</text>
        </g>

        <!-- Step 3: ← FIN -->
        <g class="cl-step3" opacity="0">
          <line x1="590" y1="255" x2="110" y2="275"
                stroke="#6366f1" stroke-width="1.5" marker-end="url(#cl-arrow-l)" />
          <rect x="275" y="243" width="150" height="22" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="258" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">FIN  "I'm done too"</text>
        </g>

        <!-- Server state: LAST_ACK -->
        <g class="cl-state3" opacity="0">
          <text x="605" y="242" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="600" font-family="'JetBrains Mono', monospace">LAST_ACK</text>
        </g>

        <!-- Step 4: ACK → -->
        <g class="cl-step4" opacity="0">
          <line x1="110" y1="305" x2="590" y2="325"
                stroke="#ef4444" stroke-width="1.5" marker-end="url(#cl-arrow-r)" />
          <rect x="280" y="293" width="140" height="22" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="350" y="308" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK  "Goodbye"</text>
        </g>

        <!-- TIME_WAIT -->
        <g class="cl-timewait" opacity="0">
          <rect x="40" y="340" width="110" height="28" rx="6"
                fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1" />
          <text x="95" y="358" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">TIME_WAIT</text>
        </g>

        <!-- Server CLOSED -->
        <g class="cl-server-closed" opacity="0">
          <rect x="550" y="340" width="110" height="28" rx="6"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1" />
          <text x="605" y="358" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">CLOSED</text>
        </g>

        <!-- Client CLOSED -->
        <g class="cl-client-closed" opacity="0">
          <rect x="40" y="380" width="110" height="28" rx="6"
                fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1" />
          <text x="95" y="398" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">CLOSED (after 2×MSL)</text>
        </g>

        <!-- Animated dots -->
        <circle class="cl-d1" cx="110" cy="135" r="5" fill="#ef4444" opacity="0" filter="url(#cl-glow)" />
        <circle class="cl-d2" cx="590" cy="185" r="5" fill="#6366f1" opacity="0" filter="url(#cl-glow)" />
        <circle class="cl-d3" cx="590" cy="255" r="5" fill="#6366f1" opacity="0" filter="url(#cl-glow)" />
        <circle class="cl-d4" cx="110" cy="305" r="5" fill="#10b981" opacity="0" filter="url(#cl-glow)" />
      </svg>
    </div>
  `,
})
export class TcpCloseComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.tcp-close');
    const tl = this.createScrollTimeline(container);

    // 1. Client + server
    tl.fromTo(
      this.q('.cl-client'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.cl-server'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );
    tl.to(this.q('.cl-tl-l'), { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.to(this.q('.cl-tl-r'), { opacity: 1, duration: 0.3 }, '-=0.2');

    // 2. Start loop
    tl.add(() => this.startCloseLoop());
  }

  private startCloseLoop(): void {
    const container = this.q('.tcp-close');
    const loop = this.createLoopingTimeline(container);

    const d1 = this.q('.cl-d1');
    const d2 = this.q('.cl-d2');
    const d3 = this.q('.cl-d3');
    const d4 = this.q('.cl-d4');

    // Step 1: FIN →
    loop.fromTo(this.q('.cl-step1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
    loop.fromTo(this.q('.cl-state1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1);
    loop.set(d1, { attr: { cx: 110, cy: 135 }, opacity: 0 }, 0);
    loop.to(d1, { opacity: 1, duration: 0.05 }, 0);
    loop.to(d1, { attr: { cx: 590, cy: 155 }, duration: 0.5, ease: 'power2.inOut' }, 0.05);
    loop.to(d1, { opacity: 0, duration: 0.05 }, 0.55);

    // Step 2: ← ACK
    loop.fromTo(this.q('.cl-step2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.7);
    loop.fromTo(this.q('.cl-state2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.8);
    loop.set(d2, { attr: { cx: 590, cy: 185 }, opacity: 0 }, 0.7);
    loop.to(d2, { opacity: 1, duration: 0.05 }, 0.7);
    loop.to(d2, { attr: { cx: 110, cy: 205 }, duration: 0.5, ease: 'power2.inOut' }, 0.75);
    loop.to(d2, { opacity: 0, duration: 0.05 }, 1.25);

    // Step 3: ← FIN
    loop.fromTo(this.q('.cl-step3'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.5);
    loop.fromTo(this.q('.cl-state3'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.5);
    loop.set(d3, { attr: { cx: 590, cy: 255 }, opacity: 0 }, 1.5);
    loop.to(d3, { opacity: 1, duration: 0.05 }, 1.5);
    loop.to(d3, { attr: { cx: 110, cy: 275 }, duration: 0.5, ease: 'power2.inOut' }, 1.55);
    loop.to(d3, { opacity: 0, duration: 0.05 }, 2.05);

    // Step 4: ACK →
    loop.fromTo(this.q('.cl-step4'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.2);
    loop.set(d4, { attr: { cx: 110, cy: 305 }, opacity: 0 }, 2.2);
    loop.to(d4, { opacity: 1, duration: 0.05 }, 2.2);
    loop.to(d4, { attr: { cx: 590, cy: 325 }, duration: 0.5, ease: 'power2.inOut' }, 2.25);
    loop.to(d4, { opacity: 0, duration: 0.05 }, 2.75);

    // TIME_WAIT + CLOSED
    loop.fromTo(this.q('.cl-timewait'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.9);
    loop.fromTo(this.q('.cl-server-closed'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.9);
    loop.fromTo(this.q('.cl-client-closed'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.3);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out
    const allSteps = [
      '.cl-step1', '.cl-step2', '.cl-step3', '.cl-step4',
      '.cl-state1', '.cl-state2', '.cl-state3',
      '.cl-timewait', '.cl-server-closed', '.cl-client-closed',
    ].map((s) => this.q(s));
    loop.to(allSteps, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
