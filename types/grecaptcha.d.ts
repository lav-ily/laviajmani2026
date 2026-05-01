export {};

/** Minimal typing after loading https://www.google.com/recaptcha/api.js?render=SITE_KEY */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
