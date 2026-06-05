import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-cidr-match',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cm-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .cm-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="cm-wrap">
      <svg viewBox="0 0 720 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="cm-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="cm-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
        </defs>

        <!-- ===== ROW 1: /32 — exact match ===== -->
        <g class="cm-r1box" opacity="0">
          <rect x="8" y="8" width="704" height="142" rx="10"
                fill="rgba(34,211,238,0.03)" stroke="rgba(34,211,238,0.3)" stroke-width="1.5"/>
        </g>
        <g class="cm-r1hdr" opacity="0">
          <text x="22" y="30" fill="#22d3ee" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">/32 &mdash; exact host match</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">rule:  <tspan fill="#94a3b8">host  all  all  192.168.254.42/32  md5</tspan></text>
        </g>

        <!-- Mask visualization: 4 octets, all 4 fixed -->
        <g class="cm-r1mask" opacity="0">
          <text x="22" y="64" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">mask:</text>
          <rect x="56" y="56" width="32" height="22" rx="3"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1.2"/>
          <text x="72" y="70" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">192</text>
          <rect x="90" y="56" width="32" height="22" rx="3"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1.2"/>
          <text x="106" y="70" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">168</text>
          <rect x="124" y="56" width="32" height="22" rx="3"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1.2"/>
          <text x="140" y="70" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">254</text>
          <rect x="158" y="56" width="32" height="22" rx="3"
                fill="rgba(34,211,238,0.18)" stroke="#22d3ee" stroke-width="1.2"/>
          <text x="174" y="70" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">42</text>
          <text x="200" y="70" fill="#6ee7b7" font-size="6.5" font-family="Inter, sans-serif">all 4 octets must match</text>
        </g>

        <!-- candidates -->
        <g class="cm-r1c1" opacity="0">
          <text x="320" y="100" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">192.168.254.42</tspan></text>
          <text x="554" y="100" fill="#10b981" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW</text>
        </g>
        <g class="cm-r1c2" opacity="0">
          <text x="320" y="116" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">192.168.254.43</tspan></text>
          <text x="554" y="116" fill="#ef4444" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#215; REJECT  <tspan fill="#fca5a5" font-weight="400">(last octet differs)</tspan></text>
        </g>
        <g class="cm-r1c3" opacity="0">
          <text x="320" y="132" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">10.0.0.5</tspan></text>
          <text x="554" y="132" fill="#ef4444" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#215; REJECT</text>
        </g>

        <!-- ===== ROW 2: /24 — subnet ===== -->
        <g class="cm-r2box" opacity="0">
          <rect x="8" y="160" width="704" height="142" rx="10"
                fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.3)" stroke-width="1.5"/>
        </g>
        <g class="cm-r2hdr" opacity="0">
          <text x="22" y="182" fill="#a78bfa" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">/24 &mdash; subnet match (256 hosts)</text>
          <text x="22" y="196" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">rule:  <tspan fill="#94a3b8">host  all  all  192.168.254.0/24  md5</tspan></text>
        </g>

        <!-- Mask: first 3 octets fixed, last is wildcard -->
        <g class="cm-r2mask" opacity="0">
          <text x="22" y="216" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">mask:</text>
          <rect x="56" y="208" width="32" height="22" rx="3"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1.2"/>
          <text x="72" y="222" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">192</text>
          <rect x="90" y="208" width="32" height="22" rx="3"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1.2"/>
          <text x="106" y="222" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">168</text>
          <rect x="124" y="208" width="32" height="22" rx="3"
                fill="rgba(167,139,250,0.18)" stroke="#a78bfa" stroke-width="1.2"/>
          <text x="140" y="222" text-anchor="middle" fill="#c4b5fd" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">254</text>
          <rect x="158" y="208" width="32" height="22" rx="3"
                fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2"
                stroke-dasharray="3,2"/>
          <text x="174" y="222" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">&lowast;</text>
          <text x="200" y="222" fill="#c4b5fd" font-size="6.5" font-family="Inter, sans-serif">first 24 bits fixed &middot; last octet free (0&ndash;255)</text>
        </g>

        <!-- candidates -->
        <g class="cm-r2c1" opacity="0">
          <text x="320" y="252" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">192.168.254.42</tspan></text>
          <text x="554" y="252" fill="#10b981" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW</text>
        </g>
        <g class="cm-r2c2" opacity="0">
          <text x="320" y="268" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">192.168.254.43</tspan></text>
          <text x="554" y="268" fill="#10b981" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW  <tspan fill="#6ee7b7" font-weight="400">(same /24)</tspan></text>
        </g>
        <g class="cm-r2c3" opacity="0">
          <text x="320" y="284" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">192.168.1.42</tspan></text>
          <text x="554" y="284" fill="#ef4444" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#215; REJECT  <tspan fill="#fca5a5" font-weight="400">(3rd octet differs)</tspan></text>
        </g>

        <!-- ===== ROW 3: /0 — DANGER ===== -->
        <g class="cm-r3box" opacity="0">
          <rect x="8" y="312" width="704" height="160" rx="10"
                fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.4)" stroke-width="1.5"/>
        </g>
        <g class="cm-r3hdr" opacity="0">
          <text x="22" y="334" fill="#ef4444" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">/0 &mdash; "everyone" (DO NOT DO THIS)</text>
          <text x="22" y="348" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">rule:  <tspan fill="#fca5a5">host  all  all  0.0.0.0/0  md5</tspan></text>
        </g>

        <!-- Mask: all 4 octets wildcard -->
        <g class="cm-r3mask" opacity="0">
          <text x="22" y="368" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">mask:</text>
          <rect x="56" y="360" width="32" height="22" rx="3"
                fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2" stroke-dasharray="3,2"/>
          <text x="72" y="374" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="700" font-family="Inter, sans-serif">&lowast;</text>
          <rect x="90" y="360" width="32" height="22" rx="3"
                fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2" stroke-dasharray="3,2"/>
          <text x="106" y="374" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="700" font-family="Inter, sans-serif">&lowast;</text>
          <rect x="124" y="360" width="32" height="22" rx="3"
                fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2" stroke-dasharray="3,2"/>
          <text x="140" y="374" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="700" font-family="Inter, sans-serif">&lowast;</text>
          <rect x="158" y="360" width="32" height="22" rx="3"
                fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2" stroke-dasharray="3,2"/>
          <text x="174" y="374" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="700" font-family="Inter, sans-serif">&lowast;</text>
          <text x="200" y="374" fill="#fca5a5" font-size="6.5" font-family="Inter, sans-serif">zero bits fixed &middot; literally any IPv4 address on the planet matches</text>
        </g>

        <!-- candidates: all allowed, including the scary one -->
        <g class="cm-r3c1" opacity="0">
          <text x="320" y="402" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">10.0.0.5</tspan>  <tspan fill="#94a3b8">(your app)</tspan></text>
          <text x="554" y="402" fill="#10b981" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW</text>
        </g>
        <g class="cm-r3c2" opacity="0">
          <text x="320" y="418" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">203.0.113.7</tspan>  <tspan fill="#94a3b8">(random internet)</tspan></text>
          <text x="554" y="418" fill="#ef4444" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW &mdash; uh oh</text>
        </g>
        <g class="cm-r3c3" opacity="0">
          <text x="320" y="434" fill="#94a3b8" font-size="7.5" font-family="Inter, sans-serif">incoming: <tspan fill="#e5e7eb" font-weight="700">198.51.100.99</tspan>  <tspan fill="#94a3b8">(bot scanner)</tspan></text>
          <text x="554" y="434" fill="#ef4444" font-size="7.5" font-weight="700" font-family="Inter, sans-serif">&#10003; ALLOW &mdash; uh oh</text>
        </g>

        <g class="cm-r3warn" opacity="0">
          <rect x="22" y="446" width="676" height="20" rx="5"
                fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="360" y="460" text-anchor="middle" fill="#fca5a5" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">&#9888; only the password stands between an open internet and your data &mdash; do not ship this</text>
        </g>
      </svg>
    </div>
  `,
})
export class CidrMatchComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cm-wrap');
    const tl = this.createScrollTimeline(container);

    // ROW 1
    tl.fromTo(this.q('.cm-r1box'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.cm-r1hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.cm-r1mask'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 }, '+=0.05');
    tl.fromTo(
      this.qa('.cm-r1c1, .cm-r1c2, .cm-r1c3'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.12 },
      '+=0.1',
    );

    // ROW 2
    tl.fromTo(this.q('.cm-r2box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.25');
    tl.fromTo(this.q('.cm-r2hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.cm-r2mask'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 }, '+=0.05');
    tl.fromTo(
      this.qa('.cm-r2c1, .cm-r2c2, .cm-r2c3'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.12 },
      '+=0.1',
    );

    // ROW 3
    tl.fromTo(this.q('.cm-r3box'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.25');
    tl.fromTo(this.q('.cm-r3hdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.cm-r3mask'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 }, '+=0.05');
    tl.fromTo(
      this.qa('.cm-r3c1, .cm-r3c2, .cm-r3c3'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.12 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.cm-r3warn'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)', transformOrigin: 'center' },
      '+=0.1',
    );
  }
}
