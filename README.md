# AutoEx Website — full site

React 19 + TanStack Start (Node server functions) + Tailwind CSS v4.

## Run locally
1. Install Node.js 20+ (or Bun).
2. `npm install`
3. Git pre-commit hooks are configured during install and lint staged JS/TS files before each commit.
4. `npm run dev` then open http://localhost:8080
5. Production: `npm run build:production` to remove previous build output and create a fresh build; upload the generated output to SiteGround manually.
6. Preview: `npm run preview`
7. Tests: `npm test`

## Pages (src/routes)
- `/` Home · `/inventory` Inventory · `/inventory/details/:id` Car details
- `/loan-application` · `/value-your-trade` · `/shopping-request`
- `/about-us` · `/contact-us` · `/terms-and-conditions` · `/sitemap`

## Structure
- `src/components/layout` – Header, Footer
- `src/components/home | inventory | vehicle | forms` – page sections and forms
- `src/lib/inventory.functions.ts` – server functions serving inventory data
- `src/lib/leads.functions.ts` – server function receiving every form (plug email/CRM in here)
- `src/data/vehicles.json` – all 85 vehicles with full details
- `src/config/site.ts`, `src/config/form-options.ts` – dealership info, hours, menus, form options
