import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

// Concrete DH values (small primes, verifiable by hand):
//   G = 7, N = 23
//   Client private x = 3  → sends 7^3 mod 23 = 343 mod 23 = 21
//   Server private y = 6  → sends 7^6 mod 23 = 117649 mod 23 = 4
//   Shared key: 4^3 mod 23 = 64 mod 23 = 18  (client side)
//               21^6 mod 23 = 18              (server side) ✓

@Component({
  selector: 'app-dh-exchange',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .dh-ani-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .dh-ani-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="dh-ani-wrap">
      <svg viewBox="0 0 720 562" preserveAspectRatio="xMidYMid meet">

        <!-- ===== PUBLIC VALUES BAR ===== -->
        <g class="dh-public-bar" opacity="0">
          <rect x="200" y="10" width="320" height="36" rx="8"
                fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.35)" stroke-width="1.5"/>
          <text x="260" y="23" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif" letter-spacing="0.06em">PUBLIC (shared openly)</text>
          <text x="360" y="39" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700"
                font-family="'JetBrains Mono', monospace">G = 7 · N = 23</text>
        </g>

        <!-- ===== CLIENT BOX (y=58 → y=58+276=334) ===== -->
        <g class="dh-client-box" opacity="0">
          <rect x="12" y="58" width="222" height="278" rx="10"
                fill="rgba(34,211,238,0.05)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="123" y="81" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.04em">CLIENT</text>
          <line x1="12" y1="90" x2="234" y2="90" stroke="rgba(34,211,238,0.2)" stroke-width="1"/>
        </g>

        <!-- CLIENT: private key -->
        <g class="dh-priv-c" opacity="0">
          <rect x="28" y="102" width="190" height="38" rx="6"
                fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.25)" stroke-width="1"/>
          <text x="42" y="115" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">PRIVATE (never shared)</text>
          <text x="123" y="133" text-anchor="middle" fill="#22d3ee" font-size="13" font-weight="700"
                font-family="'JetBrains Mono', monospace">x = 3</text>
        </g>

        <!-- CLIENT: computation -->
        <g class="dh-comp-c" opacity="0">
          <text x="28" y="160" fill="#64748b" font-size="7.5" font-family="Inter, sans-serif">Computes public value:</text>
          <text x="28" y="176" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">G^x mod N</text>
          <text x="28" y="192" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">= 7^3 mod 23 = 343 mod 23</text>
          <rect x="28" y="200" width="150" height="26" rx="5"
                fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
          <text x="103" y="217" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">= 21  (sends →)</text>
        </g>

        <!-- CLIENT: derived key -->
        <g class="dh-key-c" opacity="0">
          <line x1="12" y1="242" x2="234" y2="242" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="28" y="258" fill="#64748b" font-size="7.5" font-family="Inter, sans-serif">Received 4 from server:</text>
          <text x="28" y="274" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">4^x mod N = 4^3 mod 23</text>
          <rect x="28" y="282" width="162" height="30" rx="5"
                fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" stroke-width="1.5"/>
          <text x="109" y="301" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700"
                font-family="'JetBrains Mono', monospace">KEY = 18 ✓</text>
        </g>

        <!-- ===== SERVER BOX (y=58 → y=334) ===== -->
        <g class="dh-server-box" opacity="0">
          <rect x="486" y="58" width="222" height="278" rx="10"
                fill="rgba(167,139,250,0.05)" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="597" y="81" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.04em">SERVER</text>
          <line x1="486" y1="90" x2="708" y2="90" stroke="rgba(167,139,250,0.2)" stroke-width="1"/>
        </g>

        <!-- SERVER: private key -->
        <g class="dh-priv-s" opacity="0">
          <rect x="502" y="102" width="190" height="38" rx="6"
                fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.25)" stroke-width="1"/>
          <text x="516" y="115" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">PRIVATE (never shared)</text>
          <text x="597" y="133" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="700"
                font-family="'JetBrains Mono', monospace">y = 6</text>
        </g>

        <!-- SERVER: computation -->
        <g class="dh-comp-s" opacity="0">
          <text x="502" y="160" fill="#64748b" font-size="7.5" font-family="Inter, sans-serif">Computes public value:</text>
          <text x="502" y="176" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">G^y mod N</text>
          <text x="502" y="192" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">= 7^6 mod 23 = 117649 mod 23</text>
          <rect x="502" y="200" width="150" height="26" rx="5"
                fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
          <text x="577" y="217" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">= 4  (← sends)</text>
        </g>

        <!-- SERVER: derived key -->
        <g class="dh-key-s" opacity="0">
          <line x1="486" y1="242" x2="708" y2="242" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="502" y="258" fill="#64748b" font-size="7.5" font-family="Inter, sans-serif">Received 21 from client:</text>
          <text x="502" y="274" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">21^y mod N = 21^6 mod 23</text>
          <rect x="502" y="282" width="162" height="30" rx="5"
                fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" stroke-width="1.5"/>
          <text x="583" y="301" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700"
                font-family="'JetBrains Mono', monospace">KEY = 18 ✓</text>
        </g>

        <!-- ===== TRAVELING PACKET: 21 (client→server), starts at x=234 ===== -->
        <g class="dh-pkt-21" opacity="0">
          <rect x="234" y="200" width="52" height="26" rx="6"
                fill="rgba(34,211,238,0.9)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="260" y="217" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800"
                font-family="'JetBrains Mono', monospace">21</text>
        </g>

        <!-- ===== TRAVELING PACKET: 4 (server→client), starts at x=434 ===== -->
        <g class="dh-pkt-4" opacity="0">
          <rect x="434" y="230" width="36" height="26" rx="6"
                fill="rgba(167,139,250,0.9)" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="452" y="247" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800"
                font-family="'JetBrains Mono', monospace">4</text>
        </g>

        <!-- Exchange channel labels -->
        <g class="dh-channel" opacity="0">
          <text x="360" y="188" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">public channel — visible to everyone</text>
          <line x1="234" y1="213" x2="486" y2="213" stroke="rgba(34,211,238,0.2)" stroke-width="1" stroke-dasharray="4,3"/>
          <line x1="486" y1="243" x2="234" y2="243" stroke="rgba(167,139,250,0.2)" stroke-width="1" stroke-dasharray="4,3"/>
        </g>

        <!-- ===== KEY MATCH BANNER (y=348, below boxes that end at 336) ===== -->
        <g class="dh-match" opacity="0">
          <rect x="160" y="348" width="400" height="30" rx="8"
                fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" stroke-width="1.5"/>
          <text x="360" y="367" text-anchor="middle" fill="#10b981" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.03em">
            Both computed KEY = 18 — same secret, never transmitted ✓
          </text>
        </g>

        <!-- ===== ATTACKER BOX (y=392) ===== -->
        <g class="dh-attacker" opacity="0">
          <rect x="210" y="392" width="300" height="132" rx="10"
                fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.4)" stroke-width="1.5"
                stroke-dasharray="6,3"/>
          <text x="360" y="414" text-anchor="middle" fill="#f87171" font-size="10" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">ATTACKER</text>

          <text x="226" y="433" fill="#64748b" font-size="8" font-family="Inter, sans-serif">Intercepts:</text>
          <text x="300" y="433" fill="#94a3b8" font-size="8" font-weight="600"
                font-family="'JetBrains Mono', monospace">G^x = 21</text>
          <text x="380" y="433" fill="#64748b" font-size="8" font-family="Inter, sans-serif">and</text>
          <text x="405" y="433" fill="#94a3b8" font-size="8" font-weight="600"
                font-family="'JetBrains Mono', monospace">G^y = 4</text>

          <text x="226" y="451" fill="#64748b" font-size="8" font-family="Inter, sans-serif">Also knows:</text>
          <text x="300" y="451" fill="#94a3b8" font-size="8" font-weight="600"
                font-family="'JetBrains Mono', monospace">G = 7, N = 23</text>

          <text x="226" y="469" fill="#64748b" font-size="8" font-family="Inter, sans-serif">Needs:</text>
          <text x="276" y="469" fill="#f87171" font-size="8" font-weight="700"
                font-family="'JetBrains Mono', monospace">x or y (the private keys)</text>

          <rect x="226" y="477" width="268" height="24" rx="5"
                fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" stroke-width="1"/>
          <text x="360" y="493" text-anchor="middle" fill="#f87171" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif">Discrete Log Problem — computationally infeasible ✗</text>
        </g>

        <!-- Forward secrecy note -->
        <g class="dh-pfs" opacity="0">
          <rect x="12" y="536" width="696" height="20" rx="5"
                fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.2)" stroke-width="1"/>
          <text x="360" y="549" text-anchor="middle" fill="#818cf8" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">Perfect Forward Secrecy: next session uses fresh x₂, y₂ → different key — compromising one session never breaks another.</text>
        </g>
      </svg>
    </div>
  `,
})
export class DhExchangeComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.dh-ani-wrap');
    const tl = this.createScrollTimeline(container);

    // Structure appears
    tl.fromTo(this.q('.dh-public-bar'),
      { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35 });
    tl.fromTo(this.q('.dh-client-box'),
      { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.35 }, '-=0.1');
    tl.fromTo(this.q('.dh-server-box'),
      { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.35 }, '<');

    // Private keys revealed
    tl.fromTo(this.q('.dh-priv-c'),
      { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.15');
    tl.fromTo(this.q('.dh-priv-s'),
      { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<');

    // Computations appear
    tl.fromTo(this.q('.dh-comp-c'),
      { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
    tl.fromTo(this.q('.dh-comp-s'),
      { opacity: 0 }, { opacity: 1, duration: 0.4 }, '<');

    // Channel and packets travel
    tl.fromTo(this.q('.dh-channel'),
      { opacity: 0 }, { opacity: 1, duration: 0.2 }, '+=0.2');

    // Packet 21: rect starts at x=234 (client right edge), travels right to x=434 (server left - w=52)
    const pkt21 = this.q('.dh-pkt-21');
    tl.fromTo(pkt21, { opacity: 0 }, { opacity: 1, duration: 0.15 });
    tl.to(pkt21, { x: 200, duration: 0.9, ease: 'power2.inOut' }); // x offset +200 → lands at 434

    // Packet 4: rect starts at x=434 (server left - w=36), travels left to x=198 (client right - w=36)
    const pkt4 = this.q('.dh-pkt-4');
    tl.fromTo(pkt4, { opacity: 0 }, { opacity: 1, duration: 0.15 }, '-=0.7');
    tl.to(pkt4, { x: -200, duration: 0.9, ease: 'power2.inOut' }, '<');

    // Attacker appears after packets settle
    tl.fromTo(this.q('.dh-attacker'),
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.15');

    // Both derive same key
    tl.fromTo(this.q('.dh-key-c'),
      { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.2');
    tl.fromTo(this.q('.dh-key-s'),
      { opacity: 0 }, { opacity: 1, duration: 0.35 }, '<');

    // Match banner
    tl.fromTo(this.q('.dh-match'),
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
      '+=0.1',
    );

    // PFS note
    tl.fromTo(this.q('.dh-pfs'),
      { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.1');
  }
}
