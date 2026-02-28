import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-ping-traceroute',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ping-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .ping-anim svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="ping-anim">
      <svg viewBox="0 0 640 220" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ping-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ping-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          Ping: ICMP Echo Request / Reply
        </text>

        <!-- Your machine -->
        <g class="ping-src" opacity="0">
          <rect x="30" y="65" width="90" height="55" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="75" y="88" text-anchor="middle" fill="#22d3ee"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">Your PC</text>
          <text x="75" y="107" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">192.168.1.3</text>
        </g>
        <rect class="ping-src-glow" x="30" y="65" width="90" height="55" rx="10"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" filter="url(#ping-glow-cyan)" />

        <!-- Internet cloud -->
        <g class="ping-cloud" opacity="0">
          <ellipse cx="320" cy="92" rx="90" ry="35" fill="none"
                   stroke="#374151" stroke-width="1.5" stroke-dasharray="6,4" />
          <text x="320" y="88" text-anchor="middle" fill="#64748b"
                font-size="11" font-family="Inter, sans-serif">Internet</text>
          <text x="320" y="104" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="Inter, sans-serif">(multiple hops)</text>
        </g>

        <!-- Remote server -->
        <g class="ping-dst" opacity="0">
          <rect x="510" y="65" width="110" height="55" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="565" y="85" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="Inter, sans-serif">google.com</text>
          <text x="565" y="107" text-anchor="middle" fill="#64748b"
                font-size="8" font-family="'JetBrains Mono', monospace">142.250.80.46</text>
        </g>
        <rect class="ping-dst-glow" x="510" y="65" width="110" height="55" rx="10"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#ping-glow-green)" />

        <!-- Request packet (cyan) -->
        <circle class="ping-req" r="6" fill="#22d3ee" opacity="0" />
        <g class="ping-req-label" opacity="0">
          <rect x="-50" y="-28" width="100" height="20" rx="5"
                fill="#0f172a" stroke="#22d3ee" stroke-width="1" />
          <text x="0" y="-14" text-anchor="middle" fill="#22d3ee"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Echo Request</text>
        </g>

        <!-- Reply packet (green) -->
        <circle class="ping-reply" r="6" fill="#10b981" opacity="0" />
        <g class="ping-reply-label" opacity="0">
          <rect x="-42" y="8" width="84" height="20" rx="5"
                fill="#0f172a" stroke="#10b981" stroke-width="1" />
          <text x="0" y="22" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">Echo Reply</text>
        </g>

        <!-- RTT result -->
        <g class="ping-rtt" opacity="0">
          <rect x="200" y="150" width="240" height="36" rx="8"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="1" />
          <text x="320" y="174" text-anchor="middle" fill="#10b981"
                font-size="12" font-weight="700" font-family="'JetBrains Mono', monospace">
            64 bytes, ttl=117, time=12.3 ms
          </text>
        </g>

        <!-- Seq counter -->
        <text class="ping-seq" x="320" y="210" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="'JetBrains Mono', monospace" opacity="0">
          icmp_seq=1
        </text>
      </svg>
    </div>
  `,
})
export class PingTracerouteComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ping-anim');
    const tl = this.createScrollTimeline(container);

    tl.to(this.q('.ping-src'), { opacity: 1, duration: 0.3 });
    tl.to(this.q('.ping-cloud'), { opacity: 1, duration: 0.3 }, '-=0.15');
    tl.to(this.q('.ping-dst'), { opacity: 1, duration: 0.3 }, '-=0.15');

    tl.add(() => { this.startPingLoop(); });
  }

  private startPingLoop(): void {
    const container = this.q('.ping-anim');
    const loop = this.createLoopingTimeline(container);

    const req = this.q('.ping-req');
    const reqLabel = this.q('.ping-req-label');
    const reply = this.q('.ping-reply');
    const replyLabel = this.q('.ping-reply-label');
    const srcGlow = this.q('.ping-src-glow');
    const dstGlow = this.q('.ping-dst-glow');
    const rtt = this.q('.ping-rtt');
    const seq = this.q('.ping-seq');

    const srcX = 120, dstX = 510, y = 92;

    // Send request
    loop.to(srcGlow, { opacity: 0.7, duration: 0.15 }, 0);
    loop.to(srcGlow, { opacity: 0, duration: 0.3 }, 0.2);

    loop.fromTo(req, { attr: { cx: srcX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.1);
    loop.fromTo(reqLabel, { x: srcX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.1);
    loop.to(req, { attr: { cx: dstX, cy: y }, duration: 1.0, ease: 'power2.inOut' }, 0.2);
    loop.to(reqLabel, { x: dstX, y: y, duration: 1.0, ease: 'power2.inOut' }, 0.2);
    loop.to([req, reqLabel], { opacity: 0, duration: 0.1 }, 1.2);

    // Destination receives
    loop.to(dstGlow, { opacity: 0.7, duration: 0.15 }, 1.2);
    loop.to(dstGlow, { opacity: 0, duration: 0.3 }, 1.5);

    // Send reply
    loop.fromTo(reply, { attr: { cx: dstX, cy: y }, opacity: 0 }, { opacity: 1, duration: 0.1 }, 1.4);
    loop.fromTo(replyLabel, { x: dstX, y: y, opacity: 0 }, { opacity: 1, duration: 0.1 }, 1.4);
    loop.to(reply, { attr: { cx: srcX, cy: y }, duration: 1.0, ease: 'power2.inOut' }, 1.5);
    loop.to(replyLabel, { x: srcX, y: y, duration: 1.0, ease: 'power2.inOut' }, 1.5);
    loop.to([reply, replyLabel], { opacity: 0, duration: 0.1 }, 2.5);

    // RTT result
    loop.fromTo(rtt, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 2.6);
    loop.fromTo(seq, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.7);

    // Hold
    loop.to({}, { duration: 2.0 });

    // Fade
    loop.to([rtt, seq], { opacity: 0, duration: 0.3 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
