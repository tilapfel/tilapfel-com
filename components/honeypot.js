/**
 * Invisible spam-trap field: real visitors never see, focus, or fill this
 * in (hidden via off-screen position, not display/opacity/visibility, so
 * it stays robust against basic bot heuristics; `tabindex="-1"` keeps it
 * out of keyboard tab order; `aria-hidden` keeps it out of assistive tech).
 * A filled-in value is the server's cue (see netlify/functions/form-submit)
 * that the submission is automated. No CAPTCHA involved — see the parent
 * form's page for why.
 */
export function honeypotFieldHtml() {
  return `
    <div class="hp-field" aria-hidden="true">
      <label for="hp-website">Website</label>
      <input type="text" id="hp-website" name="website" tabindex="-1" autocomplete="off">
    </div>`;
}
