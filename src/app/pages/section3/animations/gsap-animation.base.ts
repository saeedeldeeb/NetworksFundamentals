import {
  afterNextRender,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export abstract class GsapAnimationBase {
  protected readonly el = inject(ElementRef).nativeElement as HTMLElement;
  protected readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  protected timelines: gsap.core.Timeline[] = [];
  protected scrollTriggers: ScrollTrigger[] = [];

  constructor() {
    afterNextRender(
      () => {
        if (!this.el.isConnected) return;
        this.initAnimation();
      },
      { injector: this.injector },
    );

    this.destroyRef.onDestroy(() => {
      this.timelines.forEach((tl) => tl.kill());
      this.scrollTriggers.forEach((st) => st.kill());
      gsap.killTweensOf(this.el.querySelectorAll('*'));
    });
  }

  protected abstract initAnimation(): void;

  protected getScroller(): HTMLElement | null {
    return document.querySelector('.main-content');
  }

  protected createScrollTimeline(
    trigger: Element,
    vars?: gsap.TimelineVars,
  ): gsap.core.Timeline {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller: this.getScroller(),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...vars,
    });
    this.timelines.push(tl);
    if (tl.scrollTrigger) {
      this.scrollTriggers.push(tl.scrollTrigger as ScrollTrigger);
    }
    return tl;
  }

  protected createLoopingTimeline(
    trigger: Element,
  ): gsap.core.Timeline {
    const loop = gsap.timeline({ repeat: -1, paused: true });

    ScrollTrigger.create({
      trigger,
      scroller: this.getScroller(),
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => loop.play(),
      onLeave: () => loop.pause(),
      onEnterBack: () => loop.play(),
      onLeaveBack: () => loop.pause(),
    });

    this.timelines.push(loop);
    return loop;
  }

  protected q(selector: string): HTMLElement {
    return this.el.querySelector(selector) as HTMLElement;
  }

  protected qa(selector: string): HTMLElement[] {
    return Array.from(this.el.querySelectorAll(selector));
  }
}
