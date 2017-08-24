const cookieParser = {
  getCookie (name) {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(`${name}=`);
        if (start !== -1) {
            start = start + name.length + 1;
            let end = document.cookie.indexOf(";", start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return document.cookie.substring(start, end);
        }
    }
    return "";
  },

  setCookie (name, value) {
    let str = '';
    if (document.cookie.length > 0) {
        const start = document.cookie.indexOf(`${name}=`);
        if (start !== -1) {
            let end = document.cookie.indexOf(";", start);
            if (end === -1) {
                end = document.cookie.length;
            }
            str = document.cookie.substring(start, end);
        }
        document.cookie = document.cookie.replace(new RegExp(str), `${name}=${value}`);
    }
  }
};

export default cookieParser;
