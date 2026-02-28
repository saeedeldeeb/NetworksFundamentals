import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-blackhole-animation',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .bh-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .bh-anim svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="bh-anim">
      <svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="bh-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bh-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bh-glow-red">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <!-- Black hole radial gradient -->
          <radialGradient id="bh-void">
            <stop offset="0%" stop-color="#0a0e17" />
            <stop offset="70%" stop-color="#0a0e17" />
            <stop offset="100%" stop-color="#1f2937" />
          </radialGradient>
        </defs>

        <!-- Sender -->
        <g class="bh-sender" opacity="0">
          <rect x="20" y="55" width="80" height="50" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="60" y="78" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Sender</text>
          <text x="60" y="95" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Client</text>
        </g>
        <rect class="bh-sender-glow" x="20" y="55" width="80" height="50" rx="10"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" filter="url(#bh-glow-cyan)" />

        <!-- Router with small MTU (the problem router) -->
        <g class="bh-router" opacity="0">
          <rect x="260" y="50" width="100" height="60" rx="10" fill="#1f2937"
                stroke="#a855f7" stroke-width="2" />
          <text x="310" y="75" text-anchor="middle" fill="#a855f7"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <text x="310" y="95" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">MTU=1200</text>
        </g>
        <rect class="bh-router-glow" x="260" y="50" width="100" height="60" rx="10"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#bh-glow-red)" />

        <!-- Firewall -->
        <g class="bh-firewall" opacity="0">
          <rect x="275" y="130" width="70" height="30" rx="6" fill="#1f2937"
                stroke="#ef4444" stroke-width="1.5" />
          <text x="310" y="150" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="Inter, sans-serif">Firewall</text>
        </g>

        <!-- Receiver -->
        <g class="bh-receiver" opacity="0">
          <rect x="520" y="55" width="100" height="50" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="570" y="78" text-anchor="middle" fill="#10b981"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Receiver</text>
          <text x="570" y="95" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">Server</text>
        </g>
        <rect class="bh-receiver-glow" x="520" y="55" width="100" height="50" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#bh-glow-green)" />

        <!-- Connection lines -->
        <line class="bh-ln1" x1="100" y1="80" x2="260" y2="80"
              stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="bh-ln2" x1="360" y1="80" x2="520" y2="80"
              stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Phase 1: Small handshake packets (succeed) -->
        <circle class="bh-syn" r="4" fill="#22d3ee" opacity="0" />
        <circle class="bh-synack" r="4" fill="#10b981" opacity="0" />
        <circle class="bh-ack" r="4" fill="#22d3ee" opacity="0" />

        <!-- Handshake labels -->
        <g class="bh-syn-label" opacity="0">
          <rect x="-18" y="-24" width="36" height="16" rx="4"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="0" y="-12" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">SYN</text>
        </g>
        <g class="bh-synack-label" opacity="0">
          <rect x="-30" y="8" width="60" height="16" rx="4"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="0" y="20" text-anchor="middle" fill="#10b981"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">SYN-ACK</text>
        </g>
        <g class="bh-ack-label" opacity="0">
          <rect x="-18" y="-24" width="36" height="16" rx="4"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="0" y="-12" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ACK</text>
        </g>

        <!-- Phase 1 success label -->
        <g class="bh-handshake-ok" opacity="0">
          <rect x="180" y="115" width="260" height="22" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1" />
          <text x="310" y="130" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Handshake OK (small packets fit MTU)
          </text>
        </g>

        <!-- Phase 2: Large data packet -->
        <rect class="bh-bigpkt" x="-30" y="-10" width="60" height="20" rx="5"
              fill="#22d3ee" opacity="0" />
        <text class="bh-bigpkt-text" x="0" y="4" text-anchor="middle" fill="white"
              font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">1500 B</text>

        <!-- X mark where packet dies -->
        <g class="bh-drop-x" opacity="0">
          <line x1="300" y1="65" x2="320" y2="85" stroke="#ef4444" stroke-width="4" />
          <line x1="320" y1="65" x2="300" y2="85" stroke="#ef4444" stroke-width="4" />
        </g>

        <!-- "DF=1, can't fragment" label -->
        <g class="bh-drop-label" opacity="0">
          <rect x="220" y="20" width="180" height="22" rx="5"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="310" y="35" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            DF=1 &#8594; Can't fragment, DROPPED
          </text>
        </g>

        <!-- ICMP that tries to go back but gets blocked -->
        <circle class="bh-icmp" r="4" fill="#ef4444" opacity="0" />
        <g class="bh-icmp-label" opacity="0">
          <rect x="-48" y="8" width="96" height="16" rx="4"
                fill="#0f172a" stroke="#ef4444" stroke-width="1" />
          <text x="0" y="20" text-anchor="middle" fill="#ef4444"
                font-size="7" font-weight="700" font-family="'JetBrains Mono', monospace">Frag Needed</text>
        </g>

        <!-- Firewall block X -->
        <g class="bh-fw-block" opacity="0">
          <line x1="302" y1="132" x2="318" y2="148" stroke="#ef4444" stroke-width="3" />
          <line x1="318" y1="132" x2="302" y2="148" stroke="#ef4444" stroke-width="3" />
        </g>
        <text class="bh-fw-label" x="310" y="178" text-anchor="middle" fill="#ef4444"
              font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">
          ICMP BLOCKED!
        </text>

        <!-- Phase 3: Sender waiting -->
        <g class="bh-waiting" opacity="0">
          <rect x="30" y="120" width="160" height="24" rx="6"
                fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1" />
          <text x="110" y="136" text-anchor="middle" fill="#f59e0b"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Waiting for data ACK...
          </text>
        </g>

        <!-- Dots animating (sender waiting) -->
        <circle class="bh-dot1" cx="50" cy="160" r="3" fill="#f59e0b" opacity="0" />
        <circle class="bh-dot2" cx="65" cy="160" r="3" fill="#f59e0b" opacity="0" />
        <circle class="bh-dot3" cx="80" cy="160" r="3" fill="#f59e0b" opacity="0" />

        <!-- Black hole visualization -->
        <g class="bh-hole" opacity="0">
          <circle cx="310" cy="250" r="50" fill="url(#bh-void)"
                  stroke="#1e293b" stroke-width="2" />
          <circle cx="310" cy="250" r="50" fill="none"
                  stroke="#ef4444" stroke-width="1" opacity="0.3" />
          <circle cx="310" cy="250" r="35" fill="none"
                  stroke="#ef4444" stroke-width="0.5" opacity="0.2" />
          <circle cx="310" cy="250" r="20" fill="none"
                  stroke="#ef4444" stroke-width="0.5" opacity="0.15" />
          <text x="310" y="255" text-anchor="middle" fill="#ef4444"
                font-size="14" font-weight="700" font-family="Inter, sans-serif">BLACK HOLE</text>
        </g>

        <!-- Final label -->
        <g class="bh-final" opacity="0">
          <rect x="130" y="310" width="360" height="26" rx="8"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1" />
          <text x="310" y="328" text-anchor="middle" fill="#ef4444"
                font-size="10" font-weight="600" font-family="Inter, sans-serif">
            Connection open but no data flows. Sender never knows why.
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class BlackholeAnimationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.bh-anim');
    const tl = this.createScrollTimeline(container);

    // Show nodes
    const nodes = ['.bh-sender', '.bh-router', '.bh-firewall', '.bh-receiver', '.bh-ln1', '.bh-ln2'];
    nodes.forEach((s, i) => tl.to(this.q(s), { opacity: 1, duration: 0.25 }, i * 0.06));

    tl.add(() => { this.startLoop(); });
  }

  private startLoop(): void {
    const container = this.q('.bh-anim');
    const loop = this.createLoopingTimeline(container);

    const syn = this.q('.bh-syn');
    const synack = this.q('.bh-synack');
    const ack = this.q('.bh-ack');
    const synLabel = this.q('.bh-syn-label');
    const synackLabel = this.q('.bh-synack-label');
    const ackLabel = this.q('.bh-ack-label');
    const handshakeOk = this.q('.bh-handshake-ok');
    const bigpkt = this.q('.bh-bigpkt');
    const bigpktText = this.q('.bh-bigpkt-text');
    const dropX = this.q('.bh-drop-x');
    const dropLabel = this.q('.bh-drop-label');
    const routerGlow = this.q('.bh-router-glow');
    const icmp = this.q('.bh-icmp');
    const icmpLabel = this.q('.bh-icmp-label');
    const fwBlock = this.q('.bh-fw-block');
    const fwLabel = this.q('.bh-fw-label');
    const waiting = this.q('.bh-waiting');
    const dot1 = this.q('.bh-dot1');
    const dot2 = this.q('.bh-dot2');
    const dot3 = this.q('.bh-dot3');
    const hole = this.q('.bh-hole');
    const final = this.q('.bh-final');

    const sX = 100, rX = 310, dX = 520, y = 80;
    let t = 0;

    // === Phase 1: TCP Handshake (small packets pass through) ===

    // SYN →
    loop.fromTo(syn, { attr: { cx: sX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.fromTo(synLabel, { x: sX, y: y, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.to(syn, { attr: { cx: dX, cy: y }, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to(synLabel, { x: dX, y: y, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to([syn, synLabel], { opacity: 0, duration: 0.08 }, t + 0.8);
    t += 0.9;

    // ← SYN-ACK
    loop.fromTo(synack, { attr: { cx: dX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.fromTo(synackLabel, { x: dX, y: y, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.to(synack, { attr: { cx: sX, cy: y }, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to(synackLabel, { x: sX, y: y, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to([synack, synackLabel], { opacity: 0, duration: 0.08 }, t + 0.8);
    t += 0.9;

    // ACK →
    loop.fromTo(ack, { attr: { cx: sX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.fromTo(ackLabel, { x: sX, y: y, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.to(ack, { attr: { cx: dX, cy: y }, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to(ackLabel, { x: dX, y: y, duration: 0.7, ease: 'power2.inOut' }, t + 0.1);
    loop.to([ack, ackLabel], { opacity: 0, duration: 0.08 }, t + 0.8);
    t += 0.9;

    // Handshake OK
    loop.fromTo(handshakeOk, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
    t += 1.0;

    // === Phase 2: Large data packet gets dropped ===
    loop.to(handshakeOk, { opacity: 0.3, duration: 0.2 }, t);

    // Big packet moves toward router
    loop.fromTo(bigpkt, { x: sX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.fromTo(bigpktText, { x: sX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, t);
    loop.to(bigpkt, { x: rX - 30, y: y, duration: 0.6, ease: 'power2.inOut' }, t + 0.15);
    loop.to(bigpktText, { x: rX, y: y, duration: 0.6, ease: 'power2.inOut' }, t + 0.15);
    t += 0.8;

    // DROPPED! Router glows red
    loop.to(routerGlow, { opacity: 0.9, duration: 0.15 }, t);
    loop.to([bigpkt, bigpktText], { opacity: 0, duration: 0.1 }, t);
    loop.fromTo(dropX, { opacity: 0 }, { opacity: 1, duration: 0.15 }, t);
    loop.fromTo(dropLabel, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t + 0.1);
    t += 0.5;

    // === Phase 3: ICMP tries to go back, gets blocked by firewall ===
    loop.fromTo(icmp, { attr: { cx: rX, cy: y + 30 }, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);
    loop.fromTo(icmpLabel, { x: rX, y: y + 30, opacity: 0 }, { opacity: 1, duration: 0.08 }, t);

    // ICMP moves down toward firewall
    loop.to(icmp, { attr: { cx: rX, cy: 140 }, duration: 0.3, ease: 'power2.inOut' }, t + 0.1);
    loop.to(icmpLabel, { x: rX, y: 140, duration: 0.3, ease: 'power2.inOut' }, t + 0.1);

    // Blocked!
    loop.to([icmp, icmpLabel], { opacity: 0, duration: 0.08 }, t + 0.45);
    loop.fromTo(fwBlock, { opacity: 0 }, { opacity: 1, duration: 0.15 }, t + 0.45);
    loop.fromTo(fwLabel, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t + 0.5);
    t += 1.0;

    loop.to(routerGlow, { opacity: 0, duration: 0.3 }, t);
    loop.to(dropX, { opacity: 0, duration: 0.3 }, t);
    loop.to(dropLabel, { opacity: 0, duration: 0.3 }, t);

    // === Phase 4: Sender waits forever ===
    loop.fromTo(waiting, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);

    // Blinking dots
    loop.fromTo(dot1, { opacity: 0 }, { opacity: 0.8, duration: 0.3, yoyo: true, repeat: 3 }, t + 0.3);
    loop.fromTo(dot2, { opacity: 0 }, { opacity: 0.8, duration: 0.3, yoyo: true, repeat: 3 }, t + 0.4);
    loop.fromTo(dot3, { opacity: 0 }, { opacity: 0.8, duration: 0.3, yoyo: true, repeat: 3 }, t + 0.5);
    t += 2.0;

    // === Phase 5: Black hole appears ===
    loop.fromTo(hole,
      { opacity: 0, scale: 0.3, svgOrigin: '310 250' },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      t,
    );
    t += 1.0;

    loop.fromTo(final, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.4 }, t);

    // Hold
    loop.to({}, { duration: 3.0 });

    // Fade everything for restart
    loop.to([handshakeOk, fwBlock, fwLabel, waiting, dot1, dot2, dot3, hole, final],
      { opacity: 0, duration: 0.4 },
    );
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
