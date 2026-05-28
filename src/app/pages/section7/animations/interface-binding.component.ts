import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-interface-binding',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .ib-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .ib-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="ib-wrap">
      <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="ib-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
          <marker id="ib-arr-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ef4444"/>
          </marker>
        </defs>

        <!-- ===== LEFT PANEL: bind to 127.0.0.1 ===== -->
        <g class="ib-lbox" opacity="0">
          <rect x="8" y="8" width="348" height="344" rx="10"
                fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
        </g>

        <g class="ib-lhdr" opacity="0">
          <text x="22" y="30" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">SAFE — bind to 127.0.0.1 only</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">server.listen(8080, '127.0.0.1')</text>
        </g>

        <!-- Machine box (left) -->
        <g class="ib-lmachine" opacity="0">
          <rect x="98" y="70" width="170" height="218" rx="8"
                fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.4)" stroke-width="1.2"/>
          <text x="183" y="86" text-anchor="middle" fill="#94a3b8" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">YOUR MACHINE</text>

          <!-- interfaces (left) -->
          <rect x="112" y="96" width="142" height="30" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.45)" stroke-width="0.9"/>
          <text x="120" y="108" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">lo (loopback)</text>
          <text x="120" y="119" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">127.0.0.1</text>

          <rect x="112" y="132" width="142" height="30" rx="5"
                fill="rgba(148,163,184,0.05)" stroke="rgba(148,163,184,0.3)" stroke-width="0.9"/>
          <text x="120" y="144" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">eth0 (LAN)</text>
          <text x="120" y="155" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">192.168.1.10</text>

          <rect x="112" y="168" width="142" height="30" rx="5"
                fill="rgba(148,163,184,0.05)" stroke="rgba(148,163,184,0.3)" stroke-width="0.9"/>
          <text x="120" y="180" fill="#94a3b8" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">eth1 (public)</text>
          <text x="120" y="191" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">203.0.113.42</text>
        </g>

        <!-- Bind indicator (left) — only on loopback -->
        <g class="ib-lbind" opacity="0">
          <rect x="262" y="100" width="86" height="22" rx="5"
                fill="rgba(16,185,129,0.18)" stroke="#10b981" stroke-width="1.2"/>
          <text x="305" y="113" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER :8080</text>
        </g>

        <!-- Connection attempts (left) -->
        <g class="ib-lconn1" opacity="0">
          <line x1="30" y1="111" x2="108" y2="111" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#ib-arr-g)"/>
          <text x="68" y="106" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-weight="600" font-family="Inter, sans-serif">localhost client</text>
          <text x="282" y="220" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif" opacity="0" class="ib-lr1">&#10003; accepted</text>
        </g>

        <g class="ib-lconn2" opacity="0">
          <line x1="30" y1="147" x2="108" y2="147" stroke="#ef4444" stroke-width="1.5"
                stroke-dasharray="3,3" marker-end="url(#ib-arr-r)"/>
          <text x="68" y="142" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-weight="600" font-family="Inter, sans-serif">LAN client</text>
          <text x="282" y="232" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif" opacity="0" class="ib-lr2">&#215; refused</text>
        </g>

        <g class="ib-lconn3" opacity="0">
          <line x1="30" y1="183" x2="108" y2="183" stroke="#ef4444" stroke-width="1.5"
                stroke-dasharray="3,3" marker-end="url(#ib-arr-r)"/>
          <text x="68" y="178" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-weight="600" font-family="Inter, sans-serif">internet client</text>
          <text x="282" y="244" text-anchor="middle" fill="#ef4444" font-size="7"
                font-weight="700" font-family="Inter, sans-serif" opacity="0" class="ib-lr3">&#215; refused</text>
        </g>

        <!-- Result (left) -->
        <g class="ib-lresult" opacity="0">
          <rect x="22" y="296" width="320" height="48" rx="7"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.45)" stroke-width="1.2"/>
          <text x="182" y="316" text-anchor="middle" fill="#10b981" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">Reachable from this machine only</text>
          <text x="182" y="332" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">Other interfaces ignore the port entirely</text>
        </g>

        <!-- ===== RIGHT PANEL: bind to 0.0.0.0 ===== -->
        <g class="ib-rbox" opacity="0">
          <rect x="364" y="8" width="348" height="344" rx="10"
                fill="rgba(239,68,68,0.03)" stroke="rgba(239,68,68,0.35)" stroke-width="1.5"/>
        </g>

        <g class="ib-rhdr" opacity="0">
          <text x="378" y="30" fill="#ef4444" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">DANGEROUS — bind to 0.0.0.0</text>
          <text x="378" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">server.listen(8080, '0.0.0.0')</text>
        </g>

        <g class="ib-rmachine" opacity="0">
          <rect x="454" y="70" width="170" height="218" rx="8"
                fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.4)" stroke-width="1.2"/>
          <text x="539" y="86" text-anchor="middle" fill="#94a3b8" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">YOUR MACHINE</text>

          <rect x="468" y="96" width="142" height="30" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.45)" stroke-width="0.9"/>
          <text x="476" y="108" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">lo (loopback)</text>
          <text x="476" y="119" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">127.0.0.1</text>

          <rect x="468" y="132" width="142" height="30" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.45)" stroke-width="0.9"/>
          <text x="476" y="144" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">eth0 (LAN)</text>
          <text x="476" y="155" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">192.168.1.10</text>

          <rect x="468" y="168" width="142" height="30" rx="5"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.45)" stroke-width="0.9"/>
          <text x="476" y="180" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">eth1 (public)</text>
          <text x="476" y="191" fill="#94a3b8" font-size="6.8"
                font-family="Inter, sans-serif">203.0.113.42</text>
        </g>

        <!-- Bind indicators (right) — on ALL interfaces -->
        <g class="ib-rbind1" opacity="0">
          <rect x="618" y="100" width="86" height="22" rx="5"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.2"/>
          <text x="661" y="113" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER :8080</text>
        </g>
        <g class="ib-rbind2" opacity="0">
          <rect x="618" y="136" width="86" height="22" rx="5"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.2"/>
          <text x="661" y="149" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER :8080</text>
        </g>
        <g class="ib-rbind3" opacity="0">
          <rect x="618" y="172" width="86" height="22" rx="5"
                fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="1.2"/>
          <text x="661" y="185" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">SERVER :8080</text>
        </g>

        <!-- Connection attempts (right) -->
        <g class="ib-rconn1" opacity="0">
          <line x1="386" y1="111" x2="464" y2="111" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#ib-arr-g)"/>
          <text x="424" y="106" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-weight="600" font-family="Inter, sans-serif">localhost client</text>
        </g>

        <g class="ib-rconn2" opacity="0">
          <line x1="386" y1="147" x2="464" y2="147" stroke="#10b981" stroke-width="1.5"
                marker-end="url(#ib-arr-g)"/>
          <text x="424" y="142" text-anchor="middle" fill="#6ee7b7" font-size="6.5"
                font-weight="600" font-family="Inter, sans-serif">LAN client</text>
        </g>

        <g class="ib-rconn3" opacity="0">
          <line x1="386" y1="183" x2="464" y2="183" stroke="#ef4444" stroke-width="1.8"
                marker-end="url(#ib-arr-r)"/>
          <text x="424" y="178" text-anchor="middle" fill="#fca5a5" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">internet attacker</text>
        </g>

        <!-- Result (right) -->
        <g class="ib-rresult" opacity="0">
          <rect x="378" y="220" width="320" height="48" rx="7"
                fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.55)" stroke-width="1.2"/>
          <text x="538" y="240" text-anchor="middle" fill="#ef4444" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">Reachable from ANY interface — including the public one</text>
          <text x="538" y="256" text-anchor="middle" fill="#fca5a5" font-size="7"
                font-family="Inter, sans-serif">If you forgot a firewall, the whole internet can knock</text>
        </g>

        <g class="ib-rresult2" opacity="0">
          <rect x="378" y="296" width="320" height="48" rx="7"
                fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.5)" stroke-width="1.2"/>
          <text x="538" y="316" text-anchor="middle" fill="#fcd34d" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Real-world: exposed Elasticsearch / MongoDB on 0.0.0.0</text>
          <text x="538" y="332" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">→ thousands of unauthenticated public databases, scraped at scale</text>
        </g>
      </svg>
    </div>
  `,
})
export class InterfaceBindingComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.ib-wrap');
    const tl = this.createScrollTimeline(container);

    // LEFT panel — start
    tl.fromTo(this.q('.ib-lbox'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(this.q('.ib-lhdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.ib-lmachine'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.05');
    tl.fromTo(
      this.q('.ib-lbind'),
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', transformOrigin: 'center' },
      '+=0.05',
    );

    // RIGHT panel header + machine + binds (in parallel with left connections starting)
    tl.fromTo(this.q('.ib-rbox'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<');
    tl.fromTo(this.q('.ib-rhdr'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.35 }, '<');
    tl.fromTo(this.q('.ib-rmachine'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '<');
    tl.fromTo(
      this.qa('.ib-rbind1, .ib-rbind2, .ib-rbind3'),
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.12,
        ease: 'back.out(2)',
        transformOrigin: 'center',
      },
      '<',
    );

    // LEFT connections (sequential)
    tl.fromTo(this.q('.ib-lconn1'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '+=0.25');
    tl.fromTo(this.q('.ib-lr1'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.05');
    tl.fromTo(this.q('.ib-lconn2'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '+=0.15');
    tl.fromTo(this.q('.ib-lr2'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.05');
    tl.fromTo(this.q('.ib-lconn3'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '+=0.15');
    tl.fromTo(this.q('.ib-lr3'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.05');

    // RIGHT connections (in parallel with the previous block)
    tl.fromTo(this.q('.ib-rconn1'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '-=1.6');
    tl.fromTo(this.q('.ib-rconn2'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '+=0.15');
    tl.fromTo(this.q('.ib-rconn3'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35 }, '+=0.15');

    // Results
    tl.fromTo(this.q('.ib-lresult'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45 }, '+=0.2');
    tl.fromTo(this.q('.ib-rresult'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45 }, '<');
    tl.fromTo(this.q('.ib-rresult2'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45 }, '+=0.15');
  }
}
