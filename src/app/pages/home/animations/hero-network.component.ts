import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from '../../section2/animations/gsap-animation.base';

@Component({
  selector: 'app-hero-network',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hero-net {
      position: relative;
      width: 100%;
      max-width: 480px;
      padding: 50px 40px;
    }
    .hero-net-img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 2;
    }
    .hnet-glow {
      position: absolute;
      inset: 46px 36px;
      border-radius: 20px;
      border: 2px solid #6366f1;
      opacity: 0;
      z-index: 1;
      pointer-events: none;
      filter: blur(4px);
    }
    .hnet-device {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
      z-index: 3;
    }
    .hnet-device-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid;
      background: #1f2937;
    }
    .hnet-device-icon svg {
      width: 18px;
      height: 18px;
    }
    .hnet-device-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .hnet-conn {
      position: absolute;
      z-index: 0;
    }
    .hnet-conn line {
      stroke-width: 1.2;
    }
    .hnet-pkt {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      z-index: 4;
    }
  `,
  template: `
    <div class="hero-net">
      <img src="net.png" alt="Fundamentals of Network Engineering" class="hero-net-img" />
      <div class="hnet-glow"></div>

      <!-- Device: Laptop (top-left) -->
      <div class="hnet-device" style="top:-8px;left:-4px">
        <div class="hnet-device-icon" style="border-color:#22d3ee">
          <svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        </div>
        <span class="hnet-device-name" style="color:#22d3ee">Client</span>
      </div>

      <!-- Device: Server (top-right) -->
      <div class="hnet-device" style="top:-8px;right:-4px">
        <div class="hnet-device-icon" style="border-color:#6366f1">
          <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="6" rx="1" />
            <rect x="4" y="10" width="16" height="6" rx="1" />
            <circle cx="8" cy="5" r="1" fill="#6366f1" />
            <circle cx="8" cy="13" r="1" fill="#6366f1" />
            <line x1="4" y1="20" x2="20" y2="20" />
          </svg>
        </div>
        <span class="hnet-device-name" style="color:#6366f1">Server</span>
      </div>

      <!-- Device: Phone (bottom-left) -->
      <div class="hnet-device" style="bottom:-8px;left:-4px">
        <div class="hnet-device-icon" style="border-color:#10b981">
          <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" stroke-width="3" />
          </svg>
        </div>
        <span class="hnet-device-name" style="color:#10b981">Mobile</span>
      </div>

      <!-- Device: Database (bottom-right) -->
      <div class="hnet-device" style="bottom:-8px;right:-4px">
        <div class="hnet-device-icon" style="border-color:#f59e0b">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M20 5v6c0 1.66-3.58 3-8 3s-8-1.34-8-3V5" />
            <path d="M20 11v6c0 1.66-3.58 3-8 3s-8-1.34-8-3v-6" />
          </svg>
        </div>
        <span class="hnet-device-name" style="color:#f59e0b">Database</span>
      </div>

      <!-- Connection SVGs (behind image) -->
      <svg class="hnet-conn" style="top:10px;left:14px;width:calc(100% - 28px);height:calc(100% - 20px)">
        <!-- Top: Client → Server -->
        <line class="hnet-line" x1="18" y1="10" x2="100%" y2="10"
              stroke="#374151" transform="translate(-18,0)" opacity="0" />
        <!-- Left: Client → Mobile -->
        <line class="hnet-line" x1="10" y1="18" x2="10" y2="100%"
              stroke="#374151" opacity="0" />
        <!-- Right: Server → Database -->
        <line class="hnet-line" x1="100%" y1="18" x2="100%" y2="100%"
              stroke="#374151" transform="translate(-10,0)" opacity="0" />
        <!-- Bottom: Mobile → Database -->
        <line class="hnet-line" x1="18" y1="100%" x2="100%" y2="100%"
              stroke="#374151" transform="translate(0,-10)" opacity="0" />
      </svg>

      <!-- Traveling packets -->
      <div class="hnet-pkt" style="background:#22d3ee;box-shadow:0 0 8px #22d3ee"></div>
      <div class="hnet-pkt" style="background:#6366f1;box-shadow:0 0 8px #6366f1"></div>
      <div class="hnet-pkt" style="background:#10b981;box-shadow:0 0 8px #10b981"></div>
    </div>
  `,
})
export class HeroNetworkComponent extends GsapAnimationBase {
  protected override getScroller(): HTMLElement | null {
    return document.querySelector('.main-content') || null;
  }

  protected initAnimation(): void {
    const tl = gsap.timeline({ delay: 0.3 });
    this.timelines.push(tl);

    const glow = this.q('.hnet-glow');
    const devices = this.qa('.hnet-device');
    const lines = this.qa('.hnet-line');
    const pkts = this.qa('.hnet-pkt');

    // 1. Image glow
    tl.to(glow, { opacity: 0.35, duration: 0.6, ease: 'power2.out' });

    // 2. Devices appear with bounce
    devices.forEach((dev, i) => {
      tl.to(dev, { opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.3 + i * 0.12);
    });

    // 3. Connection lines fade in
    lines.forEach((line, i) => {
      tl.to(line, { opacity: 0.35, duration: 0.4 }, 0.5 + i * 0.08);
    });

    // 4. Start packet loop
    tl.add(() => { this.startPacketLoop(glow, pkts); });
  }

  private startPacketLoop(glow: HTMLElement, pkts: HTMLElement[]): void {
    const container = this.q('.hero-net');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    // Glow breathing
    const breathe = gsap.to(glow, {
      opacity: 0.55, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
    this.timelines.push(breathe as unknown as gsap.core.Timeline);

    // Device positions (approximate corners inside padding)
    const topLeft = { x: 14, y: 10 };
    const topRight = { x: w - 22, y: 10 };
    const bottomLeft = { x: 14, y: h - 22 };
    const bottomRight = { x: w - 22, y: h - 22 };

    // Packet 0 (cyan): Client → Server → Database (request path)
    const loop1 = gsap.timeline({ repeat: -1 });
    this.timelines.push(loop1);
    // Start at Client (top-left)
    loop1.fromTo(pkts[0],
      { left: topLeft.x, top: topLeft.y, opacity: 0 },
      { opacity: 0.9, duration: 0.2 },
    );
    // Travel to Server (top-right)
    loop1.to(pkts[0], {
      left: topRight.x, top: topRight.y,
      duration: 1.5, ease: 'power1.inOut',
    });
    // Travel down to Database (bottom-right)
    loop1.to(pkts[0], {
      left: bottomRight.x, top: bottomRight.y,
      duration: 1.2, ease: 'power1.inOut',
    });
    loop1.to(pkts[0], { opacity: 0, duration: 0.2 });
    loop1.to({}, { duration: 1.5 });

    // Packet 1 (indigo): Server → Client (response path)
    const loop2 = gsap.timeline({ repeat: -1, delay: 2.5 });
    this.timelines.push(loop2);
    loop2.fromTo(pkts[1],
      { left: topRight.x, top: topRight.y, opacity: 0 },
      { opacity: 0.9, duration: 0.2 },
    );
    loop2.to(pkts[1], {
      left: topLeft.x, top: topLeft.y,
      duration: 1.5, ease: 'power1.inOut',
    });
    loop2.to(pkts[1], { opacity: 0, duration: 0.2 });
    loop2.to({}, { duration: 2.0 });

    // Packet 2 (green): Mobile → Server (mobile request)
    const loop3 = gsap.timeline({ repeat: -1, delay: 1.2 });
    this.timelines.push(loop3);
    loop3.fromTo(pkts[2],
      { left: bottomLeft.x, top: bottomLeft.y, opacity: 0 },
      { opacity: 0.9, duration: 0.2 },
    );
    // Travel up to Client position then across to Server
    loop3.to(pkts[2], {
      left: topLeft.x, top: topLeft.y,
      duration: 1.0, ease: 'power1.inOut',
    });
    loop3.to(pkts[2], {
      left: topRight.x, top: topRight.y,
      duration: 1.5, ease: 'power1.inOut',
    });
    loop3.to(pkts[2], { opacity: 0, duration: 0.2 });
    loop3.to({}, { duration: 2.0 });
  }
}
