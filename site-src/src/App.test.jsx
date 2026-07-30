import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import content from './content.json'

function go(route) {
  act(() => {
    window.location.hash = route
    window.dispatchEvent(new Event('hashchange'))
  })
}

describe('Personal Tech Wiz portfolio', () => {
  beforeEach(() => {
    window.location.hash = '#/'
    window.history.replaceState({}, '', '/')
  })

  it('keeps visible public copy in a top-level copy object', () => {
    expect(content.copy).toMatchObject({
      brand: expect.any(Object),
      header: expect.any(Object),
      footer: expect.any(Object),
      home: expect.any(Object),
      pages: expect.any(Object),
      skills: expect.any(Object),
      resume: expect.any(Object),
      services: expect.any(Object),
      bench: expect.any(Object),
    })
    expect(content.copy.home.hero.title).toBe('Your Personal Tech Wiz.')
    expect(content.copy.skills.range.groups[0][1][0]).toBe('Linux')
    expect(content.resumeHighlights[0]).toMatch(/hands-on IT support/i)
    expect(content.copy.pages.services.title).toEqual({ line1: 'Hosted services,', line2: 'without the private doors.' })
  })

  it('exposes stable click-to-edit paths for major visible copy blocks', () => {
    window.history.replaceState({}, '', '/?editor=1#/')
    render(<App />)
    expect(screen.getByRole('banner')).toHaveAttribute('data-content-path', 'copy.header')
    expect(screen.getByRole('heading', { name: /your personal.*tech wiz/i })).toHaveAttribute('data-content-path', 'copy.home.hero.title')
    expect(screen.getByText(/friendly tech help from jeffrey/i)).toHaveAttribute('data-content-path', 'copy.home.hero.kicker')
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('data-content-path', 'routes.1.label')
    expect(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('[data-content-path="copy.header.email"]')).toBeTruthy()
    expect(screen.getByAltText('Circuit board inspection at the Personal Tech Wiz repair bench')).toHaveAttribute('data-content-path', 'copy.home.hero.photo.alt')
    go('#/skills')
    expect(document.querySelector('[data-content-path="copy.skills.range.groups.0.1.0"]')).toHaveTextContent('Linux')
    expect(screen.getAllByText('Skill area')[0]).toHaveAttribute('data-content-path', 'copy.skills.systemLabels.skillArea')
    expect(screen.getAllByText('Examples')[0]).toHaveAttribute('data-content-path', 'copy.skills.systemLabels.examples')
    expect(screen.getAllByText('Jeffrey Yampol').some((node) => node.getAttribute('data-content-path') === 'copy.brand.name')).toBe(true)
    expect(screen.getByText(/computers · servers · ai · websites · consoles · repairs/i)).toHaveAttribute('data-content-path', 'copy.footer.tagline')
    expect(screen.getByText('jeffrey@personaltechwiz.com')).toHaveAttribute('data-content-path', 'copy.footer.email')
    go('#/resume')
    expect(screen.getByText('Experience')).toHaveAttribute('data-content-path', 'copy.resume.experienceLabel')
    expect(screen.getByText(/© \d{4} Jeffrey Yampol/i)).toHaveTextContent(/Jeffrey Yampol/)
  })

  it('gives nested visible content exact leaf-level editor targets', () => {
    window.history.replaceState({}, '', '/?editor=1#/skills')
    const { container } = render(<App />)
    const hasPath = (path) => expect(container.querySelector(`[data-content-path="${path}"]`), path).toBeTruthy()

    for (const path of [
      'systems.0.number', 'systems.0.short', 'systems.0.title', 'systems.0.problem', 'systems.0.work', 'systems.0.tools.0',
    ]) hasPath(path)
    go('#/resume')
    for (const path of [
      'copy.resume.contact.name', 'copy.resume.contact.location', 'copy.resume.contact.email', 'copy.resume.contact.linkedinText',
      'resumeHighlights.0', 'experience.0.dates', 'experience.0.location', 'experience.0.role', 'experience.0.place', 'experience.0.description',
      'copy.resume.education.schools.0.0', 'copy.resume.education.schools.0.1', 'copy.resume.skills.columns.0.0',
    ]) hasPath(path)
    go('#/services')
    for (const path of [
      'serviceLinks.0.group', 'serviceLinks.0.name', 'serviceLinks.0.description', 'serviceLinks.0.status',
      'copy.services.repairItems.0.title', 'copy.services.repairItems.0.body',
    ]) hasPath(path)
    go('#/bench')
    for (const path of ['gallery.0.alt', 'gallery.0.label']) hasPath(path)
  })

  it('uses a focusable main skip-link destination', () => {
    render(<App />)
    const main = document.querySelector('main#page-content')
    expect(main).toBeTruthy()
    expect(main).toHaveAttribute('tabindex', '-1')
  })

  it('uses safe structured page titles instead of editable html', () => {
    window.history.replaceState({}, '', '/?editor=1#/services')
    render(<App />)
    const title = screen.getByRole('heading', { name: /hosted services/i })
    expect(title).toContainHTML('<br>')
    expect(title.querySelector('em')).toHaveAttribute('data-content-path', 'copy.pages.services.title.line2')
    expect(title.querySelector('em')).toHaveTextContent('without the private doors.')
  })

  it('opens with Jeffrey’s Personal Tech Wiz positioning', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /your personal.*tech wiz/i })).toBeInTheDocument()
    expect(screen.getByText(/friendly tech help from jeffrey/i)).toBeInTheDocument()
    expect(screen.getByText(/getting talked down to/i)).toBeInTheDocument()
    expect(screen.getByText(/bring me the weird problem/i)).toBeInTheDocument()
    expect(screen.getAllByText(/linux, windows, macos, ios, android/i).length).toBeGreaterThan(0)
  })

  it('organizes skills on a separate Skills view', () => {
    render(<App />)
    go('#/skills')
    expect(screen.getByRole('heading', { name: /skills and examples/i })).toBeInTheDocument()
    expect(screen.getByText(/computers, phones, accounts/i)).toBeInTheDocument()
    expect(screen.getByText(/linux servers, self-hosted apps/i)).toBeInTheDocument()
    expect(screen.getByText(/i am not tied to one stack/i)).toBeInTheDocument()
  })

  it('keeps the old Work hash as a Skills alias', () => {
    render(<App />)
    go('#/work')
    expect(screen.getByRole('heading', { name: /skills and examples/i })).toBeInTheDocument()
  })

  it('keeps resume information in a focused resume view', () => {
    render(<App />)
    go('#/resume')
    expect(screen.getByRole('heading', { name: /resume, skills/i })).toBeInTheDocument()
    expect(screen.queryByText(new RegExp('r\\u00e9sum\\u00e9', 'i'))).not.toBeInTheDocument()
    expect(screen.getByText('IT Consultant / IT Systems Manager')).toBeInTheDocument()
    expect(screen.getByText('Renew Range Holdings · CareFree Living Center')).toBeInTheDocument()
    expect(screen.getByText('Assistant Store Manager')).toBeInTheDocument()
    expect(screen.getByText('High School Diploma')).toBeInTheDocument()
  })

  it('shows requested hosted services without exposing live private links', () => {
    render(<App />)
    go('#/services')
    const directory = screen.getByRole('region', { name: 'Hosted service directory' })
    for (const service of ['Discord', 'Minecraft map', 'Jellyfin', 'Komga', 'Navidrome', 'RomM']) {
      expect(within(directory).getByText(service)).toBeInTheDocument()
    }
    expect(directory.querySelectorAll('a[href^="http"]').length).toBe(0)
    expect(screen.getByText(/no private hostnames/i)).toBeInTheDocument()
  })

  it('opens a bench photo in a lightbox and closes with Escape', () => {
    render(<App />)
    go('#/bench')
    const firstPhoto = screen.getByRole('button', { name: /repair and modification project 1 from/i })
    fireEvent.click(firstPhoto)
    expect(screen.getByRole('dialog', { name: 'Board inspection' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
