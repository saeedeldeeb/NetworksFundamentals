import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-socket-sharding',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .sock-shard {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .sock-shard svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="sock-shard">
      <svg viewBox="0 0 740 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sh-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feFlood flood-color="#22d3ee" flood-opacity="0.4" />
            <feComposite in2="b" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- ===== FORK MODEL (left) ===== -->

        <g class="sh-fork-zone" opacity="0">
          <rect x="15" y="10" width="345" height="420" rx="12"
                fill="rgba(99, 102, 241, 0.02)" stroke="rgba(99, 102, 241, 0.15)" stroke-width="1" />
          <text x="187" y="34" text-anchor="middle" fill="#6366f1"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Fork Model</text>
        </g>

        <!-- Single shared socket -->
        <g class="sh-fork-socket" opacity="0">
          <rect x="105" y="50" width="170" height="86" rx="10"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1.5" />
          <text x="190" y="70" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ONE Shared Socket</text>
          <text x="190" y="84" text-anchor="middle" fill="#475569"
                font-size="7" font-family="'JetBrains Mono', monospace">:8080</text>
          <rect x="115" y="94" width="68" height="28" rx="4"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1" />
          <text x="149" y="112" text-anchor="middle" fill="#f59e0b"
                font-size="6" font-weight="600" font-family="'JetBrains Mono', monospace">SYN Q</text>
          <rect x="193" y="94" width="68" height="28" rx="4"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1" />
          <text x="227" y="112" text-anchor="middle" fill="#10b981"
                font-size="6" font-weight="600" font-family="'JetBrains Mono', monospace">Accept Q</text>
        </g>

        <!-- Fork arrows down to processes -->
        <g class="sh-fork-arrows" opacity="0">
          <line x1="160" y1="136" x2="90" y2="165" stroke="#475569" stroke-width="1" stroke-dasharray="3,2" />
          <line x1="190" y1="136" x2="190" y2="165" stroke="#475569" stroke-width="1" stroke-dasharray="3,2" />
          <line x1="220" y1="136" x2="290" y2="165" stroke="#475569" stroke-width="1" stroke-dasharray="3,2" />
          <text x="190" y="156" text-anchor="middle" fill="#475569"
                font-size="6.5" font-style="italic" font-family="Inter, sans-serif">all share same fd</text>
        </g>

        <!-- Process 1 (parent) -->
        <g class="sh-fork-p1" opacity="0">
          <rect x="40" y="168" width="100" height="40" rx="8" fill="#1a2332"
                stroke="#6366f1" stroke-width="1.5" />
          <text x="90" y="186" text-anchor="middle" fill="#6366f1"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Parent</text>
          <text x="90" y="200" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">fd=3</text>
        </g>

        <!-- Process 2 (child 1) -->
        <g class="sh-fork-p2" opacity="0">
          <rect x="150" y="168" width="100" height="40" rx="8" fill="#1a2332"
                stroke="#6366f1" stroke-width="1.5" />
          <text x="200" y="186" text-anchor="middle" fill="#6366f1"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Child 1</text>
          <text x="200" y="200" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">fd=3 (same!)</text>
        </g>

        <!-- Process 3 (child 2) -->
        <g class="sh-fork-p3" opacity="0">
          <rect x="260" y="168" width="100" height="40" rx="8" fill="#1a2332"
                stroke="#6366f1" stroke-width="1.5" />
          <text x="310" y="186" text-anchor="middle" fill="#6366f1"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Child 2</text>
          <text x="310" y="200" text-anchor="middle" fill="#475569"
                font-size="6" font-family="'JetBrains Mono', monospace">fd=3 (same!)</text>
        </g>

        <!-- Fork problem -->
        <g class="sh-fork-problem" opacity="0">
          <rect x="50" y="224" width="280" height="38" rx="7"
                fill="rgba(239, 68, 68, 0.06)" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1" />
          <text x="190" y="240" text-anchor="middle" fill="#ef4444"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Problem: all compete for ONE Accept Queue</text>
          <text x="190" y="254" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="Inter, sans-serif">Thundering herd — all wake up, only one wins</text>
        </g>

        <!-- Incoming connections (fork side) -->
        <g class="sh-fork-conns" opacity="0">
          <text x="190" y="286" text-anchor="middle" fill="#475569"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">Incoming connections</text>

          <rect x="50" y="296" width="280" height="28" rx="6"
                fill="#0c1222" stroke="#374151" stroke-width="1" />
          <text x="70" y="314" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn A</text>
          <text x="130" y="314" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn B</text>
          <text x="190" y="314" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn C</text>
          <text x="250" y="314" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn D</text>

          <!-- All go to same queue -->
          <line x1="190" y1="324" x2="190" y2="340" stroke="#475569" stroke-width="1" />
          <text x="190" y="355" text-anchor="middle" fill="#475569"
                font-size="6.5" font-style="italic" font-family="Inter, sans-serif">all &rarr; same Accept Q &rarr; random process gets it</text>
        </g>

        <!-- ===== SO_REUSEPORT MODEL (right) ===== -->

        <g class="sh-reuse-zone" opacity="0">
          <rect x="380" y="10" width="345" height="420" rx="12"
                fill="rgba(34, 211, 238, 0.02)" stroke="rgba(34, 211, 238, 0.15)" stroke-width="1" />
          <text x="552" y="34" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">SO_REUSEPORT</text>
        </g>

        <!-- Process 1 + its own socket -->
        <g class="sh-reuse-p1" opacity="0">
          <rect x="395" y="50" width="100" height="110" rx="8" fill="#1a2332"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="445" y="70" text-anchor="middle" fill="#22d3ee"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Process 1</text>
          <!-- Its socket -->
          <rect x="403" y="80" width="84" height="68" rx="6"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1" />
          <text x="445" y="96" text-anchor="middle" fill="#f59e0b"
                font-size="6" font-weight="600" font-family="'JetBrains Mono', monospace">Socket A :8080</text>
          <rect x="409" y="104" width="34" height="16" rx="3"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="0.5" />
          <text x="426" y="115" text-anchor="middle" fill="#f59e0b"
                font-size="5" font-family="'JetBrains Mono', monospace">SYN</text>
          <rect x="447" y="104" width="34" height="16" rx="3"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="0.5" />
          <text x="464" y="115" text-anchor="middle" fill="#10b981"
                font-size="5" font-family="'JetBrains Mono', monospace">Acc</text>
          <text x="445" y="138" text-anchor="middle" fill="#475569"
                font-size="5.5" font-family="'JetBrains Mono', monospace">own queues</text>
        </g>

        <!-- Process 2 + its own socket -->
        <g class="sh-reuse-p2" opacity="0">
          <rect x="505" y="50" width="100" height="110" rx="8" fill="#1a2332"
                stroke="#10b981" stroke-width="1.5" />
          <text x="555" y="70" text-anchor="middle" fill="#10b981"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Process 2</text>
          <rect x="513" y="80" width="84" height="68" rx="6"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1" />
          <text x="555" y="96" text-anchor="middle" fill="#f59e0b"
                font-size="6" font-weight="600" font-family="'JetBrains Mono', monospace">Socket B :8080</text>
          <rect x="519" y="104" width="34" height="16" rx="3"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="0.5" />
          <text x="536" y="115" text-anchor="middle" fill="#f59e0b"
                font-size="5" font-family="'JetBrains Mono', monospace">SYN</text>
          <rect x="557" y="104" width="34" height="16" rx="3"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="0.5" />
          <text x="574" y="115" text-anchor="middle" fill="#10b981"
                font-size="5" font-family="'JetBrains Mono', monospace">Acc</text>
          <text x="555" y="138" text-anchor="middle" fill="#475569"
                font-size="5.5" font-family="'JetBrains Mono', monospace">own queues</text>
        </g>

        <!-- Process 3 + its own socket -->
        <g class="sh-reuse-p3" opacity="0">
          <rect x="615" y="50" width="100" height="110" rx="8" fill="#1a2332"
                stroke="#ec4899" stroke-width="1.5" />
          <text x="665" y="70" text-anchor="middle" fill="#ec4899"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">Process 3</text>
          <rect x="623" y="80" width="84" height="68" rx="6"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1" />
          <text x="665" y="96" text-anchor="middle" fill="#f59e0b"
                font-size="6" font-weight="600" font-family="'JetBrains Mono', monospace">Socket C :8080</text>
          <rect x="629" y="104" width="34" height="16" rx="3"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="0.5" />
          <text x="646" y="115" text-anchor="middle" fill="#f59e0b"
                font-size="5" font-family="'JetBrains Mono', monospace">SYN</text>
          <rect x="667" y="104" width="34" height="16" rx="3"
                fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="0.5" />
          <text x="684" y="115" text-anchor="middle" fill="#10b981"
                font-size="5" font-family="'JetBrains Mono', monospace">Acc</text>
          <text x="665" y="138" text-anchor="middle" fill="#475569"
                font-size="5.5" font-family="'JetBrains Mono', monospace">own queues</text>
        </g>

        <!-- Same IP:Port label -->
        <g class="sh-reuse-label" opacity="0">
          <rect x="430" y="168" width="200" height="22" rx="5"
                fill="rgba(34, 211, 238, 0.06)" />
          <text x="530" y="183" text-anchor="middle" fill="#22d3ee"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">All on same IP:Port (0.0.0.0:8080)</text>
        </g>

        <!-- Kernel load balancer -->
        <g class="sh-reuse-lb" opacity="0">
          <rect x="440" y="200" width="180" height="32" rx="8"
                fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1.5" />
          <text x="530" y="220" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">Kernel Load Balancer</text>
        </g>

        <!-- Incoming connections (reuse side) -->
        <g class="sh-reuse-conns" opacity="0">
          <text x="530" y="252" text-anchor="middle" fill="#475569"
                font-size="7" font-weight="600" font-family="Inter, sans-serif">Incoming connections</text>

          <rect x="400" y="262" width="260" height="28" rx="6"
                fill="#0c1222" stroke="#374151" stroke-width="1" />
          <text x="420" y="280" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn A</text>
          <text x="480" y="280" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn B</text>
          <text x="540" y="280" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn C</text>
          <text x="600" y="280" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">conn D</text>
        </g>

        <!-- Distribution arrows -->
        <g class="sh-reuse-dist" opacity="0">
          <line x1="430" y1="290" x2="445" y2="310" stroke="#22d3ee" stroke-width="1" />
          <line x1="490" y1="290" x2="445" y2="310" stroke="#22d3ee" stroke-width="1" />
          <line x1="550" y1="290" x2="555" y2="310" stroke="#10b981" stroke-width="1" />
          <line x1="610" y1="290" x2="665" y2="310" stroke="#ec4899" stroke-width="1" />

          <text x="445" y="325" text-anchor="middle" fill="#22d3ee" font-size="6.5"
                font-family="'JetBrains Mono', monospace">A, B &rarr; P1</text>
          <text x="555" y="325" text-anchor="middle" fill="#10b981" font-size="6.5"
                font-family="'JetBrains Mono', monospace">C &rarr; P2</text>
          <text x="665" y="325" text-anchor="middle" fill="#ec4899" font-size="6.5"
                font-family="'JetBrains Mono', monospace">D &rarr; P3</text>
        </g>

        <!-- Reuse benefit -->
        <g class="sh-reuse-benefit" opacity="0">
          <rect x="405" y="340" width="255" height="38" rx="7"
                fill="rgba(16, 185, 129, 0.06)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1" />
          <text x="532" y="356" text-anchor="middle" fill="#10b981"
                font-size="7.5" font-weight="700" font-family="'JetBrains Mono', monospace">No contention — each process has own queues</text>
          <text x="532" y="370" text-anchor="middle" fill="#64748b"
                font-size="6.5" font-family="Inter, sans-serif">Used by Nginx, Envoy, HAProxy</text>
        </g>

        <!-- Bottom comparison -->
        <g class="sh-compare" opacity="0">
          <rect x="130" y="395" width="480" height="28" rx="6"
                fill="rgba(245, 158, 11, 0.04)" stroke="#f59e0b" stroke-width="1" />
          <text x="370" y="413" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            Fork = shared queues (contention)  |  SO_REUSEPORT = separate queues (scalable)
          </text>
        </g>

        <!-- Animated dots -->
        <circle class="sh-dot" cx="190" cy="324" r="5" fill="#22d3ee" opacity="0" filter="url(#sh-glow)" />
      </svg>
    </div>
  `,
})
export class SocketShardingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.sock-shard');
    const tl = this.createScrollTimeline(container);

    // Fork side
    tl.fromTo(this.q('.sh-fork-zone'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.sh-fork-socket'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
    tl.fromTo(this.q('.sh-fork-arrows'), { opacity: 0 }, { opacity: 1, duration: 0.2 });
    tl.fromTo(this.q('.sh-fork-p1'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.2 });
    tl.fromTo(this.q('.sh-fork-p2'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1');
    tl.fromTo(this.q('.sh-fork-p3'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1');
    tl.fromTo(this.q('.sh-fork-problem'), { opacity: 0 }, { opacity: 1, duration: 0.25 });
    tl.fromTo(this.q('.sh-fork-conns'), { opacity: 0 }, { opacity: 1, duration: 0.25 });

    // Reuse side
    tl.fromTo(this.q('.sh-reuse-zone'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.8');
    tl.fromTo(this.q('.sh-reuse-p1'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.5');
    tl.fromTo(this.q('.sh-reuse-p2'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');
    tl.fromTo(this.q('.sh-reuse-p3'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');
    tl.fromTo(this.q('.sh-reuse-label'), { opacity: 0 }, { opacity: 1, duration: 0.2 });
    tl.fromTo(this.q('.sh-reuse-lb'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 });
    tl.fromTo(this.q('.sh-reuse-conns'), { opacity: 0 }, { opacity: 1, duration: 0.25 });

    // Compare bar
    tl.fromTo(this.q('.sh-compare'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Start loop for distribution animation
    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.sock-shard');
    const loop = this.createLoopingTimeline(container);
    const dot = this.q('.sh-dot');

    // Show distribution arrows on reuse side
    loop.fromTo(this.q('.sh-reuse-dist'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);

    // Animate dots on reuse side: conn A → Process 1
    loop.set(dot, { attr: { cx: 420, cy: 276, fill: '#22d3ee' }, opacity: 0 }, 0.3);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 0.3);
    loop.to(dot, { attr: { cx: 445, cy: 120 }, duration: 0.5, ease: 'power2.inOut' }, 0.35);
    loop.to(dot, { opacity: 0, duration: 0.1 }, 0.85);

    // conn B → Process 1
    loop.set(dot, { attr: { cx: 480, cy: 276, fill: '#22d3ee' }, opacity: 0 }, 1.0);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 1.0);
    loop.to(dot, { attr: { cx: 445, cy: 120 }, duration: 0.5, ease: 'power2.inOut' }, 1.05);
    loop.to(dot, { opacity: 0, duration: 0.1 }, 1.55);

    // conn C → Process 2
    loop.set(dot, { attr: { cx: 540, cy: 276, fill: '#10b981' }, opacity: 0 }, 1.7);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 1.7);
    loop.to(dot, { attr: { cx: 555, cy: 120 }, duration: 0.5, ease: 'power2.inOut' }, 1.75);
    loop.to(dot, { opacity: 0, duration: 0.1 }, 2.25);

    // conn D → Process 3
    loop.set(dot, { attr: { cx: 600, cy: 276, fill: '#ec4899' }, opacity: 0 }, 2.4);
    loop.to(dot, { opacity: 1, duration: 0.05 }, 2.4);
    loop.to(dot, { attr: { cx: 665, cy: 120 }, duration: 0.5, ease: 'power2.inOut' }, 2.45);
    loop.to(dot, { opacity: 0, duration: 0.1 }, 2.95);

    // Show benefit
    loop.fromTo(this.q('.sh-reuse-benefit'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.1);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade animated elements
    loop.to(this.q('.sh-reuse-dist'), { opacity: 0, duration: 0.3 });
    loop.to(this.q('.sh-reuse-benefit'), { opacity: 0, duration: 0.3 }, '<');
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
