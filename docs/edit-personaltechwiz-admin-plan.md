# creative.personaltechwiz.com visual editor

Goal: authenticated no-code editor for managing the PersonalTechWiz directory, skills, resume entries, home cards, navigation, and repair-gallery content without putting edit controls or tokens in the public GitHub Pages site.

## Safe architecture

- Keep `personaltechwiz.com` as the public static GitHub Pages site.
- Run a separate private admin app on the homeserver, exposed as `creative.personaltechwiz.com` only after Authentik authentication.
- Protect the subdomain with Cloudflare Access or another real login layer before the app loads.
- Store any GitHub token only on the server, never in browser JavaScript or the static site.
- Admin app edits a content JSON/MD file and commits/pushes the generated site to GitHub Pages.
- Include preview before publish and a rollback/history view.
- When editing is no longer needed, remove the Cloudflare route/tunnel and stop the admin service.

## Minimum editor fields

- Home hero: kicker, headline, intro, note, button labels.
- Home sections: Personal Tech Wiz explanation, How I work cards, How I can help rows, Skills preview.
- Skills page: skill cards, examples, tool tags.
- Resume page: summary, highlights, experience, education, contact email.
- Services page: service cards/statuses and repair services copy.
- Repair bench page: page intro, manifesto, gallery labels.

## Do not do

- Do not put a GitHub token in a public React app.
- Do not rely on a hidden URL as authentication.
- Do not expose private service hostnames while making the editor.
- Do not leave edit mode public after the copy is finalized.
