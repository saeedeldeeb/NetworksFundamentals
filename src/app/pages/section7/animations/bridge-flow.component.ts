import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-bridge-flow',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .bf-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .bf-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="bf-wrap">
      <svg viewBox="0 0 720 308" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="bf-arr-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#f97316"/>
          </marker>
          <marker id="bf-arr-i" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#6366f1"/>
          </marker>
        </defs>

        <!-- ===== LEFT PANEL: Foundations ===== -->
        <text class="bf-found-label" x="102" y="17" text-anchor="middle" fill="#64748b"
              font-size="7.5" font-weight="700" font-family="Inter, sans-serif"
              letter-spacing="0.1em" opacity="0">FOUNDATIONS (§1–6)</text>

        <g class="bf-card bf-card-1" opacity="0">
          <rect x="8" y="25" width="188" height="36" rx="6"
                fill="rgba(100,116,139,0.08)" stroke="#475569" stroke-width="1.2"/>
          <text x="24" y="39" fill="#64748b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">01</text>
          <text x="46" y="39" fill="#94a3b8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Introduction</text>
          <text x="46" y="53" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            What is networking?
          </text>
        </g>

        <g class="bf-card bf-card-2" opacity="0">
          <rect x="8" y="65" width="188" height="36" rx="6"
                fill="rgba(59,130,246,0.07)" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="24" y="79" fill="#3b82f6" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">02</text>
          <text x="46" y="79" fill="#93c5fd" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Fundamentals</text>
          <text x="46" y="93" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            OSI model, client-server
          </text>
        </g>

        <g class="bf-card bf-card-3" opacity="0">
          <rect x="8" y="105" width="188" height="36" rx="6"
                fill="rgba(167,139,250,0.07)" stroke="#a78bfa" stroke-width="1.2"/>
          <text x="24" y="119" fill="#a78bfa" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">03</text>
          <text x="46" y="119" fill="#c4b5fd" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Internet Protocol</text>
          <text x="46" y="133" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            IP, ICMP, ARP, routing
          </text>
        </g>

        <g class="bf-card bf-card-4" opacity="0">
          <rect x="8" y="145" width="188" height="36" rx="6"
                fill="rgba(245,158,11,0.07)" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="24" y="159" fill="#f59e0b" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">04</text>
          <text x="46" y="159" fill="#fcd34d" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">UDP</text>
          <text x="46" y="173" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            Datagram, connectionless
          </text>
        </g>

        <g class="bf-card bf-card-5" opacity="0">
          <rect x="8" y="185" width="188" height="36" rx="6"
                fill="rgba(34,211,238,0.07)" stroke="#22d3ee" stroke-width="1.2"/>
          <text x="24" y="199" fill="#22d3ee" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">05</text>
          <text x="46" y="199" fill="#67e8f9" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">TCP</text>
          <text x="46" y="213" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            Reliable, flow &amp; congestion control
          </text>
        </g>

        <g class="bf-card bf-card-6" opacity="0">
          <rect x="8" y="225" width="188" height="36" rx="6"
                fill="rgba(16,185,129,0.07)" stroke="#10b981" stroke-width="1.2"/>
          <text x="24" y="239" fill="#10b981" font-size="7" font-weight="700"
                font-family="'JetBrains Mono', monospace">06</text>
          <text x="46" y="239" fill="#6ee7b7" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Protocols</text>
          <text x="46" y="253" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            DNS, TLS, HTTPS
          </text>
        </g>

        <!-- ===== ARROW LEFT → CENTER ===== -->
        <line class="bf-arrow-left" x1="198" y1="143" x2="205" y2="143"
              stroke="#f97316" stroke-width="1.8" stroke-dasharray="4,3"
              marker-end="url(#bf-arr-o)" opacity="0"/>

        <!-- ===== CENTER PANEL: Section 7 Bridge ===== -->
        <g class="bf-center-box" opacity="0">
          <!-- Outer dashed border -->
          <rect x="208" y="8" width="304" height="256" rx="10"
                fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.45)" stroke-width="1.5"
                stroke-dasharray="6,4"/>
          <!-- Header fill (squared bottom corners via overlap) -->
          <rect x="209" y="9" width="302" height="32" rx="9"
                fill="rgba(249,115,22,0.12)"/>
          <rect x="209" y="31" width="302" height="10" fill="rgba(249,115,22,0.12)"/>
          <text x="360" y="22" text-anchor="middle" fill="#fb923c" font-size="8" font-weight="800"
                font-family="Inter, sans-serif" letter-spacing="0.1em">SECTION 7 — NETWORK PERFORMANCE</text>
          <text x="360" y="34" text-anchor="middle" fill="#97460a" font-size="7"
                font-family="Inter, sans-serif">Bridge: theory → practice</text>
        </g>

        <!-- Topic rows (animated separately for stagger) -->
        <g class="bf-topic bf-topic-1" opacity="0">
          <rect x="218" y="44" width="284" height="38" rx="6"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" stroke-width="1"/>
          <rect x="218" y="44" width="4" height="38" rx="2" fill="#f97316"/>
          <text x="232" y="58" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">Latency &amp; its components</text>
          <text x="232" y="72" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            Propagation · Transmission · Queueing delay
          </text>
        </g>

        <g class="bf-topic bf-topic-2" opacity="0">
          <rect x="218" y="88" width="284" height="38" rx="6"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" stroke-width="1"/>
          <rect x="218" y="88" width="4" height="38" rx="2" fill="#f97316"/>
          <text x="232" y="102" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">MTU / MSS / PMTUD</text>
          <text x="232" y="116" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            Frame sizes · Path discovery · Fragmentation
          </text>
        </g>

        <g class="bf-topic bf-topic-3" opacity="0">
          <rect x="218" y="132" width="284" height="38" rx="6"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" stroke-width="1"/>
          <rect x="218" y="132" width="4" height="38" rx="2" fill="#f97316"/>
          <text x="232" y="146" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">Nagle's Algorithm</text>
          <text x="232" y="160" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            Buffering · TCP_NODELAY · Delayed ACK interaction
          </text>
        </g>

        <g class="bf-topic bf-topic-4" opacity="0">
          <rect x="218" y="176" width="284" height="38" rx="6"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" stroke-width="1"/>
          <rect x="218" y="176" width="4" height="38" rx="2" fill="#f97316"/>
          <text x="232" y="190" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">Connection Management</text>
          <text x="232" y="204" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            Pooling · Keep-alive · Head-of-line blocking
          </text>
        </g>

        <g class="bf-topic bf-topic-5" opacity="0">
          <rect x="218" y="220" width="284" height="38" rx="6"
                fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" stroke-width="1"/>
          <rect x="218" y="220" width="4" height="38" rx="2" fill="#f97316"/>
          <text x="232" y="234" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">Backend &amp; Frontend Patterns</text>
          <text x="232" y="248" fill="#475569" font-size="6.5" font-family="Inter, sans-serif">
            APIs · DB connections · Efficient resource loading
          </text>
        </g>

        <!-- ===== ARROW CENTER → RIGHT ===== -->
        <line class="bf-arrow-right" x1="514" y1="143" x2="521" y2="143"
              stroke="#6366f1" stroke-width="1.8" stroke-dasharray="4,3"
              marker-end="url(#bf-arr-i)" opacity="0"/>

        <!-- ===== RIGHT PANEL: Applications ===== -->
        <text class="bf-app-label" x="618" y="17" text-anchor="middle" fill="#6366f1"
              font-size="7.5" font-weight="700" font-family="Inter, sans-serif"
              letter-spacing="0.1em" opacity="0">APPLICATIONS</text>

        <g class="bf-app bf-app-1" opacity="0">
          <rect x="524" y="25" width="188" height="36" rx="6"
                fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.2"/>
          <text x="540" y="40" fill="#818cf8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Web Servers</text>
          <text x="540" y="54" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            nginx, Caddy, node http
          </text>
        </g>

        <g class="bf-app bf-app-2" opacity="0">
          <rect x="524" y="65" width="188" height="36" rx="6"
                fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.2"/>
          <text x="540" y="80" fill="#818cf8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">REST &amp; gRPC APIs</text>
          <text x="540" y="94" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            Latency-aware endpoints
          </text>
        </g>

        <g class="bf-app bf-app-3" opacity="0">
          <rect x="524" y="105" width="188" height="36" rx="6"
                fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.2"/>
          <text x="540" y="120" fill="#818cf8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Databases</text>
          <text x="540" y="134" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            Connection pooling, socket tuning
          </text>
        </g>

        <g class="bf-app bf-app-4" opacity="0">
          <rect x="524" y="145" width="188" height="36" rx="6"
                fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.2"/>
          <text x="540" y="160" fill="#818cf8" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Microservices</text>
          <text x="540" y="174" fill="#334155" font-size="6.5" font-family="Inter, sans-serif">
            Service mesh, retries, timeouts
          </text>
        </g>

        <!-- ===== RESULT BANNER ===== -->
        <g class="bf-result" opacity="0">
          <rect x="8" y="272" width="704" height="30" rx="8"
                fill="rgba(249,115,22,0.07)" stroke="rgba(249,115,22,0.3)" stroke-width="1.5"/>
          <text x="360" y="284" text-anchor="middle" fill="#fb923c" font-size="8" font-weight="700"
                font-family="Inter, sans-serif">
            "It works" → "It works efficiently at scale"
          </text>
          <text x="360" y="296" text-anchor="middle" fill="#475569" font-size="7"
                font-family="Inter, sans-serif">
            Performance knowledge is what separates engineers who scale from engineers who struggle
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class BridgeFlowComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.bf-wrap');
    const tl = this.createScrollTimeline(container);

    // Foundations label
    tl.fromTo(this.q('.bf-found-label'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Six section cards staggered from left
    tl.fromTo(
      this.qa('.bf-card'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
      '-=0.1',
    );

    // Left arrow
    tl.fromTo(this.q('.bf-arrow-left'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '+=0.05');

    // Center bridge box
    tl.fromTo(
      this.q('.bf-center-box'),
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.15',
    );

    // Topic rows staggered
    tl.fromTo(
      this.qa('.bf-topic'),
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.28, stagger: 0.1, ease: 'power2.out' },
      '-=0.1',
    );

    // Right arrow
    tl.fromTo(this.q('.bf-arrow-right'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '+=0.05');

    // App label + cards staggered from right
    tl.fromTo(this.q('.bf-app-label'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.1');
    tl.fromTo(
      this.qa('.bf-app'),
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
      '-=0.15',
    );

    // Result banner
    tl.fromTo(
      this.q('.bf-result'),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      '+=0.1',
    );
  }
}
