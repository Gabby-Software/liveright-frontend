#Routes

The routes configured in `/config/routes.config.ts`.

For now each route contain:

- `title` - doc title and its nick for export
- `url` - the url to trigger this route
- `Component` - a component to load by this route (all page level component are lazy loading)
- `header` - configuration of the header

Probably in future will be added there seo data.

Available slugs configured in `/enums/routes.enum.ts`.  
Please use those wen configure new route, or setup link/redirect.
That way we able to change slug name without break the app.

Routes can be exported using local cli command: `liveright export sitemap`
