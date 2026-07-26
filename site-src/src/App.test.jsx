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
    expect(screen.getByText(/one-man tech help/i)).toBeInTheDocument()
    expect(screen.getByText(/learn it, test it/i)).toBeInTheDocument()
    expect(screen.getByText(/one guy who likes figuring tech out/i)).toBeInTheDocument()
    expect(screen.getAllByText(/linux, windows, macos, ios, android/i).length).toBeGreaterThan(0)
  })

  it('organizes detailed projects on a separate Work view', () => {
    render(<App />)
    go('#/work')
    expect(screen.getByRole('heading', { name: /projects i actually use.*keep running/i })).toBeInTheDocument()
    expect(screen.getByText('A homelab that has to work, not just look good in a rack.')).toBeInTheDocument()
    expect(screen.getByText(/ai that can do useful work/i)).toBeInTheDocument()
    expect(screen.getByText(/i am not tied to one stack/i)).toBeInTheDocument()
  })

  it('keeps resume information in a focused resume view', () => {
    render(<App />)
    go('#/resume')
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
