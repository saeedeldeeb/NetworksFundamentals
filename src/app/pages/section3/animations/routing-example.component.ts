import { Component, ViewEncapsulation } from '@angular/core';
import { GsapAnimationBase } from './gsap-animation.base';

@Component({
  selector: 'app-routing-example',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .route-anim {
      margin: 1.5rem 0;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      overflow: hidden;
    }
    .route-anim svg { width: 100%; height: auto; display: block; }
  `,
  template: `
    <div class="route-anim">
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="rt-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Title -->
        <text x="320" y="22" text-anchor="middle" fill="#f1f5f9"
              font-size="13" font-weight="700" font-family="Inter, sans-serif" opacity="0.6">
          Routing: Same Network vs Different Network vs Internet
        </text>

        <!-- ===  Network 10.0.0.x/24 (left) === -->
        <rect class="rt-net1" x="15" y="40" width="280" height="230" rx="14"
              fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />
        <text class="rt-net1-t" x="155" y="62" text-anchor="middle" fill="#22d3ee"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">10.0.0.x/24</text>

        <!-- Host A -->
        <g class="rt-a" opacity="0">
          <rect x="30" y="80" width="55" height="40" rx="8" fill="#1f2937" stroke="#22d3ee" stroke-width="1.5" />
          <text x="57" y="105" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700" font-family="Inter, sans-serif">A</text>
        </g>
        <rect class="rt-a-glow" x="30" y="80" width="55" height="40" rx="8"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" filter="url(#rt-glow)" />
        <text class="rt-a-ip" x="57" y="135" text-anchor="middle" fill="#64748b"
              font-size="7" font-family="'JetBrains Mono', monospace" opacity="0">.4</text>

        <!-- Host B -->
        <g class="rt-b" opacity="0">
          <rect x="110" y="80" width="55" height="40" rx="8" fill="#1f2937" stroke="#22d3ee" stroke-width="1.5" />
          <text x="137" y="105" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="700" font-family="Inter, sans-serif">B</text>
        </g>
        <rect class="rt-b-glow" x="110" y="80" width="55" height="40" rx="8"
              fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0" filter="url(#rt-glow)" />
        <text class="rt-b-ip" x="137" y="135" text-anchor="middle" fill="#64748b"
              font-size="7" font-family="'JetBrains Mono', monospace" opacity="0">.5</text>

        <!-- Switch -->
        <g class="rt-switch" opacity="0">
          <rect x="80" y="170" width="80" height="35" rx="6" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5" />
          <text x="120" y="192" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700" font-family="Inter, sans-serif">Switch</text>
        </g>

        <!-- Router -->
        <g class="rt-router" opacity="0">
          <rect x="200" y="155" width="80" height="50" rx="10" fill="#1f2937" stroke="#6366f1" stroke-width="2" />
          <text x="240" y="178" text-anchor="middle" fill="#6366f1" font-size="11" font-weight="700" font-family="Inter, sans-serif">Router</text>
          <text x="240" y="196" text-anchor="middle" fill="#64748b" font-size="7" font-family="'JetBrains Mono', monospace">.100 | .1</text>
        </g>
        <rect class="rt-router-glow" x="200" y="155" width="80" height="50" rx="10"
              fill="none" stroke="#6366f1" stroke-width="2.5" opacity="0" filter="url(#rt-glow)" />

        <!-- ===  Network 192.168.1.x/24 (right) === -->
        <rect class="rt-net2" x="345" y="40" width="280" height="230" rx="14"
              fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,4" opacity="0" />
        <text class="rt-net2-t" x="485" y="62" text-anchor="middle" fill="#10b981"
              font-size="10" font-weight="700" font-family="'JetBrains Mono', monospace" opacity="0">192.168.1.x/24</text>

        <!-- Switch 2 -->
        <g class="rt-switch2" opacity="0">
          <rect x="440" y="170" width="80" height="35" rx="6" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5" />
          <text x="480" y="192" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700" font-family="Inter, sans-serif">Switch</text>
        </g>

        <!-- Host X -->
        <g class="rt-x" opacity="0">
          <rect x="450" y="80" width="55" height="40" rx="8" fill="#1f2937" stroke="#10b981" stroke-width="1.5" />
          <text x="477" y="105" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700" font-family="Inter, sans-serif">X</text>
        </g>
        <rect class="rt-x-glow" x="450" y="80" width="55" height="40" rx="8"
              fill="none" stroke="#10b981" stroke-width="2.5" opacity="0" filter="url(#rt-glow)" />
        <text class="rt-x-ip" x="477" y="135" text-anchor="middle" fill="#64748b"
              font-size="7" font-family="'JetBrains Mono', monospace" opacity="0">.2</text>

        <!-- Lines: hosts to switch, switch to router -->
        <line class="rt-l-as" x1="57" y1="120" x2="100" y2="170" stroke="#374151" stroke-width="1" opacity="0" />
        <line class="rt-l-bs" x1="137" y1="120" x2="140" y2="170" stroke="#374151" stroke-width="1" opacity="0" />
        <line class="rt-l-sr" x1="160" y1="187" x2="200" y2="180" stroke="#374151" stroke-width="1" opacity="0" />
        <line class="rt-l-rs2" x1="280" y1="180" x2="440" y2="187" stroke="#374151" stroke-width="1" opacity="0" />
        <line class="rt-l-s2x" x1="480" y1="170" x2="477" y2="120" stroke="#374151" stroke-width="1" opacity="0" />

        <!-- Internet (below router) -->
        <line class="rt-l-ri" x1="240" y1="205" x2="240" y2="310" stroke="#374151" stroke-width="1" opacity="0" />
        <g class="rt-internet" opacity="0">
          <ellipse cx="240" cy="340" rx="60" ry="25" fill="none" stroke="#374151" stroke-width="1.5" stroke-dasharray="4,3" />
          <text x="240" y="345" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter, sans-serif">Internet</text>
        </g>
        <g class="rt-g" opacity="0">
          <rect x="340" y="320" width="70" height="40" rx="8" fill="#1f2937" stroke="#ef4444" stroke-width="1.5" />
          <text x="375" y="340" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700" font-family="Inter, sans-serif">G</text>
          <text x="375" y="354" text-anchor="middle" fill="#64748b" font-size="7" font-family="'JetBrains Mono', monospace">8.8.8.8</text>
        </g>
        <rect class="rt-g-glow" x="340" y="320" width="70" height="40" rx="8"
              fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0" filter="url(#rt-glow)" />
        <line class="rt-l-ig" x1="300" y1="340" x2="340" y2="340" stroke="#374151" stroke-width="1" opacity="0" />

        <!-- Packet -->
        <circle class="rt-pkt" r="6" fill="#f59e0b" opacity="0" />

        <!-- Scenario label -->
        <g class="rt-scenario" opacity="0">
          <rect x="140" y="390" width="360" height="26" rx="6"
                fill="#0f172a" stroke="#6366f1" stroke-width="1" />
          <text class="rt-scenario-text" x="320" y="408" text-anchor="middle" fill="#6366f1"
                font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace">
            A &#8594; B (Same network, via Switch)
          </text>
        </g>
      </svg>
    </div>
  `,
})
export class RoutingExampleComponent extends GsapAnimationBase {
  protected initAnimation(): void {
    const container = this.q('.route-anim');
    const tl = this.createScrollTimeline(container);

    const all = [
      '.rt-net1', '.rt-net1-t', '.rt-net2', '.rt-net2-t',
      '.rt-a', '.rt-a-ip', '.rt-b', '.rt-b-ip', '.rt-switch',
      '.rt-router', '.rt-switch2', '.rt-x', '.rt-x-ip',
      '.rt-internet', '.rt-g',
      '.rt-l-as', '.rt-l-bs', '.rt-l-sr', '.rt-l-rs2', '.rt-l-s2x', '.rt-l-ri', '.rt-l-ig',
    ];
    all.forEach((s, i) => tl.to(this.q(s), { opacity: 1, duration: 0.2 }, i * 0.03));

    tl.add(() => { this.startLoop(); });
  }

  private startLoop(): void {
    const container = this.q('.route-anim');
    const loop = this.createLoopingTimeline(container);

    const pkt = this.q('.rt-pkt');
    const scenario = this.q('.rt-scenario');
    const scenarioText = this.q('.rt-scenario-text');
    const aGlow = this.q('.rt-a-glow');
    const bGlow = this.q('.rt-b-glow');
    const routerGlow = this.q('.rt-router-glow');
    const xGlow = this.q('.rt-x-glow');
    const gGlow = this.q('.rt-g-glow');

    let t = 0;

    // === Scenario 1: A → B (same network) ===
    loop.set(scenarioText, { textContent: 'A \u2192 B (Same network, via Switch)' }, t);
    loop.fromTo(scenario, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);

    loop.to(aGlow, { opacity: 0.7, duration: 0.15 }, t + 0.2);
    loop.fromTo(pkt, { attr: { cx: 57, cy: 100 }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.3);
    // A → Switch
    loop.to(pkt, { attr: { cx: 120, cy: 187 }, duration: 0.4, ease: 'power2.inOut' }, t + 0.4);
    loop.to(aGlow, { opacity: 0, duration: 0.2 }, t + 0.5);
    // Switch → B
    loop.to(pkt, { attr: { cx: 137, cy: 100 }, duration: 0.4, ease: 'power2.inOut' }, t + 0.9);
    loop.to(bGlow, { opacity: 0.7, duration: 0.15 }, t + 1.3);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 1.3);
    loop.to(bGlow, { opacity: 0, duration: 0.3 }, t + 1.6);

    t += 2.5;

    // === Scenario 2: A → X (different network, via Router) ===
    loop.set(scenarioText, { textContent: 'A \u2192 X (Different network, via Router)' }, t);

    loop.to(aGlow, { opacity: 0.7, duration: 0.15 }, t + 0.2);
    loop.fromTo(pkt, { attr: { cx: 57, cy: 100 }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.3);
    // A → Switch → Router
    loop.to(pkt, { attr: { cx: 120, cy: 187 }, duration: 0.3, ease: 'power2.inOut' }, t + 0.4);
    loop.to(aGlow, { opacity: 0, duration: 0.2 }, t + 0.5);
    loop.to(pkt, { attr: { cx: 240, cy: 180 }, duration: 0.3, ease: 'power2.inOut' }, t + 0.7);
    loop.to(routerGlow, { opacity: 0.7, duration: 0.15 }, t + 1.0);
    loop.to(routerGlow, { opacity: 0, duration: 0.3 }, t + 1.3);
    // Router → Switch2 → X
    loop.to(pkt, { attr: { cx: 480, cy: 187 }, duration: 0.5, ease: 'power2.inOut' }, t + 1.2);
    loop.to(pkt, { attr: { cx: 477, cy: 100 }, duration: 0.3, ease: 'power2.inOut' }, t + 1.7);
    loop.to(xGlow, { opacity: 0.7, duration: 0.15 }, t + 2.0);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 2.0);
    loop.to(xGlow, { opacity: 0, duration: 0.3 }, t + 2.3);

    t += 3.2;

    // === Scenario 3: B → G (to Internet with NAT) ===
    loop.set(scenarioText, { textContent: 'B \u2192 G (Internet, Router uses NAT)' }, t);

    loop.to(bGlow, { opacity: 0.7, duration: 0.15 }, t + 0.2);
    loop.fromTo(pkt, { attr: { cx: 137, cy: 100 }, opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.3);
    // B → Switch → Router
    loop.to(pkt, { attr: { cx: 120, cy: 187 }, duration: 0.3, ease: 'power2.inOut' }, t + 0.4);
    loop.to(bGlow, { opacity: 0, duration: 0.2 }, t + 0.5);
    loop.to(pkt, { attr: { cx: 240, cy: 180 }, duration: 0.3, ease: 'power2.inOut' }, t + 0.7);
    loop.to(routerGlow, { opacity: 0.7, duration: 0.15 }, t + 1.0);
    loop.to(routerGlow, { opacity: 0, duration: 0.3 }, t + 1.3);
    // Router → Internet → G
    loop.to(pkt, { attr: { cx: 240, cy: 340 }, duration: 0.4, ease: 'power2.inOut' }, t + 1.2);
    loop.to(pkt, { attr: { cx: 375, cy: 340 }, duration: 0.4, ease: 'power2.inOut' }, t + 1.6);
    loop.to(gGlow, { opacity: 0.7, duration: 0.15 }, t + 2.0);
    loop.to(pkt, { opacity: 0, duration: 0.1 }, t + 2.0);
    loop.to(gGlow, { opacity: 0, duration: 0.3 }, t + 2.3);

    t += 3.2;

    // Fade scenario and restart
    loop.to(scenario, { opacity: 0, duration: 0.3 }, t);
    loop.to({}, { duration: 0.8 });

    loop.play();
  }
}
