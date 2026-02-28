import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-traceroute-animation',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .trace-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .trace-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="trace-anim">
      <svg viewBox="0 0 640 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="tr-glow-red">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tr-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="25" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          Traceroute: Mapping the Path With TTL
        </text>

        <!-- Sender -->
        <g class="tr-sender" opacity="0">
          <rect x="20" y="110" width="70" height="50" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="55" y="140" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">You</text>
        </g>

        <!-- R1 -->
        <g class="tr-r1" opacity="0">
          <rect x="155" y="115" width="55" height="40" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="182" y="140" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R1</text>
        </g>
        <rect class="tr-r1-glow" x="155" y="115" width="55" height="40" rx="8"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#tr-glow-red)" />

        <!-- R2 -->
        <g class="tr-r2" opacity="0">
          <rect x="275" y="115" width="55" height="40" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="302" y="140" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R2</text>
        </g>
        <rect class="tr-r2-glow" x="275" y="115" width="55" height="40" rx="8"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#tr-glow-red)" />

        <!-- R3 -->
        <g class="tr-r3" opacity="0">
          <rect x="395" y="115" width="55" height="40" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="422" y="140" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="600" font-family="Inter, sans-serif">R3</text>
        </g>
        <rect class="tr-r3-glow" x="395" y="115" width="55" height="40" rx="8"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#tr-glow-red)" />

        <!-- Destination -->
        <g class="tr-dest" opacity="0">
          <rect x="520" y="110" width="100" height="50" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="570" y="140" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Destination</text>
        </g>
        <rect class="tr-dest-glow" x="520" y="110" width="100" height="50" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#tr-glow-green)" />

        <!-- Connection lines -->
        <line class="tr-ln1" x1="90" y1="135" x2="155" y2="135" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="tr-ln2" x1="210" y1="135" x2="275" y2="135" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="tr-ln3" x1="330" y1="135" x2="395" y2="135" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="tr-ln4" x1="450" y1="135" x2="520" y2="135" stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packet (forward) -->
        <circle class="tr-pkt" r="7" fill="#f59e0b" opacity="0" />
        <!-- ICMP reply (backward, red) -->
        <circle class="tr-icmp" r="5" fill="#ef4444" opacity="0" />

        <!-- TTL label on packet -->
        <g class="tr-ttl-label" opacity="0">
          <rect x="-24" y="-32" width="48" height="20" rx="5"
                fill="#0f172a" stroke="#f59e0b" stroke-width="1" />
          <text class="tr-ttl-text" x="0" y="-18" text-anchor="middle" fill="#f59e0b"
                font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace">TTL=1</text>
        </g>

        <!-- ICMP reply label -->
        <g class="tr-icmp-label" opacity="0">
          <rect x="-55" y="8" width="110" height="20" rx="5"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="0" y="22" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Time Exceeded</text>
        </g>

        <!-- Discovery results (appear at bottom) -->
        <text class="tr-found1" x="182" y="185" text-anchor="middle" fill="#a855f7"
              font-size="9" font-weight="600" font-family="'JetBrains Mono', monospace" opacity="0">
          Hop 1: R1
        </text>
        <text class="tr-found2" x="302" y="185" text-anchor="middle" fill="#a855f7"
              font-size="9" font-weight="600" font-family="'JetBrains Mono', monospace" opacity="0">
          Hop 2: R2
        </text>
        <text class="tr-found3" x="422" y="185" text-anchor="middle" fill="#a855f7"
              font-size="9" font-weight="600" font-family="'JetBrains Mono', monospace" opacity="0">
          Hop 3: R3
        </text>
        <text class="tr-found4" x="570" y="185" text-anchor="middle" fill="#10b981"
              font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">
          Reached!
        </text>

        <!-- Result bar -->
        <g class="tr-result-bar" opacity="0">
          <rect x="60" y="220" width="520" height="50" rx="10"
                fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
          <text x="320" y="242" text-anchor="middle" fill="#94a3b8"
                font-size="11" font-family="Inter, sans-serif">
            Path mapped:
          </text>
          <text x="320" y="260" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="'JetBrains Mono', monospace">
            You &#8594; R1 &#8594; R2 &#8594; R3 &#8594; Destination
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class TracerouteAnimationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.trace-anim');
    const tl = this.createScrollTimeline(container);

    const nodes = [
      this.q('.tr-sender'), this.q('.tr-r1'), this.q('.tr-r2'),
      this.q('.tr-r3'), this.q('.tr-dest'),
    ];
    const lines = this.qa('[class^="tr-ln"]');

    nodes.forEach((n, i) => {
      tl.to(n, { opacity: 1, duration: 0.3 }, i * 0.08);
    });
    lines.forEach((l, i) => {
      const el = l as unknown as SVGLineElement;
      const len = Math.abs(parseFloat(el.getAttribute('x2')!) - parseFloat(el.getAttribute('x1')!));
      tl.set(el, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(el, { opacity: 1, strokeDashoffset: 0, duration: 0.25, ease: 'power2.inOut' }, i * 0.08 + 0.1);
    });

    tl.add(() => { this.startTraceLoop(); });
  }

  private startTraceLoop(): void {
    const container = this.q('.trace-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt = this.q('.tr-pkt');
    const icmp = this.q('.tr-icmp');
    const ttlLabel = this.q('.tr-ttl-label');
    const ttlText = this.q('.tr-ttl-text');
    const icmpLabel = this.q('.tr-icmp-label');
    const r1Glow = this.q('.tr-r1-glow');
    const r2Glow = this.q('.tr-r2-glow');
    const r3Glow = this.q('.tr-r3-glow');
    const destGlow = this.q('.tr-dest-glow');
    const found1 = this.q('.tr-found1');
    const found2 = this.q('.tr-found2');
    const found3 = this.q('.tr-found3');
    const found4 = this.q('.tr-found4');
    const resultBar = this.q('.tr-result-bar');

    const senderX = 55;
    const y = 135;
    const routerXs = [182, 302, 422, 570];
    const glows = [r1Glow, r2Glow, r3Glow, destGlow];
    const founds = [found1, found2, found3, found4];

    let t = 0;

    // === Probe 1: TTL=1 → dies at R1 ===
    loop.set(ttlText, { textContent: 'TTL=1' }, t);
    loop.fromTo(pkt, { attr: { cx: senderX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.fromTo(ttlLabel, { x: senderX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);

    loop.to(pkt, { attr: { cx: routerXs[0], cy: y }, duration: 0.5, ease: 'power2.inOut' }, t + 0.15);
    loop.to(ttlLabel, { x: routerXs[0], y: y, duration: 0.5, ease: 'power2.inOut' }, t + 0.15);

    // R1 glows red (TTL expired)
    loop.to(r1Glow, { opacity: 0.8, duration: 0.15 }, t + 0.7);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 0.7);
    loop.to(ttlLabel, { opacity: 0, duration: 0.1 }, t + 0.7);

    // ICMP reply back
    loop.fromTo(icmp, { attr: { cx: routerXs[0], cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.85);
    loop.fromTo(icmpLabel, { x: routerXs[0], y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.85);
    loop.to(icmp, { attr: { cx: senderX, cy: y }, duration: 0.4, ease: 'power2.inOut' }, t + 0.95);
    loop.to(icmpLabel, { x: senderX, y: y, duration: 0.4, ease: 'power2.inOut' }, t + 0.95);
    loop.to([icmp, icmpLabel], { opacity: 0, duration: 0.1 }, t + 1.4);
    loop.to(r1Glow, { opacity: 0, duration: 0.3 }, t + 1.2);

    // Found R1
    loop.fromTo(found1, { opacity: 0, y: 178 }, { opacity: 1, y: 185, duration: 0.3 }, t + 1.4);

    t += 1.8;

    // === Probe 2: TTL=2 → dies at R2 ===
    loop.set(ttlText, { textContent: 'TTL=2' }, t);
    loop.fromTo(pkt, { attr: { cx: senderX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.fromTo(ttlLabel, { x: senderX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);

    loop.to(pkt, { attr: { cx: routerXs[1], cy: y }, duration: 0.7, ease: 'power2.inOut' }, t + 0.15);
    loop.to(ttlLabel, { x: routerXs[1], y: y, duration: 0.7, ease: 'power2.inOut' }, t + 0.15);

    loop.to(r2Glow, { opacity: 0.8, duration: 0.15 }, t + 0.9);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 0.9);
    loop.to(ttlLabel, { opacity: 0, duration: 0.1 }, t + 0.9);

    loop.fromTo(icmp, { attr: { cx: routerXs[1], cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 1.05);
    loop.fromTo(icmpLabel, { x: routerXs[1], y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 1.05);
    loop.to(icmp, { attr: { cx: senderX, cy: y }, duration: 0.5, ease: 'power2.inOut' }, t + 1.15);
    loop.to(icmpLabel, { x: senderX, y: y, duration: 0.5, ease: 'power2.inOut' }, t + 1.15);
    loop.to([icmp, icmpLabel], { opacity: 0, duration: 0.1 }, t + 1.7);
    loop.to(r2Glow, { opacity: 0, duration: 0.3 }, t + 1.4);

    loop.fromTo(found2, { opacity: 0, y: 178 }, { opacity: 1, y: 185, duration: 0.3 }, t + 1.7);

    t += 2.1;

    // === Probe 3: TTL=3 → dies at R3 ===
    loop.set(ttlText, { textContent: 'TTL=3' }, t);
    loop.fromTo(pkt, { attr: { cx: senderX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.fromTo(ttlLabel, { x: senderX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);

    loop.to(pkt, { attr: { cx: routerXs[2], cy: y }, duration: 0.9, ease: 'power2.inOut' }, t + 0.15);
    loop.to(ttlLabel, { x: routerXs[2], y: y, duration: 0.9, ease: 'power2.inOut' }, t + 0.15);

    loop.to(r3Glow, { opacity: 0.8, duration: 0.15 }, t + 1.1);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 1.1);
    loop.to(ttlLabel, { opacity: 0, duration: 0.1 }, t + 1.1);

    loop.fromTo(icmp, { attr: { cx: routerXs[2], cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 1.25);
    loop.fromTo(icmpLabel, { x: routerXs[2], y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 1.25);
    loop.to(icmp, { attr: { cx: senderX, cy: y }, duration: 0.6, ease: 'power2.inOut' }, t + 1.35);
    loop.to(icmpLabel, { x: senderX, y: y, duration: 0.6, ease: 'power2.inOut' }, t + 1.35);
    loop.to([icmp, icmpLabel], { opacity: 0, duration: 0.1 }, t + 2.0);
    loop.to(r3Glow, { opacity: 0, duration: 0.3 }, t + 1.7);

    loop.fromTo(found3, { opacity: 0, y: 178 }, { opacity: 1, y: 185, duration: 0.3 }, t + 2.0);

    t += 2.4;

    // === Probe 4: TTL=4 → reaches destination! ===
    loop.set(ttlText, { textContent: 'TTL=4' }, t);
    loop.fromTo(pkt, { attr: { cx: senderX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.fromTo(ttlLabel, { x: senderX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);

    loop.to(pkt, { attr: { cx: routerXs[3], cy: y }, duration: 1.1, ease: 'power2.inOut' }, t + 0.15);
    loop.to(ttlLabel, { x: routerXs[3], y: y, duration: 1.1, ease: 'power2.inOut' }, t + 0.15);

    // Destination glow green
    loop.to(destGlow, { opacity: 0.8, duration: 0.2 }, t + 1.3);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 1.3);
    loop.to(ttlLabel, { opacity: 0, duration: 0.1 }, t + 1.3);
    loop.to(destGlow, { opacity: 0, duration: 0.5 }, t + 1.7);

    loop.fromTo(found4, { opacity: 0, y: 178 }, { opacity: 1, y: 185, duration: 0.3 }, t + 1.5);

    t += 2.0;

    // Show result bar
    loop.fromTo(resultBar, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, t);

    // Hold
    loop.to({}, { duration: 3.0 });

    // Fade everything for restart
    loop.to([found1, found2, found3, found4, resultBar], { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
