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
  }
};
export default cookieManager;
