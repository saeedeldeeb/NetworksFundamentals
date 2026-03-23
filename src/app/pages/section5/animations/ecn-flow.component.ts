import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-ecn-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ecn-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .ecn-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="ecn-anim">
      <svg viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ecn-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="ecn-arr-r" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#22d3ee" />
          </marker>
          <marker id="ecn-arr-l" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#6366f1" />
          </marker>
          <marker id="ecn-arr-g" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#10b981" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">Explicit Congestion Notification (ECN)</text>

        <!-- === Sender === -->
        <g class="ecn-sender" opacity="0">
          <rect x="30" y="55" width="120" height="65" rx="12" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="90" y="82" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="90" y="100" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">cwnd = 16 MSS</text>
        </g>

        <!-- === Router === -->
        <g class="ecn-router" opacity="0">
          <rect x="270" y="55" width="160" height="65" rx="12" fill="#1f2937"
                stroke="#f59e0b" stroke-width="2" />
          <text x="350" y="78" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <text x="350" y="96" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Buffer filling up...</text>
        </g>

        <!-- Router congestion indicator -->
        <g class="ecn-congest" opacity="0">
          <rect x="290" y="40" width="120" height="16" rx="4"
                fill="rgba(239, 68, 68, 0.15)" />
          <text x="350" y="52" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">CONGESTION DETECTED</text>
        </g>

        <!-- === Receiver === -->
        <g class="ecn-receiver" opacity="0">
          <rect x="550" y="55" width="120" height="65" rx="12" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="610" y="82" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Receiver</text>
          <text x="610" y="100" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Reads ECN bit</text>
        </g>

        <!-- === STEP 1: Sender → Router → Receiver (packet with ECN marked) === -->
        <g class="ecn-s1-line" opacity="0">
          <line x1="150" y1="155" x2="535" y2="155"
                stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ecn-arr-r)" />
        </g>
        <g class="ecn-s1-label" opacity="0">
          <rect x="195" y="130" width="310" height="20" rx="5"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="350" y="144" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            1. Data packet → Router sets ECN bit in IP header
          </text>
        </g>

        <!-- Step 1 badge -->
        <g class="ecn-badge1" opacity="0">
          <rect x="15" y="142" width="18" height="18" rx="9" fill="#22d3ee" />
          <text x="24" y="155" text-anchor="middle" fill="#0f172a"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">1</text>
        </g>

        <!-- ECN bit marker on packet -->
        <g class="ecn-mark" opacity="0">
          <rect x="326" y="158" width="48" height="16" rx="4"
                fill="#f59e0b" opacity="0.2" />
          <text x="350" y="170" text-anchor="middle" fill="#f59e0b"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">ECN=1</text>
        </g>

        <!-- === STEP 2: Receiver → Sender (ECE flag in TCP) === -->
        <g class="ecn-s2-line" opacity="0">
          <line x1="550" y1="220" x2="165" y2="220"
                stroke="#6366f1" stroke-width="1.5" marker-end="url(#ecn-arr-l)" />
        </g>
        <g class="ecn-s2-label" opacity="0">
          <rect x="210" y="195" width="280" height="20" rx="5"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text x="350" y="209" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            2. TCP response with ECE flag set
          </text>
        </g>
        <g class="ecn-badge2" opacity="0">
          <rect x="667" y="207" width="18" height="18" rx="9" fill="#6366f1" />
          <text x="676" y="220" text-anchor="middle" fill="#fff"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">2</text>
        </g>
        <!-- ECE flag marker -->
        <g class="ecn-ece" opacity="0">
          <rect x="326" y="223" width="48" height="16" rx="4"
                fill="#6366f1" opacity="0.2" />
          <text x="350" y="235" text-anchor="middle" fill="#6366f1"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">ECE=1</text>
        </g>

        <!-- === STEP 3: Sender reduces cwnd, sends CWR === -->
        <g class="ecn-s3-line" opacity="0">
          <line x1="150" y1="285" x2="535" y2="285"
                stroke="#10b981" stroke-width="1.5" marker-end="url(#ecn-arr-g)" />
        </g>
        <g class="ecn-s3-label" opacity="0">
          <rect x="175" y="260" width="350" height="20" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="350" y="274" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            3. Sender slows down, sends CWR: "I heard you"
          </text>
        </g>
        <g class="ecn-badge3" opacity="0">
          <rect x="15" y="272" width="18" height="18" rx="9" fill="#10b981" />
          <text x="24" y="285" text-anchor="middle" fill="#0f172a"
                font-size="9" font-weight="800" font-family="Inter, sans-serif">3</text>
        </g>
        <!-- CWR flag marker -->
        <g class="ecn-cwr" opacity="0">
          <rect x="326" y="288" width="48" height="16" rx="4"
                fill="#10b981" opacity="0.2" />
          <text x="350" y="300" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">CWR=1</text>
        </g>

        <!-- Sender cwnd reduction -->
        <g class="ecn-reduced" opacity="0">
          <rect x="30" y="300" width="120" height="20" rx="5"
                fill="rgba(16, 185, 129, 0.1)" />
          <text x="90" y="314" text-anchor="middle" fill="#10b981"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">cwnd = 8 MSS (halved)</text>
        </g>

        <!-- Bottom comparison -->
        <g class="ecn-compare" opacity="0">
          <rect x="100" y="340" width="240" height="28" rx="6"
                fill="rgba(239, 68, 68, 0.06)" stroke="#ef4444" stroke-width="1" />
          <text x="220" y="358" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Without ECN: wait for packet loss</text>

          <rect x="360" y="340" width="240" height="28" rx="6"
                fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" stroke-width="1" />
          <text x="480" y="358" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">With ECN: early warning, no loss</text>
        </g>

        <!-- Animated packet dots -->
        <circle class="ecn-d1" cx="150" cy="155" r="6" fill="#22d3ee" opacity="0" filter="url(#ecn-glow)" />
        <circle class="ecn-d2" cx="550" cy="220" r="6" fill="#6366f1" opacity="0" filter="url(#ecn-glow)" />
        <circle class="ecn-d3" cx="150" cy="285" r="6" fill="#10b981" opacity="0" filter="url(#ecn-glow)" />
      </svg>
    </div>
  `,
})
export class EcnFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ecn-anim');
    const tl = this.createScrollTimeline(container);

    // 1. Show actors
    tl.fromTo(
      this.q('.ecn-sender'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.ecn-router'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );
    tl.fromTo(
      this.q('.ecn-receiver'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );

    // 2. Comparison at bottom
    tl.fromTo(
      this.q('.ecn-compare'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3 },
    );

    // 3. Start loop
    tl.add(() => this.startEcnLoop());
  }

  private startEcnLoop(): void {
    const container = this.q('.ecn-anim');
    const loop = this.createLoopingTimeline(container);

    const d1 = this.q('.ecn-d1');
    const d2 = this.q('.ecn-d2');
    const d3 = this.q('.ecn-d3');

    // === Step 1: Data packet with ECN marking ===
    // Congestion appears on router
    loop.fromTo(this.q('.ecn-congest'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);

    // Line + label appear
    loop.fromTo(this.q('.ecn-badge1'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.1);
    loop.fromTo(this.q('.ecn-s1-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1);
    loop.fromTo(this.q('.ecn-s1-line'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1);

    // Packet travels sender → receiver
    loop.set(d1, { attr: { cx: 150, cy: 155 }, opacity: 0 }, 0.2);
    loop.to(d1, { opacity: 1, duration: 0.05 }, 0.2);
    loop.to(d1, { attr: { cx: 350 }, duration: 0.35, ease: 'power1.in' }, 0.25);
    // ECN bit gets stamped at router
    loop.fromTo(this.q('.ecn-mark'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.6);
    loop.to(d1, { attr: { cx: 535 }, duration: 0.3, ease: 'power1.out' }, 0.65);
    loop.to(d1, { opacity: 0, duration: 0.05 }, 0.95);

    // === Step 2: Receiver sends ECE back ===
    loop.fromTo(this.q('.ecn-badge2'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.1);
    loop.fromTo(this.q('.ecn-s2-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.1);
    loop.fromTo(this.q('.ecn-s2-line'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.1);

    loop.set(d2, { attr: { cx: 550, cy: 220 }, opacity: 0 }, 1.2);
    loop.to(d2, { opacity: 1, duration: 0.05 }, 1.2);
    // ECE flag marker
    loop.fromTo(this.q('.ecn-ece'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.25);
    loop.to(d2, { attr: { cx: 165 }, duration: 0.6, ease: 'power2.inOut' }, 1.25);
    loop.to(d2, { opacity: 0, duration: 0.05 }, 1.85);

    // === Step 3: Sender slows down, sends CWR ===
    loop.fromTo(this.q('.ecn-badge3'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.0);
    loop.fromTo(this.q('.ecn-s3-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.0);
    loop.fromTo(this.q('.ecn-s3-line'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.0);
    loop.fromTo(this.q('.ecn-reduced'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.0);

    loop.set(d3, { attr: { cx: 150, cy: 285 }, opacity: 0 }, 2.1);
    loop.to(d3, { opacity: 1, duration: 0.05 }, 2.1);
    loop.fromTo(this.q('.ecn-cwr'), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.15);
    loop.to(d3, { attr: { cx: 535 }, duration: 0.6, ease: 'power2.inOut' }, 2.15);
    loop.to(d3, { opacity: 0, duration: 0.05 }, 2.75);

    // Hold
    loop.to({}, { duration: 1.5 });

    // Fade out all step elements
    const allEls = [
      '.ecn-congest', '.ecn-badge1', '.ecn-s1-label', '.ecn-s1-line', '.ecn-mark',
      '.ecn-badge2', '.ecn-s2-label', '.ecn-s2-line', '.ecn-ece',
      '.ecn-badge3', '.ecn-s3-label', '.ecn-s3-line', '.ecn-cwr', '.ecn-reduced',
    ].map((s) => this.q(s));
    loop.to(allEls, { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
