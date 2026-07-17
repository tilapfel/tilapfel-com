import de from './de.js';

/**
 * DGS (Deutsche Gebärdensprache) has no standard written form, so this
 * locale reuses the German content verbatim. app/router.js shows a
 * video-placeholder notice on every page when this locale is active,
 * signalling that a real DGS video is the eventual target — the German
 * text underneath is a fallback, not the final content.
 */
export default { ...de, code: 'dgs' };
