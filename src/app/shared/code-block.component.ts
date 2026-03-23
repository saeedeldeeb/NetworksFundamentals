import { Component, inject, input, computed, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js/lib/common';

// Atom One Dark theme — inline style map (no CSS dependency)
const THEME: Record<string, string> = {
  'hljs-keyword': 'color:#c678dd',
  'hljs-built_in': 'color:#e6c07b',
  'hljs-type': 'color:#d19a66',
  'hljs-literal': 'color:#56b6c2',
  'hljs-number': 'color:#d19a66',
  'hljs-string': 'color:#98c379',
  'hljs-regexp': 'color:#98c379',
  'hljs-symbol': 'color:#61aeee',
  'hljs-bullet': 'color:#61aeee',
  'hljs-meta': 'color:#61aeee',
  'hljs-link': 'color:#61aeee;text-decoration:underline',
  'hljs-attr': 'color:#d19a66',
  'hljs-attribute': 'color:#98c379',
  'hljs-variable': 'color:#d19a66',
  'hljs-template-variable': 'color:#d19a66',
  'hljs-selector-attr': 'color:#d19a66',
  'hljs-selector-class': 'color:#d19a66',
  'hljs-selector-pseudo': 'color:#d19a66',
  'hljs-comment': 'color:#5c6370;font-style:italic',
  'hljs-quote': 'color:#5c6370;font-style:italic',
  'hljs-doctag': 'color:#c678dd',
  'hljs-formula': 'color:#c678dd',
  'hljs-section': 'color:#e06c75',
  'hljs-name': 'color:#e06c75',
  'hljs-selector-tag': 'color:#e06c75',
  'hljs-subst': 'color:#e06c75',
  'hljs-deletion': 'color:#e06c75',
  'hljs-addition': 'color:#98c379',
  'hljs-title': 'color:#61aeee',
  'hljs-title function_': 'color:#61aeee',
  'hljs-title class_': 'color:#e6c07b',
  'hljs-params': '',
  'hljs-property': 'color:#d19a66',
  'hljs-emphasis': 'font-style:italic',
  'hljs-strong': 'font-weight:700',
};

@Component({
  selector: 'app-code-block',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="code-block" [class.code-block-sm]="small()">
      <div class="code-header">
        <span class="code-lang">{{ lang() }}</span>
        <span class="code-file">{{ filename() }}</span>
      </div>
      <pre class="code-body"><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  lang = input.required<string>();
  filename = input('');
  code = input.required<string>();
  small = input(false);

  private sanitizer = inject(DomSanitizer);

  protected highlighted = computed(() => {
    const code = this.code();
    const language = this.resolveLanguage(this.lang());
    if (!code) return this.sanitizer.bypassSecurityTrustHtml('');
    let html: string;
    if (language) {
      try {
        html = hljs.highlight(code, { language }).value;
        html = this.applyInlineStyles(html);
      } catch {
        html = this.escapeHtml(code);
      }
    } else {
      html = this.escapeHtml(code);
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  private applyInlineStyles(html: string): string {
    return html.replace(
      /class="([^"]+)"/g,
      (_, classes: string) => {
        const style = THEME[classes] || THEME[classes.split(' ')[0]] || '';
        return style ? `style="${style}"` : '';
      },
    );
  }

  private resolveLanguage(lang: string): string | null {
    const l = lang.toLowerCase();
    if (l === 'js' || l === 'javascript' || l === 'node.js') return 'javascript';
    if (l === 'c') return 'c';
    if (l === 'bash' || l === 'terminal' || l === 'shell') return 'bash';
    return null;
  }

  private escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
