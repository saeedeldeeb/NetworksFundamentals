import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-c-syscalls',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .cs-wrap {
      margin: 1.5rem 0;
      background: linear-gradient(180deg, #0f1729 0%, #0a0e17 100%);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 1.75rem;
      overflow: hidden;
    }
    .cs-wrap svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="cs-wrap">
      <svg viewBox="0 0 720 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="cs-arrow" markerWidth="7" markerHeight="7"
                  refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
          </marker>
          <marker id="cs-arrow-hi" markerWidth="7" markerHeight="7"
                  refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>

        <!-- Title -->
        <text x="360" y="18" text-anchor="middle" fill="#475569" font-size="9.5"
              font-weight="700" font-family="Inter, sans-serif" letter-spacing="0.06em"
              opacity="0.6">TCP SERVER SYSCALL SEQUENCE</text>

        <!-- ===== STEP BOXES ===== -->
        <!-- 1. socket() -->
        <g class="cs-box cs-box-1" opacity="0">
          <rect x="12" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#22d3ee" stroke-width="1.5" />
          <text x="61" y="54" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">socket()</text>
          <text x="61" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Create socket fd</text>
        </g>

        <!-- 2. bind() -->
        <g class="cs-box cs-box-2" opacity="0">
          <rect x="126" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#f59e0b" stroke-width="1.5" />
          <text x="175" y="54" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">bind()</text>
          <text x="175" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Assign IP:Port</text>
        </g>

        <!-- 3. listen() -->
        <g class="cs-box cs-box-3" opacity="0">
          <rect x="240" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#6366f1" stroke-width="1.5" />
          <text x="289" y="54" text-anchor="middle" fill="#6366f1" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">listen()</text>
          <text x="289" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Enable queues</text>
        </g>

        <!-- 4. accept() -->
        <g class="cs-box cs-box-4" opacity="0">
          <rect x="354" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#10b981" stroke-width="1.5" />
          <text x="403" y="54" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">accept()</text>
          <text x="403" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Wait for client</text>
        </g>

        <!-- 5. send() / recv() -->
        <g class="cs-box cs-box-5" opacity="0">
          <rect x="468" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#ec4899" stroke-width="1.5" />
          <text x="517" y="54" text-anchor="middle" fill="#ec4899" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">send()</text>
          <text x="517" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Write data</text>
        </g>

        <!-- 6. close() -->
        <g class="cs-box cs-box-6" opacity="0">
          <rect x="582" y="30" width="98" height="58" rx="9"
                fill="#0c1222" stroke="#ef4444" stroke-width="1.5" />
          <text x="631" y="54" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700"
                font-family="'JetBrains Mono', monospace">close()</text>
          <text x="631" y="72" text-anchor="middle" fill="#475569" font-size="7.5"
                font-family="Inter, sans-serif">Release fd</text>
        </g>

        <!-- ===== ARROWS between boxes ===== -->
        <g class="cs-arrows" opacity="0">
          <line x1="110" y1="59" x2="126" y2="59" stroke="#334155" stroke-width="1.5"
                marker-end="url(#cs-arrow)" />
          <line x1="224" y1="59" x2="240" y2="59" stroke="#334155" stroke-width="1.5"
                marker-end="url(#cs-arrow)" />
          <line x1="338" y1="59" x2="354" y2="59" stroke="#334155" stroke-width="1.5"
                marker-end="url(#cs-arrow)" />
          <line x1="452" y1="59" x2="468" y2="59" stroke="#334155" stroke-width="1.5"
                marker-end="url(#cs-arrow)" />
          <line x1="566" y1="59" x2="582" y2="59" stroke="#334155" stroke-width="1.5"
                marker-end="url(#cs-arrow)" />
        </g>

        <!-- ===== HIGHLIGHT CURSOR ===== -->
        <rect class="cs-cursor" x="12" y="28" width="98" height="62" rx="10"
              fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0" />

        <!-- ===== FD LIFECYCLE ROW ===== -->
        <g class="cs-fd-row" opacity="0">
          <rect x="12" y="102" width="706" height="22" rx="6"
                fill="rgba(255,255,255,0.02)" stroke="#1e293b" stroke-width="1" />
          <!-- fd labels per step -->
          <text x="61"  y="117" text-anchor="middle" fill="#22d3ee" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">fd=3 born</text>
          <text x="175" y="117" text-anchor="middle" fill="#f59e0b" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">:8801 bound</text>
          <text x="289" y="117" text-anchor="middle" fill="#6366f1" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">backlog=5</text>
          <text x="403" y="117" text-anchor="middle" fill="#10b981" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">fd=4 (new!)</text>
          <text x="517" y="117" text-anchor="middle" fill="#ec4899" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">data sent</text>
          <text x="631" y="117" text-anchor="middle" fill="#ef4444" font-size="7.5"
                font-weight="700" font-family="'JetBrains Mono', monospace">released</text>
        </g>

        <!-- ===== DESCRIPTION PANELS (one per step) ===== -->
        <!-- 1: socket() -->
        <g class="cs-desc cs-desc-1" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(34, 211, 238, 0.04)" stroke="rgba(34, 211, 238, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">socket(AF_INET, SOCK_STREAM, 0)</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Creates a TCP socket file descriptor — just a number (e.g. 3).</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">AF_INET = IPv4   |   SOCK_STREAM = TCP (use SOCK_DGRAM for UDP)</text>
          <text x="360" y="223" text-anchor="middle" fill="#475569" font-size="8.5"
                font-family="'JetBrains Mono', monospace">int socket_fd = socket(AF_INET, SOCK_STREAM, 0);</text>
          <text x="360" y="242" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">Nothing is bound to an address yet — it's just a socket with no home.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">Check for &lt; 0 → creation failed (out of file descriptors, permissions, etc.)</text>
        </g>

        <!-- 2: bind() -->
        <g class="cs-desc cs-desc-2" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">bind(socket_fd, &amp;server_addr, sizeof(server_addr))</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Tells the kernel: "Deliver packets for this IP:Port to my socket."</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">server_addr holds: sin_family=AF_INET, sin_port=htons(8801), sin_addr=INADDR_ANY</text>
          <text x="360" y="223" text-anchor="middle" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">server_addr.sin_addr.s_addr = INADDR_ANY; // = 0.0.0.0</text>
          <text x="360" y="242" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">INADDR_ANY listens on all interfaces — prefer a specific IP in production.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">htons() converts port to network byte order (big-endian).</text>
        </g>

        <!-- 3: listen() -->
        <g class="cs-desc cs-desc-3" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(99, 102, 241, 0.04)" stroke="rgba(99, 102, 241, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#6366f1" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">listen(socket_fd, backlog)</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Enables the TCP handshake machinery. Creates SYN Queue and Accept Queue.</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">The backlog limits how many connections can wait in the Accept Queue.</text>
          <text x="360" y="223" text-anchor="middle" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">listen(socket_fd, 5); // max 5 pending in Accept Queue</text>
          <text x="360" y="242" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Too-small backlog = connections dropped under load. Increase for busy servers.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">UDP has no listen() — no queues, no handshake, no state.</text>
        </g>

        <!-- 4: accept() -->
        <g class="cs-desc cs-desc-4" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">new_socket = accept(socket_fd, &amp;client_addr, &amp;addr_len)</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Blocks until a connection is ready in the Accept Queue. Returns a NEW file descriptor.</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">socket_fd (fd=3) keeps listening. new_socket (fd=4) is this specific connection.</text>
          <text x="360" y="223" text-anchor="middle" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">// client_addr now contains: client IP + ephemeral port</text>
          <text x="360" y="242" text-anchor="middle" fill="#10b981" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">Critical: always use new_socket for send/recv — never socket_fd.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">This is the biggest difference from UDP — UDP has no accept() at all.</text>
        </g>

        <!-- 5: send() -->
        <g class="cs-desc cs-desc-5" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(236, 72, 153, 0.04)" stroke="rgba(236, 72, 153, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#ec4899" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">send(new_socket, buffer, strlen(buffer), 0)</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Writes data into the kernel's Send Queue. The kernel segments and transmits it.</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">recv() reads from the Receive Queue — blocks until data arrives.</text>
          <text x="360" y="223" text-anchor="middle" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">strcpy(buffer, "Hello!"); send(new_socket, buffer, strlen(buffer), 0);</text>
          <text x="360" y="242" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">In C, you manage the buffer yourself — copy data, specify length, track bytes sent.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">Node.js hides this: socket.write('Hello!') handles buffers internally.</text>
        </g>

        <!-- 6: close() -->
        <g class="cs-desc cs-desc-6" opacity="0">
          <rect x="12" y="138" width="696" height="144" rx="10"
                fill="rgba(239, 68, 68, 0.04)" stroke="rgba(239, 68, 68, 0.2)" stroke-width="1" />
          <text x="360" y="164" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700"
                font-family="Inter, sans-serif">close(new_socket) + close(socket_fd)</text>
          <text x="360" y="185" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">Triggers the TCP four-way handshake (FIN → ACK → FIN → ACK).</text>
          <text x="360" y="202" text-anchor="middle" fill="#94a3b8" font-size="9"
                font-family="Inter, sans-serif">close(new_socket) closes the connection. close(socket_fd) stops listening.</text>
          <text x="360" y="223" text-anchor="middle" fill="#64748b" font-size="8.5"
                font-family="'JetBrains Mono', monospace">close(new_socket); close(socket_fd);</text>
          <text x="360" y="242" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="600"
                font-family="Inter, sans-serif">In C, forgetting close() leaks file descriptors — a common source of bugs.</text>
          <text x="360" y="260" text-anchor="middle" fill="#475569" font-size="8"
                font-family="Inter, sans-serif">Production servers keep socket_fd open and loop accept() for new connections.</text>
        </g>
      </svg>
    </div>
  `,
})
export class CSyscallsComponent extends GsapAnimationBase {
  private readonly STEPS = [
    { box: '.cs-box-1', desc: '.cs-desc-1', cx: 61 },
    { box: '.cs-box-2', desc: '.cs-desc-2', cx: 175 },
    { box: '.cs-box-3', desc: '.cs-desc-3', cx: 289 },
    { box: '.cs-box-4', desc: '.cs-desc-4', cx: 403 },
    { box: '.cs-box-5', desc: '.cs-desc-5', cx: 517 },
    { box: '.cs-box-6', desc: '.cs-desc-6', cx: 631 },
  ];

  protected initAnimation(): void {
    const container = this.q('.cs-wrap');
    const tl = this.createScrollTimeline(container);

    // Boxes and arrows stagger in
    const boxes = this.STEPS.map(s => this.q(s.box));
    tl.fromTo(boxes, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 });
    tl.fromTo(this.q('.cs-arrows'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');
    tl.fromTo(this.q('.cs-fd-row'), { opacity: 0 }, { opacity: 1, duration: 0.3 });

    tl.add(() => this.startLoop());
  }

  private startLoop(): void {
    const container = this.q('.cs-wrap');
    const loop = this.createLoopingTimeline(container);
    const cursor = this.q('.cs-cursor');

    let t = 0;

    this.STEPS.forEach((step, i) => {
      const desc = this.q(step.desc);

      // Move cursor to this step
      loop.to(cursor, {
        attr: { x: step.cx - 49, opacity: 1 },
        opacity: 1,
        duration: i === 0 ? 0.2 : 0.35,
        ease: 'power2.inOut',
      }, t);

      // Fade in description
      loop.fromTo(desc, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25 }, t + 0.1);

      // Hold on this step
      t += 1.8;

      // Fade out description before moving to next
      loop.to(desc, { opacity: 0, duration: 0.2 }, t);
      t += 0.25;
    });

    // Fade cursor at end, then hold
    loop.to(cursor, { opacity: 0, duration: 0.3 }, t);
    loop.to({}, { duration: 0.8 });

    loop.play();
  }
}
