import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-dns-amplification',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .dns-amp {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .dns-amp svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="dns-amp">
      <svg viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="amp-glow-red">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="amp-glow-amber">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="350" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.5">DNS Amplification Attack</text>

        <!-- ===== ATTACKER ===== -->
        <g class="amp-attacker" opacity="0">
          <rect x="20" y="160" width="110" height="80" rx="12" fill="#1f2937"
                stroke="#ef4444" stroke-width="2" />
          <text x="75" y="193" text-anchor="middle" fill="#ef4444"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Attacker</text>
          <text x="75" y="210" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">6.6.6.6</text>
          <text x="75" y="225" text-anchor="middle" fill="#64748b"
                font-size="7" font-family="'JetBrains Mono', monospace">Forges source IP</text>
        </g>

        <!-- ===== DNS SERVERS ===== -->
        <g class="amp-dns1" opacity="0">
          <rect x="310" y="50" width="110" height="68" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="365" y="78" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">DNS Server 1</text>
          <text x="365" y="96" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">1.1.1.1</text>
        </g>
        <g class="amp-dns2" opacity="0">
          <rect x="310" y="166" width="110" height="68" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="365" y="194" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">DNS Server 2</text>
          <text x="365" y="212" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">8.8.8.8</text>
        </g>
        <g class="amp-dns3" opacity="0">
          <rect x="310" y="282" width="110" height="68" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="365" y="310" text-anchor="middle" fill="#6366f1"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">DNS Server 3</text>
          <text x="365" y="328" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">9.9.9.9</text>
        </g>

        <!-- ===== VICTIM ===== -->
        <g class="amp-victim" opacity="0">
          <rect x="570" y="160" width="110" height="80" rx="12" fill="#1f2937"
                stroke="#f59e0b" stroke-width="2" />
          <text x="625" y="193" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Victim</text>
          <text x="625" y="210" text-anchor="middle" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">5.5.5.5</text>
        </g>

        <!-- Victim overload effect -->
        <rect class="amp-overload" x="565" y="155" width="120" height="90" rx="14"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" />

        <!-- ===== PHASE LABELS ===== -->
        <g class="amp-phase1-label" opacity="0">
          <rect x="140" y="130" width="150" height="22" rx="5"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="215" y="145" text-anchor="middle" fill="#ef4444"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            1. Forged queries (small)
          </text>
        </g>

        <g class="amp-phase2-label" opacity="0">
          <rect x="440" y="130" width="160" height="22" rx="5"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="520" y="145" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">
            2. Amplified responses (large)
          </text>
        </g>

        <!-- ===== FORGED PACKET INFO ===== -->
        <g class="amp-forged-info" opacity="0">
          <rect x="130" y="350" width="210" height="60" rx="8"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="145" y="370" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Forged Query Packet</text>
          <text x="145" y="386" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Src: 5.5.5.5 (SPOOFED!)</text>
          <text x="145" y="400" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Dst: DNS Server | ~40 bytes</text>
        </g>

        <!-- ===== AMPLIFIED RESPONSE INFO ===== -->
        <g class="amp-response-info" opacity="0">
          <rect x="380" y="350" width="210" height="60" rx="8"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="395" y="370" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Amplified Response</text>
          <text x="395" y="386" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Src: DNS Server</text>
          <text x="395" y="400" fill="#94a3b8"
                font-size="8" font-family="'JetBrains Mono', monospace">Dst: 5.5.5.5 | ~3000 bytes</text>
        </g>

        <!-- ===== AMPLIFICATION FACTOR ===== -->
        <g class="amp-factor" opacity="0">
          <rect x="230" y="420" width="240" height="22" rx="5"
                fill="rgba(239, 68, 68, 0.1)" />
          <text x="350" y="436" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Amplification: 40 B query &rarr; 3000 B response (75x)
          </text>
        </g>

        <!-- ===== ANIMATED PACKETS ===== -->
        <!-- Forged query packets (small) -->
        <circle class="amp-pkt-q1" cx="130" cy="200" r="4" fill="#ef4444" opacity="0" />
        <circle class="amp-pkt-q2" cx="130" cy="200" r="4" fill="#ef4444" opacity="0" />
        <circle class="amp-pkt-q3" cx="130" cy="200" r="4" fill="#ef4444" opacity="0" />

        <!-- Amplified response packets (large) -->
        <circle class="amp-pkt-r1" cx="420" cy="84" r="9" fill="#f59e0b" opacity="0" filter="url(#amp-glow-amber)" />
        <circle class="amp-pkt-r2" cx="420" cy="200" r="9" fill="#f59e0b" opacity="0" filter="url(#amp-glow-amber)" />
        <circle class="amp-pkt-r3" cx="420" cy="316" r="9" fill="#f59e0b" opacity="0" filter="url(#amp-glow-amber)" />

        <!-- Flooded label -->
        <g class="amp-flooded" opacity="0">
          <text x="625" y="260" text-anchor="middle" fill="#ef4444"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace"
                filter="url(#amp-glow-red)">FLOODED!</text>
        </g>
      </svg>
    </div>
  `,
})
export class DnsAmplificationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.dns-amp');
    const tl = this.createScrollTimeline(container);

    // 1. Show attacker, DNS servers, and victim
    tl.fromTo(
      this.q('.amp-attacker'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    );
    tl.fromTo(
      [this.q('.amp-dns1'), this.q('.amp-dns2'), this.q('.amp-dns3')],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.2',
    );
    tl.fromTo(
      this.q('.amp-victim'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3',
    );

    // 2. Phase labels
    tl.fromTo(
      this.q('.amp-phase1-label'),
      { opacity: 0, y: -5 },
      { opacity: 1, y: 0, duration: 0.3 },
    );

    // 3. Forged info box
    tl.fromTo(
      this.q('.amp-forged-info'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3 },
    );

    // 4. Phase 2 label + response info
    tl.fromTo(
      this.q('.amp-phase2-label'),
      { opacity: 0, y: -5 },
      { opacity: 1, y: 0, duration: 0.3 },
    );
    tl.fromTo(
      this.q('.amp-response-info'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3 },
      '-=0.2',
    );

    // 5. Amplification factor
    tl.fromTo(
      this.q('.amp-factor'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );

    // 6. Start attack loop
    tl.add(() => this.startAttackLoop());
  }

  private startAttackLoop(): void {
    const container = this.q('.dns-amp');
    const loop = this.createLoopingTimeline(container);

    const attackerX = 130;
    const attackerY = 200;
    const dns1 = { x: 310, y: 84 };
    const dns2 = { x: 310, y: 200 };
    const dns3 = { x: 310, y: 316 };
    const victimX = 570;
    const victimY = 200;

    const q1 = this.q('.amp-pkt-q1');
    const q2 = this.q('.amp-pkt-q2');
    const q3 = this.q('.amp-pkt-q3');
    const r1 = this.q('.amp-pkt-r1');
    const r2 = this.q('.amp-pkt-r2');
    const r3 = this.q('.amp-pkt-r3');

    // === Phase 1: Forged queries (attacker → DNS servers) ===
    // Query 1
    loop.set(q1, { attr: { cx: attackerX, cy: attackerY }, opacity: 0 }, 0);
    loop.to(q1, { opacity: 1, duration: 0.05 }, 0);
    loop.to(q1, { attr: { cx: dns1.x, cy: dns1.y }, duration: 0.5, ease: 'power2.in' }, 0);
    loop.to(q1, { opacity: 0, duration: 0.05 }, 0.5);

    // Query 2
    loop.set(q2, { attr: { cx: attackerX, cy: attackerY }, opacity: 0 }, 0.1);
    loop.to(q2, { opacity: 1, duration: 0.05 }, 0.1);
    loop.to(q2, { attr: { cx: dns2.x, cy: dns2.y }, duration: 0.45, ease: 'power2.in' }, 0.1);
    loop.to(q2, { opacity: 0, duration: 0.05 }, 0.55);

    // Query 3
    loop.set(q3, { attr: { cx: attackerX, cy: attackerY }, opacity: 0 }, 0.2);
    loop.to(q3, { opacity: 1, duration: 0.05 }, 0.2);
    loop.to(q3, { attr: { cx: dns3.x, cy: dns3.y }, duration: 0.5, ease: 'power2.in' }, 0.2);
    loop.to(q3, { opacity: 0, duration: 0.05 }, 0.7);

    // === Phase 2: Amplified responses (DNS servers → victim) ===
    // Response 1 (big)
    loop.set(r1, { attr: { cx: dns1.x + 110, cy: dns1.y }, opacity: 0 }, 0.7);
    loop.to(r1, { opacity: 0.9, duration: 0.05 }, 0.7);
    loop.to(r1, { attr: { cx: victimX, cy: victimY }, duration: 0.5, ease: 'power2.in' }, 0.7);
    loop.to(r1, { opacity: 0, duration: 0.05 }, 1.2);

    // Response 2 (big)
    loop.set(r2, { attr: { cx: dns2.x + 110, cy: dns2.y }, opacity: 0 }, 0.8);
    loop.to(r2, { opacity: 0.9, duration: 0.05 }, 0.8);
    loop.to(r2, { attr: { cx: victimX, cy: victimY }, duration: 0.45, ease: 'power2.in' }, 0.8);
    loop.to(r2, { opacity: 0, duration: 0.05 }, 1.25);

    // Response 3 (big)
    loop.set(r3, { attr: { cx: dns3.x + 110, cy: dns3.y }, opacity: 0 }, 0.9);
    loop.to(r3, { opacity: 0.9, duration: 0.05 }, 0.9);
    loop.to(r3, { attr: { cx: victimX, cy: victimY }, duration: 0.5, ease: 'power2.in' }, 0.9);
    loop.to(r3, { opacity: 0, duration: 0.05 }, 1.4);

    // Overload flash on victim
    const overload = this.q('.amp-overload');
    const flooded = this.q('.amp-flooded');
    loop.to(overload, { opacity: 0.8, duration: 0.1 }, 1.2);
    loop.to(flooded, { opacity: 1, duration: 0.15 }, 1.25);
    loop.to(overload, { opacity: 0, duration: 0.4 }, 1.6);
    loop.to(flooded, { opacity: 0, duration: 0.3 }, 1.7);

    // Hold before repeat
    loop.to({}, { duration: 0.8 });

    loop.play();
  }
}
