import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-proxy-vs-reverse',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .pr-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .pr-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="pr-wrap">
      <svg viewBox="0 0 720 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pr-arr-c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
          <marker id="pr-arr-v" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#a78bfa"/>
          </marker>
          <marker id="pr-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#10b981"/>
          </marker>
        </defs>

        <!-- ============ LEFT: FORWARD PROXY ============ -->
        <g class="pr-lbox" opacity="0">
          <rect x="8" y="8" width="348" height="424" rx="10"
                fill="rgba(34,211,238,0.03)" stroke="rgba(34,211,238,0.3)" stroke-width="1.5"/>
        </g>
        <g class="pr-lhdr" opacity="0">
          <text x="22" y="30" fill="#22d3ee" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">FORWARD PROXY</text>
          <text x="22" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Client knows destination · server doesn't know client</text>
        </g>

        <!-- Three actors arranged left-to-right -->
        <!-- Client at x center 64 -->
        <g class="pr-lc" opacity="0">
          <rect x="22" y="62" width="84" height="46" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="64" y="80" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="64" y="92" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">1.2.3.4</text>
          <text x="64" y="103" text-anchor="middle" fill="#10b981" font-size="6.4"
                font-weight="700" font-family="Inter, sans-serif">knows: google</text>
        </g>

        <!-- Proxy at x center 182 -->
        <g class="pr-lp" opacity="0">
          <rect x="140" y="62" width="84" height="46" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="182" y="80" text-anchor="middle" fill="#f59e0b" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">PROXY</text>
          <text x="182" y="92" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">10.0.0.5</text>
          <text x="182" y="103" text-anchor="middle" fill="#fcd34d" font-size="6.4"
                font-weight="700" font-family="Inter, sans-serif">acts on behalf</text>
        </g>

        <!-- Server at x center 300 -->
        <g class="pr-ls" opacity="0">
          <rect x="258" y="62" width="84" height="46" rx="7"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="300" y="80" text-anchor="middle" fill="#a78bfa" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">google.com</text>
          <text x="300" y="92" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">142.250.x.x</text>
          <text x="300" y="103" text-anchor="middle" fill="#ef4444" font-size="6.4"
                font-weight="700" font-family="Inter, sans-serif">sees: 10.0.0.5</text>
        </g>

        <!-- TCP-1 and TCP-2 connection labels (each is one TCP between two adjacent actors) -->
        <g class="pr-ltcp" opacity="0">
          <text x="123" y="55" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">— TCP 1 —</text>
          <text x="241" y="55" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">— TCP 2 —</text>
        </g>

        <!-- Vertical lifelines descending from each actor -->
        <g class="pr-llifeline" opacity="0">
          <line x1="64" y1="108" x2="64" y2="262" stroke="#22d3ee" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
          <line x1="182" y1="108" x2="182" y2="262" stroke="#f59e0b" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
          <line x1="300" y1="108" x2="300" y2="262" stroke="#a78bfa" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
        </g>

        <!-- Sequence — STEP 1: client → proxy (request leg 1) -->
        <g class="pr-lstep1" opacity="0">
          <line x1="66" y1="138" x2="178" y2="138" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#pr-arr-c)"/>
          <circle cx="60" cy="138" r="7.5" fill="#22d3ee"/>
          <text x="60" y="141" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">1</text>
          <text x="122" y="132" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">GET google.com</text>
        </g>

        <!-- STEP 2: proxy → server (request leg 2 — proxy is the SENDER now) -->
        <g class="pr-lstep2" opacity="0">
          <line x1="184" y1="168" x2="296" y2="168" stroke="#a78bfa" stroke-width="1.6"
                marker-end="url(#pr-arr-v)"/>
          <circle cx="178" cy="168" r="7.5" fill="#a78bfa"/>
          <text x="178" y="171" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">2</text>
          <text x="240" y="162" text-anchor="middle" fill="#a78bfa" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">GET /  (src: 10.0.0.5)</text>
        </g>

        <!-- STEP 3: server → proxy (response leg 1) -->
        <g class="pr-lstep3" opacity="0">
          <line x1="296" y1="200" x2="184" y2="200" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#pr-arr-g)"/>
          <circle cx="302" cy="200" r="7.5" fill="#10b981"/>
          <text x="302" y="203" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">3</text>
          <text x="240" y="194" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">200 OK</text>
        </g>

        <!-- STEP 4: proxy → client (response leg 2 — relayed) -->
        <g class="pr-lstep4" opacity="0">
          <line x1="178" y1="232" x2="66" y2="232" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#pr-arr-g)"/>
          <circle cx="184" cy="232" r="7.5" fill="#10b981"/>
          <text x="184" y="235" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">4</text>
          <text x="122" y="226" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">200 OK (relayed)</text>
        </g>

        <!-- Identity callouts -->
        <g class="pr-lnote1" opacity="0">
          <rect x="22" y="276" width="320" height="34" rx="6"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
          <text x="182" y="292" text-anchor="middle" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">CLIENT knows: "I want google.com"</text>
          <text x="182" y="305" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">configured the proxy itself · willing participant</text>
        </g>
        <g class="pr-lnote2" opacity="0">
          <rect x="22" y="320" width="320" height="34" rx="6"
                fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <text x="182" y="336" text-anchor="middle" fill="#fca5a5" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">SERVER sees: proxy's IP — not the client's</text>
          <text x="182" y="349" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">client identity is hidden behind the proxy</text>
        </g>
        <g class="pr-luse" opacity="0">
          <rect x="22" y="380" width="320" height="40" rx="6"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.45)" stroke-width="1"/>
          <text x="182" y="396" text-anchor="middle" fill="#fcd34d" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Used for</text>
          <text x="182" y="410" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">anonymity · corporate caching · content filtering · debugging</text>
        </g>

        <!-- ============ RIGHT: REVERSE PROXY ============ -->
        <g class="pr-rbox" opacity="0">
          <rect x="364" y="8" width="348" height="424" rx="10"
                fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.35)" stroke-width="1.5"/>
        </g>
        <g class="pr-rhdr" opacity="0">
          <text x="378" y="30" fill="#a78bfa" font-size="10" font-weight="700"
                font-family="Inter, sans-serif">REVERSE PROXY</text>
          <text x="378" y="44" fill="#64748b" font-size="7.5"
                font-family="Inter, sans-serif">Client doesn't know the real destination · server knows the client</text>
        </g>

        <!-- Client at x center 420 -->
        <g class="pr-rc" opacity="0">
          <rect x="378" y="62" width="84" height="46" rx="7"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.5)" stroke-width="1.2"/>
          <text x="420" y="80" text-anchor="middle" fill="#22d3ee" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">CLIENT</text>
          <text x="420" y="92" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">1.2.3.4</text>
          <text x="420" y="103" text-anchor="middle" fill="#ef4444" font-size="6.4"
                font-weight="700" font-family="Inter, sans-serif">thinks: google</text>
        </g>

        <!-- Reverse proxy at x center 538 -->
        <g class="pr-rp" opacity="0">
          <rect x="496" y="62" width="84" height="46" rx="7"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.55)" stroke-width="1.2"/>
          <text x="538" y="79" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">REVERSE</text>
          <text x="538" y="89" text-anchor="middle" fill="#f59e0b" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">PROXY</text>
          <text x="538" y="101" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">google.com</text>
        </g>

        <!-- Backend at x center 656 -->
        <g class="pr-rs" opacity="0">
          <rect x="614" y="62" width="84" height="46" rx="7"
                fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <text x="656" y="80" text-anchor="middle" fill="#a78bfa" font-size="8.5"
                font-weight="700" font-family="Inter, sans-serif">BACKEND</text>
          <text x="656" y="92" text-anchor="middle" fill="#94a3b8" font-size="6.6"
                font-family="Inter, sans-serif">10.20.5.8</text>
          <text x="656" y="103" text-anchor="middle" fill="#10b981" font-size="6.4"
                font-weight="700" font-family="Inter, sans-serif">sees: 1.2.3.4</text>
        </g>

        <g class="pr-rtcp" opacity="0">
          <text x="479" y="55" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">— TCP 1 —</text>
          <text x="597" y="55" text-anchor="middle" fill="#64748b" font-size="6.5"
                font-weight="700" font-family="Inter, sans-serif">— TCP 2 —</text>
        </g>

        <!-- Vertical lifelines -->
        <g class="pr-rlifeline" opacity="0">
          <line x1="420" y1="108" x2="420" y2="262" stroke="#22d3ee" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
          <line x1="538" y1="108" x2="538" y2="262" stroke="#f59e0b" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
          <line x1="656" y1="108" x2="656" y2="262" stroke="#a78bfa" stroke-width="1"
                stroke-dasharray="3,3" opacity="0.4"/>
        </g>

        <!-- STEP 1: client → reverse proxy -->
        <g class="pr-rstep1" opacity="0">
          <line x1="422" y1="138" x2="534" y2="138" stroke="#22d3ee" stroke-width="1.6"
                marker-end="url(#pr-arr-c)"/>
          <circle cx="416" cy="138" r="7.5" fill="#22d3ee"/>
          <text x="416" y="141" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">1</text>
          <text x="478" y="132" text-anchor="middle" fill="#22d3ee" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">GET /</text>
        </g>

        <!-- STEP 2: reverse proxy → backend (carries X-Forwarded-For) -->
        <g class="pr-rstep2" opacity="0">
          <line x1="540" y1="168" x2="652" y2="168" stroke="#a78bfa" stroke-width="1.6"
                marker-end="url(#pr-arr-v)"/>
          <circle cx="534" cy="168" r="7.5" fill="#a78bfa"/>
          <text x="534" y="171" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">2</text>
          <text x="596" y="162" text-anchor="middle" fill="#a78bfa" font-size="6.7"
                font-weight="700" font-family="Inter, sans-serif">GET / + X-Forwarded-For: 1.2.3.4</text>
        </g>

        <!-- STEP 3: backend → reverse proxy -->
        <g class="pr-rstep3" opacity="0">
          <line x1="652" y1="200" x2="540" y2="200" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#pr-arr-g)"/>
          <circle cx="658" cy="200" r="7.5" fill="#10b981"/>
          <text x="658" y="203" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">3</text>
          <text x="596" y="194" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">200 OK</text>
        </g>

        <!-- STEP 4: reverse proxy → client -->
        <g class="pr-rstep4" opacity="0">
          <line x1="534" y1="232" x2="422" y2="232" stroke="#10b981" stroke-width="1.6"
                marker-end="url(#pr-arr-g)"/>
          <circle cx="540" cy="232" r="7.5" fill="#10b981"/>
          <text x="540" y="235" text-anchor="middle" fill="#0a0e17" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">4</text>
          <text x="478" y="226" text-anchor="middle" fill="#10b981" font-size="7"
                font-weight="700" font-family="Inter, sans-serif">200 OK (relayed)</text>
        </g>

        <g class="pr-rnote1" opacity="0">
          <rect x="378" y="276" width="320" height="34" rx="6"
                fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
          <text x="538" y="292" text-anchor="middle" fill="#22d3ee" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">CLIENT thinks: "google.com is my destination"</text>
          <text x="538" y="305" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">never knows a real backend even exists</text>
        </g>
        <g class="pr-rnote2" opacity="0">
          <rect x="378" y="320" width="320" height="34" rx="6"
                fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
          <text x="538" y="336" text-anchor="middle" fill="#6ee7b7" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">BACKEND knows client (via X-Forwarded-For)</text>
          <text x="538" y="349" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">backend identity is hidden from the public</text>
        </g>
        <g class="pr-ruse" opacity="0">
          <rect x="378" y="380" width="320" height="40" rx="6"
                fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.45)" stroke-width="1"/>
          <text x="538" y="396" text-anchor="middle" fill="#fcd34d" font-size="8"
                font-weight="700" font-family="Inter, sans-serif">Used for</text>
          <text x="538" y="410" text-anchor="middle" fill="#94a3b8" font-size="7"
                font-family="Inter, sans-serif">load balancing · CDN · API gateway · TLS termination</text>
        </g>
      </svg>
    </div>
  `,
})
export class ProxyVsReverseComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.pr-wrap');
    const tl = this.createScrollTimeline(container);

    // Boxes + headers
    tl.fromTo(this.qa('.pr-lbox, .pr-rbox'), { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(
      this.qa('.pr-lhdr, .pr-rhdr'),
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.35 },
      '-=0.15',
    );

    // Actors
    tl.fromTo(
      this.qa('.pr-lc, .pr-rc, .pr-lp, .pr-rp, .pr-ls, .pr-rs'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        transformOrigin: 'center',
      },
      '+=0.05',
    );

    // TCP labels + lifelines drop in together
    tl.fromTo(this.qa('.pr-ltcp, .pr-rtcp'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.1');
    tl.fromTo(
      this.qa('.pr-llifeline, .pr-rlifeline'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.15',
    );

    // Steps 1 → 4, paired across columns so they animate at the same vertical position
    const steps: [string, string][] = [
      ['.pr-lstep1', '.pr-rstep1'],
      ['.pr-lstep2', '.pr-rstep2'],
      ['.pr-lstep3', '.pr-rstep3'],
      ['.pr-lstep4', '.pr-rstep4'],
    ];

    steps.forEach(([l, r], i) => {
      tl.fromTo(
        this.qa(`${l}, ${r}`),
        { opacity: 0, x: i % 2 === 0 ? -10 : 10 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
        i === 0 ? '+=0.15' : '+=0.25',
      );
    });

    // Identity notes
    tl.fromTo(
      this.qa('.pr-lnote1, .pr-rnote1'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45 },
      '+=0.25',
    );
    tl.fromTo(
      this.qa('.pr-lnote2, .pr-rnote2'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45 },
      '+=0.1',
    );
    tl.fromTo(
      this.qa('.pr-luse, .pr-ruse'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45 },
      '+=0.15',
    );
  }
}
