import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-tls-handshake',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .th-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .th-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="th-wrap">
      <svg viewBox="0 0 720 390" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="th-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#22d3ee" />
          </marker>
          <marker id="th-arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#10b981" />
          </marker>
          <marker id="th-arr-p" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#a78bfa" />
          </marker>
        </defs>

        <!-- ===== PANEL HEADERS ===== -->
        <g class="th-headers" opacity="0">
          <!-- TLS 1.2 header -->
          <rect x="8" y="8" width="340" height="24" rx="6"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1"/>
          <text x="178" y="24" text-anchor="middle" fill="#f87171" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.08em">TLS 1.2 — 2 ROUND TRIPS</text>

          <!-- TLS 1.3 header -->
          <rect x="372" y="8" width="340" height="24" rx="6"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="542" y="24" text-anchor="middle" fill="#34d399" font-size="9" font-weight="700"
                font-family="Inter, sans-serif" letter-spacing="0.08em">TLS 1.3 — 1 ROUND TRIP</text>

          <!-- Divider -->
          <line x1="360" y1="8" x2="360" y2="382" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6,4"/>
        </g>

        <!-- ===== TLS 1.2 — LEFT PANEL ===== -->
        <g class="th-12-nodes" opacity="0">
          <!-- CLIENT -->
          <rect x="8" y="40" width="72" height="30" rx="6"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="44" y="59" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">CLIENT</text>
          <!-- SERVER -->
          <rect x="276" y="40" width="72" height="30" rx="6"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="312" y="59" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">SERVER</text>
          <!-- axes -->
          <line x1="44"  y1="70" x2="44"  y2="342" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="312" y1="70" x2="312" y2="342" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
        </g>

        <!-- 12-msg-1: ClientHello C→S -->
        <g class="th-12-m1" opacity="0">
          <line x1="52" y1="96" x2="304" y2="96" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#th-arr-c)"/>
          <rect x="80" y="84" width="114" height="14" rx="3" fill="rgba(34,211,238,0.1)"/>
          <text x="137" y="95" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">ClientHello + cipher suites</text>
        </g>

        <!-- 12-msg-2: ServerHello+Cert+PubKey S→C -->
        <g class="th-12-m2" opacity="0">
          <line x1="304" y1="128" x2="54" y2="128" stroke="#a78bfa" stroke-width="1.5"
                marker-end="url(#th-arr-p)"/>
          <rect x="54" y="116" width="162" height="14" rx="3" fill="rgba(167,139,250,0.1)"/>
          <text x="135" y="127" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">ServerHello + Certificate + PubKey</text>
        </g>

        <!-- RTT 1 bracket -->
        <g class="th-12-rtt1" opacity="0">
          <line x1="334" y1="90" x2="334" y2="136" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="330" y1="90"  x2="338" y2="90"  stroke="#64748b" stroke-width="1"/>
          <line x1="330" y1="136" x2="338" y2="136" stroke="#64748b" stroke-width="1"/>
          <text x="346" y="117" fill="#64748b" font-size="7" font-weight="600"
                font-family="Inter, sans-serif">RTT 1</text>
        </g>

        <!-- 12-msg-3: Encrypted Pre-Master C→S -->
        <g class="th-12-m3" opacity="0">
          <line x1="52" y1="162" x2="304" y2="162" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#th-arr-c)"/>
          <rect x="66" y="150" width="152" height="14" rx="3" fill="rgba(34,211,238,0.1)"/>
          <text x="142" y="161" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">Encrypted Pre-Master Secret</text>
        </g>

        <!-- 12-msg-4: Finished S→C -->
        <g class="th-12-m4" opacity="0">
          <line x1="304" y1="193" x2="54" y2="193" stroke="#a78bfa" stroke-width="1.5"
                marker-end="url(#th-arr-p)"/>
          <rect x="128" y="181" width="58" height="14" rx="3" fill="rgba(167,139,250,0.1)"/>
          <text x="157" y="192" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">Finished</text>
        </g>

        <!-- RTT 2 bracket -->
        <g class="th-12-rtt2" opacity="0">
          <line x1="334" y1="156" x2="334" y2="200" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="330" y1="156" x2="338" y2="156" stroke="#64748b" stroke-width="1"/>
          <line x1="330" y1="200" x2="338" y2="200" stroke="#64748b" stroke-width="1"/>
          <text x="346" y="182" fill="#64748b" font-size="7" font-weight="600"
                font-family="Inter, sans-serif">RTT 2</text>
        </g>

        <!-- 12-msg-5: Data C→S -->
        <g class="th-12-m5" opacity="0">
          <line x1="52" y1="232" x2="304" y2="232" stroke="#10b981" stroke-width="2"
                marker-end="url(#th-arr-g)"/>
          <rect x="78" y="220" width="132" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="144" y="231" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">Encrypted Application Data</text>
        </g>

        <!-- 12 cost label -->
        <g class="th-12-cost" opacity="0">
          <rect x="44" y="252" width="268" height="18" rx="5"
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.25)" stroke-width="1"/>
          <text x="178" y="265" text-anchor="middle" fill="#f87171" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">2 RTT before first data byte — slower start</text>
        </g>

        <!-- ===== TLS 1.3 — RIGHT PANEL ===== -->
        <g class="th-13-nodes" opacity="0">
          <!-- CLIENT -->
          <rect x="372" y="40" width="72" height="30" rx="6"
                fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="408" y="59" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">CLIENT</text>
          <!-- SERVER -->
          <rect x="640" y="40" width="72" height="30" rx="6"
                fill="rgba(99,102,241,0.08)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="676" y="59" text-anchor="middle" fill="#818cf8" font-size="9" font-weight="700"
                font-family="Inter, sans-serif">SERVER</text>
          <!-- axes -->
          <line x1="408" y1="70" x2="408" y2="342" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="676" y1="70" x2="676" y2="342" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,3"/>
        </g>

        <!-- 13-msg-1: ClientHello + Key Share C→S -->
        <g class="th-13-m1" opacity="0">
          <line x1="416" y1="96" x2="668" y2="96" stroke="#22d3ee" stroke-width="1.5"
                marker-end="url(#th-arr-c)"/>
          <rect x="420" y="84" width="168" height="14" rx="3" fill="rgba(34,211,238,0.1)"/>
          <text x="504" y="95" text-anchor="middle" fill="#22d3ee" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">ClientHello + Key Share (G^x)</text>
        </g>

        <!-- 13-msg-2: ServerHello + Key Share + Cert S→C -->
        <g class="th-13-m2" opacity="0">
          <line x1="668" y1="128" x2="418" y2="128" stroke="#a78bfa" stroke-width="1.5"
                marker-end="url(#th-arr-p)"/>
          <rect x="418" y="116" width="192" height="14" rx="3" fill="rgba(167,139,250,0.1)"/>
          <text x="514" y="127" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">ServerHello + Key Share (G^y) + Cert</text>
        </g>

        <!-- RTT 1 bracket (only one!) -->
        <g class="th-13-rtt1" opacity="0">
          <line x1="698" y1="90" x2="698" y2="136" stroke="#10b981" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="694" y1="90"  x2="702" y2="90"  stroke="#10b981" stroke-width="1"/>
          <line x1="694" y1="136" x2="702" y2="136" stroke="#10b981" stroke-width="1"/>
          <text x="706" y="117" fill="#10b981" font-size="7" font-weight="600"
                font-family="Inter, sans-serif">RTT 1</text>
        </g>

        <!-- "Both derive symmetric key now" note -->
        <g class="th-13-key" opacity="0">
          <rect x="408" y="146" width="268" height="14" rx="3"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" stroke-width="1"/>
          <text x="542" y="157" text-anchor="middle" fill="#34d399" font-size="7.5" font-weight="600"
                font-family="Inter, sans-serif">both compute G^(xy) — symmetric key established</text>
        </g>

        <!-- 13-msg-3: Data C→S immediately -->
        <g class="th-13-m3" opacity="0">
          <line x1="416" y1="175" x2="668" y2="175" stroke="#10b981" stroke-width="2"
                marker-end="url(#th-arr-g)"/>
          <rect x="420" y="163" width="132" height="14" rx="3" fill="rgba(16,185,129,0.12)"/>
          <text x="486" y="174" text-anchor="middle" fill="#10b981" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">Encrypted Application Data</text>
        </g>

        <!-- 13 cost label -->
        <g class="th-13-cost" opacity="0">
          <rect x="408" y="195" width="268" height="18" rx="5"
                fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.25)" stroke-width="1"/>
          <text x="542" y="208" text-anchor="middle" fill="#34d399" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">1 RTT before first data byte — faster start</text>
        </g>

        <!-- ===== COMPARISON BAR ===== -->
        <g class="th-comparison" opacity="0">
          <rect x="8" y="290" width="704" height="88" rx="8"
                fill="rgba(15,23,41,0.6)" stroke="#1e293b" stroke-width="1"/>

          <!-- TLS 1.2 row -->
          <text x="24" y="312" fill="#94a3b8" font-size="8.5" font-weight="600"
                font-family="Inter, sans-serif">TLS 1.2</text>
          <rect x="90" y="302" width="100" height="14" rx="3" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.4)" stroke-width="1"/>
          <text x="140" y="313" text-anchor="middle" fill="#f87171" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">TCP + 2 TLS RTTs</text>
          <text x="200" y="312" fill="#475569" font-size="8" font-family="Inter, sans-serif"> = 3 RTTs total · RSA key exchange · optional forward secrecy</text>

          <!-- TLS 1.3 row -->
          <text x="24" y="334" fill="#94a3b8" font-size="8.5" font-weight="600"
                font-family="Inter, sans-serif">TLS 1.3</text>
          <rect x="90" y="324" width="76" height="14" rx="3" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
          <text x="128" y="335" text-anchor="middle" fill="#34d399" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">TCP + 1 TLS RTT</text>
          <text x="176" y="334" fill="#475569" font-size="8" font-family="Inter, sans-serif"> = 2 RTTs total · DH only · mandatory forward secrecy</text>

          <!-- 0-RTT row -->
          <text x="24" y="356" fill="#94a3b8" font-size="8.5" font-weight="600"
                font-family="Inter, sans-serif">TLS 1.3 (0-RTT)</text>
          <rect x="90" y="346" width="58" height="14" rx="3" fill="rgba(167,139,250,0.2)" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
          <text x="119" y="357" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-weight="700"
                font-family="'JetBrains Mono', monospace">TCP + 0 TLS</text>
          <text x="158" y="356" fill="#475569" font-size="8" font-family="Inter, sans-serif"> = 1 RTT total · pre-shared key · replay-attack risk</text>
        </g>
      </svg>
    </div>
  `,
})
export class TlsHandshakeComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.th-wrap');
    const tl = this.createScrollTimeline(container);

    // Headers + divider
    tl.fromTo(this.q('.th-headers'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Both node pairs appear together
    tl.fromTo(this.q('.th-12-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '-=0.05');
    tl.fromTo(this.q('.th-13-nodes'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, '<');

    // TLS 1.2 messages step through; TLS 1.3 mirrors at same pace
    const pairs: [string, string | null][] = [
      ['.th-12-m1', '.th-13-m1'],
      ['.th-12-m2', '.th-13-m2'],
      ['.th-12-rtt1', '.th-13-rtt1'],
      ['.th-12-m3', '.th-13-key'],
      ['.th-12-m4', '.th-13-m3'],
      ['.th-12-rtt2', '.th-13-cost'],
      ['.th-12-m5', null],
      ['.th-12-cost', null],
    ];

    pairs.forEach(([left, right]) => {
      tl.fromTo(this.q(left),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        '>-0.05',
      );
      if (right) {
        tl.fromTo(this.q(right),
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' },
          '<',
        );
      }
    });

    tl.fromTo(this.q('.th-comparison'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
  }
}
