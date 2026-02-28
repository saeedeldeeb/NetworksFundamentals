import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-ecn-animation',
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
      <svg viewBox="0 0 640 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ecn-glow-red">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ecn-glow-green">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- ======= TOP HALF: Without ECN ======= -->
        <text x="160" y="22" text-anchor="middle" fill="#ef4444"
              font-size="13" font-weight="700" font-family="Inter, sans-serif">
          Without ECN (Traditional)
        </text>

        <!-- Sender (top) -->
        <g class="ecn-old-sender" opacity="0">
          <rect x="15" y="45" width="60" height="40" rx="8" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="45" y="70" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Sender</text>
        </g>

        <!-- Router (top) with buffer -->
        <g class="ecn-old-router" opacity="0">
          <rect x="120" y="40" width="80" height="50" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="160" y="60" text-anchor="middle" fill="#a855f7"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <!-- Buffer bar -->
          <rect x="130" y="68" width="60" height="10" rx="3" fill="#1f2937"
                stroke="#374151" stroke-width="1" />
          <rect class="ecn-old-buffer" x="130" y="68" width="0" height="10" rx="3"
                fill="#ef4444" />
        </g>

        <!-- Receiver (top) -->
        <g class="ecn-old-recv" opacity="0">
          <rect x="245" y="45" width="60" height="40" rx="8" fill="#1f2937"
                stroke="#10b981" stroke-width="1.5" />
          <text x="275" y="70" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Receiver</text>
        </g>

        <!-- Lines (top) -->
        <line class="ecn-old-ln1" x1="75" y1="65" x2="120" y2="65" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="ecn-old-ln2" x1="200" y1="65" x2="245" y2="65" stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packets (top) -->
        <circle class="ecn-old-pkt1" r="5" fill="#22d3ee" opacity="0" />
        <circle class="ecn-old-pkt2" r="5" fill="#22d3ee" opacity="0" />
        <circle class="ecn-old-pkt3" r="5" fill="#22d3ee" opacity="0" />

        <!-- X mark for dropped packet -->
        <g class="ecn-old-drop" opacity="0">
          <line x1="152" y1="35" x2="168" y2="50" stroke="#ef4444" stroke-width="3" />
          <line x1="168" y1="35" x2="152" y2="50" stroke="#ef4444" stroke-width="3" />
        </g>

        <!-- "Dropped!" label -->
        <text class="ecn-old-drop-label" x="160" y="30" text-anchor="middle" fill="#ef4444"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">
          DROPPED!
        </text>

        <!-- Timeout indicator -->
        <g class="ecn-old-timeout" opacity="0">
          <rect x="20" y="95" width="140" height="24" rx="6"
                fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="1" />
          <text x="90" y="112" text-anchor="middle" fill="#ef4444"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Waiting for ACK... timeout!
          </text>
        </g>

        <!-- Slow down label -->
        <text class="ecn-old-slow" x="160" y="140" text-anchor="middle" fill="#ef4444"
              font-size="10" font-weight="600" font-family="Inter, sans-serif" opacity="0">
          Sender finally slows down (wasted time + packets)
        </text>

        <!-- Divider -->
        <line x1="330" y1="20" x2="330" y2="370" stroke="#374151" stroke-width="1" stroke-dasharray="4,4" />

        <!-- ======= BOTTOM HALF: With ECN ======= -->
        <text x="490" y="22" text-anchor="middle" fill="#10b981"
              font-size="13" font-weight="700" font-family="Inter, sans-serif">
          With ECN (Modern)
        </text>

        <!-- Sender (bottom) -->
        <g class="ecn-new-sender" opacity="0">
          <rect x="355" y="45" width="60" height="40" rx="8" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <text x="385" y="70" text-anchor="middle" fill="#22d3ee"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Sender</text>
        </g>

        <!-- Router (bottom) with buffer -->
        <g class="ecn-new-router" opacity="0">
          <rect x="460" y="40" width="80" height="50" rx="8" fill="#1f2937"
                stroke="#a855f7" stroke-width="1.5" />
          <text x="500" y="60" text-anchor="middle" fill="#a855f7"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <!-- Buffer bar -->
          <rect x="470" y="68" width="60" height="10" rx="3" fill="#1f2937"
                stroke="#374151" stroke-width="1" />
          <rect class="ecn-new-buffer" x="470" y="68" width="0" height="10" rx="3"
                fill="#f59e0b" />
        </g>

        <!-- Receiver (bottom) -->
        <g class="ecn-new-recv" opacity="0">
          <rect x="585" y="45" width="45" height="40" rx="8" fill="#1f2937"
                stroke="#10b981" stroke-width="1.5" />
          <text x="607" y="70" text-anchor="middle" fill="#10b981"
                font-size="10" font-weight="700" font-family="Inter, sans-serif">Recv</text>
        </g>

        <!-- Lines (bottom) -->
        <line class="ecn-new-ln1" x1="415" y1="65" x2="460" y2="65" stroke="#374151" stroke-width="1.5" opacity="0" />
        <line class="ecn-new-ln2" x1="540" y1="65" x2="585" y2="65" stroke="#374151" stroke-width="1.5" opacity="0" />

        <!-- Packets (bottom) -->
        <circle class="ecn-new-pkt" r="5" fill="#22d3ee" opacity="0" />

        <!-- ECN mark indicator -->
        <g class="ecn-new-mark" opacity="0">
          <rect x="475" y="30" width="50" height="18" rx="4"
                fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1" />
          <text x="500" y="43" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">ECN SET</text>
        </g>

        <!-- Marked packet (travels with ECN flag) -->
        <circle class="ecn-new-marked-pkt" r="5" fill="#f59e0b" opacity="0" />

        <!-- Receiver tells sender label -->
        <g class="ecn-new-notify" opacity="0">
          <rect x="390" y="95" width="170" height="24" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1" />
          <text x="475" y="112" text-anchor="middle" fill="#10b981"
                font-size="9" font-weight="700" font-family="'JetBrains Mono', monospace">
            Receiver: "Slow down!"
          </text>
        </g>

        <!-- Notification arrow back -->
        <circle class="ecn-new-notify-pkt" r="4" fill="#10b981" opacity="0" />

        <!-- Success label -->
        <text class="ecn-new-success" x="490" y="140" text-anchor="middle" fill="#10b981"
              font-size="10" font-weight="600" font-family="Inter, sans-serif" opacity="0">
          Sender slows down immediately (no loss!)
        </text>

        <!-- ======= COMPARISON BOX ======= -->
        <g class="ecn-comparison" opacity="0">
          <!-- Old result -->
          <rect x="30" y="170" width="270" height="50" rx="10"
                fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" stroke-width="1" />
          <text x="165" y="192" text-anchor="middle" fill="#ef4444"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Result: Packet lost + timeout delay</text>
          <text x="165" y="210" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="Inter, sans-serif">Sender doesn't know until ACK times out</text>

          <!-- New result -->
          <rect x="340" y="170" width="270" height="50" rx="10"
                fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
          <text x="475" y="192" text-anchor="middle" fill="#10b981"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">Result: Zero packet loss</text>
          <text x="475" y="210" text-anchor="middle" fill="#94a3b8"
                font-size="9" font-family="Inter, sans-serif">Sender notified instantly via ECN flag</text>
        </g>
      </svg>
    </div>
  `,
})
export class EcnAnimationComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ecn-anim');
    const tl = this.createScrollTimeline(container);

    // Show all static elements
    const elems = [
      '.ecn-old-sender', '.ecn-old-router', '.ecn-old-recv',
      '.ecn-old-ln1', '.ecn-old-ln2',
      '.ecn-new-sender', '.ecn-new-router', '.ecn-new-recv',
      '.ecn-new-ln1', '.ecn-new-ln2',
    ];
    elems.forEach((sel, i) => {
      tl.to(this.q(sel), { opacity: 1, duration: 0.25 }, i * 0.05);
    });

    tl.add(() => { this.startEcnLoop(); });
  }

  private startEcnLoop(): void {
    const container = this.q('.ecn-anim');
    const loop = this.createLoopingTimeline(container);

    // Old side elements
    const oldBuffer = this.q('.ecn-old-buffer');
    const oldPkt1 = this.q('.ecn-old-pkt1');
    const oldPkt2 = this.q('.ecn-old-pkt2');
    const oldPkt3 = this.q('.ecn-old-pkt3');
    const oldDrop = this.q('.ecn-old-drop');
    const oldDropLabel = this.q('.ecn-old-drop-label');
    const oldTimeout = this.q('.ecn-old-timeout');
    const oldSlow = this.q('.ecn-old-slow');

    // New side elements
    const newBuffer = this.q('.ecn-new-buffer');
    const newPkt = this.q('.ecn-new-pkt');
    const newMark = this.q('.ecn-new-mark');
    const newMarkedPkt = this.q('.ecn-new-marked-pkt');
    const newNotify = this.q('.ecn-new-notify');
    const newNotifyPkt = this.q('.ecn-new-notify-pkt');
    const newSuccess = this.q('.ecn-new-success');

    const comparison = this.q('.ecn-comparison');

    // ===  OLD SIDE: Buffer fills, packet drops ===

    // Buffer fills up
    loop.fromTo(oldBuffer, { attr: { width: 0 } }, { attr: { width: 60 }, duration: 1.5, ease: 'power1.in' }, 0);

    // Packets travel toward router
    loop.fromTo(oldPkt1,
      { attr: { cx: 75, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 0.2);
    loop.to(oldPkt1, { attr: { cx: 160, cy: 65 }, duration: 0.4 }, 0.3);
    loop.to(oldPkt1, { attr: { cx: 245, cy: 65 }, duration: 0.4 }, 0.7);
    loop.to(oldPkt1, { opacity: 0, duration: 0.1 }, 1.1);

    loop.fromTo(oldPkt2,
      { attr: { cx: 75, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 0.6);
    loop.to(oldPkt2, { attr: { cx: 160, cy: 65 }, duration: 0.4 }, 0.7);
    loop.to(oldPkt2, { attr: { cx: 245, cy: 65 }, duration: 0.4 }, 1.1);
    loop.to(oldPkt2, { opacity: 0, duration: 0.1 }, 1.5);

    // Third packet gets DROPPED
    loop.fromTo(oldPkt3,
      { attr: { cx: 75, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 1.0);
    loop.to(oldPkt3, { attr: { cx: 150, cy: 65 }, duration: 0.35 }, 1.1);

    // Drop!
    loop.to(oldPkt3, { opacity: 0, duration: 0.1 }, 1.5);
    loop.fromTo(oldDrop, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.5);
    loop.fromTo(oldDropLabel, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.5);
    loop.to(oldDrop, { opacity: 0, duration: 0.4 }, 2.0);
    loop.to(oldDropLabel, { opacity: 0, duration: 0.4 }, 2.0);

    // Timeout
    loop.fromTo(oldTimeout, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.0);

    // Slow down text
    loop.fromTo(oldSlow, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.0);

    // === NEW SIDE: Buffer filling, ECN marks, no drop ===

    // Buffer fills (but only partway — warning level)
    loop.fromTo(newBuffer, { attr: { width: 0 } }, { attr: { width: 45 }, duration: 1.2, ease: 'power1.in' }, 0);

    // Packet travels to router
    loop.fromTo(newPkt,
      { attr: { cx: 415, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 0.5);
    loop.to(newPkt, { attr: { cx: 500, cy: 65 }, duration: 0.4 }, 0.6);

    // ECN mark appears
    loop.fromTo(newMark, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.0);
    loop.to(newPkt, { opacity: 0, duration: 0.1 }, 1.0);

    // Marked packet continues to receiver (yellow)
    loop.fromTo(newMarkedPkt,
      { attr: { cx: 500, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 1.2);
    loop.to(newMarkedPkt, { attr: { cx: 607, cy: 65 }, duration: 0.4 }, 1.3);
    loop.to(newMarkedPkt, { opacity: 0, duration: 0.1 }, 1.7);
    loop.to(newMark, { opacity: 0, duration: 0.2 }, 1.7);

    // Receiver notifies sender
    loop.fromTo(newNotify, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.9);
    loop.fromTo(newNotifyPkt,
      { attr: { cx: 607, cy: 65 }, opacity: 0 },
      { opacity: 1, duration: 0.1 }, 2.0);
    loop.to(newNotifyPkt, { attr: { cx: 385, cy: 65 }, duration: 0.6 }, 2.1);
    loop.to(newNotifyPkt, { opacity: 0, duration: 0.1 }, 2.7);

    // Success text
    loop.fromTo(newSuccess, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.5);

    // Comparison box
    loop.fromTo(comparison, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 3.5);

    // Hold
    loop.to({}, { duration: 3.0 });

    // Fade for restart
    loop.to([oldBuffer, oldTimeout, oldSlow, newBuffer, newNotify, newSuccess, comparison],
      { opacity: 0, duration: 0.4 });
    loop.to({}, { duration: 0.5 });

    loop.play();
  }
}
