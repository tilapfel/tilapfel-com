import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { simpleCardHtml, feedPostCardHtml } from '../components/card.js';
import { socialRowHtml } from '../components/social.js';
import { modalHtml } from '../components/modal.js';
import { shareToggleHtml } from '../components/toggles.js';

export function renderFocus(view) {
  const t = view.t;
  const topicCards = view.focusItems.map(simpleCardHtml).join('');
  const postCards = view.visibleFeedsPosts.map(feedPostCardHtml).join('');
  const tagFilter = view.feedsTags
    .map(
      (tag) => `
    <button type="button" class="onboarding-choice${view.feedsTagFilter === tag.value ? ' active' : ''}" data-set-feed-tag="${escapeHtml(tag.value)}">${escapeHtml(tag.label)}</button>`
    )
    .join('');
  return `
  <div data-screen-label="Feeds">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.feed}<span>${escapeHtml(t.focusTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.focusSubtitle)}</p>
    </section>
    <section style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:0 0 clamp(20px,4vw,32px)">
      <h2 class="heading-sm">${escapeHtml(t.feedsChannelsHeading)}</h2>
      ${socialRowHtml(view)}
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.feedsPostsHeading)}</h2>
      <div class="onboarding-choice-row" style="justify-content:flex-start">${tagFilter}</div>
      ${postCards}
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.feedsTopicsHeading)}</h2>
      ${topicCards}
      <p style="font-size:16px;line-height:1.6;color:var(--text-primary)">${escapeHtml(t.focusClosing)}</p>
    </section>
  </div>`;
}

export function renderFeedPostModal(view) {
  const entry = view.currentFeedPost;
  if (!entry) return '';
  const tags = entry.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join('');
  return modalHtml({
    labelledBy: 'post-modal-title',
    closeLabel: view.t.closeDialog,
    shareHtml: shareToggleHtml(view, { dropDown: true }),
    bodyHtml: `
      <span class="modal-eyebrow-row">${escapeHtml(entry.date)} · ${escapeHtml(entry.source)}</span>
      <h2 id="post-modal-title">${escapeHtml(entry.title)}</h2>
      <p>${escapeHtml(entry.desc)}</p>
      <div class="pill-row align-start">${tags}</div>`,
  });
}
