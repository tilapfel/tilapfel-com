export default {
  code: 'en',

  t: {
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
    footerImpressum: 'Legal Notice', closeDialog: 'Close',
    bioIntro: 'Deafblind activist and advocate. I work for the digital and social participation of deafblind people.',
    emailSubjectRegistration: 'Registration: ', emailSubjectContact: 'Contact form message', emailSubjectQuote: 'Quote request: ',
    navAriaLabel: 'Main navigation', portraitAlt: 'Portrait of Til Apfel',
    themeToLight: 'Switch to light mode', themeToDark: 'Switch to dark mode',
    moreEventsTemplate: 'Show {n} more events', aboutBioLink: 'All links at a glance →',
    share: 'Share', copyLink: 'Copy link', linkCopied: 'Link copied!',
    search: 'Search', searchPlaceholder: 'Search the site…', searchNoResults: 'No results',
    easyLanguage: 'Easy language', easyLanguageOn: 'On', easyLanguageOff: 'Off',
    onboardingTitle: 'Welcome', onboardingIntro: 'Before you start: how would you like to use the site?',
    onboardingLangLabel: 'Language', onboardingThemeLabel: 'Brightness',
    onboardingLight: 'Light', onboardingDark: 'Dark', onboardingDone: 'Get started'
  },

  nav: { about: 'About', portfolio: 'Portfolio', focus: 'Focus', events: 'Events', library: 'Library' },

  roleLabels: ['Activist', 'Board Member', 'Lecturer'],
  roleDescs: [
    'Advocacy for the rights and visibility of deafblind people.',
    'Advocacy in the professional association for deafblind people.',
    'Teaching accessibility and participation through talks and courses.'
  ],

  auftragArten: ['Consulting', 'Talk', 'Software Development', 'Other'],

  portfolio: [
    { slug: 'studium', date: 'Since 2010', category: 'Education', location: 'Placeholder', title: 'Studies & Training', short: 'Foundational education underlying the current work.', full: 'Details on degree program and training stages will be added here soon.', approach: '(Placeholder – to be added)' },
    { slug: 'dozent-aufbau', date: 'Since 2019', category: 'Career Path', location: 'Self-employed', title: 'Building a Career as a Lecturer', short: 'Developing independent speaking and teaching work.', full: 'For several years I have been building independent work as a lecturer and speaker – from first individual talks to regular teaching assignments.', approach: 'The path led from volunteer talks to paid assignments with educational institutions, associations and companies.' },
    { slug: 'verbandsarbeit-tbv', date: 'Since 2021', category: 'NGO Engagement', location: 'Deafblind Association', title: 'Board Work at the Deafblind Association', short: 'Representing deafblind people at the association level.', full: 'As a board member, I represent the interests of deafblind people to policymakers, funding bodies and the public.', approach: 'This includes position papers, talks with ministries and following legislation on participation.' },
    { slug: 'edbu-engagement', date: 'Since 2022', category: 'NGO Engagement', location: 'European Deafblind Union', title: 'Work with the European Deafblind Union', short: 'Engagement for shared European standards.', full: 'Contributing to a European working group on standards and recommendations for assistive technology for deafblind people.', approach: 'The working group brings together representatives from several European countries to develop shared minimum standards.' },
    { slug: 'digitalisierung-beratung', date: 'Since 2023', category: 'Own Project', location: 'Nationwide', title: 'Accessible Digitalization', short: 'Ongoing consulting project for public bodies and companies.', full: 'Consulting for public bodies and companies implementing accessible software and websites – from initial concept to screen reader testing.', approach: 'I work closely with development teams and audit existing applications using my own screen reader and braille display practice.' },
    { slug: 'programmieren-lernen', date: '2015–2018', category: 'Personal Path', location: 'Self-taught', title: 'Programming as a Deafblind Person', short: 'Learning software development despite a lack of accessible learning paths.', full: 'I largely taught myself programming – using a screen reader and braille display, often without accessible learning materials.', approach: 'This path still shapes how I design software for other deafblind users today.' }
  ],

  termine: [
    { slug: 'digitale-teilhabe-heute', date: 'July 22, 2026', category: 'Talk', title: 'Digital Participation Today', location: 'Inclusion Conference, Berlin', detail: 'A talk on the current state of digital participation in Germany, focused on public administration and education.', info: 'Audience: professionals from administration and education. Duration: 45 minutes incl. Q&A.' },
    { slug: 'vorstandssitzung-august', date: 'August 5, 2026', category: 'Board', title: 'Deafblind Association Board Meeting', location: 'Association Office, Cologne', detail: 'Regular board meeting covering ongoing applications, budget and upcoming association events.', info: 'Internal to the association – attendance by arrangement with the office.' },
    { slug: 'barrierefreie-software-workshop', date: 'September 14, 2026', category: 'Workshop', title: 'Designing Accessible Software', location: 'Online', detail: 'Hands-on workshop for engineering teams: testing your own applications together with a screen reader and braille display.', info: 'Audience: developers and product teams. Duration: 3 hours, max. 15 participants.' },
    { slug: 'taubblind-leben-wien', date: 'October 2, 2026', category: 'Talk', title: 'Living Deafblind – A First-Hand Account', location: 'University of Vienna', detail: 'A personal account of everyday life, communication and self-determination as a deafblind person.', info: 'Audience: students and the public. Duration: 60 minutes.' },
    { slug: 'edbu-treffen-bruessel', date: 'October 20, 2026', category: 'International', title: 'EDBU Working Group Meeting', location: 'Brussels', detail: 'Two-day meeting of the European technology working group to align on shared standards.', info: 'By invitation of the European Deafblind Union.' },
    { slug: 'screenreader-testing-hamburg', date: 'November 11, 2026', category: 'Workshop', title: 'Screen Reader Testing for Dev Teams', location: 'Hamburg', detail: 'Hands-on workshop on systematically testing web and app interfaces with common screen readers.', info: 'Audience: QA and engineering. Duration: full day.' }
  ],

  pastTermine: [
    { date: 'May 8, 2025', category: 'International', title: 'EDBU General Assembly', location: 'Copenhagen' },
    { date: 'November 12, 2025', category: 'Talk', title: 'Inclusion Days Frankfurt', location: 'Frankfurt am Main' }
  ],

  library: [
    { type: 'App', title: 'AccessNav', desc: 'Navigation app with tactile and audio feedback for deafblind users.' },
    { type: 'Essay', title: 'Dual Sensory Impairment', desc: 'An article on the specific accessibility requirements involved.' },
    { type: 'Podcast', title: 'Zwischentöne', desc: 'An interview series with activists from the disability rights movement.' }
  ],

  press: [
    { outlet: 'Deutschlandfunk', date: 'April 2025', title: 'When Two Senses Are Missing, the Voice Grows Louder' },
    { outlet: 'Süddeutsche Zeitung', date: 'November 2024', title: 'The Man Who Codes Away Barriers' },
    { outlet: 'taz', date: 'February 2026', title: 'Participation Is Not a Question of Technology Alone' }
  ],

  focusItems: [
    { title: 'Association Work at TBV and EDBU', desc: 'Advocacy at the national and European level.' },
    { title: 'Building a Career as a Lecturer', desc: 'Independent speaking and teaching work around accessibility.' },
    { title: 'Learning to Program as Deafblind', desc: 'Access to software development despite a lack of accessible learning paths.' }
  ],

  werte: ['Software Development (Programming)', 'Plant-Based Cooking (Vegan)', 'Mental Health (Psychology)', 'Outdoor Activities (Nature Sports)', 'Human Rights (Justice)'],

  principles: ['Accessibility is not an extra, it is the foundation.', 'Participation comes from access, not from pity.', 'I show what is possible with the right tools.'],

  bookable: [
    { title: 'Talk', desc: 'Talks on deafblindness, accessibility and digital participation for professionals and schools.' },
    { title: 'Consulting', desc: 'Accessibility audits and consulting for public bodies, associations and companies.' },
    { title: 'Lecturing', desc: 'Courses and workshops on accessible software design.' }
  ]
};
