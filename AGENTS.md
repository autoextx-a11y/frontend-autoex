<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Inventory data lives in `src/data/vehicles.json` and is read only on the server (`src/lib/inventory.server.ts`) via server functions in `src/lib/inventory.functions.ts`; the browser gets lightweight summaries so filtering stays fast and the big file never ships to the client.
- Inventory filtering, sorting and paging are pure functions in `src/lib/inventory-filter.ts` driven by URL search params, so filtered views are shareable and testable.
- Dealership details, hours and menu links come from `src/config/site.ts`; form option lists live in `src/config/form-options.ts`, and every form posts through `submitLead` in `src/lib/leads.functions.ts`.
- Images are loaded from the dealership's CDN URLs so the downloaded project runs anywhere without extra assets.
