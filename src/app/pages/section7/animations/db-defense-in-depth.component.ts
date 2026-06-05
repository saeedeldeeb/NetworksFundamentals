import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-db-defense-in-depth',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .dd-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .dd-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="dd-wrap">
      <svg viewBox="0 0 720 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="dd-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
          <marker id="dd-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f59e0b"/>
          </marker>
          <marker id="dd-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- Title -->
        <g class="dd-title" opacity="0">
          <text x="360" y="24" text-anchor="middle" fill="#e5e7eb" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">DEFENSE IN DEPTH &mdash; Two walls before the password prompt</text>
        </g>

        <!-- Column headers -->
        <g class="dd-cols" opacity="0">
          <text x="80" y="48" text-anchor="middle" fill="#94a3b8" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">ATTACKER</text>
          <text x="245" y="48" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">WALL 1 &mdash; listen_addresses</text>
          <text x="245" y="60" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">does Postgres even bind here?</text>
          <text x="465" y="48" text-anchor="middle" fill="#a78bfa" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">WALL 2 &mdash; pg_hba.conf</text>
          <text x="465" y="60" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-family="Inter, sans-serif">is your IP allowed?</text>
          <text x="640" y="48" text-anchor="middle" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">DB &middot; password</text>
        </g>

        <!-- WALL 1 - vertical bar -->
        <g class="dd-wall1" opacity="0">
          <rect x="208" y="72" width="74" height="328" rx="6"
                fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.55)" stroke-width="1.4"/>
        </g>

        <!-- WALL 2 - vertical bar -->
        <g class="dd-wall2" opacity="0">
          <rect x="428" y="72" width="74" height="328" rx="6"
                fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.55)" stroke-width="1.4"/>
        </g>

        <!-- DB at far right -->
        <g class="dd-db" opacity="0">
          <rect x="592" y="170" width="96" height="100" rx="9"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.55)" stroke-width="1.4"/>
          <text x="640" y="194" text-anchor="middle" fill="#22d3ee" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">PostgreSQL</text>
          <text x="640" y="210" text-anchor="middle" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">port 5432</text>
          <rect x="606" y="222" width="68" height="36" rx="5"
                fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.35)" stroke-width="0.8"/>
          <text x="640" y="236" text-anchor="middle" fill="#94a3b8" font-size="6.5"
                font-family="Inter, sans-serif">password:</text>
          <text x="640" y="250" text-anchor="middle" fill="#fcd34d" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">&#9608;&#9608;&#9608;&#9608;&#9608;</text>
        </g>

        <!-- ===== ATTACKER 1: random internet IP, hits wall 1 ===== -->
        <g class="dd-a1box" opacity="0">
          <rect x="22" y="88" width="116" height="60" rx="7"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="80" y="106" text-anchor="middle" fill="#fca5a5" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">SCANNER (1)</text>
          <text x="80" y="120" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">203.0.113.7</text>
          <text x="80" y="132" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">scans 0.0.0.0/0</text>
          <text x="80" y="144" text-anchor="middle" fill="#fca5a5" font-size="6.6"
                font-family="Inter, sans-serif">: port 5432</text>
        </g>
        <g class="dd-a1arr" opacity="0">
          <line x1="138" y1="118" x2="206" y2="118" stroke="#ef4444" stroke-width="1.6"
                marker-end="url(#dd-arr-r)"/>
        </g>
        <g class="dd-a1block" opacity="0">
          <circle cx="245" cy="118" r="14" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.6"/>
          <line x1="238" y1="111" x2="252" y2="125" stroke="#ef4444" stroke-width="2.2"/>
          <line x1="252" y1="111" x2="238" y2="125" stroke="#ef4444" stroke-width="2.2"/>
        </g>
        <g class="dd-a1verdict" opacity="0">
          <text x="365" y="100" text-anchor="middle" fill="#ef4444" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">listen_addresses = 'localhost'</text>
          <text x="365" y="114" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">Postgres isn't bound to the public NIC.</text>
          <text x="365" y="126" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">Kernel returns TCP RST &mdash; port closed.</text>
          <text x="365" y="142" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#10003; blocked at WALL 1</text>
        </g>

        <!-- ===== ATTACKER 2: passed wall 1 (listen='*'), hits wall 2 ===== -->
        <g class="dd-a2box" opacity="0">
          <rect x="22" y="200" width="116" height="60" rx="7"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="80" y="218" text-anchor="middle" fill="#fca5a5" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">SCANNER (2)</text>
          <text x="80" y="232" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">198.51.100.9</text>
          <text x="80" y="244" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">listen='*' on prod</text>
          <text x="80" y="256" text-anchor="middle" fill="#fca5a5" font-size="6.6"
                font-family="Inter, sans-serif">SYN reaches DB host</text>
        </g>
        <g class="dd-a2arr1" opacity="0">
          <line x1="138" y1="230" x2="206" y2="230" stroke="#f59e0b" stroke-width="1.6"
                marker-end="url(#dd-arr-o)"/>
          <text x="172" y="224" text-anchor="middle" fill="#f59e0b" font-size="6.3"
                font-weight="700" font-family="Inter, sans-serif">SYN</text>
        </g>
        <g class="dd-a2pass1" opacity="0">
          <circle cx="245" cy="230" r="12" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.4"/>
          <text x="245" y="234" text-anchor="middle" fill="#fcd34d" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">~</text>
        </g>
        <g class="dd-a2arr2" opacity="0">
          <line x1="284" y1="230" x2="426" y2="230" stroke="#f59e0b" stroke-width="1.6"
                marker-end="url(#dd-arr-o)"/>
          <text x="355" y="224" text-anchor="middle" fill="#f59e0b" font-size="6.3"
                font-weight="700" font-family="Inter, sans-serif">TCP handshake OK &mdash; conn open</text>
        </g>
        <g class="dd-a2block" opacity="0">
          <circle cx="465" cy="230" r="14" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.6"/>
          <line x1="458" y1="223" x2="472" y2="237" stroke="#ef4444" stroke-width="2.2"/>
          <line x1="472" y1="223" x2="458" y2="237" stroke="#ef4444" stroke-width="2.2"/>
        </g>
        <g class="dd-a2verdict" opacity="0">
          <text x="572" y="270" text-anchor="end" fill="#ef4444" font-size="7.5"
                font-weight="700" font-family="Inter, sans-serif">no pg_hba match for caller</text>
          <text x="572" y="284" text-anchor="end" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">Postgres &rarr; "FATAL: no entry"</text>
          <text x="572" y="298" text-anchor="end" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#10003; blocked at WALL 2</text>
        </g>

        <!-- ===== ATTACKER 3: allowed IP, reaches password prompt ===== -->
        <g class="dd-a3box" opacity="0">
          <rect x="22" y="332" width="116" height="60" rx="7"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.55)" stroke-width="1.2"/>
          <text x="80" y="350" text-anchor="middle" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">APP SERVER</text>
          <text x="80" y="364" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">10.0.0.5</text>
          <text x="80" y="376" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">in 10.0.0.0/24</text>
          <text x="80" y="388" text-anchor="middle" fill="#6ee7b7" font-size="6.6"
                font-weight="700" font-family="Inter, sans-serif">on the allowlist</text>
        </g>
        <g class="dd-a3arr1" opacity="0">
          <line x1="138" y1="362" x2="206" y2="362" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#dd-arr-g)"/>
        </g>
        <g class="dd-a3pass1" opacity="0">
          <circle cx="245" cy="362" r="12" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.4"/>
          <text x="245" y="366" text-anchor="middle" fill="#6ee7b7" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">&#10003;</text>
        </g>
        <g class="dd-a3arr2" opacity="0">
          <line x1="284" y1="362" x2="426" y2="362" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#dd-arr-g)"/>
        </g>
        <g class="dd-a3pass2" opacity="0">
          <circle cx="465" cy="362" r="12" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.4"/>
          <text x="465" y="366" text-anchor="middle" fill="#6ee7b7" font-size="9"
                font-weight="700" font-family="Inter, sans-serif">&#10003;</text>
        </g>
        <g class="dd-a3arr3" opacity="0">
          <polyline points="504,362 590,362 590,272" fill="none" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#dd-arr-g)"/>
        </g>
        <g class="dd-a3verdict" opacity="0">
          <text x="544" y="404" text-anchor="middle" fill="#fcd34d" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">&#9888; password is now the only thing left</text>
        </g>

        <!-- Footer -->
        <g class="dd-foot" opacity="0">
          <text x="360" y="426" text-anchor="middle" fill="#94a3b8" font-size="7.5"
                font-style="italic" font-family="Inter, sans-serif">Goal: stop attackers at WALL 1 or WALL 2 &mdash; never let them reach step 3.</text>
        </g>
      </svg>
    </div>
  `,
})
export class DbDefenseInDepthComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.dd-wrap');
    const tl = this.createScrollTimeline(container);

    // Title + column headers
    tl.fromTo(this.q('.dd-title'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 });
    tl.fromTo(this.q('.dd-cols'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.05');

    // Walls + DB
    tl.fromTo(
      this.qa('.dd-wall1, .dd-wall2, .dd-db'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        transformOrigin: 'center',
      },
      '+=0.1',
    );

    // === Attacker 1: blocked at wall 1 ===
    tl.fromTo(
      this.q('.dd-a1box'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4 },
      '+=0.25',
    );
    tl.fromTo(
      this.q('.dd-a1arr'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.dd-a1block'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a1verdict'),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.1',
    );

    // === Attacker 2: passes wall 1, blocked at wall 2 ===
    tl.fromTo(
      this.q('.dd-a2box'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4 },
      '+=0.3',
    );
    tl.fromTo(
      this.q('.dd-a2arr1'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.dd-a2pass1'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a2arr2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.4 },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a2block'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a2verdict'),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.1',
    );

    // === Attacker 3: passes both ===
    tl.fromTo(
      this.q('.dd-a3box'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4 },
      '+=0.3',
    );
    tl.fromTo(
      this.q('.dd-a3arr1'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.1',
    );
    tl.fromTo(
      this.q('.dd-a3pass1'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a3arr2'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.35 },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a3pass2'),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a3arr3'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '+=0.05',
    );
    tl.fromTo(
      this.q('.dd-a3verdict'),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.1',
    );

    // Footer
    tl.fromTo(
      this.q('.dd-foot'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '+=0.2',
    );
  }
}
