/**
 * Google reCAPTCHA (v3) — keys from https://www.google.com/recaptcha/admin
 *
 * Browser (public):
 *   NEXT_PUBLIC_RECAPTCHA_SITE_KEY — “Site key”
 *
 * Server (never expose to the client):
 *   RECAPTCHA_SECRET_KEY — “Secret key”; use in a Route Handler to verify tokens
 *   POST https://www.google.com/recaptcha/api/siteverify with secret + response
 */

export function getRecaptchaSiteKey(): string | undefined {
  const k = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return k != null && k.length > 0 ? k : undefined;
}

export function getRecaptchaSecretKey(): string | undefined {
  const k = process.env.RECAPTCHA_SECRET_KEY;
  return k != null && k.length > 0 ? k : undefined;
}
