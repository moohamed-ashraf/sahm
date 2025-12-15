import { Injectable } from '@angular/core';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  private siteKey: string = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Google's test key - replace with your own in production
  private scriptLoaded = false;

  constructor() {
    this.loadRecaptchaScript();
  }

  private loadRecaptchaScript(): void {
    if (this.scriptLoaded || typeof grecaptcha !== 'undefined') {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.scriptLoaded = true;
    };
    document.head.appendChild(script);
  }

  getSiteKey(): string {
    return this.siteKey;
  }

  isScriptLoaded(): boolean {
    return typeof grecaptcha !== 'undefined';
  }

  getResponse(widgetId: number): string {
    if (typeof grecaptcha !== 'undefined') {
      return grecaptcha.getResponse(widgetId);
    }
    return '';
  }

  reset(widgetId: number): void {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.reset(widgetId);
    }
  }

  render(element: HTMLElement, callback: (token: string) => void, errorCallback?: () => void): number {
    if (typeof grecaptcha !== 'undefined') {
      return grecaptcha.render(element, {
        'sitekey': this.siteKey,
        'callback': callback,
        'error-callback': errorCallback
      });
    }
    return 0;
  }

  setSiteKey(key: string): void {
    this.siteKey = key;
  }
}

