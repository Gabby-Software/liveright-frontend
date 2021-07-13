# Liveright project

### *Relevant links*
 * [Old version](http://portal.theliveright.com/)  
        username: `black@colorelephant.com`  
        password: `6038dc237b5ba`
 * [Sitemap](https://whimsical.com/liveright-sitemap-v1-KqFoCVEcYzE9Qo5iyHmEHv)
 * [Wireframes - client - mobile](https://whimsical.com/liveright-internal-mobile-wireframes-B7MqrKWWbERFtQbNqDVmm4)
 * [Wireframes - client - desktop](https://whimsical.com/liveright-client-desktop-8eXNugWK65HZLNcGa5hfCf)
 * [Wireframes - trainer - mobile](https://whimsical.com/liveright-internal-mobile-trainer-flow-4j7VgHPFHiaAC6ggcvdwLq)
 * [Scope document](https://docs.google.com/spreadsheets/d/1JhTL-g5SmKEvYVV4NrOSJcEsXZPU5IOcGU4hX-oZBnU/edit?usp=sharing)
 * [Clickup documentation](https://app.clickup.com/2164322/v/dc/221k2-2535/221k2-5160)
 * [Clickup board](https://app.clickup.com/2164322/v/b/221k2-2507)
 * [API documentation](https://documenter.getpostman.com/view/8741108/Tzeak6s7)

### *Getting started*
 * Run `yarn setup`. this will install dependencies and init .env   
 If any additional setup will be needed in future, please add it in the setup command.
 * Run `yarn start` to start the server. Will run om port 8022. Can be customized in .env

### *Mailhog*
[https://mailhog.madebycolorelephant.com/](https://mailhog.madebycolorelephant.com/)  
***username***: `test`  
***password***: `Colorelephant2100!`  

### *3rd party apps*
For any 3rd party app use a dedicated account for this project development.   
***username:*** `liverightdevelopment@gmail.com`  
***password:*** `liveright123`

Current 3-rd party libraries in use:
 * [ipstack](https://ipstack.com/) used for initiate user with default address

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

ssh to the server is using ssh auth keys. you should ask server guy to add your [public key](https://phoenixnap.com/kb/generate-ssh-key-windows-10) to the server.
***main app dev:*** `ssh liverightdev@161.35.145.146`
***allright dev:*** `ssh identity@165.22.206.31`
Deployment flow: 
```
cd public_html
git pull origin dev
yarn install
yarn build
```

### *Local cli* 
There created a local cli to be used for this project.  
Its installed automatically together with project dependencies.  
Used as keyword `liveright` or just `lr`.  
Details can be found in wiki:
* [Available commands](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki/cli/available-command.md)
* [Creating new command](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki/cli/create-command.md)

### *Other*

Information about specific features and implementations can be found in [/wiki](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki) folder
