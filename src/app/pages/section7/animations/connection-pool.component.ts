import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-connection-pool',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cp-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .cp-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="cp-wrap">
      <svg viewBox="0 0 720 312" preserveAspectRatio="xMidYMid meet">

        <!-- ===== HEADERS ===== -->
        <g class="cp-headers" opacity="0">
          <rect x="8" y="8" width="346" height="26" rx="6"
                fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="1.5"/>
          <text x="181" y="25" text-anchor="middle" fill="#f87171" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.06em">
            WITHOUT POOLING
          </text>

          <rect x="366" y="8" width="346" height="26" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1.5"/>
          <text x="539" y="25" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.06em">
            WITH CONNECTION POOLING
          </text>

          <line x1="360" y1="8" x2="360" y2="304" stroke="rgba(71,85,105,0.35)"
                stroke-width="1" stroke-dasharray="4,4"/>
        </g>

        <!-- ===== SUB LABELS ===== -->
        <text class="cp-sub" opacity="0" x="181" y="48" text-anchor="middle" fill="#475569"
              font-size="7" font-family="Inter, sans-serif">
          Every request reopens a fresh connection
        </text>
        <text class="cp-sub" opacity="0" x="539" y="48" text-anchor="middle" fill="#475569"
              font-size="7" font-family="Inter, sans-serif">
          Connection opened once at startup, then reused
        </text>

        <!-- ===== LEFT: 3 requests, each pays full cost ===== -->
        <!-- Request 1 -->
        <text class="cp-llabel" opacity="0" x="14" y="78" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 1</text>
        <g>
          <rect class="cp-lseg" x="80" y="60" width="104" height="28" rx="3" fill="rgba(239,68,68,0.5)"/>
          <text x="132" y="78" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-family="Inter, sans-serif">Handshake</text>
          <rect class="cp-lseg" x="186" y="60" width="104" height="28" rx="3" fill="rgba(245,158,11,0.5)"/>
          <text x="238" y="78" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-family="Inter, sans-serif">Slow Start</text>
          <rect class="cp-lseg" x="292" y="60" width="60" height="28" rx="3" fill="rgba(16,185,129,0.5)"/>
          <text x="322" y="78" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-family="Inter, sans-serif">Data</text>
        </g>

        <!-- Request 2 -->
        <text class="cp-llabel" opacity="0" x="14" y="132" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 2</text>
        <g>
          <rect class="cp-lseg" x="80" y="114" width="104" height="28" rx="3" fill="rgba(239,68,68,0.5)"/>
          <text x="132" y="132" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-family="Inter, sans-serif">Handshake</text>
          <rect class="cp-lseg" x="186" y="114" width="104" height="28" rx="3" fill="rgba(245,158,11,0.5)"/>
          <text x="238" y="132" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-family="Inter, sans-serif">Slow Start</text>
          <rect class="cp-lseg" x="292" y="114" width="60" height="28" rx="3" fill="rgba(16,185,129,0.5)"/>
          <text x="322" y="132" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-family="Inter, sans-serif">Data</text>
        </g>

        <!-- Request 3 -->
        <text class="cp-llabel" opacity="0" x="14" y="186" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 3</text>
        <g>
          <rect class="cp-lseg" x="80" y="168" width="104" height="28" rx="3" fill="rgba(239,68,68,0.5)"/>
          <text x="132" y="186" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-family="Inter, sans-serif">Handshake</text>
          <rect class="cp-lseg" x="186" y="168" width="104" height="28" rx="3" fill="rgba(245,158,11,0.5)"/>
          <text x="238" y="186" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-family="Inter, sans-serif">Slow Start</text>
          <rect class="cp-lseg" x="292" y="168" width="60" height="28" rx="3" fill="rgba(16,185,129,0.5)"/>
          <text x="322" y="186" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-family="Inter, sans-serif">Data</text>
        </g>

        <!-- LEFT summary -->
        <g class="cp-lsum" opacity="0">
          <rect x="8" y="212" width="346" height="56" rx="8"
                fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="181" y="232" text-anchor="middle" fill="#f87171" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">3 requests = 3&#215; full setup cost</text>
          <text x="181" y="248" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Every request waits for handshake + slow start</text>
          <text x="181" y="261" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">before a single byte of data can move.</text>
        </g>

        <!-- ===== RIGHT: pool warmed once, then instant requests ===== -->
        <!-- Startup row -->
        <text class="cp-rlabel" opacity="0" x="372" y="76" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Startup</text>
        <g>
          <rect class="cp-rsseg" x="432" y="60" width="132" height="24" rx="3" fill="rgba(239,68,68,0.5)"/>
          <text x="498" y="75" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-family="Inter, sans-serif">Handshake</text>
          <rect class="cp-rsseg" x="566" y="60" width="132" height="24" rx="3" fill="rgba(245,158,11,0.5)"/>
          <text x="632" y="75" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-family="Inter, sans-serif">Slow Start</text>
        </g>

        <!-- Warm badge -->
        <g class="cp-rwarm" opacity="0">
          <rect x="372" y="94" width="334" height="24" rx="6"
                fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.2"/>
          <text x="539" y="110" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">
            &#10003; Connection warm — kept open in the pool
          </text>
        </g>

        <!-- Request rows -->
        <text class="cp-rdlabel" opacity="0" x="372" y="143" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 1</text>
        <rect class="cp-rdata" opacity="0" x="432" y="128" width="64" height="22" rx="3" fill="rgba(16,185,129,0.5)"/>
        <text class="cp-rdtext" opacity="0" x="464" y="142" text-anchor="middle" fill="#6ee7b7"
              font-size="6.5" font-family="Inter, sans-serif">Data</text>
        <text class="cp-rdtext" opacity="0" x="506" y="143" fill="#64748b" font-size="7"
              font-family="Inter, sans-serif">&#8594; instant — reuse warm connection</text>

        <text class="cp-rdlabel" opacity="0" x="372" y="173" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 2</text>
        <rect class="cp-rdata" opacity="0" x="432" y="158" width="64" height="22" rx="3" fill="rgba(16,185,129,0.5)"/>
        <text class="cp-rdtext" opacity="0" x="464" y="172" text-anchor="middle" fill="#6ee7b7"
              font-size="6.5" font-family="Inter, sans-serif">Data</text>
        <text class="cp-rdtext" opacity="0" x="506" y="173" fill="#64748b" font-size="7"
              font-family="Inter, sans-serif">&#8594; instant — reuse warm connection</text>

        <text class="cp-rdlabel" opacity="0" x="372" y="203" fill="#94a3b8" font-size="7.5"
              font-weight="600" font-family="Inter, sans-serif">Request 3</text>
        <rect class="cp-rdata" opacity="0" x="432" y="188" width="64" height="22" rx="3" fill="rgba(16,185,129,0.5)"/>
        <text class="cp-rdtext" opacity="0" x="464" y="202" text-anchor="middle" fill="#6ee7b7"
              font-size="6.5" font-family="Inter, sans-serif">Data</text>
        <text class="cp-rdtext" opacity="0" x="506" y="203" fill="#64748b" font-size="7"
              font-family="Inter, sans-serif">&#8594; instant — reuse warm connection</text>

        <!-- RIGHT summary -->
        <g class="cp-rsum" opacity="0">
          <rect x="366" y="212" width="346" height="56" rx="8"
                fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
          <text x="539" y="232" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Setup cost paid ONCE at startup</text>
          <text x="539" y="248" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">Every request skips straight to data —</text>
          <text x="539" y="261" text-anchor="middle" fill="#64748b" font-size="7"
                font-family="Inter, sans-serif">handshake and slow start already done.</text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="cp-result" opacity="0">
          <rect x="8" y="278" width="704" height="26" rx="7"
                fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)" stroke-width="1.5"/>
          <text x="360" y="295" text-anchor="middle" fill="#818cf8" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">
            Pooling amortizes setup over every request — the warm pool is why databases and HTTP clients feel instant
          </text>
        </g>

      </svg>
    </div>
  `,
})
export class ConnectionPoolComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cp-wrap');
    const tl = this.createScrollTimeline(container);

    // Headers + sub labels
    tl.fromTo(this.q('.cp-headers'), { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(
      this.qa('.cp-sub'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3, stagger: 0.1 },
      '+=0.05',
    );

    // Base time after intro — left & right setup start together
    const t = 0.85;

    // LEFT: 9 cost segments grow left-to-right, slow stagger
    tl.fromTo(
      this.qa('.cp-lseg'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3, stagger: 0.13, ease: 'power2.out', transformOrigin: 'left center' },
      t,
    );
    tl.fromTo(
      this.qa('.cp-llabel'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.39 },
      t,
    );

    // RIGHT: startup pays the cost once
    tl.fromTo(
      this.qa('.cp-rsseg'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3, stagger: 0.15, ease: 'power2.out', transformOrigin: 'left center' },
      t,
    );
    tl.fromTo(this.q('.cp-rlabel'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);

    // RIGHT: pool goes warm
    tl.fromTo(
      this.q('.cp-rwarm'),
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)', transformOrigin: 'center' },
      t + 0.6,
    );

    // RIGHT: each request is now an instant data cell
    tl.fromTo(
      this.qa('.cp-rdlabel'),
      { opacity: 0 },
      { opacity: 1, duration: 0.25, stagger: 0.2 },
      t + 1.05,
    );
    tl.fromTo(
      this.qa('.cp-rdata'),
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)', transformOrigin: 'left center' },
      t + 1.05,
    );
    tl.fromTo(
      this.qa('.cp-rdtext'),
      { opacity: 0 },
      { opacity: 1, duration: 0.25, stagger: 0.1 },
      t + 1.15,
    );

    // Summaries
    tl.fromTo(this.q('.cp-lsum'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, t + 1.7);
    tl.fromTo(this.q('.cp-rsum'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, t + 1.8);

    // Result banner
    tl.fromTo(this.q('.cp-result'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }, t + 2.1);
  }
}
