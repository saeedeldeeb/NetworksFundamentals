import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-l4-vs-l7-routing',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .lr-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .lr-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="lr-wrap">
      <svg viewBox="0 0 720 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="lr-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="lr-arr-v" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
          <marker id="lr-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="lr-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
        </defs>

        <!-- ============ LEFT: LAYER 4 ============ -->
        <g class="lr-lbox" opacity="0">
          <rect x="8" y="8" width="348" height="404" rx="10"
                fill="rgba(245,158,11,0.03)" stroke="rgba(245,158,11,0.35)" stroke-width="1.5"/>
        </g>
        <g class="lr-lhdr" opacity="0">
          <text x="22" y="30" fill="#f59e0b" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">LAYER 4 LOAD BALANCER</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Sees IPs, ports, raw segments &mdash; routes per CONNECTION</text>
        </g>

        <!-- Client, LB, Backends -->
        <g class="lr-lclient" opacity="0">
          <rect x="22" y="68" width="74" height="64" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="59" y="88" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="59" y="104" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">opens TWO</text>
          <text x="59" y="116" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">TCP conns</text>
        </g>

        <g class="lr-llb" opacity="0">
          <rect x="146" y="68" width="80" height="64" rx="7"
                fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="186" y="88" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">L4 LB</text>
          <text x="186" y="104" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">conn &#8594; backend</text>
          <text x="186" y="116" text-anchor="middle" fill="#fcd34d" font-size="6.6"
                font-weight="700" font-family="Inter, sans-serif">NAT / fwd</text>
        </g>

        <g class="lr-lb1" opacity="0">
          <rect x="270" y="60" width="74" height="36" rx="6"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1.2"/>
          <text x="307" y="76" text-anchor="middle" fill="#c4b5fd" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Backend 1</text>
          <text x="307" y="89" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">10.0.0.11</text>
        </g>
        <g class="lr-lb2" opacity="0">
          <rect x="270" y="106" width="74" height="36" rx="6"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1.2"/>
          <text x="307" y="122" text-anchor="middle" fill="#c4b5fd" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Backend 2</text>
          <text x="307" y="135" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">10.0.0.12</text>
        </g>

        <!-- Connection 1: client → LB → Backend 1 (sticky) -->
        <g class="lr-lc1lbl" opacity="0">
          <text x="22" y="166" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Connection 1 &mdash; sticky to Backend 1</text>
        </g>

        <g class="lr-lc1s1" opacity="0">
          <rect x="22" y="176" width="50" height="18" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="47" y="188" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 1</text>
        </g>
        <g class="lr-lc1s2" opacity="0">
          <rect x="78" y="176" width="50" height="18" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="103" y="188" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 2</text>
        </g>
        <g class="lr-lc1s3" opacity="0">
          <rect x="134" y="176" width="50" height="18" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="159" y="188" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 3</text>
        </g>
        <g class="lr-lc1arr" opacity="0">
          <line x1="190" y1="185" x2="268" y2="78" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#lr-arr-c)"/>
          <text x="232" y="138" text-anchor="middle" fill="#22d3ee" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">all 3 &#8594; B1</text>
        </g>

        <!-- Connection 2: client → LB → Backend 2 (sticky) -->
        <g class="lr-lc2lbl" opacity="0">
          <text x="22" y="222" fill="#a78bfa" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Connection 2 &mdash; sticky to Backend 2</text>
        </g>

        <g class="lr-lc2s1" opacity="0">
          <rect x="22" y="232" width="50" height="18" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="47" y="244" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 4</text>
        </g>
        <g class="lr-lc2s2" opacity="0">
          <rect x="78" y="232" width="50" height="18" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="103" y="244" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 5</text>
        </g>
        <g class="lr-lc2arr" opacity="0">
          <line x1="190" y1="241" x2="268" y2="124" stroke="#a78bfa" stroke-width="1.6"
                marker-end="url(#lr-arr-v)"/>
          <text x="232" y="200" text-anchor="middle" fill="#a78bfa" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">all &#8594; B2</text>
        </g>

        <!-- Insight -->
        <g class="lr-lwhy" opacity="0">
          <rect x="22" y="278" width="322" height="50" rx="7"
                fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="183" y="296" text-anchor="middle" fill="#fcd34d" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Routing decision = ONCE, at connect</text>
          <text x="183" y="310" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">Every segment after follows the same path.</text>
          <text x="183" y="321" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">LB never reads the bytes.</text>
        </g>

        <!-- Summary -->
        <g class="lr-lsum" opacity="0">
          <rect x="22" y="338" width="322" height="60" rx="7"
                fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.35)" stroke-width="1"/>
          <text x="183" y="356" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">PROS &amp; CONS</text>
          <text x="183" y="372" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-family="Inter, sans-serif">+ fast, any protocol, TLS passes through</text>
          <text x="183" y="384" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">&minus; no path routing, no caching, sticky</text>
        </g>

        <!-- ============ RIGHT: LAYER 7 ============ -->
        <g class="lr-rbox" opacity="0">
          <rect x="364" y="8" width="348" height="404" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.35)" stroke-width="1.5"/>
        </g>
        <g class="lr-rhdr" opacity="0">
          <text x="378" y="30" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">LAYER 7 LOAD BALANCER</text>
          <text x="378" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Parses HTTP, headers, paths &mdash; routes per REQUEST</text>
        </g>

        <g class="lr-rclient" opacity="0">
          <rect x="378" y="68" width="74" height="64" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="415" y="88" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="415" y="104" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">ONE TCP</text>
          <text x="415" y="116" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">connection</text>
        </g>

        <g class="lr-rlb" opacity="0">
          <rect x="502" y="68" width="80" height="64" rx="7"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="542" y="88" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">L7 LB</text>
          <text x="542" y="104" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">buffer &middot; parse</text>
          <text x="542" y="116" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">route by path</text>
        </g>

        <g class="lr-rb1" opacity="0">
          <rect x="626" y="60" width="76" height="36" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="664" y="76" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Posts svc</text>
          <text x="664" y="89" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">/posts/*</text>
        </g>
        <g class="lr-rb2" opacity="0">
          <rect x="626" y="106" width="76" height="36" rx="6"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="664" y="122" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Users svc</text>
          <text x="664" y="135" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">/users/*</text>
        </g>

        <!-- Request 1: GET /posts/123 -->
        <g class="lr-rr1lbl" opacity="0">
          <text x="378" y="166" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Request A &mdash; GET /posts/123</text>
        </g>
        <g class="lr-rr1seg" opacity="0">
          <rect x="378" y="176" width="106" height="18" rx="4"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1"/>
          <text x="431" y="188" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 1+2 (HTTP)</text>
        </g>
        <g class="lr-rr1arr" opacity="0">
          <line x1="546" y1="185" x2="624" y2="78" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#lr-arr-c)"/>
          <text x="586" y="138" text-anchor="middle" fill="#22d3ee" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">/posts &#8594; Posts</text>
        </g>

        <!-- Request 2: GET /users/me (SAME connection!) -->
        <g class="lr-rr2lbl" opacity="0">
          <text x="378" y="222" fill="#a78bfa" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Request B &mdash; GET /users/me (same conn)</text>
        </g>
        <g class="lr-rr2seg" opacity="0">
          <rect x="378" y="232" width="106" height="18" rx="4"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1"/>
          <text x="431" y="244" text-anchor="middle" fill="#c4b5fd" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SEG 3 (HTTP)</text>
        </g>
        <g class="lr-rr2arr" opacity="0">
          <line x1="546" y1="241" x2="624" y2="124" stroke="#a78bfa" stroke-width="1.6"
                marker-end="url(#lr-arr-v)"/>
          <text x="586" y="200" text-anchor="middle" fill="#a78bfa" font-size="6.8"
                font-weight="700" font-family="Inter, sans-serif">/users &#8594; Users</text>
        </g>

        <!-- Insight -->
        <g class="lr-rwhy" opacity="0">
          <rect x="378" y="278" width="322" height="50" rx="7"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1.2"/>
          <text x="539" y="296" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Routing decision = PER request</text>
          <text x="539" y="310" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">LB reads bytes, sees method, path, headers.</text>
          <text x="539" y="321" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">Same client conn can fan out anywhere.</text>
        </g>

        <!-- Summary -->
        <g class="lr-rsum" opacity="0">
          <rect x="378" y="338" width="322" height="60" rx="7"
                fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.35)" stroke-width="1"/>
          <text x="539" y="356" text-anchor="middle" fill="#10b981" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">PROS &amp; CONS</text>
          <text x="539" y="372" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-family="Inter, sans-serif">+ path routing, caching, auth at edge</text>
          <text x="539" y="384" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">&minus; must terminate TLS, CPU cost, buffering</text>
        </g>
      </svg>
    </div>
  `,
})
export class L4VsL7RoutingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.lr-wrap');
    const tl = this.createScrollTimeline(container);

    // Boxes + headers
    tl.fromTo(this.qa('.lr-lbox, .lr-rbox'), { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(
      this.qa('.lr-lhdr, .lr-rhdr'),
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.35 },
      '-=0.15',
    );

    // Actors
    tl.fromTo(
      this.qa('.lr-lclient, .lr-llb, .lr-lb1, .lr-lb2, .lr-rclient, .lr-rlb, .lr-rb1, .lr-rb2'),
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        transformOrigin: 'center',
      },
      '+=0.05',
    );

    // Row 1 labels
    tl.fromTo(
      this.qa('.lr-lc1lbl, .lr-rr1lbl'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3 },
      '+=0.1',
    );

    // LEFT row 1 segments (stagger) — show they all belong to one conn
    tl.fromTo(
      this.qa('.lr-lc1s1, .lr-lc1s2, .lr-lc1s3'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 },
      '+=0.05',
    );
    // RIGHT row 1 segment in parallel
    tl.fromTo(
      this.q('.lr-rr1seg'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '<',
    );

    // Row 1 routing arrows
    tl.fromTo(
      this.qa('.lr-lc1arr, .lr-rr1arr'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '+=0.15',
    );

    // Row 2 labels
    tl.fromTo(
      this.qa('.lr-lc2lbl, .lr-rr2lbl'),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3 },
      '+=0.2',
    );

    // LEFT row 2 segments
    tl.fromTo(
      this.qa('.lr-lc2s1, .lr-lc2s2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.lr-rr2seg'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '<',
    );

    // Row 2 routing arrows
    tl.fromTo(
      this.qa('.lr-lc2arr, .lr-rr2arr'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '+=0.15',
    );

    // Insight panels
    tl.fromTo(
      this.qa('.lr-lwhy, .lr-rwhy'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45 },
      '+=0.2',
    );

    // Summary banners
    tl.fromTo(
      this.qa('.lr-lsum, .lr-rsum'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.15',
    );
  }
}
