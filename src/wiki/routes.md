#Routes

The routes configured in `/config/routes.ts`.  

For now each route contain:
* `title` - doc title and its nick for export
* `url` - the url to trigger this route
* `Component` - a component to load by this route (all page level component are lazy loading)

Probably in future will be added there seo data.  
Routes can be exported using local cli command: `liveright export sitemap`
