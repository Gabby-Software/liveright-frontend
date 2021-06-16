# Available cli commands
***Conventions:*** 
 * `{something}` - any variable name
 * `<aaa | bbb | ccc>` - one of the options (in this case ether `aaa` or `bbb` or `ccc`)
 * `(-key {value})` - optional option
 * Anytime used `lr` can be used `liveright`, and viseversa
 
***Commands:***
* `lr help` - list available commands
* `lr create <component|layout|page|pipe|manager> <-n | -name> {filename} (<-d | -dir> {innerdirname})` - create pre-templated files for new component, manager etc. in propriate folder
* `lr init-env` - copy `.env.example` to `.env`
* `lr export locales` - export translations to .excel
* `lr export sitemap` - export routes list to .excel
* `lr update` - update your project with latest cli version 
