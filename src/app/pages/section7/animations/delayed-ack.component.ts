import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-delayed-ack',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .da-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .da-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="da-wrap">
      <svg viewBox="0 0 720 346" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="da-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="da-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="da-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- ===== NODES ===== -->
        <g class="da-nodes" opacity="0">
          <rect x="8" y="10" width="110" height="42" rx="7"
                fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="63" y="27" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">SENDER</text>
          <text x="63" y="40" text-anchor="middle" fill="#78350f" font-size="7"
                font-family="Inter, sans-serif">Nagle ON</text>

          <rect x="602" y="10" width="110" height="42" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="657" y="27" text-anchor="middle" fill="#818cf8" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">RECEIVER</text>
          <text x="657" y="40" text-anchor="middle" fill="#1e1b4b" font-size="7"
                font-family="Inter, sans-serif">Delayed ACK ON</text>
        </g>

        <!-- ===== TIMELINE AXES ===== -->
        <g class="da-axes" opacity="0">
          <line x1="63" y1="52" x2="63" y2="300"
                stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,4" opacity="0.4"/>
          <line x1="657" y1="52" x2="657" y2="300"
                stroke="#6366f1" stroke-width="1" stroke-dasharray="3,4" opacity="0.4"/>
        </g>

        <!-- ===== SEGMENTS 1-3 (full, fire immediately) ===== -->
        <g class="da-seg" opacity="0">
          <line x1="65" y1="66" x2="654" y2="66" stroke="#22d3ee" stroke-width="1.8"
                marker-end="url(#da-arr-c)"/>
          <rect x="148" y="55" width="188" height="12" rx="3" fill="rgba(34,211,238,0.08)"/>
          <text x="242" y="65" text-anchor="middle" fill="#67e8f9" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 1 [1460B] — full, sends immediately</text>
        </g>

        <g class="da-seg" opacity="0">
          <line x1="65" y1="86" x2="654" y2="86" stroke="#22d3ee" stroke-width="1.8"
                marker-end="url(#da-arr-c)"/>
          <rect x="148" y="75" width="188" height="12" rx="3" fill="rgba(34,211,238,0.08)"/>
          <text x="242" y="85" text-anchor="middle" fill="#67e8f9" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 2 [1460B] — full, sends immediately</text>
        </g>

        <g class="da-seg" opacity="0">
          <line x1="65" y1="106" x2="654" y2="106" stroke="#22d3ee" stroke-width="1.8"
                marker-end="url(#da-arr-c)"/>
          <rect x="148" y="95" width="188" height="12" rx="3" fill="rgba(34,211,238,0.08)"/>
          <text x="242" y="105" text-anchor="middle" fill="#67e8f9" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 3 [1460B] — full, sends immediately</text>
        </g>

        <!-- ===== DEADLOCK ZONE ===== -->
        <!-- Outer box -->
        <g class="da-deadlock-box" opacity="0">
          <rect x="8" y="118" width="704" height="162" rx="10"
                fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.45)"
                stroke-width="1.5" stroke-dasharray="6,4"/>
        </g>

        <!-- Sender waiting panel (left) -->
        <g class="da-sender-wait" opacity="0">
          <rect x="14" y="124" width="218" height="150" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.28)" stroke-width="1"/>
          <text x="123" y="142" text-anchor="middle" fill="#f59e0b" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">SENDER — Nagle buffering</text>

          <!-- Buffer bar -->
          <rect x="24" y="150" width="198" height="16" rx="3"
                fill="rgba(0,0,0,0.25)" stroke="rgba(245,158,11,0.2)" stroke-width="1"/>
          <rect x="24" y="150" width="83" height="16" rx="3" fill="rgba(245,158,11,0.4)"/>
          <text x="123" y="162" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">620B / 1460B buffered</text>

          <text x="123" y="183" text-anchor="middle" fill="#f97316" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">WAITING FOR ACK</text>
          <text x="123" y="196" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">"unacked data in flight"</text>
          <text x="123" y="208" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">won't send partial segment</text>
          <text x="123" y="222" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">until ACK releases the buffer</text>
          <text x="123" y="240" text-anchor="middle" fill="#78350f" font-size="7"
                font-family="Inter, sans-serif">but ACK never comes...</text>
          <text x="123" y="260" text-anchor="middle" fill="#475569" font-size="6.5"
                font-family="Inter, sans-serif">⏳ indefinitely blocked</text>
        </g>

        <!-- Center deadlock label -->
        <g class="da-center-label" opacity="0">
          <text x="360" y="162" text-anchor="middle" fill="#ef4444" font-size="15"
                font-weight="800" font-family="Inter, sans-serif" letter-spacing="0.05em">DEADLOCK</text>
          <text x="360" y="177" text-anchor="middle" fill="#7f1d1d" font-size="7"
                font-family="Inter, sans-serif">both sides waiting on the other</text>
          <!-- left arrow -->
          <line x1="234" y1="170" x2="298" y2="170" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <!-- right arrow -->
          <line x1="422" y1="170" x2="486" y2="170" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>

          <rect x="272" y="194" width="176" height="68" rx="6"
                fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" stroke-width="1"/>
          <text x="360" y="212" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Delayed ACK timer</text>
          <text x="360" y="224" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">~200ms (RFC recommendation)</text>
          <text x="360" y="240" text-anchor="middle" fill="#ef4444" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">+</text>
          <text x="360" y="254" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Nagle wait period + RTT</text>
          <text x="360" y="268" text-anchor="middle" fill="#ef4444" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">= up to 400ms+</text>
        </g>

        <!-- Receiver timer panel (right) -->
        <g class="da-receiver-wait" opacity="0">
          <rect x="488" y="124" width="218" height="150" rx="7"
                fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.28)" stroke-width="1"/>
          <text x="597" y="142" text-anchor="middle" fill="#818cf8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">RECEIVER — timer started</text>

          <!-- Timer bar background -->
          <rect x="498" y="150" width="198" height="16" rx="3"
                fill="rgba(0,0,0,0.25)" stroke="rgba(99,102,241,0.2)" stroke-width="1"/>
          <!-- Timer bar (animated by GSAP: width 0 → 198) -->
          <rect class="da-timer-bar" x="498" y="150" width="0" height="16" rx="3"
                fill="rgba(99,102,241,0.45)"/>
          <text x="597" y="162" text-anchor="middle" fill="#a5b4fc" font-size="6.5"
                font-weight="600" font-family="'JetBrains Mono', monospace">Delayed ACK timer: 0 → 200ms</text>

          <text x="597" y="183" text-anchor="middle" fill="#6366f1" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">WAITING FOR MORE DATA</text>
          <text x="597" y="196" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">"expecting more segments"</text>
          <text x="597" y="208" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">will batch ACK when they arrive</text>
          <text x="597" y="222" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">or when 200ms timer fires</text>
          <text x="597" y="240" text-anchor="middle" fill="#1e1b4b" font-size="7"
                font-family="Inter, sans-serif">but sender is stuck by Nagle...</text>
          <text x="597" y="260" text-anchor="middle" fill="#475569" font-size="6.5"
                font-family="Inter, sans-serif">⏳ counting down to 200ms</text>
        </g>

        <!-- ===== TIMER FIRES — ACK SENT ===== -->
        <g class="da-ack" opacity="0">
          <line x1="654" y1="292" x2="68" y2="292" stroke="#ef4444" stroke-width="1.8"
                stroke-dasharray="5,3" marker-end="url(#da-arr-r)"/>
          <rect x="192" y="282" width="252" height="12" rx="3" fill="rgba(239,68,68,0.08)"/>
          <text x="318" y="292" text-anchor="middle" fill="#f87171" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">
            ← Delayed ACK timer fired (200ms) — ACK for segs 1–3
          </text>
        </g>

        <!-- ===== SEGMENT 4 (finally released) ===== -->
        <g class="da-seg4" opacity="0">
          <line x1="65" y1="310" x2="654" y2="310" stroke="#10b981" stroke-width="1.8"
                marker-end="url(#da-arr-g)"/>
          <rect x="148" y="299" width="244" height="12" rx="3" fill="rgba(16,185,129,0.08)"/>
          <text x="270" y="309" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="600" font-family="Inter, sans-serif">Segment 4 [620B] — finally released after ~200ms</text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="da-result" opacity="0">
          <rect x="8" y="320" width="704" height="22" rx="6"
                fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="360" y="335" text-anchor="middle" fill="#f87171" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">
            Total delay: Delayed ACK timer (~200ms) + Nagle wait + RTT = up to 400ms per partial segment
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class DelayedAckComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.da-wrap');
    const tl = this.createScrollTimeline(container);

    // Nodes + axes
    tl.fromTo(this.q('.da-nodes'), { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(this.q('.da-axes'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

    // Segments 1-3 stagger in
    tl.fromTo(
      this.qa('.da-seg'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.18, ease: 'power2.out' },
      '+=0.1',
    );

    // Deadlock outer box appears
    tl.fromTo(
      this.q('.da-deadlock-box'),
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
      '+=0.15',
    );

    // Sender wait + receiver wait panels appear together
    tl.fromTo(
      this.q('.da-sender-wait'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.da-receiver-wait'),
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '<',
    );

    // Center deadlock label
    tl.fromTo(
      this.q('.da-center-label'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
      '+=0.1',
    );

    // Timer bar fills up (representing the 200ms Delayed ACK timer)
    tl.fromTo(
      this.q('.da-timer-bar'),
      { attr: { width: 0 } },
      { attr: { width: 198 }, duration: 1.0, ease: 'linear' },
      '+=0.1',
    );

    // ACK fires after timer
    tl.fromTo(this.q('.da-ack'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');

    // Seg 4 finally sends
    tl.fromTo(
      this.q('.da-seg4'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
      '+=0.1',
    );

    // Result
    tl.fromTo(
      this.q('.da-result'),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.15',
    );
  }
}
