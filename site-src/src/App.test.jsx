import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Personal Tech Wiz portfolio', () => {
  it('presents Jeffrey and his core technical focus', () => {
    render(<App />)
    expect(screen.getAllByText('Jeffrey Yampol').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /useful systems/i })).toBeInTheDocument()
    expect(screen.getByText('Linux systems & homelab operations')).toBeInTheDocument()
    expect(screen.getByText('AI agents & practical automation')).toBeInTheDocument()
  })

  it('includes the supplied resume experience and education', () => {
    render(<App />)
    expect(screen.getByText('IT Consultant / IT Systems Manager')).toBeInTheDocument()
    expect(screen.getByText('Renew Range Holdings · CareFree Living Center')).toBeInTheDocument()
    expect(screen.getByText('Assistant Store Manager')).toBeInTheDocument()
    expect(screen.getByText('High School Diploma')).toBeInTheDocument()
  })

  it('shows requested services as private placeholders', () => {
    render(<App />)
    const portal = document.getElementById('portal')
    for (const service of ['Discord Community', 'Minecraft Live Map', 'Jellyfin', 'Komga', 'Navidrome', 'RomM']) {
      expect(within(portal).getByText(service)).toBeInTheDocument()
    }
    expect(screen.getByText(/no private endpoints are exposed/i)).toBeInTheDocument()
    expect(portal.querySelectorAll('a[href^="http"]').length).toBe(0)
    expect(screen.queryByRole('link', { name: /phone/i })).not.toBeInTheDocument()
  })
})
