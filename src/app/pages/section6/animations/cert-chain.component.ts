import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-cert-chain',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cc-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .cc-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="cc-wrap">
      <svg viewBox="0 0 680 512" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="cc-arr-d" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#475569"/>
          </marker>
          <marker id="cc-arr-pkt" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#22d3ee"/>
          </marker>
        </defs>

        <!-- ===== CLIENT + SERVER ===== -->
        <g class="cc-nodes" opacity="0">
          <rect x="8" y="8" width="100" height="34" rx="7"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="58" y="20" text-anchor="middle" fill="#22d3ee" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">BROWSER</text>
          <text x="58" y="34" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">+ OS Trust Store</text>

          <rect x="572" y="8" width="100" height="34" rx="7"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="622" y="26" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">SERVER</text>

          <line x1="58"  y1="42" x2="58"  y2="76" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="622" y1="42" x2="622" y2="76" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
        </g>

        <!-- ===== CERT BUNDLE PACKET ===== -->
        <g class="cc-packet" opacity="0">
          <rect class="cc-pkt-rect" x="572" y="50" width="110" height="22" rx="5"
                fill="rgba(99,102,241,0.8)" stroke="#6366f1" stroke-width="1"/>
          <text class="cc-pkt-text" x="627" y="65" text-anchor="middle" fill="white" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">cert bundle</text>
          <line x1="58" y1="61" x2="572" y2="61" stroke="rgba(34,211,238,0.2)"
                stroke-width="1" stroke-dasharray="4,3"/>
          <text x="340" y="56" text-anchor="middle" fill="#334155" font-size="7"
                font-family="Inter, sans-serif">TLS handshake — server sends certificate chain</text>
        </g>

        <!-- ===== LEAF CERT (y=84, h=104, bottom=188) ===== -->
        <g class="cc-leaf" opacity="0">
          <!-- header -->
          <rect x="58" y="84" width="564" height="104" rx="8"
                fill="rgba(34,211,238,0.05)" stroke="#22d3ee" stroke-width="1.5"/>
          <rect x="58" y="84" width="564" height="24" rx="8"
                fill="rgba(34,211,238,0.12)"/>
          <rect x="58" y="97" width="564" height="11" fill="rgba(34,211,238,0.12)"/>

          <text x="72" y="100" fill="#67e8f9" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.07em">① LEAF CERTIFICATE</text>
          <text x="500" y="100" fill="#22d3ee" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">step: check domain</text>

          <!-- fields -->
          <text x="72" y="122" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Subject</text>
          <text x="148" y="122" fill="#e2e8f0" font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">example.com</text>

          <text x="72" y="138" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">SAN</text>
          <text x="148" y="138" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace">example.com · *.example.com</text>

          <text x="72" y="154" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Issued by</text>
          <text x="148" y="154" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace">Let's Encrypt R3</text>

          <text x="72" y="170" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Signature</text>
          <rect x="148" y="161" width="120" height="12" rx="2" fill="rgba(34,211,238,0.15)"/>
          <text x="148" y="170" fill="#22d3ee" font-size="7" font-family="'JetBrains Mono', monospace">███████████████  (signed by R3 private key)</text>

          <!-- checkmark badge -->
          <g class="cc-check-1" opacity="0">
            <rect x="588" y="154" width="26" height="26" rx="6"
                  fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" stroke-width="1"/>
            <text x="601" y="171" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700"
                  font-family="Inter, sans-serif">✓</text>
          </g>
          <g class="cc-check-label-1" opacity="0">
            <text x="579" y="153" text-anchor="end" fill="#10b981" font-size="7" font-weight="600"
                  font-family="Inter, sans-serif">SAN matches</text>
          </g>
        </g>

        <!-- ===== CONNECTOR 1 (y=188→208) ===== -->
        <g class="cc-conn1" opacity="0">
          <line x1="340" y1="188" x2="340" y2="208" stroke="#475569" stroke-width="1.5"
                marker-end="url(#cc-arr-d)"/>
          <rect x="263" y="192" width="154" height="14" rx="4" fill="rgba(15,23,41,0.8)"/>
          <text x="340" y="203" text-anchor="middle" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">issued and signed by →</text>
        </g>

        <!-- ===== INTERMEDIATE CA (y=208, h=80, bottom=288) ===== -->
        <g class="cc-inter" opacity="0">
          <rect x="58" y="208" width="564" height="80" rx="8"
                fill="rgba(245,158,11,0.05)" stroke="#f59e0b" stroke-width="1.5"/>
          <rect x="58" y="208" width="564" height="24" rx="8"
                fill="rgba(245,158,11,0.12)"/>
          <rect x="58" y="221" width="564" height="11" fill="rgba(245,158,11,0.12)"/>

          <text x="72" y="224" fill="#fde68a" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.07em">② INTERMEDIATE CA</text>
          <text x="500" y="224" fill="#f59e0b" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">step: verify signature</text>

          <text x="72" y="246" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Subject</text>
          <text x="148" y="246" fill="#e2e8f0" font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">Let's Encrypt R3</text>

          <text x="72" y="262" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Issued by</text>
          <text x="148" y="262" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace">ISRG Root X1</text>

          <text x="72" y="278" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Signature</text>
          <rect x="148" y="269" width="100" height="12" rx="2" fill="rgba(245,158,11,0.15)"/>
          <text x="148" y="278" fill="#f59e0b" font-size="7" font-family="'JetBrains Mono', monospace">████████████  (signed by ISRG Root X1 private key)</text>

          <g class="cc-check-2" opacity="0">
            <rect x="588" y="262" width="26" height="26" rx="6"
                  fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" stroke-width="1"/>
            <text x="601" y="279" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700"
                  font-family="Inter, sans-serif">✓</text>
          </g>
          <g class="cc-check-label-2" opacity="0">
            <text x="579" y="261" text-anchor="end" fill="#10b981" font-size="7" font-weight="600"
                  font-family="Inter, sans-serif">signature valid</text>
          </g>
        </g>

        <!-- ===== CONNECTOR 2 (y=288→308) ===== -->
        <g class="cc-conn2" opacity="0">
          <line x1="340" y1="288" x2="340" y2="308" stroke="#475569" stroke-width="1.5"
                marker-end="url(#cc-arr-d)"/>
          <rect x="263" y="292" width="154" height="14" rx="4" fill="rgba(15,23,41,0.8)"/>
          <text x="340" y="303" text-anchor="middle" fill="#64748b" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">issued and signed by →</text>
        </g>

        <!-- ===== ROOT CA (y=308, h=80, bottom=388) ===== -->
        <g class="cc-root" opacity="0">
          <rect x="58" y="308" width="564" height="80" rx="8"
                fill="rgba(16,185,129,0.05)" stroke="#10b981" stroke-width="1.5"/>
          <rect x="58" y="308" width="564" height="24" rx="8"
                fill="rgba(16,185,129,0.12)"/>
          <rect x="58" y="321" width="564" height="11" fill="rgba(16,185,129,0.12)"/>

          <text x="72" y="324" fill="#6ee7b7" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.07em">③ ROOT CA</text>
          <text x="500" y="324" fill="#10b981" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">step: find in trust store</text>

          <text x="72" y="346" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Subject</text>
          <text x="148" y="346" fill="#e2e8f0" font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">ISRG Root X1  (Let's Encrypt)</text>

          <text x="72" y="362" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Issued by</text>
          <text x="148" y="362" fill="#10b981" font-size="8" font-weight="600" font-family="'JetBrains Mono', monospace">self-signed  (no issuer — top of chain)</text>

          <text x="72" y="378" fill="#64748b" font-size="7.5" font-weight="600" font-family="Inter, sans-serif">Signature</text>
          <text x="148" y="378" fill="#10b981" font-size="7" font-family="'JetBrains Mono', monospace">signed with own private key</text>

          <g class="cc-check-3" opacity="0">
            <rect x="588" y="346" width="26" height="26" rx="6"
                  fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" stroke-width="1"/>
            <text x="601" y="363" text-anchor="middle" fill="#10b981" font-size="13" font-weight="700"
                  font-family="Inter, sans-serif">✓</text>
          </g>
        </g>

        <!-- ===== TRUST STORE (y=404, h=60, bottom=464) ===== -->
        <g class="cc-trust" opacity="0">
          <line x1="340" y1="388" x2="340" y2="406" stroke="#6366f1" stroke-width="1.5"
                marker-end="url(#cc-arr-d)" stroke-dasharray="3,2"/>
          <rect x="58" y="406" width="564" height="58" rx="8"
                fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>

          <text x="72" y="424" fill="#818cf8" font-size="8.5" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.07em">④ OS / BROWSER TRUST STORE</text>

          <text x="72" y="440" fill="#64748b" font-size="8" font-family="Inter, sans-serif">Contains ~150 pre-installed root CAs trusted worldwide</text>
          <text x="72" y="454" fill="#64748b" font-size="8" font-family="Inter, sans-serif">macOS Keychain · Windows certmgr · Linux /etc/ssl/certs · Firefox (own store)</text>

          <g class="cc-trust-found" opacity="0">
            <text x="590" y="441" text-anchor="end" fill="#10b981" font-size="8" font-weight="700"
                  font-family="'JetBrains Mono', monospace">ISRG Root X1</text>
            <text x="590" y="455" text-anchor="end" fill="#10b981" font-size="8" font-weight="700"
                  font-family="Inter, sans-serif">FOUND ✓</text>
          </g>
        </g>

        <!-- ===== TRUSTED BANNER (y=474) ===== -->
        <g class="cc-result" opacity="0">
          <rect x="58" y="474" width="564" height="30" rx="8"
                fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" stroke-width="1.5"/>
          <text x="340" y="494" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.05em">
            🔒  Certificate chain verified — CONNECTION TRUSTED
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class CertChainComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.cc-wrap');
    const tl = this.createScrollTimeline(container);

    // Nodes appear
    tl.fromTo(this.q('.cc-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Packet travels from server to client
    const pktRect = this.q('.cc-pkt-rect');
    const pktText = this.q('.cc-pkt-text');
    tl.fromTo(this.q('.cc-packet'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, '+=0.1');
    tl.to([pktRect, pktText], { x: -514, duration: 1.0, ease: 'power2.inOut' });
    tl.to(this.q('.cc-packet'), { opacity: 0, duration: 0.2 });

    // LEAF cert slides in
    tl.fromTo(this.q('.cc-leaf'),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '+=0.05');
    // Check badge pops in
    tl.fromTo(this.q('.cc-check-1'),
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });
    tl.fromTo(this.q('.cc-check-label-1'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<');

    // Connector 1 draws
    tl.fromTo(this.q('.cc-conn1'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.1');

    // INTERMEDIATE cert slides in
    tl.fromTo(this.q('.cc-inter'),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '+=0.05');
    tl.fromTo(this.q('.cc-check-2'),
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });
    tl.fromTo(this.q('.cc-check-label-2'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<');

    // Connector 2 draws
    tl.fromTo(this.q('.cc-conn2'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.1');

    // ROOT CA slides in
    tl.fromTo(this.q('.cc-root'),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '+=0.05');
    tl.fromTo(this.q('.cc-check-3'),
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });

    // Trust store
    tl.fromTo(this.q('.cc-trust'),
      { opacity: 0 }, { opacity: 1, duration: 0.35 }, '+=0.1');
    tl.fromTo(this.q('.cc-trust-found'),
      { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.1');

    // TRUSTED banner
    tl.fromTo(this.q('.cc-result'),
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)' },
      '+=0.1',
    );
  }
}
