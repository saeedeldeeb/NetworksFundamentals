import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-vrrp-animation',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .vrrp-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .vrrp-anim svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="vrrp-anim">
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="vrrp-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="vrrp-glow-green">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="vrrp-glow-red">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          VRRP: Virtual Router Redundancy Protocol
        </text>

        <!-- Virtual IP badge -->
        <g class="vrrp-vip" opacity="0">
          <rect x="220" y="35" width="200" height="44" rx="10" fill="#0f172a"
                stroke="#22d3ee" stroke-width="2" />
          <text x="320" y="54" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Virtual IP: 10.0.0.1</text>
          <text x="320" y="70" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">MAC: 00:00:5E:00:01:01</text>
        </g>

        <!-- Connection from VIP down to split -->
        <line class="vrrp-ln-vip" x1="320" y1="79" x2="320" y2="110"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Connection to Primary -->
        <line class="vrrp-ln-pri" x1="320" y1="110" x2="180" y2="150"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <!-- Connection to Backup -->
        <line class="vrrp-ln-bak" x1="320" y1="110" x2="460" y2="150"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- VIP arrow indicator pointing to Primary (shifts during failover) -->
        <circle class="vrrp-vip-dot" cx="180" cy="150" r="4" fill="#22d3ee" opacity="0" />

        <!-- Primary Router -->
        <g class="vrrp-primary" opacity="0">
          <rect class="vrrp-pri-box" x="110" y="150" width="140" height="70" rx="10"
                fill="#1f2937" stroke="#22d3ee" stroke-width="2" />
          <text x="180" y="175" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Primary Router</text>
          <text class="vrrp-pri-role" x="180" y="195" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="600" font-family="'JetBrains Mono', monospace">MASTER</text>
          <text x="180" y="212" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Priority: 200</text>
        </g>
        <!-- Primary glow -->
        <rect class="vrrp-pri-glow" x="110" y="150" width="140" height="70" rx="10"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" filter="url(#vrrp-glow-cyan)" />
        <!-- Primary fail X overlay -->
        <g class="vrrp-pri-fail" opacity="0">
          <line x1="130" y1="165" x2="230" y2="205" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
          <line x1="230" y1="165" x2="130" y2="205" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
        </g>
        <!-- Primary fail glow -->
        <rect class="vrrp-pri-fail-glow" x="110" y="150" width="140" height="70" rx="10"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#vrrp-glow-red)" />

        <!-- Backup Router -->
        <g class="vrrp-backup" opacity="0">
          <rect class="vrrp-bak-box" x="390" y="150" width="140" height="70" rx="10"
                fill="#1f2937" stroke="#4b5563" stroke-width="1.5" />
          <text x="460" y="175" text-anchor="middle" fill="#94a3b8"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Backup Router</text>
          <text class="vrrp-bak-role" x="460" y="195" text-anchor="middle" fill="#64748b"
                font-size="10" font-weight="600" font-family="'JetBrains Mono', monospace">STANDBY</text>
          <text x="460" y="212" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Priority: 100</text>
        </g>
        <!-- Backup glow (activates on failover) -->
        <rect class="vrrp-bak-glow" x="390" y="150" width="140" height="70" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#vrrp-glow-green)" />

        <!-- Heartbeat pulses between routers -->
        <circle class="vrrp-hb1" r="4" fill="#f59e0b" opacity="0" />
        <circle class="vrrp-hb2" r="4" fill="#f59e0b" opacity="0" />

        <!-- LAN bar -->
        <line class="vrrp-lan" x1="100" y1="270" x2="540" y2="270"
              stroke="#374151" stroke-width="2" opacity="0" />
        <text class="vrrp-lan-label" x="570" y="274" fill="#64748b"
              font-size="9" font-family="Inter, sans-serif" opacity="0">LAN</text>

        <!-- Connection from Primary down to LAN -->
        <line class="vrrp-ln-pri-lan" x1="180" y1="220" x2="180" y2="270"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <!-- Connection from Backup down to LAN -->
        <line class="vrrp-ln-bak-lan" x1="460" y1="220" x2="460" y2="270"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Host A -->
        <g class="vrrp-host" opacity="0">
          <rect x="255" y="300" width="130" height="55" rx="10" fill="#1f2937"
                stroke="#64748b" stroke-width="1.5" />
          <text x="320" y="325" text-anchor="middle" fill="#f1f5f9"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Host A</text>
          <text x="320" y="343" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">GW: 10.0.0.1</text>
        </g>
        <!-- Connection from Host to LAN -->
        <line class="vrrp-ln-host" x1="320" y1="300" x2="320" y2="270"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packets (reusable) -->
        <circle class="vrrp-pkt1" r="5" fill="#22d3ee" opacity="0" />
        <circle class="vrrp-pkt2" r="5" fill="#22d3ee" opacity="0" />

        <!-- Status labels -->
        <g class="vrrp-label-detect" opacity="0">
          <rect x="340" y="120" width="150" height="22" rx="5"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text x="415" y="135" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            Detecting failure...
          </text>
        </g>

        <g class="vrrp-label-failover" opacity="0">
          <rect x="355" y="232" width="150" height="22" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="430" y="247" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            VRRP Failover!
          </text>
        </g>

        <g class="vrrp-label-transparent" opacity="0">
          <rect x="195" y="370" width="250" height="22" rx="5"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="320" y="385" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">
            Host A didn't notice!
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class VrrpAnimationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.vrrp-anim');
    const tl = this.createScrollTimeline(container);

    // Fade in all static elements
    const els = [
      '.vrrp-vip',
      '.vrrp-ln-vip',
      '.vrrp-ln-pri',
      '.vrrp-ln-bak',
      '.vrrp-primary',
      '.vrrp-backup',
      '.vrrp-lan',
      '.vrrp-lan-label',
      '.vrrp-ln-pri-lan',
      '.vrrp-ln-bak-lan',
      '.vrrp-host',
      '.vrrp-ln-host',
      '.vrrp-pri-glow',
      '.vrrp-vip-dot',
    ];
    els.forEach((s, i) =>
      tl.to(this.q(s), { opacity: 1, duration: 0.25 }, i * 0.05)
    );

    tl.add(() => this.startVrrpLoop());
  }

  private startVrrpLoop(): void {
    const container = this.q('.vrrp-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt1 = this.q('.vrrp-pkt1');
    const pkt2 = this.q('.vrrp-pkt2');
    const hb1 = this.q('.vrrp-hb1');
    const hb2 = this.q('.vrrp-hb2');
    const priFail = this.q('.vrrp-pri-fail');
    const priGlow = this.q('.vrrp-pri-glow');
    const priFailGlow = this.q('.vrrp-pri-fail-glow');
    const bakGlow = this.q('.vrrp-bak-glow');
    const bakBox = this.q('.vrrp-bak-box');
    const bakRole = this.q('.vrrp-bak-role');
    const priRole = this.q('.vrrp-pri-role');
    const vipDot = this.q('.vrrp-vip-dot');
    const labelDetect = this.q('.vrrp-label-detect');
    const labelFailover = this.q('.vrrp-label-failover');
    const labelTransparent = this.q('.vrrp-label-transparent');

    // ===== Phase 1: Normal operation (0–2.5s) =====

    // Packet from Host A up to LAN, then to Primary
    loop.fromTo(
      pkt1,
      { attr: { cx: 320, cy: 340 }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    );
    loop.to(pkt1, { attr: { cy: 270 }, duration: 0.3, ease: 'power2.out' }, 0.1);
    loop.to(pkt1, { attr: { cx: 180 }, duration: 0.3, ease: 'power2.out' }, 0.4);
    loop.to(pkt1, { attr: { cy: 220 }, duration: 0.2, ease: 'power2.out' }, 0.7);
    loop.to(pkt1, { opacity: 0, duration: 0.1 }, 0.9);

    // Heartbeat pulse 1: Primary → Backup
    loop.fromTo(
      hb1,
      { attr: { cx: 250, cy: 185 }, opacity: 0 },
      { opacity: 0.8, duration: 0.1 },
      0.3
    );
    loop.to(hb1, { attr: { cx: 390, cy: 185 }, duration: 0.4, ease: 'none' }, 0.4);
    loop.to(hb1, { opacity: 0, duration: 0.1 }, 0.8);

    // Heartbeat pulse 2: Primary → Backup (second beat)
    loop.fromTo(
      hb2,
      { attr: { cx: 250, cy: 185 }, opacity: 0 },
      { opacity: 0.8, duration: 0.1 },
      1.2
    );
    loop.to(hb2, { attr: { cx: 390, cy: 185 }, duration: 0.4, ease: 'none' }, 1.3);
    loop.to(hb2, { opacity: 0, duration: 0.1 }, 1.7);

    // Second packet from Host A
    loop.fromTo(
      pkt2,
      { attr: { cx: 320, cy: 340 }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      1.5
    );
    loop.to(pkt2, { attr: { cy: 270 }, duration: 0.3, ease: 'power2.out' }, 1.6);
    loop.to(pkt2, { attr: { cx: 180 }, duration: 0.3, ease: 'power2.out' }, 1.9);
    loop.to(pkt2, { attr: { cy: 220 }, duration: 0.2, ease: 'power2.out' }, 2.2);
    loop.to(pkt2, { opacity: 0, duration: 0.1 }, 2.4);

    // ===== Phase 2: Failure (2.5–4s) =====

    // Primary flashes red and shows X
    loop.to(priGlow, { opacity: 0, duration: 0.2 }, 2.5);
    loop.to(priFailGlow, { opacity: 0.8, duration: 0.2 }, 2.5);
    loop.to(priFail, { opacity: 1, duration: 0.3 }, 2.6);
    loop.to(priRole, { fill: '#ef4444', duration: 0.2 }, 2.6);

    // No more heartbeats — detection label appears
    loop.to(labelDetect, { opacity: 1, duration: 0.3 }, 3.0);

    // ===== Phase 3: Failover (4–6s) =====

    loop.to(labelDetect, { opacity: 0, duration: 0.2 }, 4.0);

    // Backup transitions to MASTER
    loop.to(bakBox, { stroke: '#10b981', strokeWidth: 2, duration: 0.3 }, 4.2);
    loop.to(bakGlow, { opacity: 0.8, duration: 0.3 }, 4.2);
    loop.to(bakRole, { fill: '#10b981', duration: 0.2 }, 4.2);

    // Failover label
    loop.to(labelFailover, { opacity: 1, duration: 0.3 }, 4.3);

    // VIP dot shifts from Primary to Backup
    loop.to(vipDot, { attr: { cx: 460, cy: 150 }, fill: '#10b981', duration: 0.6, ease: 'power2.inOut' }, 4.5);

    // Update the VIP connection lines to point to backup
    const lnPri = this.q('.vrrp-ln-pri');
    const lnBak = this.q('.vrrp-ln-bak');
    loop.to(lnPri, { stroke: '#1f2937', duration: 0.3 }, 4.5);
    loop.to(lnBak, { stroke: '#10b981', duration: 0.3 }, 4.5);

    loop.to(labelFailover, { opacity: 0, duration: 0.2 }, 5.5);

    // ===== Phase 4: Resumed operation (6–7.5s) =====

    // Packet from Host A now goes to Backup (now MASTER)
    loop.fromTo(
      pkt1,
      { attr: { cx: 320, cy: 340 }, opacity: 0 },
      { opacity: 1, duration: 0.1 },
      6.0
    );
    loop.to(pkt1, { attr: { cy: 270 }, duration: 0.3, ease: 'power2.out' }, 6.1);
    loop.to(pkt1, { attr: { cx: 460 }, duration: 0.3, ease: 'power2.out' }, 6.4);
    loop.to(pkt1, { attr: { cy: 220 }, duration: 0.2, ease: 'power2.out' }, 6.7);
    loop.to(pkt1, { opacity: 0, duration: 0.1 }, 6.9);

    // "Host A didn't notice!" label
    loop.to(labelTransparent, { opacity: 1, duration: 0.3 }, 6.2);

    // Hold for readability
    loop.to({}, { duration: 0.5 }, 7.2);

    // ===== Phase 5: Reset/fade (7.5–8s) =====

    // Fade out everything that changed
    loop.to(labelTransparent, { opacity: 0, duration: 0.2 }, 7.5);
    loop.to(priFail, { opacity: 0, duration: 0.2 }, 7.5);
    loop.to(priFailGlow, { opacity: 0, duration: 0.2 }, 7.5);
    loop.to(bakGlow, { opacity: 0, duration: 0.2 }, 7.5);

    // Reset all state for loop restart
    loop.set(priGlow, { opacity: 1 }, 7.8);
    loop.set(priRole, { fill: '#22d3ee' }, 7.8);
    loop.set(bakBox, { stroke: '#4b5563', strokeWidth: 1.5 }, 7.8);
    loop.set(bakRole, { fill: '#64748b' }, 7.8);
    loop.set(vipDot, { attr: { cx: 180, cy: 150 }, fill: '#22d3ee' }, 7.8);
    loop.set(lnPri, { stroke: '#374151' }, 7.8);
    loop.set(lnBak, { stroke: '#374151' }, 7.8);

    // Brief pause before loop restarts
    loop.to({}, { duration: 0.2 }, 7.8);

    loop.play();
  }
}
