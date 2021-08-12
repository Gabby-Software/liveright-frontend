# Liveright project

### *Relevant links*
 * [Old version](http://portal.theliveright.com/)  
        username: `black@colorelephant.com`  
        password: `6038dc237b5ba`
 * [Sitemap](https://whimsical.com/liveright-sitemap-v1-KqFoCVEcYzE9Qo5iyHmEHv)
 * [Wirefrmes - identidy](https://whimsical.com/closed-wireframes-identity-ar-Mt3bFPVyLCdNX4QsHE21r4)
 * [Wireframes - client - mobile](https://whimsical.com/liveright-internal-mobile-wireframes-B7MqrKWWbERFtQbNqDVmm4)
 * [Wireframes - trainer - mobile](https://whimsical.com/liveright-internal-mobile-trainer-flow-4j7VgHPFHiaAC6ggcvdwLq)
 * [Wireframes - client+trainer - desktop](https://whimsical.com/liveright-internal-desktop-wireframes-42jSTuRpBv9uCpVBuhwrq6)
 * [Wireframes - new](https://whimsical.com/liveright-wireframes-batch-ii-XNtfTXwkH97BHXucUPHXZX)
 * [Designs](https://www.figma.com/file/oDWlnY8XIqzNi5OsCwYtnO/Liveright---Internal?node-id=0%3A1)
 * [Scope document](https://docs.google.com/spreadsheets/d/1JhTL-g5SmKEvYVV4NrOSJcEsXZPU5IOcGU4hX-oZBnU/edit?usp=sharing)
 * [Clickup documentation](https://app.clickup.com/2164322/v/dc/221k2-2535/221k2-5160)
 * [Clickup board](https://app.clickup.com/2164322/v/b/221k2-2507)
 * [API documentation](https://documenter.getpostman.com/view/8741108/Tzeak6s7)
 * [ALLRight API documentation](https://documenter.getpostman.com/view/8741108/Tzm5GGb9#3e3d073b-7da1-41cc-b805-d1f97bb15425)

### *Getting started*
 * Run `yarn setup`. this will install dependencies and init .env   
 If any additional setup will be needed in future, please add it in the setup command.
 * Run `yarn start` to start the server. Will run om port 8022. Can be customized in .env

### *3rd party libraries*

####***MailGun***  
[https://www.mailgun.com/](https://www.mailgun.com/)  
***username***: `khaki@colorelephant.com`  
***password***: ``S8!4^?ce.nJ%nVx!``  

#### ***IPStack***
[https://ipstack.com/](https://ipstack.com/)   
***username:*** `liverightdevelopment@gmail.com`   
***password:*** `liveright123`  

#### ***Pusher***  
[https://dashboard.pusher.com/](https://dashboard.pusher.com/)
***username:*** `allright@colorelephant.com`  
***password:*** ``%V[u3tx`Me8f[KcB``

#### ***HotJar***
[https://hotjar.com](https://hotjar.com)
***username:*** `allright@colorelephant.com`  
***password:*** `t3SdVRJ@T6BjM4c`

### *Project structure*
* `assets` - save assets like media, styles, fonts and translations
* `components` - as the name speak. reusable react components
* `config` - save any project static configuration (like routes etc.)
* `enums` - enums
* `guards` - components wrapper which manage to control user enter to specific page level components, according to user authentication and permissions
* `hoc` - abstract component wrappers
* `hooks` - reusable hooks
* `layouts` - reusable blocks (like header, footer etc.)
* `managers` - classes of group of functions, supposed to manage functionality of specific scope
* `modules` - group of types, components, managers, pipes, etc supposed to manage a specific functionality
* `pages` - page level component
* `pipes` - transformation function to turn given data to required format
* `store` - global state related files - store, reducers and sagas
* `types` - types of objects, used globally in the app
* `wiki` - collection of description of specific functionality in the app

### *Deployment*

The dev and stage servers using [render.com](https://dashboard.render.com/).   
You can login there with your colorelephant gmail account and should be able to access it.   
The dev server deployed automatically on push to dev branch, stage server require manual deployment (button on top right)   
`.env` variables managed from right panel - `env groups` 

### *Local cli* 
There created a local cli to be used for this project.  
Its installed automatically together with project dependencies.  
Used as keyword `liveright` or just `lr`.  
Details can be found in wiki:
* [Available commands](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki/cli/available-command.md)
* [Creating new command](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki/cli/create-command.md)

### *Other*

Information about specific features and implementations can be found in [/wiki](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki) folder
