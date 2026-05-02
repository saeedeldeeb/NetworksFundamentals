import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-nagle-compare',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .nc-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .nc-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="nc-wrap">
      <svg viewBox="0 0 720 272" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="nc-arr-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
          <marker id="nc-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="nc-arr-m" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#475569"/>
          </marker>
        </defs>

        <!-- ===== HEADERS ===== -->
        <g class="nc-headers" opacity="0">
          <rect x="8" y="8" width="346" height="26" rx="6"
                fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="181" y="25" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.06em">
            NAGLE ON (default)
          </text>

          <rect x="366" y="8" width="346" height="26" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1.5"/>
          <text x="539" y="25" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.06em">
            TCP_NODELAY
          </text>

          <!-- Divider -->
          <line x1="360" y1="8" x2="360" y2="264" stroke="rgba(71,85,105,0.35)"
                stroke-width="1" stroke-dasharray="4,4"/>

          <!-- Scenario labels -->
          <text x="181" y="46" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">Sending 5000 bytes — MSS = 1460B → 3 full + 1 partial</text>
          <text x="539" y="46" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">Same data, same segments, same RTT</text>
        </g>

        <!-- ===== LEFT: Segments 1–3 (NAGLE ON) ===== -->
        <g class="nc-lseg" opacity="0">
          <line x1="12" y1="62" x2="348" y2="62" stroke="#f59e0b" stroke-width="1.8"
                marker-end="url(#nc-arr-a)"/>
          <rect x="68" y="51" width="222" height="12" rx="3" fill="rgba(245,158,11,0.08)"/>
          <text x="179" y="61" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 1 [1460B] — full, sends immediately</text>
        </g>

        <g class="nc-lseg" opacity="0">
          <line x1="12" y1="86" x2="348" y2="86" stroke="#f59e0b" stroke-width="1.8"
                marker-end="url(#nc-arr-a)"/>
          <rect x="68" y="75" width="222" height="12" rx="3" fill="rgba(245,158,11,0.08)"/>
          <text x="179" y="85" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 2 [1460B] — full, sends immediately</text>
        </g>

        <g class="nc-lseg" opacity="0">
          <line x1="12" y1="110" x2="348" y2="110" stroke="#f59e0b" stroke-width="1.8"
                marker-end="url(#nc-arr-a)"/>
          <rect x="68" y="99" width="222" height="12" rx="3" fill="rgba(245,158,11,0.08)"/>
          <text x="179" y="109" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 3 [1460B] — full, sends immediately</text>
        </g>

        <!-- ===== LEFT: WAIT ZONE ===== -->
        <g class="nc-wait" opacity="0">
          <rect x="8" y="122" width="346" height="62" rx="8"
                fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.35)"
                stroke-width="1.5" stroke-dasharray="5,3"/>

          <!-- Clock icon -->
          <circle cx="38" cy="153" r="12" fill="none" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
          <line x1="38" y1="153" x2="38" y2="144" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
          <line x1="38" y1="153" x2="45" y2="153" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>

          <text x="60" y="144" fill="#f59e0b" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif">620B partial — unacked data in flight</text>
          <text x="60" y="157" fill="#78350f" font-size="7" font-family="Inter, sans-serif">
            Nagle: "not full segment + outstanding ACK = buffer, wait"
          </text>
          <text x="60" y="170" fill="#f97316" font-size="7.5" font-weight="700"
                font-family="Inter, sans-serif">≈ 1 RTT delay (50ms on LAN · 200ms+ across internet)</text>
          <text x="60" y="180" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            Will unblock only when ACK arrives for segs 1–3
          </text>
        </g>

        <!-- ===== LEFT: ACK reply ===== -->
        <g class="nc-ack" opacity="0">
          <line x1="346" y1="197" x2="14" y2="197" stroke="#475569" stroke-width="1.5"
                stroke-dasharray="4,3" marker-end="url(#nc-arr-m)"/>
          <rect x="80" y="188" width="184" height="12" rx="3" fill="rgba(71,85,105,0.1)"/>
          <text x="172" y="197" text-anchor="middle" fill="#64748b" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">← ACK received for segments 1–3</text>
        </g>

        <!-- ===== LEFT: Segment 4 (finally!) ===== -->
        <g class="nc-lseg4" opacity="0">
          <line x1="12" y1="215" x2="348" y2="215" stroke="#f59e0b" stroke-width="1.8"
                marker-end="url(#nc-arr-a)"/>
          <rect x="52" y="204" width="246" height="12" rx="3" fill="rgba(245,158,11,0.08)"/>
          <text x="175" y="214" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 4 [620B] — sent after ACK unblocked Nagle</text>
        </g>

        <!-- ===== RIGHT: All 4 segments (TCP_NODELAY) ===== -->
        <g class="nc-rseg" opacity="0">
          <line x1="372" y1="62" x2="708" y2="62" stroke="#10b981" stroke-width="1.8"
                marker-end="url(#nc-arr-g)"/>
          <rect x="428" y="51" width="222" height="12" rx="3" fill="rgba(16,185,129,0.08)"/>
          <text x="539" y="61" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 1 [1460B]</text>
        </g>

        <g class="nc-rseg" opacity="0">
          <line x1="372" y1="86" x2="708" y2="86" stroke="#10b981" stroke-width="1.8"
                marker-end="url(#nc-arr-g)"/>
          <rect x="428" y="75" width="222" height="12" rx="3" fill="rgba(16,185,129,0.08)"/>
          <text x="539" y="85" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 2 [1460B]</text>
        </g>

        <g class="nc-rseg" opacity="0">
          <line x1="372" y1="110" x2="708" y2="110" stroke="#10b981" stroke-width="1.8"
                marker-end="url(#nc-arr-g)"/>
          <rect x="428" y="99" width="222" height="12" rx="3" fill="rgba(16,185,129,0.08)"/>
          <text x="539" y="109" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 3 [1460B]</text>
        </g>

        <g class="nc-rseg" opacity="0">
          <line x1="372" y1="134" x2="708" y2="134" stroke="#10b981" stroke-width="1.8"
                marker-end="url(#nc-arr-g)"/>
          <rect x="428" y="123" width="222" height="12" rx="3" fill="rgba(16,185,129,0.08)"/>
          <text x="539" y="133" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="600" font-family="Inter, sans-serif">Segment 4 [620B] — fires immediately, no buffer</text>
        </g>

        <!-- ===== RIGHT: Done badge ===== -->
        <g class="nc-rdone" opacity="0">
          <rect x="420" y="148" width="238" height="36" rx="6"
                fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.25)" stroke-width="1"/>
          <text x="539" y="163" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">✓ All 5000 bytes sent</text>
          <text x="539" y="176" text-anchor="middle" fill="#064e3b" font-size="7"
                font-family="Inter, sans-serif">No wait. Data leaves the kernel immediately.</text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="nc-result" opacity="0">
          <rect x="8" y="234" width="704" height="30" rx="8"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.25)" stroke-width="1.5"/>
          <text x="360" y="246" text-anchor="middle" fill="#f97316" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">
            LEFT: Segment 4 arrived ~1 RTT later than it needed to
          </text>
          <text x="360" y="258" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">
            RIGHT: Same data, same segments — but every byte left the sender the moment it was written
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class NagleCompareComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.nc-wrap');
    const tl = this.createScrollTimeline(container);

    // Headers
    tl.fromTo(this.q('.nc-headers'), { opacity: 0 }, { opacity: 1, duration: 0.35 });

    // LEFT segs 1-3 and RIGHT segs 1-4 start together — right finishes first
    tl.fromTo(
      this.qa('.nc-lseg'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.2, ease: 'power2.out' },
      '+=0.15',
    );
    tl.fromTo(
      this.qa('.nc-rseg'),
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, duration: 0.25, stagger: 0.12, ease: 'power2.out' },
      '<', // same start time as left segs
    );

    // RIGHT done badge (right finishes first, so it appears before left wait zone)
    tl.fromTo(
      this.q('.nc-rdone'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' },
      '+=0.05',
    );

    // LEFT wait zone (appears after left seg 3)
    tl.fromTo(
      this.q('.nc-wait'),
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '+=0.1',
    );

    // ACK arrives on left
    tl.fromTo(this.q('.nc-ack'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.25');

    // Left seg 4 finally sends
    tl.fromTo(
      this.q('.nc-lseg4'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
      '+=0.1',
    );

    // Result banner
    tl.fromTo(
      this.q('.nc-result'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.2',
    );
  }
}
