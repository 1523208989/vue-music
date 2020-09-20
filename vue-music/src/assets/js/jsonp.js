
function jsonp(URL, option, cb) {
  option.callBack || (option.callBack = 'callBack');
  option.timeout || (option.timeout = 8000);
  window[option.callBack] ? new Error('option.callBack已被占用') :
    (window[option.callBack] = function (params) {
      let timer = null;
      timer === null && (timer = setInterval(_ => {
        if (params) {
          cb(true, params);
          return;
        }
      }, 200))
      setTimeout(_ => {
        clearInterval(timer);
        timer = null;
        cb(false);
      }, option.timeout);
    })
  let jsonpS = document.createElement('script');
  jsonpS.setAttribute('src', URL + '?callBack=' + option.callBack);
  document.querySelector('head').appendChild(jsonpS);
}

export default function (URL, option) {
  return new Promise((resolve, reject) => {
    jsonp(URL, option, (err, reponse) => {
      err ? resolve(reponse) : reject(new Error('服务器未响应数据'));
    })
  })
}
