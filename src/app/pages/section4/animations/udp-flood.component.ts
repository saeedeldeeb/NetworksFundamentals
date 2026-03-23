import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-udp-flood',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .udp-flood {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .udp-flood svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="udp-flood">
      <svg viewBox="0 0 700 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="flood-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">UDP Flood Attack</text>

        <!-- ===== ATTACKER ===== -->
        <g class="flood-attacker" opacity="0">
          <rect x="30" y="110" width="110" height="80" rx="12" fill="#1f2937"
                stroke="#ef4444" stroke-width="2" />
          <text x="85" y="143" text-anchor="middle" fill="#ef4444"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Attacker</text>
          <text x="85" y="162" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Sends massive</text>
          <text x="85" y="176" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">UDP datagrams</text>
        </g>

        <!-- ===== SERVER ===== -->
        <g class="flood-server" opacity="0">
          <rect x="480" y="70" width="140" height="160" rx="14" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="550" y="100" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Server</text>

          <!-- CPU meter -->
          <text x="500" y="126" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">CPU</text>
          <rect x="530" y="117" width="70" height="10" rx="3"
                fill="#0f172a" stroke="#374151" stroke-width="1" />
          <rect class="flood-cpu-bar" x="531" y="118" width="0" height="8" rx="2"
                fill="#10b981" />

          <!-- Memory meter -->
          <text x="500" y="150" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">MEM</text>
          <rect x="530" y="141" width="70" height="10" rx="3"
                fill="#0f172a" stroke="#374151" stroke-width="1" />
          <rect class="flood-mem-bar" x="531" y="142" width="0" height="8" rx="2"
                fill="#10b981" />

          <!-- Process label -->
          <text class="flood-process-label" x="550" y="178" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Processing each packet...</text>

          <!-- Server status -->
          <text class="flood-status" x="550" y="200" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">ONLINE</text>
        </g>

        <!-- Server overload border -->
        <rect class="flood-overload" x="475" y="65" width="150" height="170" rx="16"
              fill="none" stroke="#ef4444" stroke-width="3" opacity="0" />

        <!-- ===== PACKET STREAM ===== -->
        <!-- Packets (will be animated) -->
        <circle class="flood-p1" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p2" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p3" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p4" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p5" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p6" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p7" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />
        <circle class="flood-p8" cx="140" cy="150" r="5" fill="#ef4444" opacity="0" />

        <!-- ===== COMPARISON ===== -->
        <g class="flood-compare" opacity="0">
          <!-- UDP side -->
          <rect x="60" y="265" width="260" height="60" rx="8"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="75" y="285" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">UDP: No handshake required</text>
          <text x="75" y="300" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Server must process every packet</text>
          <text x="75" y="313" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Can't filter by connection state</text>

          <!-- TCP side -->
          <rect x="380" y="265" width="260" height="60" rx="8"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="395" y="285" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">TCP: Handshake required</text>
          <text x="395" y="300" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Forged packets rejected</text>
          <text x="395" y="313" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">No valid connection = dropped</text>
        </g>
      </svg>
    </div>
  `,
})
export class UdpFloodComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.udp-flood');
    const tl = this.createScrollTimeline(container);

    // 1. Attacker + server appear
    tl.fromTo(
      this.q('.flood-attacker'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      this.q('.flood-server'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    );

    // 2. Comparison boxes
    tl.fromTo(
      this.q('.flood-compare'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    );

    // 3. Start flood loop
    tl.add(() => this.startFloodLoop());
  }

  private startFloodLoop(): void {
    const container = this.q('.udp-flood');
    const loop = this.createLoopingTimeline(container);

    const startX = 140;
    const startY = 150;
    const endX = 480;
    const endY = 150;

    const packets = [
      this.q('.flood-p1'),
      this.q('.flood-p2'),
      this.q('.flood-p3'),
      this.q('.flood-p4'),
      this.q('.flood-p5'),
      this.q('.flood-p6'),
      this.q('.flood-p7'),
      this.q('.flood-p8'),
    ];

    const cpuBar = this.q('.flood-cpu-bar');
    const memBar = this.q('.flood-mem-bar');
    const status = this.q('.flood-status');
    const overload = this.q('.flood-overload');

    // Reset bars
    loop.set(cpuBar, { attr: { width: 5, fill: '#10b981' } }, 0);
    loop.set(memBar, { attr: { width: 5, fill: '#10b981' } }, 0);
    loop.add(() => {
      status.textContent = 'ONLINE';
      status.setAttribute('fill', '#10b981');
    }, 0);
    loop.set(overload, { opacity: 0 }, 0);

    // Staggered packet waves
    const dur = 0.35;
    packets.forEach((p, i) => {
      const t = i * 0.15;
      const yOffset = (i % 3 - 1) * 20;
      loop.set(p, { attr: { cx: startX, cy: startY + yOffset }, opacity: 0 }, t);
      loop.to(p, { opacity: 0.8, duration: 0.03 }, t);
      loop.to(
        p,
        { attr: { cx: endX, cy: endY + yOffset * 0.3 }, duration: dur, ease: 'power1.in' },
        t,
      );
      loop.to(p, { opacity: 0, duration: 0.03 }, t + dur);
    });

    // CPU ramps up
    loop.to(cpuBar, { attr: { width: 20 }, duration: 0.3 }, 0.2);
    loop.to(cpuBar, { attr: { width: 40, fill: '#f59e0b' }, duration: 0.3 }, 0.5);
    loop.to(cpuBar, { attr: { width: 60, fill: '#ef4444' }, duration: 0.3 }, 0.8);
    loop.to(cpuBar, { attr: { width: 68 }, duration: 0.2 }, 1.1);

    // Memory ramps up
    loop.to(memBar, { attr: { width: 15 }, duration: 0.3 }, 0.3);
    loop.to(memBar, { attr: { width: 35, fill: '#f59e0b' }, duration: 0.3 }, 0.6);
    loop.to(memBar, { attr: { width: 55, fill: '#ef4444' }, duration: 0.3 }, 0.9);
    loop.to(memBar, { attr: { width: 68 }, duration: 0.2 }, 1.2);

    // Status change
    loop.add(() => {
      status.textContent = 'OVERLOADED';
      status.setAttribute('fill', '#ef4444');
    }, 1.3);

    // Overload flash
    loop.to(overload, { opacity: 0.9, duration: 0.1 }, 1.3);
    loop.to(overload, { opacity: 0.3, duration: 0.2 }, 1.5);
    loop.to(overload, { opacity: 0.9, duration: 0.2 }, 1.7);

    // Hold
    loop.to({}, { duration: 1.0 });

    // Reset
    loop.to(overload, { opacity: 0, duration: 0.3 });
    loop.to([cpuBar, memBar], { attr: { width: 5, fill: '#10b981' }, duration: 0.3 }, '-=0.2');
    loop.add(() => {
      status.textContent = 'ONLINE';
      status.setAttribute('fill', '#10b981');
    });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
