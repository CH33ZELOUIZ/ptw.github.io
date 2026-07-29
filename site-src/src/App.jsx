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

import content from './content.json'

const { routes, systems, experience, serviceLinks, fieldNotes, resumeHighlights, gallery } = content
const iconComponents = { MessageCircle, Gamepad2, MapPin, Film, Music2, Library, Boxes }
const editorMode = new URLSearchParams(window.location.search).get('editor') === '1'
const editProps = (path) => editorMode ? { 'data-content-path': path } : {}

function currentRoute() {
  const value = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  if (value === 'work') return 'skills'
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
          <a className="nav-email" href="mailto:jeffrey@personaltechwiz.com">Email me <ArrowUpRight size={14} /></a>
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
            <p className="kicker">Friendly tech help from Jeffrey</p>
            <h1>Your Personal Tech Wiz.</h1>
            <p className="hero-intro">
              Hey, I&apos;m Jeffrey. I fix, set up, explain, and build tech for people who just want it
              to work without getting talked down to.
            </p>
            <p className="hero-note">
              Bring me the weird problem: a slow computer, a broken account, a server idea, a website,
              a console repair, or a setup nobody else wants to untangle. I will listen first, check the
              real cause, and keep at it until there is a clear next step.
            </p>
            <div className="hero-actions">
              <a className="button" href="mailto:jeffrey@personaltechwiz.com">Email me</a>
              <RouteLink to="skills" className="quiet-link">See my skills</RouteLink>
              <RouteLink to="resume" className="quiet-link">Read my resume</RouteLink>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="/assets/gallery/work-01.jpg" alt="Circuit board inspection at the Personal Tech Wiz repair bench" />
            <figcaption><span>At the bench</span> I check first, then fix.</figcaption>
          </figure>
        </div>
        <div className="wrap hero-ledger" aria-label="Areas Jeffrey can help with">
          {['Computer help', 'Phones & devices', 'Linux servers', 'Websites & tools', 'Repair bench'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="paper-section">
        <div className="wrap personal-grid">
          <div className="side-note">Why Personal Tech Wiz?</div>
          <div className="personal-copy">
            <h2>One person for the messy middle of tech.</h2>
            <p className="large-copy">
              A lot of tech problems do not belong to one neat category. The app, the account, the router,
              the computer, the server, and the device can all be part of the same headache.
            </p>
            <p>
              I am comfortable moving between Linux, Windows, macOS, iOS, Android, servers, PCs, Macs, phones,
              tablets, consoles, handhelds, controllers, storage, networking gear, and smart-home devices. If I do
              not know the answer yet, I slow down, read, test, and explain what I find in normal words.
            </p>
          </div>
        </div>
      </section>

      <section className="paper-section field-notes-section">
        <div className="wrap field-notes-grid">
          <div className="field-notes-heading">
            <p className="kicker">How I work</p>
            <h2>Listen, check, fix, explain.</h2>
            <p>You get somebody who can listen first, explain without talking down, open the device or logs when needed, and stay with the problem until the answer is real.</p>
          </div>
          <div className="note-board">
            {fieldNotes.map(([title, body], index) => (
              <article key={title} className="note-card" {...editProps(`fieldNotes.${index}`)}>
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
            <p className="kicker">How I can help</p>
            <h2>Fix problems, set things up, and make tech easier.</h2>
          </div>
          <div className="practice-list">
            <article>
              <span>01</span>
              <h3>Day-to-day tech help</h3>
              <p>Computers, phones, accounts, updates, Wi‑Fi, printers, storage, backups, cleanup, and the little issues that turn into big ones when nobody owns them.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Websites, dashboards, and automations</h3>
              <p>I build practical tools when a spreadsheet, bookmark folder, or repeated manual step is getting in the way.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Repair bench work</h3>
              <p>Consoles, controllers, older devices, parts swaps, cleaning, testing, and honest calls about whether something is worth repairing.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="paper-section selected-work">
        <div className="wrap selected-grid">
          <div>
            <p className="kicker">Skills in real life</p>
            <h2>The main things I help with.</h2>
            <RouteLink to="skills">Open the full skills page</RouteLink>
          </div>
          <div className="work-index">
            {systems.slice(0, 4).map((system) => (
              <a href="#/skills" key={system.number} {...editProps(`systems.${systems.indexOf(system)}`)}>
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

function SkillsPage() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <PageTitle
          index="01"
          kicker="Skills and examples"
          title={<>Skills and examples.</>}
          intro="A cleaner look at what I can help with: everyday IT support, operating systems, servers, websites, AI tools, hosted services, game servers, and repair bench work."
        />
        <div className="case-list">
          {systems.map((system) => (
            <article className="case-study" key={system.number} {...editProps(`systems.${systems.indexOf(system)}`)}>
              <aside><span>{system.number}</span><strong>{system.short}</strong></aside>
              <div className="case-main">
                <h2>{system.title}</h2>
                <div className="case-copy">
                  <div><h3>Skill area</h3><p>{system.problem}</p></div>
                  <div><h3>Examples</h3><p>{system.work}</p></div>
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
          kicker="Resume"
          title={<>Resume, skills, and experience.</>}
          intro="I am your Personal Tech Wiz: customer support, IT help, server work, AI tools, repair work, and the patience to learn whatever the job needs next."
        />
        <section className="resume-summary">
          <div className="resume-contact">
            <p>Jeffrey Yampol</p>
            <span>Hollywood, Florida</span>
            <a href="mailto:jeffrey@personaltechwiz.com">jeffrey@personaltechwiz.com</a>
            <a href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={13} /></a>
          </div>
          <div>
            <h2>Professional summary</h2>
            <p>I am a customer-focused Personal Tech Wiz with hands-on experience in IT support, electronics troubleshooting, networking, system maintenance, Linux servers, self-hosted services, and AI automation. I solve problems patiently, explain them plainly, and learn unfamiliar systems quickly.</p>
          </div>
        </section>
        <section className="resume-highlights" aria-label="Technical resume highlights">
          {resumeHighlights.map((item) => <p key={item}>{item}</p>)}
        </section>
        <section className="experience-section">
          <div className="resume-section-label">Experience</div>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.role}-${item.dates}`} {...editProps(`experience.${experience.indexOf(item)}`)}>
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
            <div className="resume-section-label">Practical skills</div>
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
          title={<>Hosted services,<br />without the private <em>doors.</em></>}
          intro="This is the public directory for things I host or plan to open: community chat, Minecraft, media, music, comics, games, and small tools. The real links stay private until each service is ready."
        />
        <div className="privacy-line"><Check size={16} /> No private hostnames, addresses, or sign-in pages are exposed here.</div>
        <section className="service-directory" aria-label="Hosted service directory">
          {groupedServices.map(([group, services]) => (
            <div className="service-group" key={group}>
              <h2>{group}</h2>
              <div>
                {services.map((service, index) => {
                  const { name, description, status, icon } = service
                  const Icon = iconComponents[icon] || Boxes
                  const sourceIndex = serviceLinks.indexOf(service)
                  return (
                  <article key={name} {...editProps(`serviceLinks.${sourceIndex}`)}>
                    <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                    <Icon size={21} />
                    <div><h3>{name}</h3><p>{description}</p></div>
                    <span className="service-state">{status}</span>
                  </article>
                  )
                })}
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
            <a className="button light-button" href="mailto:jeffrey@personaltechwiz.com">Start with an email <Mail size={16} /></a>
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
            <button type="button" key={image.src} className={`photo photo-${(index % 7) + 1}`} onClick={() => openImage(image)} {...editProps(`gallery.${index}`)}>
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
        <div><a className="footer-email" href="mailto:jeffrey@personaltechwiz.com">jeffrey@personaltechwiz.com <ArrowUpRight size={22} /></a><p>Computers · servers · AI · websites · consoles · repairs</p></div>
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
  useEffect(() => {
    if (!editorMode) return undefined
    document.documentElement.classList.add('ptw-editor-mode')
    const click = (event) => {
      const target = event.target.closest('[data-content-path]')
      if (!target) return
      event.preventDefault()
      event.stopPropagation()
      document.querySelectorAll('.ptw-editor-selected').forEach((el) => el.classList.remove('ptw-editor-selected'))
      target.classList.add('ptw-editor-selected')
      window.parent.postMessage({ type: 'ptw-select', path: target.dataset.contentPath }, window.location.origin)
    }
    const message = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'ptw-highlight') return
      document.querySelectorAll('.ptw-editor-selected').forEach((el) => el.classList.remove('ptw-editor-selected'))
      const wanted = [...document.querySelectorAll('[data-content-path]')].find((el) => event.data.path === el.dataset.contentPath || event.data.path.startsWith(`${el.dataset.contentPath}.`))
      if (wanted) { wanted.classList.add('ptw-editor-selected'); wanted.scrollIntoView({ block: 'center', behavior: 'smooth' }) }
    }
    document.addEventListener('click', click, true)
    window.addEventListener('message', message)
    return () => { document.removeEventListener('click', click, true); window.removeEventListener('message', message); document.documentElement.classList.remove('ptw-editor-mode') }
  }, [])
  const page = useMemo(() => {
    if (route === 'skills') return <SkillsPage />
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
