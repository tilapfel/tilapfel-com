/**
 * Icon root: every SVG glyph used in the app lives here, once.
 * Nothing else defines an icon string — add new icons as a key on this object.
 */
export const ICONS = {
  about:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/></svg>',
  portfolio:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v18"/><path d="M6 4h11l-3 4 3 4H6"/></svg>',
  focus:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="M11 13 19 5"/><path d="M14 5h5v5"/></svg>',
  events:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0,-1.2)"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3.5v3M16 3.5v3"/></g></svg>',
  library:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="4" height="15" rx="1"/><rect x="10" y="3" width="4" height="17" rx="1"/><rect x="16" y="7" width="4" height="13" rx="1"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a8.2 8.2 0 1 0 10.8 10.8z"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z"/></svg>',
  share:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  easyLanguage:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 12.5h6"/><circle cx="17" cy="17.5" r="4.5" fill="var(--bg-card)"/><path d="m15.1 17.5 1.3 1.3 2.4-2.6"/></svg>',
  paragraph:
    '<svg viewBox="0 0 24 24"><text x="12" y="18.5" font-size="19" font-weight="700" fill="currentColor" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif">§</text></svg>',
  roleActivist:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V6a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0V11"/><path d="M16 11a1.5 1.5 0 0 1 3 0v3.5A6.5 6.5 0 0 1 12.5 21h-1A6.5 6.5 0 0 1 5 14.5v-1.6c0-.5.2-1 .6-1.3L7 10.5"/></svg>',
  roleBoard:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c2.8 1.8 4.5 5.5 4.5 9 0 2-.8 3.8-1.8 5l-2.7 2.8-2.7-2.8c-1-1.2-1.8-3-1.8-5 0-3.5 1.7-7.2 4.5-9z"/><circle cx="12" cy="9.5" r="1.8"/><path d="M8.3 15.5 5.5 17l1-3M15.7 15.5l2.8 1.5-1-3"/></svg>',
  roleLecturer:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="m8.5 12 2.5-3 2 2 3-3.5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9C1 8 2 4 6 4c2 0 4 1.2 6 4 2-2.8 4-4 6-4 4 0 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9z"/></svg>',
  network:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.8 7.6 10.4 16M16.2 7.6 13.6 16M8.4 6h7.2"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7.5v9l7-4.5z" fill="currentColor" stroke="none"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" stroke="none"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6.5 4.5 12l4.5 5.5M15 6.5l4.5 5.5-4.5 5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.2 19v-6.2h2.1l.3-2.6h-2.4V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v2h-2.2v2.6h2.2V19z" fill="currentColor" stroke="none"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="7.5" cy="7" r="1.3" fill="currentColor" stroke="none"/><path d="M7.5 10.2V19" stroke-linecap="round" stroke-width="2.2"/><path d="M12 10.2V19M12 13.8c0-2.4 1.4-3.6 3-3.6s3 1.2 3 3.6V19" stroke-linecap="round" stroke-width="2.2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6 8-6"/></svg>',
};

/** Ordered icons for the three "Roles" entries (About page + Home hero pills). */
export const ROLE_ICONS = [ICONS.roleActivist, ICONS.roleBoard, ICONS.roleLecturer];
