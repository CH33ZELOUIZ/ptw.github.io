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

const { copy, routes, systems, experience, serviceLinks, fieldNotes, resumeHighlights, gallery } = content
const iconComponents = { MessageCircle, Gamepad2, MapPin, Film, Music2, Library, Boxes }

function isEditorMode() {
  return new URLSearchParams(window.location.search).get('editor') === '1'
}

function editProps(path) {
  return isEditorMode() ? { 'data-content-path': path } : {}
}

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
    window.scrollTo({ top: 0, behavior: 'auto' })
    const label = routes.find((item) => item.key === route)?.label
    document.title = route === 'home' ? 'Jeffrey Yampol | Personal Tech Wiz' : `${label} | Jeffrey Yampol · Personal Tech Wiz`
  }, [route])
  return route
}

function Brand() {
  return (
    <a className="brand" href="#/" aria-label={copy.brand.ariaLabel} {...editProps('copy.brand')}>
      <span className="brand-glyph" {...editProps('copy.brand.glyph')}>{copy.brand.glyph}</span>
      <span>
        <strong {...editProps('copy.brand.title')}>{copy.brand.title}</strong>
        <small {...editProps('copy.brand.name')}>{copy.brand.name}</small>
      </span>
    </a>
  )
}

function Header({ route }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  return (
    <header className="site-header" {...editProps('copy.header')}>
      <div className="header-inner">
        <Brand />
        <nav className={open ? 'main-nav main-nav--open' : 'main-nav'} aria-label={copy.header.navigationLabel} {...editProps('copy.header.navigationLabel')}>
          {routes.map((item, index) => (
            <a key={item.key} href={item.href} className={route === item.key ? 'active' : ''} {...editProps(`routes.${index}.label`)}>{item.label}</a>
          ))}
          <a className="nav-email" href="mailto:jeffrey@personaltechwiz.com" {...editProps('copy.header.email')}>{copy.header.email} <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? copy.accessibility.closeMenu : copy.accessibility.openMenu}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function renderTitle(title, path) {
  if (title && typeof title === 'object') {
    return <h1><span {...editProps(`${path}.line1`)}>{title.line1}</span><br /><em {...editProps(`${path}.line2`)}>{title.line2}</em></h1>
  }
  return <h1 {...editProps(path)}>{title}</h1>
}

function PageTitle({ index, kicker, title, intro, path }) {
  return (
    <div className="page-title" {...editProps(path)}>
      <div className="page-index" {...editProps(`${path}.index`)}>{index}</div>
      <div>
        <p className="kicker" {...editProps(`${path}.kicker`)}>{kicker}</p>
        {renderTitle(title, `${path}.title`)}
        {intro && <p className="page-intro" {...editProps(`${path}.intro`)}>{intro}</p>}
      </div>
    </div>
  )
}

function RouteLink({ to, children, className = 'text-link', path }) {
  return <a className={className} href={`#/${to}`} {...editProps(path)}>{children} <ArrowRight size={16} /></a>
}

function HomePage() {
  const hero = copy.home.hero
  return <>
    <section className="home-hero">
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <p className="kicker" {...editProps('copy.home.hero.kicker')}>{hero.kicker}</p>
          <h1 {...editProps('copy.home.hero.title')}>{hero.title}</h1>
          <p className="hero-intro" {...editProps('copy.home.hero.intro')}>{hero.intro}</p>
          <p className="hero-note" {...editProps('copy.home.hero.note')}>{hero.note}</p>
          <div className="hero-actions">
            <a className="button" href="mailto:jeffrey@personaltechwiz.com" {...editProps('copy.home.hero.actions.email')}>{hero.actions.email}</a>
            <RouteLink to="skills" className="quiet-link" path="copy.home.hero.actions.skills">{hero.actions.skills}</RouteLink>
            <RouteLink to="resume" className="quiet-link" path="copy.home.hero.actions.resume">{hero.actions.resume}</RouteLink>
          </div>
        </div>
        <figure className="hero-photo" {...editProps('copy.home.hero.photo')}>
          <img src="/assets/gallery/work-01.jpg" alt={hero.photo.alt} {...editProps('copy.home.hero.photo.alt')} />
          <figcaption><span {...editProps('copy.home.hero.photoCaption.lead')}>{hero.photoCaption.lead}</span> <span {...editProps('copy.home.hero.photoCaption.tail')}>{hero.photoCaption.tail}</span></figcaption>
        </figure>
      </div>
      <div className="wrap hero-ledger" aria-label={copy.accessibility.helpAreas}>{hero.areas.map((item, index) => <span key={item} {...editProps(`copy.home.hero.areas.${index}`)}>{item}</span>)}</div>
    </section>
    <section className="paper-section">
      <div className="wrap personal-grid">
        <div className="side-note" {...editProps('copy.home.personal.sideNote')}>{copy.home.personal.sideNote}</div>
        <div className="personal-copy">
          <h2 {...editProps('copy.home.personal.title')}>{copy.home.personal.title}</h2>
          <p className="large-copy" {...editProps('copy.home.personal.lead')}>{copy.home.personal.lead}</p>
          <p {...editProps('copy.home.personal.body')}>{copy.home.personal.body}</p>
        </div>
      </div>
    </section>
    <section className="paper-section field-notes-section">
      <div className="wrap field-notes-grid">
        <div className="field-notes-heading">
          <p className="kicker" {...editProps('copy.home.howIWork.kicker')}>{copy.home.howIWork.kicker}</p>
          <h2 {...editProps('copy.home.howIWork.title')}>{copy.home.howIWork.title}</h2>
          <p {...editProps('copy.home.howIWork.body')}>{copy.home.howIWork.body}</p>
        </div>
        <div className="note-board">
          {fieldNotes.map(([title, body], index) => <article key={title} className="note-card"><span>{String(index + 1).padStart(2, '0')}</span><h3 {...editProps(`fieldNotes.${index}.0`)}>{title}</h3><p {...editProps(`fieldNotes.${index}.1`)}>{body}</p></article>)}
        </div>
      </div>
    </section>
    <section className="dark-section what-i-do">
      <div className="wrap">
        <div className="section-heading">
          <p className="kicker" {...editProps('copy.home.howICanHelp.kicker')}>{copy.home.howICanHelp.kicker}</p>
          <h2 {...editProps('copy.home.howICanHelp.title')}>{copy.home.howICanHelp.title}</h2>
        </div>
        <div className="practice-list">{copy.home.howICanHelp.cards.map((card, index) => <article key={card.number}><span {...editProps(`copy.home.howICanHelp.cards.${index}.number`)}>{card.number}</span><h3 {...editProps(`copy.home.howICanHelp.cards.${index}.title`)}>{card.title}</h3><p {...editProps(`copy.home.howICanHelp.cards.${index}.body`)}>{card.body}</p></article>)}</div>
      </div>
    </section>
    <section className="paper-section selected-work">
      <div className="wrap selected-grid">
        <div>
          <p className="kicker" {...editProps('copy.home.skillsTeaser.kicker')}>{copy.home.skillsTeaser.kicker}</p>
          <h2 {...editProps('copy.home.skillsTeaser.title')}>{copy.home.skillsTeaser.title}</h2>
          <RouteLink to="skills" path="copy.home.skillsTeaser.link">{copy.home.skillsTeaser.link}</RouteLink>
        </div>
        <div className="work-index">{systems.slice(0, 4).map((system, index) => <a href="#/skills" key={system.number}><span {...editProps(`systems.${index}.number`)}>{system.number}</span><strong {...editProps(`systems.${index}.short`)}>{system.short}</strong><p {...editProps(`systems.${index}.title`)}>{system.title}</p><ArrowUpRight size={18} /></a>)}</div>
      </div>
    </section>
    <section className="learning-section">
      <div className="wrap learning-grid">
        <div className="learning-quote" {...editProps('copy.home.learning.quote')}>{copy.home.learning.quote}</div>
        <ol>{copy.home.learning.steps.map(([label, body], index) => <li key={label}><span {...editProps(`copy.home.learning.steps.${index}.0`)}>{label}</span><span {...editProps(`copy.home.learning.steps.${index}.1`)}>{body}</span></li>)}</ol>
      </div>
    </section>
  </>
}

function SkillsPage() {
  return (
    <section className="page-shell">
      <div className="wrap">
        <PageTitle {...copy.pages.skills} path="copy.pages.skills" />
        <div className="case-list">
          {systems.map((system, index) => (
            <article className="case-study" key={system.number}>
              <aside>
                <span {...editProps(`systems.${index}.number`)}>{system.number}</span>
                <strong {...editProps(`systems.${index}.short`)}>{system.short}</strong>
              </aside>
              <div className="case-main">
                <h2 {...editProps(`systems.${index}.title`)}>{system.title}</h2>
                <div className="case-copy">
                  <div><h3 {...editProps('copy.skills.systemLabels.skillArea')}>{copy.skills.systemLabels.skillArea}</h3><p {...editProps(`systems.${index}.problem`)}>{system.problem}</p></div>
                  <div><h3 {...editProps('copy.skills.systemLabels.examples')}>{copy.skills.systemLabels.examples}</h3><p {...editProps(`systems.${index}.work`)}>{system.work}</p></div>
                </div>
                <div className="tool-line">{system.tools.map((tool, toolIndex) => <span key={tool} {...editProps(`systems.${index}.tools.${toolIndex}`)}>{tool}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <TechRange />
    </section>
  )
}

function TechRange() {
  return <section className="range-section"><div className="wrap"><div className="section-heading compact"><p className="kicker" {...editProps('copy.skills.range.kicker')}>{copy.skills.range.kicker}</p><h2 {...editProps('copy.skills.range.title')}>{copy.skills.range.title}</h2></div><div className="range-grid">{copy.skills.range.groups.map(([title, items], groupIndex) => <div key={title}><h3 {...editProps(`copy.skills.range.groups.${groupIndex}.0`)}>{title}</h3><ul>{items.map((item, itemIndex) => <li key={item} {...editProps(`copy.skills.range.groups.${groupIndex}.1.${itemIndex}`)}>{item}</li>)}</ul></div>)}</div></div></section>
}

function ResumePage() {
  return (
    <section className="page-shell resume-page">
      <div className="wrap">
        <PageTitle {...copy.pages.resume} path="copy.pages.resume" />
        <section className="resume-summary">
          <div className="resume-contact">
            <p {...editProps('copy.resume.contact.name')}>{copy.resume.contact.name}</p>
            <span {...editProps('copy.resume.contact.location')}>{copy.resume.contact.location}</span>
            <a href="mailto:jeffrey@personaltechwiz.com" {...editProps('copy.resume.contact.email')}>{copy.resume.contact.email}</a>
            <a href="https://www.linkedin.com/in/jeffrey-yampol-42756b187" target="_blank" rel="noreferrer" {...editProps('copy.resume.contact.linkedinText')}>{copy.resume.contact.linkedinText} <ExternalLink size={13} /></a>
          </div>
          <div><h2 {...editProps('copy.resume.summary')}>{copy.resume.summary}</h2><p {...editProps('copy.resume.summaryText')}>{copy.resume.summaryText}</p></div>
        </section>
        <section className="resume-highlights" aria-label={copy.accessibility.resumeHighlights}>
          {resumeHighlights.map((item, index) => <p key={item} {...editProps(`resumeHighlights.${index}`)}>{item}</p>)}
        </section>
        <section className="experience-section">
          <div className="resume-section-label" {...editProps('copy.resume.experienceLabel')}>{copy.resume.experienceLabel}</div>
          <div className="experience-list">
            {experience.map((item, index) => <article key={`${item.role}-${item.dates}`}>
              <div className="experience-meta"><span {...editProps(`experience.${index}.dates`)}>{item.dates}</span><small {...editProps(`experience.${index}.location`)}>{item.location}</small></div>
              <div><h2 {...editProps(`experience.${index}.role`)}>{item.role}</h2><h3 {...editProps(`experience.${index}.place`)}>{item.place}</h3><p {...editProps(`experience.${index}.description`)}>{item.description}</p></div>
            </article>)}
          </div>
        </section>
        <section className="resume-bottom">
          <div>
            <div className="resume-section-label" {...editProps('copy.resume.education.label')}>{copy.resume.education.label}</div>
            <h2 {...editProps('copy.resume.education.title')}>{copy.resume.education.title}</h2>
            {copy.resume.education.schools.map(([school, dates], index) => <p key={school}><span {...editProps(`copy.resume.education.schools.${index}.0`)}>{school}</span><br /><span {...editProps(`copy.resume.education.schools.${index}.1`)}>{dates}</span></p>)}
          </div>
          <div>
            <div className="resume-section-label" {...editProps('copy.resume.skills.label')}>{copy.resume.skills.label}</div>
            <div className="skills-columns">{copy.resume.skills.columns.map((column, columnIndex) => <ul key={columnIndex}>{column.map((skill, itemIndex) => <li key={skill} {...editProps(`copy.resume.skills.columns.${columnIndex}.${itemIndex}`)}>{skill}</li>)}</ul>)}</div>
          </div>
        </section>
      </div>
    </section>
  )
}

function RepairIcon({ index }) {
  const Icon = [Wrench, Gamepad2, Monitor, Smartphone][index] || Wrench
  return <Icon size={19} />
}

function ServicesPage() {
  const groupedServices = [...new Set(serviceLinks.map((service) => service.group))].map((group) => [group, serviceLinks.filter((service) => service.group === group)])
  return (
    <section className="page-shell services-page">
      <div className="wrap">
        <PageTitle {...copy.pages.services} path="copy.pages.services" />
        <div className="privacy-line"><Check size={16} /> <span {...editProps('copy.services.privacy')}>{copy.services.privacy}</span></div>
        <section className="service-directory" aria-label={copy.accessibility.serviceDirectory}>
          {groupedServices.map(([group, services]) => {
            const groupIndex = serviceLinks.indexOf(services[0])
            return <div className="service-group" key={group}>
              <h2 {...editProps(`serviceLinks.${groupIndex}.group`)}>{group}</h2>
              <div>{services.map((service, index) => {
                const Icon = iconComponents[service.icon] || Boxes
                const sourceIndex = serviceLinks.indexOf(service)
                return <article key={service.name}>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={21} />
                  <div><h3 {...editProps(`serviceLinks.${sourceIndex}.name`)}>{service.name}</h3><p {...editProps(`serviceLinks.${sourceIndex}.description`)}>{service.description}</p></div>
                  <span className="service-state" {...editProps(`serviceLinks.${sourceIndex}.status`)}>{service.status}</span>
                </article>
              })}</div>
            </div>
          })}
        </section>
      </div>
      <section className="repair-services">
        <div className="wrap repair-service-grid">
          <div><p className="kicker" {...editProps('copy.services.repair.kicker')}>{copy.services.repair.kicker}</p><h2 {...editProps('copy.services.repair.title')}>{copy.services.repair.title}</h2><p {...editProps('copy.services.repair.body')}>{copy.services.repair.body}</p><a className="button light-button" href="mailto:jeffrey@personaltechwiz.com" {...editProps('copy.services.repair.cta')}>{copy.services.repair.cta} <Mail size={16} /></a></div>
          <ul>{copy.services.repairItems.map((item, index) => <li key={item.title}><RepairIcon index={index} /><span><strong {...editProps(`copy.services.repairItems.${index}.title`)}>{item.title}</strong><span {...editProps(`copy.services.repairItems.${index}.body`)}>{item.body}</span></span></li>)}</ul>
        </div>
      </section>
    </section>
  )
}

function BenchPage({ openImage }) {
  return (
    <section className="page-shell bench-page">
      <div className="wrap">
        <PageTitle {...copy.pages.bench} path="copy.pages.bench" />
        <div className="bench-manifesto"><p {...editProps('copy.bench.manifesto')}>{copy.bench.manifesto}</p><div><span {...editProps('copy.bench.ruleLabel')}>{copy.bench.ruleLabel}</span><span {...editProps('copy.bench.ruleBody')}>{copy.bench.ruleBody}</span></div></div>
        <div className="photo-grid">{gallery.map((image, index) => <button type="button" key={image.src} className={`photo photo-${(index % 7) + 1}`} onClick={() => openImage(image)}><img src={image.src} alt={image.alt} loading={index > 2 ? 'lazy' : 'eager'} {...editProps(`gallery.${index}.alt`)} /><span><b>{String(index + 1).padStart(2, '0')}</b><span {...editProps(`gallery.${index}.label`)}>{image.label}</span><ImageIcon size={14} /></span></button>)}</div>
      </div>
    </section>
  )
}

function Footer() {
  return <footer className="site-footer" {...editProps('copy.footer')}><div className="wrap footer-main"><div><p className="kicker" {...editProps('copy.footer.kicker')}>{copy.footer.kicker}</p><h2 {...editProps('copy.footer.title')}>{copy.footer.title}</h2></div><div><a className="footer-email" href={`mailto:${copy.footer.email}`} {...editProps('copy.footer.email')}>{copy.footer.email} <ArrowUpRight size={22} /></a><p {...editProps('copy.footer.tagline')}>{copy.footer.tagline}</p></div></div><div className="wrap footer-bottom"><Brand /><span {...editProps('copy.footer.copyrightName')}>© {new Date().getFullYear()} {copy.footer.copyrightName}</span></div></footer>
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
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.label} onMouseDown={(event) => event.currentTarget === event.target && onClose()}><button type="button" onClick={onClose} aria-label={copy.accessibility.closeImage}><X size={22} /></button><figure><img src={image.src} alt={image.alt} /><figcaption>{image.label}</figcaption></figure></div>
}

function App() {
  const route = useRoute()
  const [lightbox, setLightbox] = useState(null)
  useEffect(() => {
    if (!isEditorMode()) return undefined
    document.documentElement.classList.add('ptw-editor-mode')
    const click = (event) => {
      const target = event.target.closest('[data-content-path]')
      if (!target) return
      event.preventDefault(); event.stopPropagation()
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
  return <><a className="skip-link" href="#page-content" {...editProps('copy.accessibility.skipToContent')}>{copy.accessibility.skipToContent}</a><Header route={route} /><main id="page-content" tabIndex="-1">{page}</main><Footer /><Lightbox image={lightbox} onClose={() => setLightbox(null)} /></>
}

export default App
