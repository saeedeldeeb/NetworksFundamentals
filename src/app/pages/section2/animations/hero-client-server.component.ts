import { Component, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-hero-client-server',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hero-cs {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .hero-cs svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
  template: `
    <div class="hero-cs">
      <svg viewBox="0 0 800 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="hero-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hero-pulse-grad">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
          </radialGradient>

          <!-- Curved paths for packets -->
          <path id="hero-req-path" d="M 150,155 C 300,55 500,55 650,155" fill="none" />
          <path id="hero-res-path" d="M 650,165 C 500,265 300,265 150,165" fill="none" />
        </defs>

        <!-- Connection line -->
        <line class="hero-conn-bg" x1="150" y1="160" x2="650" y2="160"
              stroke="#1e293b" stroke-width="2" />
        <path class="hero-conn-glow" d="M 150,160 L 650,160"
              stroke="#6366f1" stroke-width="1.5" opacity="0" filter="url(#hero-glow)" fill="none" />

        <!-- Path ghosts (visible subtle curves) -->
        <use href="#hero-req-path" stroke="#22d3ee" stroke-width="0.5" opacity="0" class="hero-path-ghost req" />
        <use href="#hero-res-path" stroke="#6366f1" stroke-width="0.5" opacity="0" class="hero-path-ghost res" />

        <!-- Client: Laptop -->
        <g class="hero-client-group" opacity="0">
          <rect x="40" y="110" width="100" height="70" rx="6" fill="#1f2937"
                stroke="#22d3ee" stroke-width="1.5" />
          <!-- Screen lines -->
          <line x1="55" y1="128" x2="110" y2="128" stroke="#22d3ee" stroke-width="1.5" opacity="0.5" />
          <line x1="55" y1="138" x2="100" y2="138" stroke="#22d3ee" stroke-width="1.5" opacity="0.35" />
          <line x1="55" y1="148" x2="105" y2="148" stroke="#22d3ee" stroke-width="1.5" opacity="0.2" />
          <line x1="55" y1="158" x2="95"  y2="158" stroke="#22d3ee" stroke-width="1.5" opacity="0.15" />
          <!-- Keyboard base -->
          <rect x="30" y="182" width="120" height="8" rx="4" fill="#374151" />
          <!-- Labels -->
          <text x="90" y="215" text-anchor="middle" fill="#f1f5f9"
                font-size="15" font-weight="600" font-family="Inter, sans-serif">Client</text>
          <text x="90" y="232" text-anchor="middle" fill="#64748b"
                font-size="11" font-family="Inter, sans-serif">Lightweight</text>
        </g>

        <!-- Server: Rack -->
        <g class="hero-server-group" opacity="0">
          <!-- Pulse circle (behind server) -->
          <circle class="hero-server-pulse" cx="710" cy="155" r="50"
                  fill="url(#hero-pulse-grad)" opacity="0" />
          <rect x="660" y="100" width="100" height="110" rx="6" fill="#1f2937"
                stroke="#6366f1" stroke-width="1.5" />
          <!-- Server slots -->
          <rect x="672" y="112" width="76" height="18" rx="3" fill="#374151" />
          <circle cx="736" cy="121" r="4" fill="#10b981" opacity="0.7" />
          <rect x="672" y="138" width="76" height="18" rx="3" fill="#374151" />
          <circle cx="736" cy="147" r="4" fill="#10b981" opacity="0.7" />
          <rect x="672" y="164" width="76" height="18" rx="3" fill="#374151" />
          <circle cx="736" cy="173" r="4" fill="#6366f1" opacity="0.7" />
          <!-- Vent lines -->
          <line x1="680" y1="192" x2="695" y2="192" stroke="#4b5563" stroke-width="1" />
          <line x1="700" y1="192" x2="715" y2="192" stroke="#4b5563" stroke-width="1" />
          <line x1="720" y1="192" x2="735" y2="192" stroke="#4b5563" stroke-width="1" />
          <!-- Labels -->
          <text x="710" y="235" text-anchor="middle" fill="#f1f5f9"
                font-size="15" font-weight="600" font-family="Inter, sans-serif">Server</text>
          <text x="710" y="252" text-anchor="middle" fill="#64748b"
                font-size="11" font-family="Inter, sans-serif">Powerful</text>
        </g>

        <!-- Request packets -->
        <circle class="hero-req-dot" r="6" fill="#22d3ee" opacity="0" />
        <circle class="hero-req-dot" r="6" fill="#22d3ee" opacity="0" />
        <circle class="hero-req-dot" r="6" fill="#22d3ee" opacity="0" />

        <!-- Request packet trails -->
        <circle class="hero-req-trail" r="4" fill="#22d3ee" opacity="0" />
        <circle class="hero-req-trail" r="4" fill="#22d3ee" opacity="0" />
        <circle class="hero-req-trail" r="4" fill="#22d3ee" opacity="0" />

        <!-- Response packets -->
        <circle class="hero-res-dot" r="6" fill="#6366f1" opacity="0" />
        <circle class="hero-res-dot" r="6" fill="#6366f1" opacity="0" />
        <circle class="hero-res-dot" r="6" fill="#6366f1" opacity="0" />

        <!-- Response packet trails -->
        <circle class="hero-res-trail" r="4" fill="#6366f1" opacity="0" />
        <circle class="hero-res-trail" r="4" fill="#6366f1" opacity="0" />
        <circle class="hero-res-trail" r="4" fill="#6366f1" opacity="0" />

        <!-- Floating labels -->
        <text class="hero-req-label" x="400" y="45" text-anchor="middle"
              fill="#22d3ee" font-size="11" font-weight="700"
              font-family="'JetBrains Mono', monospace" letter-spacing="0.05em"
              opacity="0">REQUEST</text>
        <text class="hero-res-label" x="400" y="290" text-anchor="middle"
              fill="#6366f1" font-size="11" font-weight="700"
              font-family="'JetBrains Mono', monospace" letter-spacing="0.05em"
              opacity="0">RESPONSE</text>
      </svg>
    </div>
  `,
})
export class HeroClientServerComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.hero-cs');
    const tl = this.createScrollTimeline(container);

    // 1. Client appears
    tl.to(this.q('.hero-client-group'), {
      opacity: 1, duration: 0.6, ease: 'power2.out',
    });
    tl.from(this.q('.hero-client-group'), {
      x: -30, duration: 0.6, ease: 'power2.out',
    }, '<');

    // 2. Server appears
    tl.to(this.q('.hero-server-group'), {
      opacity: 1, duration: 0.6, ease: 'power2.out',
    }, '-=0.3');
    tl.from(this.q('.hero-server-group'), {
      x: 30, duration: 0.6, ease: 'power2.out',
    }, '<');

    // 3. Connection line draws
    const connLine = this.q('.hero-conn-bg') as unknown as SVGLineElement;
    gsap.set(connLine, { strokeDasharray: 500, strokeDashoffset: 500 });
    tl.to(connLine, {
      strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut',
    }, '-=0.2');

    // 4. Glow pulse
    tl.to(this.q('.hero-conn-glow'), {
      opacity: 0.5, duration: 0.4,
    }, '-=0.2');

    // 5. Show path ghosts
    tl.to(this.qa('.hero-path-ghost'), {
      opacity: 0.15, duration: 0.4, stagger: 0.1,
    });

    // 6. Show labels
    tl.to(this.q('.hero-req-label'), { opacity: 0.6, duration: 0.3 }, '-=0.2');
    tl.to(this.q('.hero-res-label'), { opacity: 0.6, duration: 0.3 }, '-=0.2');

    // 7. Looping packets
    const loop = this.createLoopingTimeline(container);
    const reqPath = '#hero-req-path';
    const resPath = '#hero-res-path';
    const reqDots = this.qa('.hero-req-dot');
    const reqTrails = this.qa('.hero-req-trail');
    const resDots = this.qa('.hero-res-dot');
    const resTrails = this.qa('.hero-res-trail');
    const serverPulse = this.q('.hero-server-pulse');

    // Request packets with trails
    reqDots.forEach((dot, i) => {
      const trail = reqTrails[i];
      const offset = i * 0.5;

      loop.fromTo(dot,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.15,
          motionPath: { path: reqPath, align: reqPath, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
        }, offset);

      loop.to(dot, {
        motionPath: { path: reqPath, align: reqPath, alignOrigin: [0.5, 0.5] },
        duration: 1.6, ease: 'power1.inOut',
      }, offset);

      // Trail follows slightly behind
      loop.fromTo(trail,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.1 },
        offset + 0.15);

      loop.to(trail, {
        motionPath: { path: reqPath, align: reqPath, alignOrigin: [0.5, 0.5] },
        duration: 1.6, ease: 'power1.inOut',
      }, offset + 0.15);

      loop.to(trail, { opacity: 0, duration: 0.2 }, offset + 1.5);
      loop.to(dot, { opacity: 0, duration: 0.2 }, offset + 1.4);
    });

    // Server pulse when requests arrive
    loop.fromTo(serverPulse,
      { opacity: 0, attr: { r: 50 } },
      { opacity: 0.6, attr: { r: 70 }, duration: 0.3, ease: 'power2.out' },
      1.4);
    loop.to(serverPulse,
      { opacity: 0, attr: { r: 90 }, duration: 0.5, ease: 'power2.out' },
      1.7);

    // Response packets
    resDots.forEach((dot, i) => {
      const trail = resTrails[i];
      const offset = 2.0 + i * 0.5;

      loop.fromTo(dot,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.15,
          motionPath: { path: resPath, align: resPath, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
        }, offset);

      loop.to(dot, {
        motionPath: { path: resPath, align: resPath, alignOrigin: [0.5, 0.5] },
        duration: 1.6, ease: 'power1.inOut',
      }, offset);

      loop.fromTo(trail,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.1 },
        offset + 0.15);

      loop.to(trail, {
        motionPath: { path: resPath, align: resPath, alignOrigin: [0.5, 0.5] },
        duration: 1.6, ease: 'power1.inOut',
      }, offset + 0.15);

      loop.to(trail, { opacity: 0, duration: 0.2 }, offset + 1.5);
      loop.to(dot, { opacity: 0, duration: 0.2 }, offset + 1.4);
    });

    // Pad the loop with a gap before repeating
    loop.to({}, { duration: 0.8 });

    // Start the loop after intro
    tl.add(() => { loop.play(); });
  }
}
