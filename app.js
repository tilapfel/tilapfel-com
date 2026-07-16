'use strict';

/* ---------- Icons ---------- */
const ICON_ROLE_ACTIVIST = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l7 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>';
const ICON_ROLE_BOARD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
const ICON_ROLE_LECTURER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-4 10 4-10 4-10-4z"/><path d="M6 11v4c0 1.2 2.7 2 6 2s6-.8 6-2v-4"/></svg>';
const ROLE_ICONS = { activist: ICON_ROLE_ACTIVIST, board: ICON_ROLE_BOARD, lecturer: ICON_ROLE_LECTURER };
const ROLE_ICON_KEYS = ['activist', 'board', 'lecturer'];

const ICONS = {
  about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/></svg>',
  portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v18"/><path d="M6 4h11l-3 4 3 4H6"/></svg>',
  focus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="M11 13 19 5"/><path d="M14 5h5v5"/></svg>',
  events: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0,-1.2)"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3.5v3M16 3.5v3"/></g></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="4" height="15" rx="1"/><rect x="10" y="3" width="4" height="17" rx="1"/><rect x="16" y="7" width="4" height="13" rx="1"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a8.2 8.2 0 1 0 10.8 10.8z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  lang: '<svg viewBox="0 0 24 24"><text x="4" y="16" font-size="11" font-weight="700" fill="currentColor" font-family="Georgia, serif">文</text><text x="13" y="19" font-size="11" font-weight="700" fill="currentColor" font-family="Arial, sans-serif">A</text></svg>'
};
const ICON_GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>';
const ICON_HEART_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9C1 8 2 4 6 4c2 0 4 1.2 6 4 2-2.8 4-4 6-4 4 0 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9z"/></svg>';
const ICON_NETWORK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.8 7.6 10.4 16M16.2 7.6 13.6 16M8.4 6h7.2"/></svg>';
const ICON_YOUTUBE_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7.5v9l7-4.5z" fill="currentColor" stroke="none"/></svg>';
const ICON_INSTAGRAM_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" stroke="none"/></svg>';
const ICON_GITHUB_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6.5 4.5 12l4.5 5.5M15 6.5l4.5 5.5-4.5 5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_FACEBOOK_SHARED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.2 19v-6.2h2.1l.3-2.6h-2.4V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v2h-2.2v2.6h2.2V19z" fill="currentColor" stroke="none"/></svg>';
const ICON_LINKEDIN_SHARED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="7.5" cy="7" r="1.3" fill="currentColor" stroke="none"/><path d="M7.5 10.2V19" stroke-linecap="round" stroke-width="2.2"/><path d="M12 10.2V19M12 13.8c0-2.4 1.4-3.6 3-3.6s3 1.2 3 3.6V19" stroke-linecap="round" stroke-width="2.2"/></svg>';
const ICON_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>';
const ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6 8-6"/></svg>';
const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 8l1.5-1.5a3 3 0 0 1 4.2 4.2L15 12.2M13 16l-1.5 1.5a3 3 0 0 1-4.2-4.2L8.7 11.8"/></svg>';

/* ---------- Nav ---------- */
const NAV = [
  { route: 'about', icon: 'about', label: { de: 'About', en: 'About' } },
  { route: 'portfolio', icon: 'portfolio', label: { de: 'Portfolio', en: 'Portfolio' } },
  { route: 'focus', icon: 'focus', label: { de: 'Focus', en: 'Focus' } },
  { route: 'events', icon: 'events', label: { de: 'Events', en: 'Events' } },
  { route: 'library', icon: 'library', label: { de: 'Library', en: 'Library' } }
];

/* ---------- Content data ---------- */
const PORTFOLIO = [
  { slug: 'studium', date: 'Seit 2010', date_en: 'Since 2010', category: 'Ausbildung', category_en: 'Education', location: 'Platzhalter', location_en: 'Placeholder', title: 'Studium & Ausbildung', title_en: 'Studies & Training', short: 'Grundlegende Ausbildung, auf der die heutige Arbeit aufbaut.', short_en: 'Foundational education underlying the current work.', full: 'Details zu Studiengang und Ausbildungsstationen folgen hier in Kürze.', full_en: 'Details on degree program and training stages will be added here soon.', approach: '(Platzhalter – wird ergänzt)', approach_en: '(Placeholder – to be added)' },
  { slug: 'dozent-aufbau', date: 'Seit 2019', date_en: 'Since 2019', category: 'Werdegang', category_en: 'Career Path', location: 'Selbständig', location_en: 'Self-employed', title: 'Aufbau der Selbständigkeit als Dozent', title_en: 'Building a Career as a Lecturer', short: 'Entwicklung einer eigenständigen Vortrags- und Lehrtätigkeit.', short_en: 'Developing independent speaking and teaching work.', full: 'Seit mehreren Jahren baue ich eine selbständige Tätigkeit als Dozent und Referent auf – von ersten Einzelvorträgen bis zu regelmäßigen Lehraufträgen.', full_en: 'For several years I have been building independent work as a lecturer and speaker – from first individual talks to regular teaching assignments.', approach: 'Der Weg führte über ehrenamtliche Vorträge zu bezahlten Aufträgen bei Bildungseinrichtungen, Verbänden und Unternehmen.', approach_en: 'The path led from volunteer talks to paid assignments with educational institutions, associations and companies.' },
  { slug: 'verbandsarbeit-tbv', date: 'Seit 2021', date_en: 'Since 2021', category: 'NGO-Engagement', category_en: 'NGO Engagement', location: 'Taubblinden-Verband', location_en: 'Deafblind Association', title: 'Vorstandsarbeit im Taubblinden-Verband', title_en: 'Board Work at the Deafblind Association', short: 'Interessenvertretung taubblinder Menschen auf Verbandsebene.', short_en: 'Representing deafblind people at the association level.', full: 'Als Vorstandsmitglied vertrete ich die Interessen taubblinder Menschen gegenüber Politik, Kostenträgern und Öffentlichkeit.', full_en: 'As a board member, I represent the interests of deafblind people to policymakers, funding bodies and the public.', approach: 'Dazu gehören Positionspapiere, Gespräche mit Ministerien und die Begleitung von Gesetzesvorhaben zur Teilhabe.', approach_en: 'This includes position papers, talks with ministries and following legislation on participation.' },
  { slug: 'edbu-engagement', date: 'Seit 2022', date_en: 'Since 2022', category: 'NGO-Engagement', category_en: 'NGO Engagement', location: 'European Deafblind Union', location_en: 'European Deafblind Union', title: 'Mitarbeit in der European Deafblind Union', title_en: 'Work with the European Deafblind Union', short: 'Engagement für gemeinsame europäische Standards.', short_en: 'Engagement for shared European standards.', full: 'Mitarbeit in einer europäischen Arbeitsgruppe zu Standards und Empfehlungen für assistive Technologien für taubblinde Menschen.', full_en: 'Contributing to a European working group on standards and recommendations for assistive technology for deafblind people.', approach: 'Die Arbeitsgruppe bringt Vertreter:innen aus mehreren europäischen Ländern zusammen, um gemeinsame Mindeststandards zu erarbeiten.', approach_en: 'The working group brings together representatives from several European countries to develop shared minimum standards.' },
  { slug: 'digitalisierung-beratung', date: 'Seit 2023', date_en: 'Since 2023', category: 'Eigenes Projekt', category_en: 'Own Project', location: 'Bundesweit', location_en: 'Nationwide', title: 'Barrierefreie Digitalisierung', title_en: 'Accessible Digitalization', short: 'Laufendes Beratungsprojekt für Behörden und Unternehmen.', short_en: 'Ongoing consulting project for public bodies and companies.', full: 'Beratung für Behörden und Unternehmen zur Umsetzung barrierefreier Software und Websites – von der ersten Konzeption bis zum Screenreader-Test.', full_en: 'Consulting for public bodies and companies implementing accessible software and websites – from initial concept to screen reader testing.', approach: 'Ich arbeite eng mit Entwicklungsteams zusammen und prüfe bestehende Anwendungen mit eigener Screenreader- und Braillezeilen-Praxis.', approach_en: 'I work closely with development teams and audit existing applications using my own screen reader and braille display practice.' },
  { slug: 'programmieren-lernen', date: '2015–2018', date_en: '2015–2018', category: 'Eigener Weg', category_en: 'Personal Path', location: 'Selbststudium', location_en: 'Self-taught', title: 'Programmieren als taubblinder Mensch', title_en: 'Programming as a Deafblind Person', short: 'Aneignung von Softwareentwicklung trotz fehlender barrierefreier Lernwege.', short_en: 'Learning software development despite a lack of accessible learning paths.', full: 'Ich habe mir Programmierung weitgehend selbst beigebracht – mit Screenreader und Braillezeile, oft ohne barrierefreie Lernmaterialien.', full_en: 'I largely taught myself programming – using a screen reader and braille display, often without accessible learning materials.', approach: 'Dieser Weg prägt bis heute, wie ich Software für andere taubblinde Nutzer:innen gestalte.', approach_en: 'This path still shapes how I design software for other deafblind users today.' }
];

const TERMINE = [
  { slug: 'digitale-teilhabe-heute', date: '22. Juli 2026', date_en: 'July 22, 2026', category: 'Vortrag', category_en: 'Talk', title: 'Digitale Teilhabe heute', title_en: 'Digital Participation Today', location: 'Fachtagung Inklusion, Berlin', location_en: 'Inclusion Conference, Berlin', detail: 'Ein Vortrag über den aktuellen Stand digitaler Teilhabe in Deutschland, mit Fokus auf öffentliche Verwaltung und Bildungseinrichtungen.', detail_en: 'A talk on the current state of digital participation in Germany, focused on public administration and education.', info: 'Zielgruppe: Fachpublikum aus Verwaltung und Bildung. Dauer: 45 Minuten inkl. Fragerunde.', info_en: 'Audience: professionals from administration and education. Duration: 45 minutes incl. Q&A.' },
  { slug: 'vorstandssitzung-august', date: '5. August 2026', date_en: 'August 5, 2026', category: 'Vorstand', category_en: 'Board', title: 'Vorstandssitzung Taubblinden-Verband', title_en: 'Deafblind Association Board Meeting', location: 'Verbandsbüro, Köln', location_en: 'Association Office, Cologne', detail: 'Reguläre Vorstandssitzung zu laufenden Anträgen, Haushalt und anstehenden Veranstaltungen des Verbands.', detail_en: 'Regular board meeting covering ongoing applications, budget and upcoming association events.', info: 'Verbandsintern – Teilnahme nach Absprache mit der Geschäftsstelle.', info_en: 'Internal to the association – attendance by arrangement with the office.' },
  { slug: 'barrierefreie-software-workshop', date: '14. September 2026', date_en: 'September 14, 2026', category: 'Workshop', category_en: 'Workshop', title: 'Barrierefreie Software gestalten', title_en: 'Designing Accessible Software', location: 'Online', location_en: 'Online', detail: 'Praxisworkshop für Entwicklungsteams: gemeinsames Testen eigener Anwendungen mit Screenreader und Braillezeile.', detail_en: 'Hands-on workshop for engineering teams: testing your own applications together with a screen reader and braille display.', info: 'Zielgruppe: Entwickler:innen und Produktteams. Dauer: 3 Stunden, max. 15 Teilnehmende.', info_en: 'Audience: developers and product teams. Duration: 3 hours, max. 15 participants.' },
  { slug: 'taubblind-leben-wien', date: '2. Oktober 2026', date_en: 'October 2, 2026', category: 'Vortrag', category_en: 'Talk', title: 'Taubblind leben – Erfahrungsbericht', title_en: 'Living Deafblind – A First-Hand Account', location: 'Universität Wien', location_en: 'University of Vienna', detail: 'Persönlicher Erfahrungsbericht über Alltag, Kommunikation und Selbstbestimmung als taubblinder Mensch.', detail_en: 'A personal account of everyday life, communication and self-determination as a deafblind person.', info: 'Zielgruppe: Studierende und Öffentlichkeit. Dauer: 60 Minuten.', info_en: 'Audience: students and the public. Duration: 60 minutes.' },
  { slug: 'edbu-treffen-bruessel', date: '20. Oktober 2026', date_en: 'October 20, 2026', category: 'International', category_en: 'International', title: 'EDBU Arbeitsgruppentreffen', title_en: 'EDBU Working Group Meeting', location: 'Brüssel', location_en: 'Brussels', detail: 'Zweitägiges Treffen der europäischen Arbeitsgruppe Technologie zur Abstimmung gemeinsamer Standards.', detail_en: 'Two-day meeting of the European technology working group to align on shared standards.', info: 'Teilnahme auf Einladung der European Deafblind Union.', info_en: 'By invitation of the European Deafblind Union.' },
  { slug: 'screenreader-testing-hamburg', date: '11. November 2026', date_en: 'November 11, 2026', category: 'Workshop', category_en: 'Workshop', title: 'Screenreader-Testing für Entwicklerteams', title_en: 'Screen Reader Testing for Dev Teams', location: 'Hamburg', location_en: 'Hamburg', detail: 'Hands-on-Workshop zum systematischen Testen von Web- und App-Oberflächen mit gängigen Screenreadern.', detail_en: 'Hands-on workshop on systematically testing web and app interfaces with common screen readers.', info: 'Zielgruppe: QA und Entwicklung. Dauer: ganztägig.', info_en: 'Audience: QA and engineering. Duration: full day.' }
];

const PAST_TERMINE_DE = [
  { date: '8. Mai 2025', category: 'International', title: 'EDBU Generalversammlung', location: 'Kopenhagen' },
  { date: '12. November 2025', category: 'Vortrag', title: 'Inklusionstage Frankfurt', location: 'Frankfurt am Main' }
];
const PAST_TERMINE_EN = [
  { date: 'May 8, 2025', category: 'International', title: 'EDBU General Assembly', location: 'Copenhagen' },
  { date: 'November 12, 2025', category: 'Talk', title: 'Inclusion Days Frankfurt', location: 'Frankfurt am Main' }
];

const LIBRARY_DE = [
  { type: 'App', title: 'AccessNav', desc: 'Navigations-App mit taktiler und akustischer Rückmeldung für taubblinde Nutzer:innen.' },
  { type: 'Essay', title: 'Doppelte Sinnesbeeinträchtigung', desc: 'Fachbeitrag über die besonderen Anforderungen an digitale Barrierefreiheit.' },
  { type: 'Podcast', title: 'Zwischentöne', desc: 'Interviewreihe mit Aktivist:innen aus der Behindertenbewegung.' }
];
const LIBRARY_EN = [
  { type: 'App', title: 'AccessNav', desc: 'Navigation app with tactile and audio feedback for deafblind users.' },
  { type: 'Essay', title: 'Dual Sensory Impairment', desc: 'An article on the specific accessibility requirements involved.' },
  { type: 'Podcast', title: 'Zwischentöne', desc: 'An interview series with activists from the disability rights movement.' }
];

const PRESS_DE = [
  { outlet: 'Deutschlandfunk', date: 'April 2025', title: 'Wenn zwei Sinne fehlen, wächst die Stimme' },
  { outlet: 'Süddeutsche Zeitung', date: 'November 2024', title: 'Der Mann, der Barrieren programmiert' },
  { outlet: 'taz', date: 'Februar 2026', title: 'Teilhabe ist keine Frage der Technik allein' }
];
const PRESS_EN = [
  { outlet: 'Deutschlandfunk', date: 'April 2025', title: 'When Two Senses Are Missing, the Voice Grows Louder' },
  { outlet: 'Süddeutsche Zeitung', date: 'November 2024', title: 'The Man Who Codes Away Barriers' },
  { outlet: 'taz', date: 'February 2026', title: 'Participation Is Not a Question of Technology Alone' }
];

const FOCUS_ITEMS_DE = [
  { title: 'Verbandsarbeit bei TBV und EDBU', desc: 'Interessenvertretung auf nationaler und europäischer Ebene.' },
  { title: 'Aufbau der Selbständigkeit als Dozent', desc: 'Eigenständige Vortrags- und Lehrtätigkeit rund um Barrierefreiheit.' },
  { title: 'Programmieren lernen als Taubblinder', desc: 'Zugang zu Softwareentwicklung trotz fehlender barrierefreier Lernwege.' }
];
const FOCUS_ITEMS_EN = [
  { title: 'Association Work at TBV and EDBU', desc: 'Advocacy at the national and European level.' },
  { title: 'Building a Career as a Lecturer', desc: 'Independent speaking and teaching work around accessibility.' },
  { title: 'Learning to Program as Deafblind', desc: 'Access to software development despite a lack of accessible learning paths.' }
];

const WERTE_DE = ['Softwareentwicklung (Programmieren)', 'Pflanzlich kochen (Vegan)', 'Psychische Gesundheit (Psychologie)', 'Naturaktivitäten (Natursport)', 'Menschenrechte (Gerechtigkeit)'];
const WERTE_EN = ['Software Development (Programming)', 'Plant-Based Cooking (Vegan)', 'Mental Health (Psychology)', 'Outdoor Activities (Nature Sports)', 'Human Rights (Justice)'];

const PRINCIPLES_DE = ['Barrierefreiheit ist kein Extra, sondern die Grundlage.', 'Teilhabe entsteht durch Zugang, nicht durch Rücksicht.', 'Ich zeige, was mit den richtigen Werkzeugen möglich ist.'];
const PRINCIPLES_EN = ['Accessibility is not an extra, it is the foundation.', 'Participation comes from access, not from pity.', 'I show what is possible with the right tools.'];

const BOOKABLE_DE = [
  { title: 'Vortrag', desc: 'Vorträge zu Taubblindheit, Barrierefreiheit und digitaler Teilhabe für Fachpublikum und Bildungseinrichtungen.' },
  { title: 'Beratung', desc: 'Barrierefreiheits-Audits und Beratung für Behörden, Verbände und Unternehmen.' },
  { title: 'Dozententätigkeit', desc: 'Lehrveranstaltungen und Workshops zu barrierefreier Softwaregestaltung.' }
];
const BOOKABLE_EN = [
  { title: 'Talk', desc: 'Talks on deafblindness, accessibility and digital participation for professionals and schools.' },
  { title: 'Consulting', desc: 'Accessibility audits and consulting for public bodies, associations and companies.' },
  { title: 'Lecturing', desc: 'Courses and workshops on accessible software design.' }
];

const BIO_LINKS = [
  { label: 'Website', href: '#/', url: 'tilapfel.com', bg: 'oklch(52% 0.09 200)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_NETWORK },
  { label: 'Stiftung', href: 'https://stiftung.tilapfel.com', url: 'stiftung.tilapfel.com', bg: 'oklch(52% 0.09 60)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_HEART_GLYPH },
  { label: 'Apps', href: 'https://apps.tilapfel.com', url: 'apps.tilapfel.com', bg: 'oklch(52% 0.09 140)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_GRID },
  { label: 'YouTube', href: 'https://www.youtube.com/@tilapfel', url: 'youtube.com/@tilapfel', bg: 'oklch(52% 0.09 25)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_YOUTUBE_GLYPH },
  { label: 'Instagram', href: 'https://www.instagram.com/tilapfel', url: 'instagram.com/tilapfel', bg: 'oklch(52% 0.09 340)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_INSTAGRAM_GLYPH },
  { label: 'Facebook', href: 'https://www.facebook.com/tilapfel', url: 'facebook.com/tilapfel', bg: 'oklch(52% 0.09 255)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_FACEBOOK_SHARED },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tilapfel', url: 'linkedin.com/in/tilapfel', bg: 'oklch(52% 0.09 230)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_LINKEDIN_SHARED },
  { label: 'GitHub', href: 'https://github.com/tilapfel', url: 'github.com/tilapfel', bg: 'oklch(30% 0 0)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_GITHUB_GLYPH }
];

const SOCIAL_FOOTER = [
  { label: 'YouTube', href: 'https://www.youtube.com/@tilapfel', icon: ICON_YOUTUBE_GLYPH },
  { label: 'Instagram', href: 'https://www.instagram.com/tilapfel', icon: ICON_INSTAGRAM_GLYPH },
  { label: 'Facebook', href: 'https://www.facebook.com/tilapfel', icon: ICON_FACEBOOK_SHARED },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tilapfel', icon: ICON_LINKEDIN_SHARED },
  { label: 'GitHub', href: 'https://github.com/tilapfel', icon: ICON_GITHUB_GLYPH }
];

const T_DE = {
  skip: 'Zum Inhalt springen', heroTagline: 'Taubblind-Aktivist',
  aboutTitle: 'About', aboutSubtitle: 'Wer ich bin und woran ich arbeite.', moreAbout: 'Mehr über mich →',
  uberMichText: 'Als taubblinder Mensch setze ich mich seit über zehn Jahren für digitale und gesellschaftliche Teilhabe ein. Ich halte Vorträge, sitze im Vorstand eines Fachverbands und engagiere mich als Dozent – aus eigener Erfahrung und mit klarem Anspruch an Zugänglichkeit für alle.',
  aboutP1: 'Ich bin Til Apfel, taubblind seit meiner Kindheit. Diese doppelte Sinnesbeeinträchtigung hat meinen Blick auf Barrierefreiheit geschärft – nicht als Checkliste, sondern als Grundvoraussetzung für ein selbstbestimmtes Leben.',
  aboutP2: 'Als Aktivist und Dozent spreche ich auf Fachtagungen, Kongressen und in Schulen über Taubblindheit, assistive Technologien und digitale Teilhabe. Im Vorstand eines Fachverbands vertrete ich die Interessen taubblinder Menschen gegenüber Politik und Institutionen.',
  aboutP3: 'Mein Antrieb ist einfach: Ich will, dass niemand wegen fehlender Barrierefreiheit von Information, Bildung oder Mitbestimmung ausgeschlossen wird – und ich arbeite jeden Tag daran, das zu ändern.',
  haltungHeading: 'Meine Haltung', rollenHeading: 'Rollen', werteHeading: 'Werte',
  aboutCtaText: 'Interesse an einer Zusammenarbeit?', aboutCtaLink: 'Jetzt Kontakt aufnehmen',
  portfolioTitle: 'Portfolio', portfolioSubtitle: 'Wege, die ich gegangen bin.',
  focusTitle: 'Focus', focusSubtitle: 'Wofür ich stehe.', focusClosing: 'Zu diesen Themen bin ich grundsätzlich ansprechbar und buchbar.', moreFocus: 'Mehr zu meinen Themen →',
  eventsTitle: 'Events', eventsSubtitle: 'Wo Sie mich treffen und buchen können.', registerBtn: 'Zu diesem Termin anmelden',
  upcomingHeading: 'Kommende Termine', bookableHeading: 'Buchbare Formate', ctaKostenvoranschlag: 'Kostenvoranschlag anfragen', pastHeading: 'Vergangene Termine',
  libraryTitle: 'Library', librarySubtitle: 'Was ich veröffentlicht habe.', pressHeading: 'Presse & Medien', moreLibrary: 'Zur Library →',
  impressumSubtitle: 'Rechtliche Angaben zu meiner Person.',
  formularTitle: 'Kostenvoranschlag anfragen', formularSubtitle: 'Fragen Sie mich nach einem Angebot.',
  kontaktTitle: 'Kontakt', kontaktSubtitle: 'Schreiben Sie mir eine Nachricht.', labelNachricht: 'Nachricht', kontaktSubmitBtn: 'Nachricht senden',
  labelName: 'Name', labelEmail: 'E-Mail', labelArt: 'Art des Anliegens', labelBeschreibung: 'Beschreibung', labelZeitrahmen: 'Gewünschter Zeitrahmen', submitBtn: 'Anfrage senden',
  alleProjekte: 'Alle Portfolio-Einträge ansehen →', alleTermine: 'Alle Events ansehen →',
  footerKontakt: 'Kontakt', footerImpressum: 'Impressum', closeDialog: 'Schließen',
  bioIntro: 'Taubblind-Aktivist. Ich setze mich für digitale und gesellschaftliche Teilhabe taubblinder Menschen ein.'
};
const T_EN = {
  skip: 'Skip to content', heroTagline: 'Deafblind Activist',
  aboutTitle: 'About', aboutSubtitle: 'Who I am and what I work on.', moreAbout: 'More about me →',
  uberMichText: 'As a deafblind person, I have worked for over ten years on digital and social participation. I give talks, serve on the board of a professional association, and work as a lecturer – drawing on lived experience and a clear commitment to accessibility for everyone.',
  aboutP1: "I'm Til Apfel, deafblind since childhood. This dual sensory impairment has sharpened my view of accessibility – not as a checklist, but as a basic requirement for a self-determined life.",
  aboutP2: 'As an activist and lecturer, I talk at conferences, congresses and schools about deafblindness, assistive technology and digital participation. As a board member of a professional association, I represent the interests of deafblind people to policymakers and institutions.',
  aboutP3: 'My motivation is simple: no one should be excluded from information, education or participation because of missing accessibility – and I work on changing that every day.',
  haltungHeading: 'My Approach', rollenHeading: 'Roles', werteHeading: 'Values',
  aboutCtaText: 'Interested in working together?', aboutCtaLink: 'Get in touch',
  portfolioTitle: 'Portfolio', portfolioSubtitle: 'Paths I have taken.',
  focusTitle: 'Focus', focusSubtitle: 'What I stand for.', focusClosing: "I'm generally approachable and bookable on these topics.", moreFocus: 'More on my focus →',
  eventsTitle: 'Events', eventsSubtitle: 'Where you can meet and book me.', registerBtn: 'Register for this event',
  upcomingHeading: 'Upcoming Events', bookableHeading: 'Bookable Formats', ctaKostenvoranschlag: 'Request a quote', pastHeading: 'Past Events',
  libraryTitle: 'Library', librarySubtitle: 'What I have published.', pressHeading: 'Press & Media', moreLibrary: 'Go to Library →',
  impressumSubtitle: 'Legal information about me.',
  formularTitle: 'Request a Quote', formularSubtitle: 'Ask me for a quote.',
  kontaktTitle: 'Contact', kontaktSubtitle: 'Send me a message.', labelNachricht: 'Message', kontaktSubmitBtn: 'Send message',
  labelName: 'Name', labelEmail: 'Email', labelArt: 'Type of request', labelBeschreibung: 'Description', labelZeitrahmen: 'Desired timeframe', submitBtn: 'Send request',
  alleProjekte: 'View all portfolio entries →', alleTermine: 'View all events →',
  footerKontakt: 'Contact', footerImpressum: 'Legal Notice', closeDialog: 'Close',
  bioIntro: 'Deafblind activist and advocate. I work for the digital and social participation of deafblind people.'
};

const CONTACT_EMAIL = 'info@tilapfel.com';

/* ---------- Helpers ---------- */
function pick(obj, lang) {
  const out = {};
  for (const k in obj) {
    if (k.endsWith('_en')) continue;
    out[k] = (lang === 'en' && obj[k + '_en'] !== undefined) ? obj[k + '_en'] : obj[k];
  }
  return out;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- State ---------- */
let storedLang = null, storedTheme = null;
try { storedLang = localStorage.getItem('tilapfel-lang'); } catch (e) {}
try { storedTheme = localStorage.getItem('tilapfel-theme'); } catch (e) {}

const state = {
  lang: storedLang || ((navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'de'),
  theme: storedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  eventsExpanded: false,
  langMenuOpen: false
};

function parseRoute() {
  const h = location.hash || '#/';
  return h.replace(/^#\/?/, '');
}

/* ---------- Derived values ---------- */
function computeVals() {
  const route = parseRoute();
  const segs = route.split('/').filter(Boolean);
  const section = segs[0] || '';
  const slug = segs[1];
  const isBio = section === 'bio';
  const lang = state.lang;
  const t = lang === 'en' ? T_EN : T_DE;

  const portfolioLocalized = PORTFOLIO.map(p => ({ ...pick(p, lang), href: '#/portfolio/' + p.slug }));
  const termineLocalized = TERMINE.map(tm => ({
    ...pick(tm, lang),
    href: '#/events/' + tm.slug,
    rsvpHref: 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent((lang === 'en' ? 'Registration: ' : 'Anmeldung: ') + (lang === 'en' ? tm.title_en : tm.title))
  }));

  const currentPortfolio = section === 'portfolio' && slug ? portfolioLocalized.find(p => p.slug === slug) : null;
  const currentTermin = section === 'events' && slug ? termineLocalized.find(tm => tm.slug === slug) : null;

  const expanded = state.eventsExpanded;
  const visibleTermine = expanded ? termineLocalized : termineLocalized.slice(0, 3);
  const remaining = termineLocalized.length - 3;
  const pastTermine = lang === 'en' ? PAST_TERMINE_EN : PAST_TERMINE_DE;
  const roleLabels = lang === 'en' ? ['Activist', 'Board Member', 'Lecturer'] : ['Aktivist', 'Vorstand', 'Dozent'];
  const roleDescs = lang === 'en'
    ? ['Advocacy for the rights and visibility of deafblind people.', 'Advocacy in the professional association for deafblind people.', 'Teaching accessibility and participation through talks and courses.']
    : ['Engagement für die Rechte und Sichtbarkeit taubblinder Menschen.', 'Interessenvertretung im Fachverband für taubblinde Menschen.', 'Vermittlung von Wissen zu Barrierefreiheit und Teilhabe in Vorträgen und Lehrveranstaltungen.'];

  return {
    route, section, slug, isBio, lang, t,
    navItems: NAV.map(n => ({ ...n, label: n.label[lang], href: '#/' + n.route, current: section === n.route })),
    portfolio: portfolioLocalized,
    homePortfolio: portfolioLocalized.slice(0, 2),
    termine: termineLocalized,
    homeTermine: termineLocalized.slice(0, 1),
    visibleTermine,
    hasMoreTermine: remaining > 0 && !expanded,
    moreEventsLabel: lang === 'en' ? ('Show ' + remaining + ' more events') : ('Weitere ' + remaining + ' Termine anzeigen'),
    pastTermine,
    hasPastTermine: pastTermine.length > 0,
    currentPortfolio, currentTermin,
    library: lang === 'en' ? LIBRARY_EN : LIBRARY_DE,
    homeLibrary: (lang === 'en' ? LIBRARY_EN : LIBRARY_DE).slice(0, 2),
    press: lang === 'en' ? PRESS_EN : PRESS_DE,
    focusItems: lang === 'en' ? FOCUS_ITEMS_EN : FOCUS_ITEMS_DE,
    werte: lang === 'en' ? WERTE_EN : WERTE_DE,
    principles: lang === 'en' ? PRINCIPLES_EN : PRINCIPLES_DE,
    bookableFormats: lang === 'en' ? BOOKABLE_EN : BOOKABLE_DE,
    roles: ROLE_ICON_KEYS.map((key, i) => ({ label: roleLabels[i], icon: ROLE_ICONS[key] })),
    aboutRoles: ROLE_ICON_KEYS.map((key, i) => ({ title: roleLabels[i], desc: roleDescs[i], icon: ROLE_ICONS[key] })),
    bioLinks: BIO_LINKS,
    socialLinks: SOCIAL_FOOTER,
    auftragArten: lang === 'en' ? ['Consulting', 'Talk', 'Software Development', 'Other'] : ['Beratung', 'Vortrag', 'Softwareentwicklung', 'Sonstiges']
  };
}

/* ---------- Renderers ---------- */
function renderHeader(v) {
  if (v.isBio) return '';
  const navHtml = v.navItems.map(n => `
    <a class="nav-link" href="${n.href}" ${n.current ? 'aria-current="page"' : ''}>
      <span class="nav-icon" aria-hidden="true">${ICONS[n.icon]}</span>
      <span class="nav-label">${esc(n.label)}</span>
    </a>`).join('');
  return `
  <header class="site-header">
    <div class="header-inner">
      <div class="header-top-row">
        <a href="#/" class="brand">Til Apfel</a>
      </div>
      <nav class="nav-full" aria-label="Hauptnavigation">${navHtml}</nav>
    </div>
  </header>`;
}

function renderHome(v) {
  const t = v.t;
  const roles = v.roles.map(r => `<span class="pill"><span aria-hidden="true">${r.icon}</span><span>${esc(r.label)}</span></span>`).join('');
  const portfolioCards = v.homePortfolio.map(p => `
    <a class="list-card" href="${p.href}">
      <span class="eyebrow">${esc(p.date)} · ${esc(p.category)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:6px">${esc(p.title)}</span>
      <span class="desc">${esc(p.short)}</span>
    </a>`).join('');
  const focusPills = v.focusItems.map(f => `<span class="pill solid">${esc(f.title)}</span>`).join('');
  const eventCards = v.homeTermine.map(tm => `
    <a class="list-card" href="${tm.href}">
      <span class="eyebrow-plain">${esc(tm.date)} · ${esc(tm.category)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:4px">${esc(tm.title)}</span>
      <span class="loc">${esc(tm.location)}</span>
    </a>`).join('');
  const libraryCards = v.homeLibrary.map(l => `
    <div class="card">
      <span class="eyebrow">${esc(l.type)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:4px">${esc(l.title)}</span>
      <span class="loc">${esc(l.desc)}</span>
    </div>`).join('');

  return `
  <div data-screen-label="Start">
    <section class="section-hero">
      <img src="./assets/profilfoto.png" alt="Portrait von Til Apfel" class="avatar">
      <div>
        <h1>${esc(t.heroTagline)}</h1>
        <div class="pill-row" style="margin-top:18px">${roles}</div>
      </div>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.aboutTitle)}</h2>
      <div class="card"><p>${esc(t.uberMichText)}</p></div>
      <a href="#/about" class="more-link">${esc(t.moreAbout)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.portfolioTitle)}</h2>
      <div class="card-list">${portfolioCards}</div>
      <a href="#/portfolio" class="more-link">${esc(t.alleProjekte)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.focusTitle)}</h2>
      <div class="card"><div class="pill-row align-start">${focusPills}</div></div>
      <a href="#/focus" class="more-link">${esc(t.moreFocus)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.eventsTitle)}</h2>
      <div class="card-list">${eventCards}</div>
      <a href="#/events" class="more-link">${esc(t.alleTermine)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.libraryTitle)}</h2>
      <div class="card-list">${libraryCards}</div>
      <a href="#/library" class="more-link">${esc(t.moreLibrary)}</a>
    </section>
  </div>`;
}

function renderAbout(v) {
  const t = v.t;
  const principles = v.principles.map(p => `
    <div class="principle-item"><span class="principle-dot" aria-hidden="true"></span><span class="body-text">${esc(p)}</span></div>`).join('');
  const roles = v.aboutRoles.map(r => `
    <div class="role-item">
      <span class="role-icon" aria-hidden="true">${r.icon}</span>
      <div class="role-text"><span class="role-title">${esc(r.title)}</span><span class="role-desc">${esc(r.desc)}</span></div>
    </div>`).join('');
  const werte = v.werte.map(w => `<span class="pill solid">${esc(w)}</span>`).join('');

  return `
  <div data-screen-label="About">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.about}<span>${esc(t.aboutTitle)}</span></h1>
      <p class="subtitle">${esc(t.aboutSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="about-body">
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP1)}</p>
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP2)}</p>
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP3)}</p>

      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.haltungHeading)}</h2>
        <div class="stack-gap">${principles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.rollenHeading)}</h2>
        <div class="stack-gap-lg">${roles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.werteHeading)}</h2>
        <div class="pill-row align-start">${werte}</div>
      </div>

      <a href="#/kontakt" class="cta-button">${esc(t.aboutCtaText)} — ${esc(t.aboutCtaLink)}</a>
    </section>
  </div>`;
}

function renderPortfolioList(v) {
  const t = v.t;
  const cards = v.portfolio.map(p => `
    <a class="list-card" href="${p.href}">
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px">
        <span style="font-size:12px;font-weight:700;color:var(--text-tertiary)">${esc(p.date)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">·</span>
        <span class="eyebrow" style="margin:0">${esc(p.category)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">·</span>
        <span style="font-size:12px;color:var(--text-tertiary)">${esc(p.location)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="desc">${esc(p.short)}</p>
    </a>`).join('');
  return `
  <div data-screen-label="Portfolio">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.portfolio}<span>${esc(t.portfolioTitle)}</span></h1>
      <p class="subtitle">${esc(t.portfolioSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">${cards}</section>
  </div>`;
}

function renderPortfolioModal(v) {
  const t = v.t;
  const p = v.currentPortfolio;
  if (!p) return '';
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="pf-modal-title" data-modal="portfolio">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${esc(t.closeDialog)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      <div class="modal-eyebrow-row">
        <span>${esc(p.date)}</span><span>·</span><span class="cat">${esc(p.category)}</span><span>·</span><span>${esc(p.location)}</span>
      </div>
      <h2 id="pf-modal-title">${esc(p.title)}</h2>
      <p>${esc(p.full)}</p>
      <p>${esc(p.approach)}</p>
    </div>
  </div>`;
}

function renderFocus(v) {
  const t = v.t;
  const cards = v.focusItems.map(f => `
    <div class="card card-simple"><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join('');
  return `
  <div data-screen-label="Focus">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.focus}<span>${esc(t.focusTitle)}</span></h1>
      <p class="subtitle">${esc(t.focusSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      ${cards}
      <p style="font-size:16px;line-height:1.6;color:var(--text-primary)">${esc(t.focusClosing)}</p>
    </section>
  </div>`;
}

function renderEventsList(v) {
  const t = v.t;
  const bookable = v.bookableFormats.map(b => `
    <div class="card card-simple"><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p></div>`).join('');
  const upcoming = v.visibleTermine.map(tm => `
    <a class="list-card" href="${tm.href}">
      <span class="eyebrow-plain">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h3>${esc(tm.title)}</h3>
      <span class="loc">${esc(tm.location)}</span>
    </a>`).join('');
  const showMore = v.hasMoreTermine
    ? `<button type="button" class="btn-outline" data-action="show-more-events">${esc(v.moreEventsLabel)}</button>` : '';
  const pastSection = v.hasPastTermine ? `
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.pastHeading)}</h2>
      ${v.pastTermine.map(pt => `
        <div class="list-card past">
          <span class="eyebrow-plain">${esc(pt.date)} · ${esc(pt.category)}</span>
          <h3>${esc(pt.title)}</h3>
          <span class="loc">${esc(pt.location)}</span>
        </div>`).join('')}
    </section>` : '';

  return `
  <div data-screen-label="Events">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.events}<span>${esc(t.eventsTitle)}</span></h1>
      <p class="subtitle">${esc(t.eventsSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.bookableHeading)}</h2>
      ${bookable}
      <a href="#/formular" class="cta-button compact">${esc(t.ctaKostenvoranschlag)}</a>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.upcomingHeading)}</h2>
      ${upcoming}
      ${showMore}
    </section>
    ${pastSection}
  </div>`;
}

function renderEventModal(v) {
  const t = v.t;
  const tm = v.currentTermin;
  if (!tm) return '';
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ev-modal-title" data-modal="event">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${esc(t.closeDialog)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      <span class="modal-eyebrow-row">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h2 id="ev-modal-title">${esc(tm.title)}</h2>
      <p class="modal-location">${esc(tm.location)}</p>
      <p>${esc(tm.detail)}</p>
      <p>${esc(tm.info)}</p>
      <a href="${tm.rsvpHref}" class="cta-button compact">${esc(t.registerBtn)}</a>
    </div>
  </div>`;
}

function renderLibrary(v) {
  const t = v.t;
  const items = v.library.map(l => `
    <div class="card card-simple">
      <span class="eyebrow">${esc(l.type)}</span>
      <h3>${esc(l.title)}</h3>
      <p>${esc(l.desc)}</p>
    </div>`).join('');
  const press = v.press.map(p => `
    <div class="card" style="padding:clamp(16px,3vw,20px)">
      <span style="display:block;font-size:12px;color:var(--text-tertiary);margin-bottom:4px">${esc(p.outlet)} · ${esc(p.date)}</span>
      <h3 style="font-size:16px;font-weight:600;color:var(--text-primary);margin:0">${esc(p.title)}</h3>
    </div>`).join('');
  return `
  <div data-screen-label="Library">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.library}<span>${esc(t.libraryTitle)}</span></h1>
      <p class="subtitle">${esc(t.librarySubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">${items}</section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.pressHeading)}</h2>
      ${press}
    </section>
  </div>`;
}

function renderFormular(v) {
  const t = v.t;
  const artOptions = v.auftragArten.map(a => `<option value="${esc(a)}">${esc(a)}</option>`).join('');
  return `
  <div data-screen-label="Anfrage">
    <section class="page-hero">
      <h1>${esc(t.formularTitle)}</h1>
      <p class="subtitle">${esc(t.formularSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="auftrag">
        <div class="form-field"><label for="auftrag-name">${esc(t.labelName)}</label><input id="auftrag-name" name="name" type="text" required></div>
        <div class="form-field"><label for="auftrag-email">${esc(t.labelEmail)}</label><input id="auftrag-email" name="email" type="email" required></div>
        <div class="form-field"><label for="auftrag-art">${esc(t.labelArt)}</label><select id="auftrag-art" name="art">${artOptions}</select></div>
        <div class="form-field"><label for="auftrag-beschreibung">${esc(t.labelBeschreibung)}</label><textarea id="auftrag-beschreibung" name="beschreibung" rows="5" required></textarea></div>
        <div class="form-field"><label for="auftrag-zeitrahmen">${esc(t.labelZeitrahmen)}</label><input id="auftrag-zeitrahmen" name="zeitrahmen" type="text"></div>
        <button type="submit" class="submit-btn">${esc(t.submitBtn)}</button>
      </form>
    </section>
  </div>`;
}

function renderKontakt(v) {
  const t = v.t;
  return `
  <div data-screen-label="Kontakt">
    <section class="page-hero">
      <h1 class="page-title">${ICON_MAIL}<span>${esc(t.kontaktTitle)}</span></h1>
      <p class="subtitle">${esc(t.kontaktSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="kontakt">
        <div class="form-field"><label for="kontakt-name">${esc(t.labelName)}</label><input id="kontakt-name" name="name" type="text" required></div>
        <div class="form-field"><label for="kontakt-email">${esc(t.labelEmail)}</label><input id="kontakt-email" name="email" type="email" required></div>
        <div class="form-field"><label for="kontakt-nachricht">${esc(t.labelNachricht)}</label><textarea id="kontakt-nachricht" name="nachricht" rows="6" required></textarea></div>
        <button type="submit" class="submit-btn">${esc(t.kontaktSubmitBtn)}</button>
      </form>
    </section>
  </div>`;
}

function renderBio(v) {
  const t = v.t;
  const tiles = v.bioLinks.map(l => `
    <a class="bio-tile" href="${l.href}" style="background:${l.bg}">
      <span class="bio-tile-icon" aria-hidden="true" style="color:${l.fg}">${l.icon}</span>
      <span class="bio-tile-text">
        <span class="bio-tile-label" style="color:${l.fg}">${esc(l.label)}</span>
        <span class="bio-tile-url" style="color:${l.fgMuted}">${esc(l.url)}</span>
      </span>
    </a>`).join('');
  return `
  <div data-screen-label="Bio">
    <section class="bio-page">
      <img src="./assets/profilfoto.png" alt="Portrait von Til Apfel" class="avatar-lg">
      <div>
        <h1 class="bio-name">Til Apfel</h1>
        <p class="bio-intro">${esc(t.bioIntro)}</p>
      </div>
    </section>
    <section class="bio-links">
      <div class="bio-grid">${tiles}</div>
    </section>
  </div>`;
}

function renderImpressum(v) {
  const t = v.t;
  return `
  <div data-screen-label="Impressum">
    <section class="page-hero">
      <h1 class="page-title">${ICON_DOC}<span>Impressum</span></h1>
      <p class="subtitle">${esc(t.impressumSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section" style="display:flex;flex-direction:column;gap:6px">
      <p style="font-size:16px;line-height:1.7;color:var(--text-primary)">Til Apfel</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary)">Musterstraße 12, 12345 Musterstadt (Platzhalter)</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary);margin-bottom:12px">E-Mail: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> (Platzhalter)</p>
      <p style="font-size:14px;line-height:1.6;color:var(--text-tertiary)">Verantwortlich gemäß §55 Abs. 2 RStV: Til Apfel</p>
    </section>
  </div>`;
}

function renderFooter(v) {
  const t = v.t;
  const langMenu = state.langMenuOpen ? `
    <div class="lang-menu-backdrop" data-close-lang-menu></div>
    <div class="lang-menu">
      <button type="button" class="${v.lang === 'de' ? 'active' : ''}" data-set-lang="de" aria-pressed="${v.lang === 'de'}"><span>Deutsch</span>${v.lang === 'de' ? '<span aria-hidden="true">✓</span>' : ''}</button>
      <button type="button" class="${v.lang === 'en' ? 'active' : ''}" data-set-lang="en" aria-pressed="${v.lang === 'en'}"><span>English</span>${v.lang === 'en' ? '<span aria-hidden="true">✓</span>' : ''}</button>
    </div>` : '';
  const themeLabel = state.theme === 'dark'
    ? (v.lang === 'en' ? 'Switch to light mode' : 'Zu Hell wechseln')
    : (v.lang === 'en' ? 'Switch to dark mode' : 'Zu Dunkel wechseln');
  const socials = v.socialLinks.map(s => `
    <a class="icon-btn" href="${s.href}" aria-label="${esc(s.label)}" title="${esc(s.label)}" target="_blank" rel="noopener noreferrer">
      <span aria-hidden="true">${s.icon}</span>
    </a>`).join('');

  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-row">
        <div class="footer-left">
          <button type="button" class="icon-btn" data-action="toggle-theme" aria-label="${esc(themeLabel)}" title="${esc(themeLabel)}">
            <span aria-hidden="true">${state.theme === 'dark' ? ICONS.moon : ICONS.sun}</span>
          </button>
          <div class="lang-menu-wrap">
            <button type="button" class="icon-btn" data-action="toggle-lang-menu" aria-expanded="${state.langMenuOpen}" aria-haspopup="true" aria-label="Sprache / Language" title="Sprache / Language">
              <span aria-hidden="true">${ICONS.lang}</span>
            </button>
            ${langMenu}
          </div>
          <a class="icon-btn" href="#/impressum" aria-label="${esc(t.footerImpressum)}" title="${esc(t.footerImpressum)}"><span aria-hidden="true">${ICON_DOC}</span></a>
          <a class="icon-btn" href="#/kontakt" aria-label="${esc(t.footerKontakt)}" title="${esc(t.footerKontakt)}"><span aria-hidden="true">${ICON_MAIL}</span></a>
          <a class="icon-btn" href="#/bio" aria-label="Bio" title="Bio"><span aria-hidden="true">${ICON_LINK}</span></a>
        </div>
        <div class="footer-social">${socials}</div>
      </div>
      <span class="footer-copy">© 2026 Til Apfel</span>
    </div>
  </footer>`;
}

/* ---------- Main render ---------- */
const appEl = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');

function titleFor(section, t) {
  const map = {
    '': t.heroTagline, about: t.aboutTitle, portfolio: t.portfolioTitle, focus: t.focusTitle,
    events: t.eventsTitle, library: t.libraryTitle, formular: t.formularTitle, kontakt: t.kontaktTitle,
    bio: 'Bio', impressum: 'Impressum'
  };
  const page = map[section] || '';
  return page ? `Til Apfel – ${page}` : 'Til Apfel';
}

function render() {
  const v = computeVals();
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', v.lang);
  document.title = titleFor(v.section, v.t);

  headerSlot.innerHTML = renderHeader(v);

  let mainHtml = '';
  switch (v.section) {
    case '': mainHtml = renderHome(v); break;
    case 'about': mainHtml = renderAbout(v); break;
    case 'portfolio': mainHtml = renderPortfolioList(v) + renderPortfolioModal(v); break;
    case 'focus': mainHtml = renderFocus(v); break;
    case 'events': mainHtml = renderEventsList(v) + renderEventModal(v); break;
    case 'library': mainHtml = renderLibrary(v); break;
    case 'formular': mainHtml = renderFormular(v); break;
    case 'kontakt': mainHtml = renderKontakt(v); break;
    case 'bio': mainHtml = renderBio(v); break;
    case 'impressum': mainHtml = renderImpressum(v); break;
    default: mainHtml = renderHome(v);
  }
  appEl.innerHTML = mainHtml;
  footerSlot.innerHTML = renderFooter(v);

  document.body.style.overflow = (v.currentPortfolio || v.currentTermin) ? 'hidden' : '';
  attachListeners(v);

  const modal = document.querySelector('.modal');
  if (modal) modal.focus();
}

/* ---------- Event wiring ---------- */
function attachListeners(v) {
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      location.hash = '#/' + (v.section === 'portfolio' ? 'portfolio' : 'events');
    });
  });

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tilapfel-theme', state.theme); } catch (e) {}
    render();
  });

  const langBtn = document.querySelector('[data-action="toggle-lang-menu"]');
  if (langBtn) langBtn.addEventListener('click', () => { state.langMenuOpen = !state.langMenuOpen; render(); });
  const langBackdrop = document.querySelector('[data-close-lang-menu]');
  if (langBackdrop) langBackdrop.addEventListener('click', () => { state.langMenuOpen = false; render(); });
  document.querySelectorAll('[data-set-lang]').forEach(el => {
    el.addEventListener('click', () => {
      state.lang = el.getAttribute('data-set-lang');
      state.langMenuOpen = false;
      try { localStorage.setItem('tilapfel-lang', state.lang); } catch (e) {}
      render();
    });
  });

  const showMoreBtn = document.querySelector('[data-action="show-more-events"]');
  if (showMoreBtn) showMoreBtn.addEventListener('click', () => { state.eventsExpanded = true; render(); });

  const auftragForm = document.querySelector('[data-form="auftrag"]');
  if (auftragForm) auftragForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(auftragForm);
    const t = v.t;
    const body = `Name: ${fd.get('name')}\nE-Mail: ${fd.get('email')}\n${t.labelArt}: ${fd.get('art')}\n${t.labelZeitrahmen}: ${fd.get('zeitrahmen')}\n\n${fd.get('beschreibung')}`;
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent((v.lang === 'en' ? 'Quote request: ' : 'Kostenvoranschlag-Anfrage: ') + fd.get('art')) + '&body=' + encodeURIComponent(body);
  });

  const kontaktForm = document.querySelector('[data-form="kontakt"]');
  if (kontaktForm) kontaktForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(kontaktForm);
    const body = `Name: ${fd.get('name')}\nE-Mail: ${fd.get('email')}\n\n${fd.get('nachricht')}`;
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(v.lang === 'en' ? 'Contact form message' : 'Nachricht über Kontaktformular') + '&body=' + encodeURIComponent(body);
  });
}

/* ---------- Global listeners ---------- */
window.addEventListener('hashchange', render);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const segs = parseRoute().split('/').filter(Boolean);
    if ((segs[0] === 'portfolio' || segs[0] === 'events') && segs[1]) {
      location.hash = '#/' + segs[0];
    }
  }
});
try {
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    let stored = null;
    try { stored = localStorage.getItem('tilapfel-theme'); } catch (err) {}
    if (!stored) { state.theme = e.matches ? 'light' : 'dark'; render(); }
  });
} catch (e) {}

render();
