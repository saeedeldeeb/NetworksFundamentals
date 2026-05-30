import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-reverse-proxy-jobs',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .rj-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .rj-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="rj-wrap">
      <svg viewBox="0 0 720 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="rj-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="rj-arr-v" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
          <marker id="rj-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="rj-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
        </defs>

        <!-- ===== JOB 1: LOAD BALANCING ===== -->
        <g class="rj-j1box" opacity="0">
          <rect x="8" y="8" width="704" height="148" rx="10"
                fill="rgba(34,211,238,0.03)" stroke="rgba(34,211,238,0.3)" stroke-width="1.5"/>
        </g>
        <g class="rj-j1hdr" opacity="0">
          <text x="22" y="30" fill="#22d3ee" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">JOB 1 — LOAD BALANCING</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Fan one client request out to many identical backends</text>
        </g>

        <g class="rj-j1client" opacity="0">
          <rect x="36" y="68" width="88" height="68" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="80" y="92" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="80" y="108" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">sees:</text>
          <text x="80" y="120" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">nginx only</text>
        </g>

        <g class="rj-j1lb" opacity="0">
          <rect x="230" y="68" width="100" height="68" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="280" y="92" text-anchor="middle" fill="#f59e0b" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">nginx</text>
          <text x="280" y="106" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">round-robin /</text>
          <text x="280" y="118" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">least-conn</text>
          <text x="280" y="130" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">load balancer</text>
        </g>

        <!-- Client → LB -->
        <g class="rj-j1in" opacity="0">
          <line x1="124" y1="102" x2="228" y2="102" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#rj-arr-c)"/>
          <text x="176" y="96" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">GET /api</text>
        </g>

        <!-- 3 backends -->
        <g class="rj-j1b1" opacity="0">
          <rect x="446" y="70" width="160" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="526" y="84" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Backend 1 (10.0.0.11)</text>
        </g>
        <g class="rj-j1b2" opacity="0">
          <rect x="446" y="98" width="160" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="526" y="112" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Backend 2 (10.0.0.12)</text>
        </g>
        <g class="rj-j1b3" opacity="0">
          <rect x="446" y="126" width="160" height="22" rx="5"
                fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.55)" stroke-width="1"/>
          <text x="526" y="140" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Backend 3 (10.0.0.13)</text>
        </g>

        <!-- LB → backends (3 arrows fanning out) -->
        <g class="rj-j1f1" opacity="0">
          <line x1="332" y1="98" x2="444" y2="81" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#rj-arr-v)"/>
        </g>
        <g class="rj-j1f2" opacity="0">
          <line x1="332" y1="102" x2="444" y2="109" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#rj-arr-v)"/>
        </g>
        <g class="rj-j1f3" opacity="0">
          <line x1="332" y1="106" x2="444" y2="137" stroke="#a78bfa" stroke-width="1.4"
                marker-end="url(#rj-arr-v)"/>
        </g>

        <!-- ===== JOB 2: API GATEWAY ===== -->
        <g class="rj-j2box" opacity="0">
          <rect x="8" y="164" width="704" height="158" rx="10"
                fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.3)" stroke-width="1.5"/>
        </g>
        <g class="rj-j2hdr" opacity="0">
          <text x="22" y="186" fill="#a78bfa" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">JOB 2 — API GATEWAY (path-based routing)</text>
          <text x="22" y="200" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">One public hostname &#8594; many independent services, each behind its own URL prefix</text>
        </g>

        <g class="rj-j2client" opacity="0">
          <rect x="36" y="220" width="88" height="76" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="80" y="240" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="80" y="256" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">GET /posts/123</text>
          <text x="80" y="268" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">GET /users/me</text>
          <text x="80" y="280" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">GET /analytics</text>
        </g>

        <g class="rj-j2gw" opacity="0">
          <rect x="230" y="220" width="100" height="76" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="280" y="240" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">API GATEWAY</text>
          <text x="280" y="256" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">reads path,</text>
          <text x="280" y="268" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">routes by prefix</text>
          <text x="280" y="285" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">L7 — needs to read HTTP</text>
        </g>

        <g class="rj-j2in" opacity="0">
          <line x1="124" y1="258" x2="228" y2="258" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#rj-arr-c)"/>
        </g>

        <!-- 3 services -->
        <g class="rj-j2s1" opacity="0">
          <rect x="426" y="218" width="200" height="22" rx="5"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1"/>
          <text x="526" y="232" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Posts Service</text>
        </g>
        <g class="rj-j2s2" opacity="0">
          <rect x="426" y="248" width="200" height="22" rx="5"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1"/>
          <text x="526" y="262" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Users Service</text>
        </g>
        <g class="rj-j2s3" opacity="0">
          <rect x="426" y="278" width="200" height="22" rx="5"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" stroke-width="1"/>
          <text x="526" y="292" text-anchor="middle" fill="#6ee7b7" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">Analytics Service</text>
        </g>

        <g class="rj-j2r1" opacity="0">
          <line x1="332" y1="240" x2="424" y2="229" stroke="#10b981" stroke-width="1.4"
                marker-end="url(#rj-arr-g)"/>
          <text x="378" y="222" text-anchor="middle" fill="#10b981" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">/posts/* &#8594;</text>
        </g>
        <g class="rj-j2r2" opacity="0">
          <line x1="332" y1="258" x2="424" y2="259" stroke="#10b981" stroke-width="1.4"
                marker-end="url(#rj-arr-g)"/>
          <text x="378" y="253" text-anchor="middle" fill="#10b981" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">/users/* &#8594;</text>
        </g>
        <g class="rj-j2r3" opacity="0">
          <line x1="332" y1="276" x2="424" y2="289" stroke="#10b981" stroke-width="1.4"
                marker-end="url(#rj-arr-g)"/>
          <text x="378" y="304" text-anchor="middle" fill="#10b981" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">/analytics/* &#8594;</text>
        </g>

        <!-- ===== JOB 3: TLS TERMINATION ===== -->
        <g class="rj-j3box" opacity="0">
          <rect x="8" y="330" width="704" height="140" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
        </g>
        <g class="rj-j3hdr" opacity="0">
          <text x="22" y="352" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">JOB 3 — TLS TERMINATION</text>
          <text x="22" y="366" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Decrypt once at the edge — backends speak plain HTTP and save CPU</text>
        </g>

        <g class="rj-j3client" opacity="0">
          <rect x="36" y="388" width="88" height="60" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="80" y="408" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="80" y="424" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">https://</text>
          <text x="80" y="436" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">site.com</text>
        </g>

        <g class="rj-j3edge" opacity="0">
          <rect x="276" y="388" width="120" height="60" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="336" y="408" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">REVERSE PROXY</text>
          <text x="336" y="424" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">holds the TLS cert</text>
          <text x="336" y="438" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">decrypts here</text>
        </g>

        <g class="rj-j3back" opacity="0">
          <rect x="548" y="388" width="120" height="60" rx="7"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="608" y="408" text-anchor="middle" fill="#a78bfa" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">BACKEND</text>
          <text x="608" y="424" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">plain HTTP</text>
          <text x="608" y="438" text-anchor="middle" fill="#6ee7b7" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">no TLS cost</text>
        </g>

        <!-- Encrypted leg -->
        <g class="rj-j3leg1" opacity="0">
          <line x1="124" y1="418" x2="274" y2="418" stroke="#10b981" stroke-width="2.2"
                marker-end="url(#rj-arr-g)"/>
          <text x="200" y="412" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">TLS 1.3 encrypted</text>
          <text x="200" y="436" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">handshake + crypto here</text>
        </g>

        <!-- Plain leg -->
        <g class="rj-j3leg2" opacity="0">
          <line x1="396" y1="418" x2="546" y2="418" stroke="#94a3b8" stroke-width="1.4"
                stroke-dasharray="4,3" marker-end="url(#rj-arr-c)"/>
          <text x="471" y="412" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">plain HTTP</text>
          <text x="471" y="436" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">internal trusted network</text>
        </g>
      </svg>
    </div>
  `,
})
export class ReverseProxyJobsComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.rj-wrap');
    const tl = this.createScrollTimeline(container);

    // JOB 1
    tl.fromTo(this.q('.rj-j1box'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.rj-j1hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.rj-j1client, .rj-j1lb'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(this.q('.rj-j1in'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 }, '+=0.05');
    tl.fromTo(
      this.qa('.rj-j1b1, .rj-j1b2, .rj-j1b3'),
      { opacity: 0, x: 6 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 },
      '+=0.05',
    );
    tl.fromTo(
      this.qa('.rj-j1f1, .rj-j1f2, .rj-j1f3'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3, stagger: 0.1 },
      '-=0.3',
    );

    // JOB 2
    tl.fromTo(this.q('.rj-j2box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.3');
    tl.fromTo(this.q('.rj-j2hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.rj-j2client, .rj-j2gw'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(this.q('.rj-j2in'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 }, '+=0.05');
    tl.fromTo(
      this.qa('.rj-j2s1, .rj-j2s2, .rj-j2s3'),
      { opacity: 0, x: 6 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 },
      '+=0.05',
    );
    tl.fromTo(
      this.qa('.rj-j2r1, .rj-j2r2, .rj-j2r3'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3, stagger: 0.1 },
      '-=0.3',
    );

    // JOB 3
    tl.fromTo(this.q('.rj-j3box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.3');
    tl.fromTo(this.q('.rj-j3hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(
      this.qa('.rj-j3client, .rj-j3edge, .rj-j3back'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(this.q('.rj-j3leg1'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.45 }, '+=0.1');
    tl.fromTo(this.q('.rj-j3leg2'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.45 }, '+=0.1');
  }
}
