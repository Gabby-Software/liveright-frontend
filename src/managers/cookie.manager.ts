import logger from "./logger.manager";

const cookieManager = {
  get(name: string){
      name += "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  },
  set(name: string, value: string, exdays: number = 1){
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
  },
  remove(name: string){
      this.set(name, '', 0);
  },
  removeAll(){
          const cookies = document.cookie.split(";");
          logger.info('cookies to remove', cookies);
          for (const cookie of cookies) {
              const eqPos = cookie.indexOf("=");
              const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
  }
};

export default cookieManager;
