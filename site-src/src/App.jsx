import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ExternalLink,
  Film,
  Gamepad2,
  Image as ImageIcon,
  Library,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Music2,
  Smartphone,
  Wrench,
  X,
} from 'lucide-react'

const routes = [
  { key: 'home', label: 'Home', href: '#/' },
  { key: 'work', label: 'Work', href: '#/work' },
  { key: 'resume', label: 'Résumé', href: '#/resume' },
  { key: 'services', label: 'Services', href: '#/services' },
  { key: 'bench', label: 'Repair bench', href: '#/bench' },
]

const systems = [
  {
    number: '01',
    short: 'Homelab',
    title: 'A homelab that has to work, not just look good in a rack.',
    problem: 'I wanted one place for media, photos, game servers, automation, backups, and the tools I use every day. That meant learning how to keep a lot of moving parts from stepping on each other.',
    work: 'I run Linux hosts, Docker Compose stacks, storage pools, private networking, remote access, DNS, tunnels, firewalls, monitoring, and recovery jobs. I also move workloads between machines when the hardware or the job calls for it.',
    tools: ['Linux', 'Docker Compose', 'Tailscale', 'Cloudflare', 'nftables', 'SMB', 'Backups'],
  },
  {
    number: '02',
    short: 'AI systems',
    title: 'AI that can do useful work instead of sitting in a chat box.',
    problem: 'I wanted assistants that could help with real server work, answer people where they already talk, keep an eye on recurring jobs, and hand specialized problems to the right model or agent.',
    work: 'I operate Hermes agents through Discord and iMessage, build role-specific gateways, schedule checks, connect tools, route between model providers, and keep permissions separated. The goal is practical help without giving an agent more access than it needs.',
    tools: ['Hermes Agent', 'Discord', 'iMessage', 'Python', 'Model routing', 'Scheduled jobs', 'Webhooks'],
  },
  {
    number: '03',
    short: 'Command Center',
    title: 'One screen for the parts of my setup I actually need to see.',
    problem: 'Bookmarks and terminal history stop being enough when services live on several machines. I needed a dashboard built around my setup, not a generic monitoring template.',
    work: 'I built the CH33ZE Command Center to organize service health, admin links, accounts, files, host information, and routine controls. I keep refining it as the homelab changes.',
    tools: ['React', 'JavaScript', 'APIs', 'Linux', 'Responsive UI', 'Service health'],
  },
  {
    number: '04',
    short: 'Personal cloud',
    title: 'Media and libraries that I control.',
    problem: 'Movies, music, comics, photos, and game collections all have different storage and metadata problems. I wanted them easy to use without handing the whole library to someone else’s cloud.',
    work: 'I manage Jellyfin, Navidrome, Komga, RomM, Immich, acquisition tools, storage mounts, transcode limits, library cleanup, and the networking around them. I troubleshoot the ugly parts too: imports, permissions, paths, full disks, and bad metadata.',
    tools: ['Jellyfin', 'Navidrome', 'Komga', 'RomM', 'Immich', 'Storage', 'Automation'],
  },
  {
    number: '05',
    short: 'Game services',
    title: 'A Minecraft setup that players can use without me babysitting it.',
    problem: 'Running the game is the easy part. The rest is updates, player access, maps, dashboards, permissions, backups, and making sure an admin shortcut cannot wreck the server.',
    work: 'I manage the server, web map, player-facing dashboard, cross-platform access, service-only restarts, role-aware automation, and audit-friendly controls.',
    tools: ['Minecraft', 'Bedrock access', 'Live map', 'Dashboards', 'Discord', 'Backups'],
  },
  {
    number: '06',
    short: 'Repair bench',
    title: 'Broken hardware is usually a question, not a dead end.',
    problem: 'I hate throwing away a device before anyone has properly looked at it. Consoles, controllers, old computers, handhelds, and phones often have more life left than people think.',
    work: 'I diagnose, clean, disassemble, replace parts, swap shells, prepare storage, recover software, test the result, and decide honestly when a repair is not worth the risk or cost.',
    tools: ['Consoles', 'Controllers', 'Handhelds', 'PCs & Macs', 'Phones', 'Software recovery'],
  },
]

const experience = [
  {
    dates: 'March 2023 – present',
    role: 'IT Consultant / IT Systems Manager',
    place: 'Renew Range Holdings · CareFree Living Center',
    location: 'Minneapolis, Minnesota',
    description: 'I maintain computers, internet service, and connected devices. I handle support requests, hardware problems, software troubleshooting, upgrades, and the day-to-day work that keeps technology out of everyone else’s way.',
  },
  {
    dates: 'August 2020 – December 2022',
    role: 'Sales Associate',
    place: 'Walgreens',
    location: 'St. Louis, Missouri',
    description: 'Customer service in a busy store taught me how to listen, explain things clearly, stay organized, and solve the problem in front of me without making the customer feel rushed.',
  },
  {
    dates: 'June 2019 – October 2020',
    role: 'Assistant Store Manager',
    place: 'Tutti Frutti Frozen Yogurt',
    location: 'University City, Missouri',
    description: 'I handled opening and closing, inventory, equipment, deliveries, cleaning, employee training, customer issues, and whatever else needed attention that day.',
  },
  {
    dates: 'December 2019 – May 2020',
    role: 'Sales Associate',
    place: 'Schnuck Markets, Inc.',
    location: 'Ladue, Missouri',
    description: 'I supported customers and helped keep front-line store operations organized and dependable.',
  },
  {
    dates: 'August 2018 – March 2020',
    role: 'Guest Speaker',
    place: 'JCRC · Student-to-Student',
    location: 'Community education program',
    description: 'I spoke with students about Jewish practices, holidays, daily life, Israel, and culture. It pushed me to get comfortable speaking to unfamiliar groups and answering honest questions.',
  },
]

const serviceLinks = [
  { group: 'Community', name: 'Discord', description: 'Community chat, support, and updates', status: 'Invite not public yet', icon: MessageCircle },
  { group: 'Game server', name: 'Minecraft', description: 'Server access, rules, and status', status: 'Address not public yet', icon: Gamepad2 },
  { group: 'Game server', name: 'Minecraft map', description: 'Live world map for players', status: 'Private preview', icon: MapPin },
  { group: 'Media', name: 'Jellyfin', description: 'Movies and television', status: 'Access not public yet', icon: Film },
  { group: 'Media', name: 'Navidrome', description: 'Personal music streaming', status: 'Access not public yet', icon: Music2 },
  { group: 'Library', name: 'Komga', description: 'Comics and manga', status: 'Access not public yet', icon: Library },
  { group: 'Library', name: 'RomM', description: 'Game library', status: 'Access not public yet', icon: Gamepad2 },
  { group: 'Tools', name: 'More tools', description: 'Small projects, dashboards, and utilities', status: 'Directory in progress', icon: Boxes },
]

const fieldNotes = [
  ['Operating systems', 'I move between Linux, Windows, macOS, iOS, Android, and oddball setups without treating any one platform like the only answer.'],
  ['People and machines', 'I can explain the problem to a person, then go back to the terminal, workbench, router, or config file and actually fix it.'],
  ['Learning fast', 'When I hit something new, I read the docs, test safely, verify the result, and keep notes so the fix becomes part of my toolkit.'],
  ['One-man ownership', 'I like owning the whole chain: the device, the network, the service, the user experience, and the follow-through after it ships.'],
]

const resumeHighlights = [
  'Hands-on IT support for computers, internet service, connected devices, upgrades, and troubleshooting.',
  'Linux homelab operator running real services, remote access, storage, backups, firewalls, and monitoring.',
  'AI automation builder using agents, scheduled jobs, Discord/iMessage gateways, and practical tool integrations.',
  'Repair-minded technician comfortable with consoles, controllers, PCs, Macs, phones, and older hardware.',
]

const gallery = Array.from({ length: 12 }, (_, index) => ({
  src: `/assets/gallery/work-${String(index + 1).padStart(2, '0')}.jpg`,
  alt: `Repair and modification project ${index + 1} from the Personal Tech Wiz bench`,
  label: ['Board inspection', 'Console teardown', 'Parts and cleanup', 'Device testing', 'Workbench detail', 'Modification prep', 'Hardware restoration', 'Final check', 'Repair in progress', 'Component work', 'Console project', 'Bench project'][index],
}))

function currentRoute() {
  const value = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return routes.some((route) => route.key === value) ? value : 'home'
}

function useRoute() {
  const [route, setRoute] = useState(currentRoute)
  useEffect(() => {
    const update = () => setRoute(currentRoute())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const label = routes.find((item) => item.key === route)?.label
    document.title = route === 'home'
      ? 'Jeffrey Yampol | Personal Tech Wiz'
      : `${label} | Jeffrey Yampol · Personal Tech Wiz`
  }, [route])
  return route
}

function Brand() {
  return (
    <a className="brand" href="#/" aria-label="Personal Tech Wiz home">
      <span className="brand-glyph">PTW</span>
      <span><strong>Personal Tech Wiz</strong><small>Jeffrey Yampol</small></span>
    </a>
  )
}

function Header({ route }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className={open ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
          {routes.map((item) => (
            <a key={item.key} href={item.href} className={route === item.key ? 'active' : ''}>{item.label}</a>
          ))}
          <a className="nav-email" href="mailto:personaltechwiz@gmail.com">Email me <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function PageTitle({ index, kicker, title, intro }) {
  return (
    <div className="page-title">
      <div className="page-index">{index}</div>
      <div>
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
    </div>
  )
}

function RouteLink({ to, children, className = 'text-link' }) {
  return <a className={className} href={`#/${to}`}>{children} <ArrowRight size={16} /></a>
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <p className="kicker">Your Personal Tech Wiz · Hollywood, Florida</p>
            <h1>Your Personal Tech Wiz.</h1>
            <p className="hero-intro">
              I&apos;m Jeffrey. I&apos;m the one-man tech guy people call when a computer, server, website,
              console, phone, network, or random device needs help.
            </p>
            <p className="hero-note">
              I work across operating systems, hardware, homelab services, AI tools, and repairs. If I do not
              know something yet, I learn it fast, test it safely, and keep going until it makes sense.
            </p>
            <div className="hero-actions">
              <RouteLink to="work" className="button">See what I work on</RouteLink>
              <RouteLink to="resume" className="quiet-link">Read my résumé</RouteLink>
              <RouteLink to="services" className="quiet-link">Hosted services</RouteLink>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="/assets/gallery/work-01.jpg" alt="Circuit board inspection at the Personal Tech Wiz repair bench" />
            <figcaption><span>At the bench</span> Diagnosis before guessing.</figcaption>
          </figure>
        </div>
        <div className="wrap hero-ledger" aria-label="Areas Jeffrey works in">
          {['IT support', 'Linux & servers', 'AI & automation', 'Web tools', 'Hardware repair'].map((item, index) => (
            <span key={item}><b>0{index + 1}</b>{item}</span>
          ))}
        </div>
      </section>

      <section className="paper-section">
        <div className="wrap personal-grid">
          <div className="side-note">What that means</div>
          <div className="personal-copy">
            <h2>One guy for a lot of tech problems.</h2>
            <p className="large-copy">
              Some people stay in one lane. I like seeing how the lanes connect. A slow app might really be a disk problem.
              A broken stream might be DNS, a container path, or a bad client. A controller repair can turn into a software
              recovery job. Knowing a little about the whole chain helps me find the real problem.
            </p>
            <p>
              I am comfortable moving between Linux, Windows, macOS, iOS, Android, and unfamiliar systems when the job
              calls for it. The same goes for devices: servers, PCs, Macs, phones, tablets, networking gear, consoles,
              handhelds, controllers, storage, and smart-home equipment. I do not pretend to know every answer. I know
              how to research, test, and keep going until I understand what is happening.
            </p>
          </div>
        </div>
      </section>

      <section className="paper-section field-notes-section">
        <div className="wrap field-notes-grid">
          <div className="field-notes-heading">
            <p className="kicker">How I work</p>
            <h2>Straightforward help. Real follow-through.</h2>
            <p>Employers get somebody who can talk to the person having the problem, trace the system, open the device, read the logs, and stay with it until the answer is real.</p>
          </div>
          <div className="note-board">
            {fieldNotes.map(([title, body], index) => (
              <article key={title} className="note-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section what-i-do">
        <div className="wrap">
          <div className="section-heading">
            <p className="kicker">What I actually do</p>
            <h2>Fix it. Run it.<br />Make it easier to use.</h2>
          </div>
          <div className="practice-list">
            <article>
              <span>01</span>
              <h3>Keep technology running</h3>
              <p>Support, updates, networks, operating systems, backups, storage, accounts, and the small issues that become big issues when nobody owns them.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Build the missing piece</h3>
              <p>If the right dashboard, script, integration, or workflow does not exist, I will make a practical version and improve it while I use it.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Work on the physical thing</h3>
              <p>I am just as happy with a screwdriver and a multimeter as I am in a terminal. Repair work keeps me patient and honest about what the hardware can do.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="paper-section selected-work">
        <div className="wrap selected-grid">
          <div>
            <p className="kicker">A few ongoing projects</p>
            <h2>Things I built because I needed them.</h2>
            <RouteLink to="work">See all project notes</RouteLink>
          </div>
          <div className="work-index">
            {systems.slice(0, 4).map((system) => (
              <a href="#/work" key={system.number}>
                <span>{system.number}</span>
                <strong>{system.short}</strong>
                <p>{system.title}</p>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="learning-section">
        <div className="wrap learning-grid">
          <div className="learning-quote">“I don&apos;t know yet” is a starting point, not an excuse.</div>
          <ol>
            <li><span>Read</span>Start with the documentation and the real error, not a random guess.</li>
            <li><span>Test</span>Make the smallest safe test that can prove or disprove the idea.</li>
            <li><span>Verify</span>Check the real result. A command completing is not the same as the job working.</li>
            <li><span>Write it down</span>Keep the fix, the reason, and the rollback path for next time.</li>
          </ol>
        </div>
      </section>
    </>
  )
}

function WorkPage() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <PageTitle
          index="01"
          kicker="Work and projects"
          title={<>The stuff I build, fix, and run.</>}
          intro="This is the bigger technical side of Personal Tech Wiz: homelab services, AI tools, dashboards, media systems, game servers, and repair work. Most of it started because I needed it or someone around me did."
        />
        <div className="case-list">
          {systems.map((system) => (
            <article className="case-study" key={system.number}>
              <aside><span>{system.number}</span><strong>{system.short}</strong></aside>
              <div className="case-main">
                <h2>{system.title}</h2>
                <div className="case-copy">
                  <div><h3>Why it exists</h3><p>{system.problem}</p></div>
                  <div><h3>What I handle</h3><p>{system.work}</p></div>
                </div>
                <div className="tool-line">{system.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <TechRange />
    </main>
  )
}

function TechRange() {
  const groups = [
    ['Operating systems', ['Linux', 'Windows', 'macOS', 'iOS', 'Android', 'Other systems as needed']],
    ['Machines and devices', ['Servers', 'PCs', 'Macs', 'Phones', 'Tablets', 'Consoles', 'Handhelds', 'Networking gear']],
    ['Infrastructure', ['Docker', 'Tailscale', 'Cloudflare', 'DNS', 'Firewalls', 'Storage', 'Backups', 'Monitoring']],
    ['Software and automation', ['React', 'JavaScript', 'Python', 'Shell', 'REST APIs', 'GitHub', 'AI agents', 'Webhooks']],
  ]
  return (
    <section className="range-section">
      <div className="wrap">
        <div className="section-heading compact"><p className="kicker">Range</p><h2>I am not tied to one stack.</h2></div>
        <div className="range-grid">
          {groups.map(([title, items]) => (
            <div key={title}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResumePage() {
  return (
    <main className="page-shell resume-page">
      <div className="wrap">
        <PageTitle
          index="02"
          kicker="Résumé"
          title={<>Resume and skills.</>}
          intro="I am your Personal Tech Wiz: customer support, IT help, server work, AI tools, repair work, and the patience to learn whatever the job needs next."
        />
        <section className="resume-summary">
          <div className="resume-contact">
            <p>Jeffrey Yampol</p>
            <span>Hollywood, Florida</span>
            <a href="mailto:personaltechwiz@gmail.com">personaltechwiz@gmail.com</a>
            <a href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={13} /></a>
          </div>
          <div>
            <h2>Professional summary</h2>
            <p>I am a customer-focused technology generalist with hands-on experience in IT support, electronics troubleshooting, networking, system maintenance, Linux servers, self-hosted services, and AI automation. I solve problems patiently, explain them plainly, and learn unfamiliar systems quickly.</p>
          </div>
        </section>
        <section className="resume-highlights" aria-label="Technical resume highlights">
          {resumeHighlights.map((item) => <p key={item}>{item}</p>)}
        </section>
        <section className="experience-section">
          <div className="resume-section-label">Experience</div>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.role}-${item.dates}`}>
                <div className="experience-meta"><span>{item.dates}</span><small>{item.location}</small></div>
                <div><h2>{item.role}</h2><h3>{item.place}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>
        <section className="resume-bottom">
          <div>
            <div className="resume-section-label">Education</div>
            <h2>High School Diploma</h2>
            <p>Yeshivat Kadimah High School<br /><span>2018–2021</span></p>
            <p>Ida Crown Jewish Academy<br /><span>2017–2018</span></p>
          </div>
          <div>
            <div className="resume-section-label">Work skills</div>
            <div className="plain-columns">
              <ul><li>Technical support</li><li>Desktop support</li><li>Networking</li><li>Operating systems</li><li>Software troubleshooting</li><li>Hardware diagnosis</li></ul>
              <ul><li>Customer service</li><li>Store operations</li><li>Employee training</li><li>Inventory</li><li>Public speaking</li><li>Problem solving</li></ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function ServicesPage() {
  const groupedServices = [...new Set(serviceLinks.map((service) => service.group))]
    .map((group) => [group, serviceLinks.filter((service) => service.group === group)])

  return (
    <main className="page-shell services-page">
      <div className="wrap">
        <PageTitle
          index="03"
          kicker="Services and access"
          title={<>Hosted services.</>}
          intro="A simple directory for the things I host: community chat, Minecraft, media, music, comics, games, and small tools. The real links stay private until each service is ready."
        />
        <div className="privacy-line"><Check size={16} /> No private hostnames, addresses, or sign-in pages are exposed here.</div>
        <section className="service-directory" aria-label="Hosted service directory">
          {groupedServices.map(([group, services]) => (
            <div className="service-group" key={group}>
              <h2>{group}</h2>
              <div>
                {services.map(({ name, description, status, icon: Icon }, index) => (
                  <article key={name}>
                    <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                    <Icon size={21} />
                    <div><h3>{name}</h3><p>{description}</p></div>
                    <span className="service-state">{status}</span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
      <section className="repair-services">
        <div className="wrap repair-service-grid">
          <div>
            <p className="kicker">Personal Tech Wiz repair</p>
            <h2>Have something broken or a mod in mind?</h2>
            <p>Send the model, what happened, what you want done, and a few clear photos. I will tell you whether it is a job I can take on and what I need to check first.</p>
            <a className="button light-button" href="mailto:personaltechwiz@gmail.com">Start with an email <Mail size={16} /></a>
          </div>
          <ul>
            <li><Wrench size={19} /><span><strong>Consoles and handhelds</strong>Diagnosis, cleaning, screens, shells, buttons, storage, software, and general restoration.</span></li>
            <li><Gamepad2 size={19} /><span><strong>Controllers and mods</strong>Cleaning, shells, buttons, drift troubleshooting, and custom builds.</span></li>
            <li><Monitor size={19} /><span><strong>Computers and operating systems</strong>PC and Mac troubleshooting, upgrades, cleanup, networking, and software recovery.</span></li>
            <li><Smartphone size={19} /><span><strong>Phones and small electronics</strong>Older phone screens and small-device work when the parts and repair risk make sense.</span></li>
          </ul>
        </div>
      </section>
    </main>
  )
}

function BenchPage({ openImage }) {
  return (
    <main className="page-shell bench-page">
      <div className="wrap">
        <PageTitle
          index="04"
          kicker="Repair bench"
          title={<>Take it apart carefully.<br /><em>Put it back better.</em></>}
          intro="I like old consoles, odd failures, worn controllers, forgotten computers, and anything that makes me ask: what is actually wrong with this thing?"
        />
        <div className="bench-manifesto">
          <p>I do not believe every device needs to be replaced the moment it acts up. Sometimes it needs cleaning. Sometimes a cable, screen, drive, shell, or software install. Sometimes it is truly done. The first job is finding out which one.</p>
          <div><span>My rule</span>Diagnose first. Buy parts second.</div>
        </div>
        <div className="photo-grid">
          {gallery.map((image, index) => (
            <button type="button" key={image.src} className={`photo photo-${(index % 7) + 1}`} onClick={() => openImage(image)}>
              <img src={image.src} alt={image.alt} loading={index > 2 ? 'lazy' : 'eager'} />
              <span><b>{String(index + 1).padStart(2, '0')}</b>{image.label}<ImageIcon size={14} /></span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div><p className="kicker">Your Personal Tech Wiz</p><h2>Got a tech problem or a job opening?</h2></div>
        <div><a className="footer-email" href="mailto:personaltechwiz@gmail.com">personaltechwiz@gmail.com <ArrowUpRight size={22} /></a><p>Computers · servers · AI · websites · consoles · repairs</p></div>
      </div>
      <div className="wrap footer-bottom"><Brand /><span>© {new Date().getFullYear()} Jeffrey Yampol</span></div>
    </footer>
  )
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined
    const escape = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', escape)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', escape)
      document.body.classList.remove('modal-open')
    }
  }, [image, onClose])
  if (!image) return null
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.label} onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <button type="button" onClick={onClose} aria-label="Close image"><X size={22} /></button>
      <figure><img src={image.src} alt={image.alt} /><figcaption>{image.label}</figcaption></figure>
    </div>
  )
}

function App() {
  const route = useRoute()
  const [lightbox, setLightbox] = useState(null)
  const page = useMemo(() => {
    if (route === 'work') return <WorkPage />
    if (route === 'resume') return <ResumePage />
    if (route === 'services') return <ServicesPage />
    if (route === 'bench') return <BenchPage openImage={setLightbox} />
    return <HomePage />
  }, [route])

  return (
    <>
      <a className="skip-link" href="#page-content">Skip to content</a>
      <Header route={route} />
      <div id="page-content">{page}</div>
      <Footer />
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </>
  )
}

export default App
