import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  CircleCheck,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Gamepad2,
  ContactRound as Linkedin,
  GraduationCap,
  HardDrive,
  Headphones,
  Image as ImageIcon,
  Mail,
  Map,
  Menu,
  MessageCircle,
  MonitorCog,
  Music2,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Wrench,
  X,
} from 'lucide-react'

const navItems = [
  ['About', 'about'],
  ['Capabilities', 'capabilities'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Services', 'portal'],
  ['Bench', 'bench'],
]

const capabilities = [
  {
    icon: Server,
    label: 'Infrastructure',
    title: 'Linux systems & homelab operations',
    description:
      'Deploying, connecting, securing, and maintaining self-hosted services with an operator-first approach.',
    skills: ['Linux administration', 'Docker Compose', 'Tailscale', 'Cloudflare Tunnels', 'DNS & networking', 'Backups & recovery'],
  },
  {
    icon: BrainCircuit,
    label: 'Intelligence',
    title: 'AI agents & practical automation',
    description:
      'Turning language models into useful workflows across chat, monitoring, research, administration, and support.',
    skills: ['Hermes Agent', 'Multi-agent workflows', 'LLM routing', 'Discord & iMessage bots', 'Python & shell automation', 'Scheduled operations'],
  },
  {
    icon: Code2,
    label: 'Applications',
    title: 'Web tools & service dashboards',
    description:
      'Building focused interfaces that make complicated infrastructure easier to understand and operate.',
    skills: ['React & JavaScript', 'Responsive UI', 'REST APIs', 'Git & GitHub', 'Operations dashboards', 'Self-hosted deployment'],
  },
  {
    icon: MonitorCog,
    label: 'Support',
    title: 'IT support & troubleshooting',
    description:
      'Patient, customer-focused diagnosis across computers, operating systems, networks, software, and connected devices.',
    skills: ['Desktop support', 'Hardware diagnosis', 'Software troubleshooting', 'System upgrades', 'Help desk support', 'Customer communication'],
  },
  {
    icon: HardDrive,
    label: 'Platforms',
    title: 'Media, storage & personal cloud',
    description:
      'Designing self-hosted ecosystems for video, music, books, photos, game libraries, storage, and automation.',
    skills: ['Jellyfin', 'Navidrome', 'Komga', 'RomM', 'Immich', 'Media automation'],
  },
  {
    icon: Wrench,
    label: 'Hardware',
    title: 'Repair, mods & old-tech rescue',
    description:
      'Careful teardown, diagnosis, repair, customization, and reuse of consoles, controllers, handhelds, phones, and PCs.',
    skills: ['Console diagnosis', 'Controller mods', 'Shell & screen work', 'Software recovery', 'PC repair', 'Device refurbishment'],
  },
]

const projects = [
  {
    number: '01',
    icon: Network,
    eyebrow: 'Core infrastructure',
    title: 'Resilient personal homelab',
    summary:
      'A multi-host Linux environment built to run real services reliably without turning day-to-day administration into a second job.',
    details: ['Containerized service stacks', 'Private mesh networking', 'Secure public ingress', 'Firewalling, monitoring, backups, and recovery'],
    accent: 'violet',
  },
  {
    number: '02',
    icon: Bot,
    eyebrow: 'AI operations',
    title: 'Connected agent ecosystem',
    summary:
      'AI assistants connected to Discord and iMessage for research, server work, scheduled checks, alerts, and hands-off administration.',
    details: ['Hermes Agent gateways', 'Specialized agent roles', 'Provider routing and fallback', 'Automated monitoring and reporting'],
    accent: 'blue',
  },
  {
    number: '03',
    icon: TerminalSquare,
    eyebrow: 'Custom software',
    title: 'CH33ZE Command Center',
    summary:
      'A purpose-built operations dashboard that turns a growing collection of hosts, apps, links, accounts, and tools into one usable control surface.',
    details: ['Unified service visibility', 'Practical admin workflows', 'Responsive web interface', 'Designed around real homelab operations'],
    accent: 'cyan',
  },
  {
    number: '04',
    icon: Database,
    eyebrow: 'Self-hosted cloud',
    title: 'Media & library platform',
    summary:
      'An integrated ecosystem for personal video, music, comics, photos, and game libraries with acquisition, organization, and health workflows.',
    details: ['Jellyfin and media automation', 'Navidrome music library', 'Komga comics and RomM games', 'Immich photo management'],
    accent: 'orange',
  },
  {
    number: '05',
    icon: Gamepad2,
    eyebrow: 'Gaming infrastructure',
    title: 'Minecraft community services',
    summary:
      'Managed game-server infrastructure with player-facing status, mapping, dashboards, cross-platform access, and safer operational controls.',
    details: ['Server lifecycle operations', 'Web map integration', 'Community dashboards', 'Role-aware automation'],
    accent: 'green',
  },
  {
    number: '06',
    icon: Cpu,
    eyebrow: 'Repair bench',
    title: 'Electronics repair & restoration',
    summary:
      'Hands-on work that keeps older hardware useful through careful diagnosis, cleaning, parts replacement, software repair, and customization.',
    details: ['Consoles and handhelds', 'Controllers and shell swaps', 'Computers and older phones', 'Reuse before replacement'],
    accent: 'pink',
  },
]

const experience = [
  {
    range: 'Mar 2023 — Present',
    role: 'IT Consultant / IT Systems Manager',
    company: 'Renew Range Holdings · CareFree Living Center',
    location: 'Minneapolis, Minnesota',
    body: 'Manage and maintain computer systems, internet connectivity, and connected devices. Provide technical support, troubleshooting, system upgrades, and hardware diagnosis to keep daily operations reliable.',
  },
  {
    range: 'Aug 2020 — Dec 2022',
    role: 'Sales Associate',
    company: 'Walgreens',
    location: 'St. Louis, Missouri',
    body: 'Supported customers and daily retail operations in a fast-paced environment while building strong service, communication, sales, and problem-solving skills.',
  },
  {
    range: 'Jun 2019 — Oct 2020',
    role: 'Assistant Store Manager',
    company: 'Tutti Frutti Frozen Yogurt',
    location: 'University City, Missouri',
    body: 'Managed daily store operations, inventory, opening and closing, equipment maintenance, employee training, deliveries, and customer or technical issues.',
  },
  {
    range: 'Dec 2019 — May 2020',
    role: 'Sales Associate',
    company: 'Schnuck Markets, Inc.',
    location: 'Ladue, Missouri',
    body: 'Delivered in-person customer support and contributed to organized, dependable front-line store operations.',
  },
  {
    range: 'Aug 2018 — Mar 2020',
    role: 'Guest Speaker',
    company: 'JCRC · Student-to-Student',
    location: 'Community education program',
    body: 'Spoke with students about Jewish practices, holidays, life, Israel, and culture—developing confidence in public speaking and cross-cultural communication.',
  },
]

const serviceCards = [
  { icon: MessageCircle, name: 'Discord Community', type: 'Community', status: 'Invite coming soon', tone: 'purple' },
  { icon: Gamepad2, name: 'Minecraft Server', type: 'Game server', status: 'Address coming soon', tone: 'green' },
  { icon: Map, name: 'Minecraft Live Map', type: 'World map', status: 'Private preview', tone: 'cyan' },
  { icon: Radio, name: 'Jellyfin', type: 'Movies & television', status: 'Access coming soon', tone: 'blue' },
  { icon: ImageIcon, name: 'Komga', type: 'Comics & manga', status: 'Access coming soon', tone: 'orange' },
  { icon: Music2, name: 'Navidrome', type: 'Music streaming', status: 'Access coming soon', tone: 'pink' },
  { icon: Gamepad2, name: 'RomM', type: 'Game library', status: 'Access coming soon', tone: 'violet' },
  { icon: Cloud, name: 'More services', type: 'Projects & utilities', status: 'Directory in progress', tone: 'slate' },
]

const gallery = Array.from({ length: 12 }, (_, index) => ({
  src: `/assets/gallery/work-${String(index + 1).padStart(2, '0')}.jpg`,
  alt: `Personal Tech Wiz repair bench project ${index + 1}`,
  label: ['Board inspection', 'Console teardown', 'Parts & cleanup', 'Device testing', 'Workbench detail', 'Modification prep', 'Hardware restoration', 'Final checks', 'Repair workflow', 'Component work', 'Console project', 'Bench project'][index],
}))

const repairServices = [
  ['Console diagnosis', 'No power, no video, bad ports, read errors, overheating, failed storage, dirty internals, and mystery problems.'],
  ['Handheld repair', 'DS-family systems, Switch hardware, shell and button work, screens, batteries, and general refurbishment.'],
  ['Controller mods', 'Custom shells, button swaps, cleaning, drift troubleshooting, and personality upgrades.'],
  ['Software mods', 'Homebrew-style setups, storage preparation, utilities, backups, and software recovery where appropriate.'],
  ['Phone & small electronics', 'Older iPhone screens and small-device fixes when parts, tools, and repair risk make sense.'],
  ['Junk-tech rescue', 'Broken computers and consoles evaluated for repair, reuse, parts, refurbishment, or future projects.'],
]

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Personal Tech Wiz home">
      <span className="brand-mark" aria-hidden="true">PTW</span>
      <span className="brand-copy">
        <strong>Personal Tech Wiz</strong>
        <small>Jeffrey Yampol</small>
      </span>
    </a>
  )
}

function SectionIntro({ eyebrow, title, description, narrow = false }) {
  return (
    <div className={`section-intro ${narrow ? 'section-intro--narrow' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setLightbox(null)
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('modal-open')
    }
  }, [lightbox])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="nav-shell">
          <Logo />
          <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                className={activeSection === id ? 'active' : ''}
                href={`#${id}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s connect <ArrowRight size={14} /></a>
          </nav>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow hero-glow--one" />
          <div className="hero-glow hero-glow--two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="availability"><span /> Open to IT, systems & AI opportunities</div>
              <p className="eyebrow">IT systems · AI automation · homelab engineering</p>
              <h1>I build useful systems from <em>hardware to AI.</em></h1>
              <p className="hero-lead">
                I&apos;m <strong>Jeffrey Yampol</strong>—a hands-on technology problem solver combining IT support,
                Linux infrastructure, self-hosted services, AI agents, web tools, and electronics repair.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#projects">Explore my work <ArrowDown size={17} /></a>
                <a className="button button--secondary" href="#experience">View experience</a>
              </div>
              <div className="hero-meta">
                <span><Map size={15} /> Hollywood, Florida</span>
                <span><CircleCheck size={15} /> Customer-focused</span>
                <span><ShieldCheck size={15} /> Reliability-minded</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Technical focus areas">
              <div className="terminal-card">
                <div className="terminal-bar">
                  <div><i /><i /><i /></div>
                  <span>jeffrey@personaltechwiz</span>
                  <TerminalSquare size={15} />
                </div>
                <div className="terminal-body">
                  <p><span className="prompt">$</span> profile --summary</p>
                  <div className="terminal-output">
                    <span>ROLE</span><strong>Systems builder & problem solver</strong>
                    <span>FOCUS</span><strong>Infrastructure, AI, support, repair</strong>
                    <span>MODE</span><strong className="online">Hands-on · always learning</strong>
                  </div>
                  <p><span className="prompt">$</span> stack --active</p>
                  <div className="stack-cloud">
                    {['Linux', 'Docker', 'React', 'Tailscale', 'Cloudflare', 'Hermes AI', 'Python', 'Git'].map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <p className="cursor-line"><span className="prompt">$</span><i /></p>
                </div>
              </div>
              <div className="orbit-badge orbit-badge--server"><Server size={20} /><span>Self-hosted</span></div>
              <div className="orbit-badge orbit-badge--ai"><Sparkles size={20} /><span>AI-assisted</span></div>
            </div>
          </div>
          <div className="proof-strip">
            <div className="container proof-grid">
              <div><strong>Linux-first</strong><span>Infrastructure</span></div>
              <div><strong>Self-hosted</strong><span>Services</span></div>
              <div><strong>Automation-led</strong><span>Operations</span></div>
              <div><strong>People-focused</strong><span>Support</span></div>
            </div>
          </div>
        </section>

        <section className="section section--about" id="about">
          <div className="container about-grid">
            <SectionIntro
              eyebrow="About me"
              title={<>Curiosity turned into a <span className="gradient-text">working lab.</span></>}
            />
            <div className="about-copy">
              <p className="about-lead">
                Technology is both my profession and my workshop. I learn by building systems, fixing what breaks,
                documenting the result, and making the next version easier to operate.
              </p>
              <div className="about-columns">
                <p>
                  My professional background blends IT systems management and technical support with customer service,
                  retail operations, team training, and public speaking. That combination helps me translate a technical
                  problem into a clear, practical solution for the person who actually needs it.
                </p>
                <p>
                  Outside of work, I run a growing homelab, connect AI agents to real workflows, build dashboards and
                  service portals, host media and game platforms, and restore older electronics. I care about reliable
                  systems, responsible reuse, and technology that feels approachable instead of intimidating.
                </p>
              </div>
              <div className="values-row">
                {[
                  [Wrench, 'Learn by doing'],
                  [ShieldCheck, 'Build for reliability'],
                  [Headphones, 'Listen before solving'],
                  [Boxes, 'Reuse before replacing'],
                ].map(([Icon, text]) => <span key={text}><Icon size={17} /> {text}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--capabilities" id="capabilities">
          <div className="container">
            <SectionIntro
              eyebrow="Capability map"
              title="One skill set. Multiple layers of technology."
              description="I work across the stack—from the device in someone’s hands to the network, server, application, and automation behind it."
            />
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, label, title, description, skills }) => (
                <article className="capability-card" key={title}>
                  <div className="capability-top">
                    <span className="icon-box"><Icon size={21} /></span>
                    <span className="mono-label">{label}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {skills.map((skill) => <li key={skill}><ChevronRight size={13} />{skill}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--projects" id="projects">
          <div className="container">
            <div className="split-heading">
              <SectionIntro
                eyebrow="Selected systems"
                title="Built to solve real problems."
              />
              <p>These projects connect infrastructure, automation, user experience, and ongoing operations—not just one-time setup.</p>
            </div>
            <div className="project-list">
              {projects.map(({ number, icon: Icon, eyebrow, title, summary, details, accent }) => (
                <article className={`project-card project-card--${accent}`} key={title}>
                  <div className="project-number">{number}</div>
                  <div className="project-icon"><Icon size={27} /></div>
                  <div className="project-copy">
                    <p className="mono-label">{eyebrow}</p>
                    <h3>{title}</h3>
                    <p>{summary}</p>
                  </div>
                  <ul className="project-details">
                    {details.map((detail) => <li key={detail}><CircleCheck size={15} />{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--experience" id="experience">
          <div className="container resume-layout">
            <div className="resume-sidebar">
              <SectionIntro
                eyebrow="Résumé"
                title="Experience built around people and systems."
                description="A customer-service foundation strengthened by hands-on responsibility for technology, operations, and troubleshooting."
                narrow
              />
              <div className="education-card">
                <GraduationCap size={22} />
                <div>
                  <span className="mono-label">Education</span>
                  <strong>High School Diploma</strong>
                  <p>Yeshivat Kadimah High School · 2018–2021</p>
                  <p>Ida Crown Jewish Academy · 2017–2018</p>
                </div>
              </div>
              <a className="inline-link" href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer">
                Full profile on LinkedIn <ExternalLink size={15} />
              </a>
            </div>
            <div className="timeline">
              {experience.map((job) => (
                <article className="timeline-item" key={`${job.role}-${job.range}`}>
                  <div className="timeline-marker"><BriefcaseBusiness size={15} /></div>
                  <div className="timeline-content">
                    <p className="timeline-range">{job.range}</p>
                    <h3>{job.role}</h3>
                    <div className="timeline-company"><strong>{job.company}</strong><span>{job.location}</span></div>
                    <p>{job.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--portal" id="portal">
          <div className="container">
            <div className="portal-heading">
              <SectionIntro
                eyebrow="Service portal"
                title="The public side of the homelab."
                description="A future launchpad for community, media, gaming, and library services. Links stay private until each service is ready for public access."
              />
              <div className="private-notice"><ShieldCheck size={18} /><span><strong>Safe by default</strong> Placeholder access only—no private endpoints are exposed.</span></div>
            </div>
            <div className="service-grid">
              {serviceCards.map(({ icon: Icon, name, type, status, tone }) => (
                <article className={`service-card service-card--${tone}`} key={name}>
                  <div className="service-icon"><Icon size={24} /></div>
                  <div className="service-copy">
                    <span>{type}</span>
                    <h3>{name}</h3>
                  </div>
                  <div className="service-status"><span />{status}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--bench" id="bench">
          <div className="container">
            <div className="split-heading bench-heading">
              <SectionIntro
                eyebrow="Repair & modification bench"
                title="Old tech still has life left."
              />
              <p>I diagnose carefully, repair what makes sense, customize when it improves the device, and keep useful hardware out of the junk pile.</p>
            </div>
            <div className="repair-grid">
              {repairServices.map(([title, body], index) => (
                <article key={title}>
                  <span className="repair-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="gallery-heading">
              <div><p className="eyebrow">From the bench</p><h3>Real repair and mod work.</h3></div>
              <p>Select a photo to view it larger.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((image, index) => (
                <button className={`gallery-item gallery-item--${(index % 5) + 1}`} type="button" key={image.src} onClick={() => setLightbox(image)}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span><ImageIcon size={15} />{image.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contact" id="contact">
          <div className="contact-glow" />
          <div className="container contact-card">
            <div>
              <p className="eyebrow">Let&apos;s connect</p>
              <h2>Need someone who can see the <span className="gradient-text">whole system?</span></h2>
            </div>
            <div className="contact-copy">
              <p>
                I&apos;m interested in IT support, systems administration, homelab, infrastructure, technical operations,
                AI automation, and adjacent opportunities where hands-on problem solving matters.
              </p>
              <div className="contact-actions">
                <a className="button button--primary" href="mailto:personaltechwiz@gmail.com"><Mail size={17} /> Email me</a>
                <a className="button button--secondary" href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              </div>
              <span className="contact-email">personaltechwiz@gmail.com</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <Logo />
          <p>IT systems, AI automation, homelab engineering, technical support, and electronics repair.</p>
          <div className="footer-links">
            <a href="mailto:personaltechwiz@gmail.com" aria-label="Email Jeffrey"><Mail size={18} /></a>
            <a href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer" aria-label="Jeffrey on LinkedIn"><Linkedin size={18} /></a>
            <a href="#top" aria-label="Back to top"><ArrowDown className="arrow-up" size={18} /></a>
          </div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Jeffrey Yampol</span><span>Built with React · Hosted on GitHub Pages</span></div>
      </footer>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} onMouseDown={(event) => event.target === event.currentTarget && setLightbox(null)}>
          <button type="button" className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X size={22} /></button>
          <figure>
            <img src={lightbox.src} alt={lightbox.alt} />
            <figcaption>{lightbox.label}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export default App
