# RestoPilot 🍽️

**Restaurant Management, Beautifully Simplified.**

RestoPilot is a responsive, interactive **restaurant-management SaaS prototype** built entirely with **HTML, CSS and vanilla JavaScript**. There is no backend: it is intended for portfolio demonstrations and product walkthroughs.

## Experience

- **Overview:** restaurant KPI cards, a revenue chart, recent orders, popular dishes and quick actions.
- **Orders:** create, edit and delete orders; change status; search, filter and export CSV.
- **Tables:** visual restaurant floor plan grouped by zone, with click-to-cycle status.
- **Reservations:** guest list with dates, times, party sizes and booking status.
- **Menu Management:** image-rich menu cards, categories and dish management.
- **Inventory:** ingredient tracking, low-stock warnings and threshold gauges.
- **Customers:** customer profiles, segments and visit history.
- **Team:** staff directory, shifts and active status.
- **Analytics:** revenue chart, order channels and menu popularity.
- **Settings:** restaurant details, currency, theme and reset.
- **Guest menu preview:** public-facing restaurant menu mockup with category filtering and a non-transactional demo cart.

## Tech stack

HTML5 · CSS3 · Vanilla JavaScript · [Chart.js](https://www.chartjs.org/) · [Lucide Icons](https://lucide.dev/) · Google Fonts · Unsplash photo URLs.

## Run locally

Open `index.html` in a browser, or serve it using a static development server:

```bash
python -m http.server 5500
```

Visit `http://localhost:5500`. Deploy the repository to **Vercel** with **Framework Preset: Other** and no build command.

## Data & limitations

- Seed data is **fictional and for demo purposes**.
- Data edits and theme settings persist using **LocalStorage** in the current browser only.
- No authentication, cross-device sync, live orders, real reservations, payment processing or server-side storage.
- Charts show stored demo data. A top-dishes sales-count field is illustrative.
- Images, icon library, font files and chart library load from external URLs and require internet access.

## Repository

https://github.com/YoussefLehroudd/RestoPilot

Made to demonstrate a premium restaurant management product concept.
