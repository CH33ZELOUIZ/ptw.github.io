import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

function go(route) {
  act(() => {
    window.location.hash = route
    window.dispatchEvent(new Event('hashchange'))
  })
}

describe('Personal Tech Wiz portfolio', () => {
  beforeEach(() => {
    window.location.hash = '#/'
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
