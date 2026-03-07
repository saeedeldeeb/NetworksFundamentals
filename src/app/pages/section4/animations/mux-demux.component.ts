import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-mux-demux',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .mux-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .mux-anim svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="mux-anim">
      <svg viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
        <!-- Title -->
        <text x="350" y="28" text-anchor="middle" fill="#f1f5f9"
              font-size="14" font-weight="700" font-family="Inter, sans-serif"
              opacity="0.6">Multiplexing &amp; Demultiplexing</text>

        <!-- ===== SENDER SIDE (left) ===== -->
        <text class="mux-send-label" x="80" y="64" text-anchor="middle" fill="#94a3b8"
              font-size="11" font-family="Inter, sans-serif" opacity="0">Sending Host</text>

        <!-- App 1 -->
        <g class="mux-app mux-app1" opacity="0">
          <rect x="30" y="80" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#f59e0b" stroke-width="2" />
          <text x="80" y="102" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App A</text>
          <text x="80" y="120" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 5555</text>
        </g>

        <!-- App 2 -->
        <g class="mux-app mux-app2" opacity="0">
          <rect x="30" y="148" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#6366f1" stroke-width="2" />
          <text x="80" y="170" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App B</text>
          <text x="80" y="188" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 6666</text>
        </g>

        <!-- App 3 -->
        <g class="mux-app mux-app3" opacity="0">
          <rect x="30" y="216" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#22d3ee" stroke-width="2" />
          <text x="80" y="238" text-anchor="middle" fill="#22d3ee"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App C</text>
          <text x="80" y="256" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 7777</text>
        </g>

        <!-- MUX funnel -->
        <g class="mux-funnel" opacity="0">
          <path d="M180,80 L180,268 L240,200 L240,148 Z" fill="#1e293b" stroke="#374151" stroke-width="1.5" />
          <text x="205" y="180" text-anchor="middle" fill="#94a3b8" font-size="10"
                font-family="Inter, sans-serif" font-weight="600">MUX</text>
        </g>

        <!-- Network pipe -->
        <rect class="mux-pipe" x="240" y="158" width="220" height="42" rx="8"
              fill="#0f172a" stroke="#374151" stroke-width="1.5" opacity="0" />
        <text class="mux-pipe-label" x="350" y="183" text-anchor="middle" fill="#64748b"
              font-size="10" font-family="Inter, sans-serif" opacity="0">Single IP Connection</text>

        <!-- DEMUX funnel (mirrored) -->
        <g class="demux-funnel" opacity="0">
          <path d="M460,148 L460,200 L520,268 L520,80 Z" fill="#1e293b" stroke="#374151" stroke-width="1.5" />
          <text x="485" y="180" text-anchor="middle" fill="#94a3b8" font-size="10"
                font-family="Inter, sans-serif" font-weight="600">DEMUX</text>
        </g>

        <!-- ===== RECEIVER SIDE (right) ===== -->
        <text class="mux-recv-label" x="620" y="64" text-anchor="middle" fill="#94a3b8"
              font-size="11" font-family="Inter, sans-serif" opacity="0">Receiving Host</text>

        <!-- Dest App X -->
        <g class="mux-dest mux-dest1" opacity="0">
          <rect x="570" y="80" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#10b981" stroke-width="2" />
          <text x="620" y="102" text-anchor="middle" fill="#10b981"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App X</text>
          <text x="620" y="120" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 53</text>
        </g>

        <!-- Dest App Y -->
        <g class="mux-dest mux-dest2" opacity="0">
          <rect x="570" y="148" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#ec4899" stroke-width="2" />
          <text x="620" y="170" text-anchor="middle" fill="#ec4899"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App Y</text>
          <text x="620" y="188" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 68</text>
        </g>

        <!-- Dest App Z -->
        <g class="mux-dest mux-dest3" opacity="0">
          <rect x="570" y="216" width="100" height="52" rx="10" fill="#1f2937"
                stroke="#f59e0b" stroke-width="2" />
          <text x="620" y="238" text-anchor="middle" fill="#f59e0b"
                font-size="11" font-weight="700" font-family="Inter, sans-serif">App Z</text>
          <text x="620" y="256" text-anchor="middle" fill="#64748b"
                font-size="9" font-family="'JetBrains Mono', monospace">port 6097</text>
        </g>

        <!-- Packet dots -->
        <circle class="mux-pkt mux-pkt1" cx="130" cy="106" r="6" fill="#f59e0b" opacity="0" />
        <circle class="mux-pkt mux-pkt2" cx="130" cy="174" r="6" fill="#6366f1" opacity="0" />
        <circle class="mux-pkt mux-pkt3" cx="130" cy="242" r="6" fill="#22d3ee" opacity="0" />

        <!-- Port labels that appear on packets as they travel -->
        <g class="mux-port-tag mux-tag1" opacity="0">
          <rect x="0" y="0" width="44" height="18" rx="4" fill="#f59e0b" opacity="0.2" />
          <text x="22" y="13" text-anchor="middle" fill="#f59e0b"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">:53</text>
        </g>
        <g class="mux-port-tag mux-tag2" opacity="0">
          <rect x="0" y="0" width="44" height="18" rx="4" fill="#6366f1" opacity="0.2" />
          <text x="22" y="13" text-anchor="middle" fill="#6366f1"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">:68</text>
        </g>
        <g class="mux-port-tag mux-tag3" opacity="0">
          <rect x="0" y="0" width="44" height="18" rx="4" fill="#22d3ee" opacity="0.2" />
          <text x="22" y="13" text-anchor="middle" fill="#22d3ee"
                font-size="8" font-weight="700" font-family="'JetBrains Mono', monospace">:6097</text>
        </g>

        <!-- Bottom legend -->
        <g class="mux-legend" opacity="0">
          <text x="350" y="330" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="Inter, sans-serif">
            Ports enable multiple apps to share one IP connection
          </text>
          <text x="350" y="350" text-anchor="middle" fill="#64748b"
                font-size="10" font-family="Inter, sans-serif">
            Each datagram is routed by its destination port
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class MuxDemuxComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.mux-anim');
    const tl = this.createScrollTimeline(container);

    const apps = this.qa('.mux-app');
    const dests = this.qa('.mux-dest');
    const funnel = this.q('.mux-funnel');
    const demuxFunnel = this.q('.demux-funnel');
    const pipe = this.q('.mux-pipe');
    const pipeLabel = this.q('.mux-pipe-label');
    const sendLabel = this.q('.mux-send-label');
    const recvLabel = this.q('.mux-recv-label');
    const legend = this.q('.mux-legend');

    // 1. Show sender apps
    tl.to(sendLabel, { opacity: 1, duration: 0.3 });
    apps.forEach((app, i) => {
      tl.fromTo(
        app,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
        `-=${i ? 0.2 : 0}`,
      );
    });

    // 2. Show MUX funnel and pipe
    tl.to(funnel, { opacity: 1, duration: 0.4 }, '-=0.1');
    tl.to(pipe, { opacity: 1, duration: 0.4 }, '-=0.2');
    tl.to(pipeLabel, { opacity: 1, duration: 0.3 }, '-=0.2');

    // 3. Show DEMUX funnel and receiver apps
    tl.to(demuxFunnel, { opacity: 1, duration: 0.4 }, '-=0.1');
    tl.to(recvLabel, { opacity: 1, duration: 0.3 }, '-=0.2');
    dests.forEach((dest, i) => {
      tl.fromTo(
        dest,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
        `-=${i ? 0.2 : 0}`,
      );
    });

    // 4. Legend
    tl.to(legend, { opacity: 1, duration: 0.3 });

    // 5. Start packet loop
    tl.add(() => {
      this.startPacketLoop();
    });
  }

  private startPacketLoop(): void {
    const container = this.q('.mux-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt1 = this.q('.mux-pkt1');
    const pkt2 = this.q('.mux-pkt2');
    const pkt3 = this.q('.mux-pkt3');

    // Y positions: app1=106, app2=174, app3=242, pipe center=179
    // dest1=106, dest2=174, dest3=242
    const appYs = [106, 174, 242];
    const destYs = [106, 174, 242];
    const pipeY = 179;

    const appX = 130;
    const muxEntryX = 180;
    const pipeStartX = 250;
    const pipeEndX = 450;
    const demuxExitX = 520;
    const destX = 570;

    const pkts = [pkt1, pkt2, pkt3];
    const colors = ['#f59e0b', '#6366f1', '#22d3ee'];

    pkts.forEach((pkt, i) => {
      const offset = i * 1.4;

      // Start at app
      loop.fromTo(
        pkt,
        { attr: { cx: appX, cy: appYs[i] }, opacity: 0 },
        { opacity: 1, duration: 0.1 },
        offset,
      );

      // Move to mux entry (converge to center)
      loop.to(
        pkt,
        { attr: { cx: muxEntryX, cy: appYs[i] }, duration: 0.25, ease: 'power1.in' },
        offset + 0.1,
      );

      // Through funnel to pipe
      loop.to(
        pkt,
        { attr: { cx: pipeStartX, cy: pipeY }, duration: 0.3, ease: 'power2.inOut' },
        offset + 0.35,
      );

      // Across pipe
      loop.to(
        pkt,
        { attr: { cx: pipeEndX }, duration: 0.5, ease: 'none' },
        offset + 0.65,
      );

      // Through demux to dest
      loop.to(
        pkt,
        { attr: { cx: demuxExitX, cy: destYs[i] }, duration: 0.3, ease: 'power2.inOut' },
        offset + 1.15,
      );

      // Arrive at dest
      loop.to(
        pkt,
        { attr: { cx: destX }, duration: 0.2, ease: 'power1.out' },
        offset + 1.45,
      );

      // Fade out
      loop.to(pkt, { opacity: 0, duration: 0.15 }, offset + 1.7);
    });

    // Wait before looping
    loop.to({}, { duration: 1.0 });

    loop.play();
  }
}
