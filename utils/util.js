const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getAddDateStr(addDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
}

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        // setTimeout(() => { wx.hideLoading()},200)
        if (res.errMsg == 'request:ok' && res.statusCode != 200) {
          reject(res)
        } else {
          resolve(res)
        }
      }
      obj.fail = function (res) {
        //失败
        wx.hideLoading()
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  var wxGetSystemInfo = wxPromisify(wx.getSystemInfo)
  return wxGetSystemInfo({

  })
}
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getReq(url, data) {
  const app = getApp();
  let host = app.globalData.apiUrl;
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: host  + url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',

      "Cache-Control": "public"
    },
    dataType: 'json',
  })
}
/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postReq(url, data) {
  const app = getApp();
  let host = app.globalData.apiUrl;
  var postRequest = wxPromisify(wx.request);

  return postRequest({
    url: host + url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Cache-Control": "public"
    },
    dataType: 'json',
  })
}
/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function delReq(url) {
  const app = getApp();
  let host = app.globalData.apiUrl;
  var postRequest = wxPromisify(wx.request);

  return postRequest({
    url: host + url,
    method: 'DELETE',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Cache-Control": "public"
    },
    dataType: 'json',
  })
}

module.exports = {
  formatTime: formatTime,
  getAddDateStr: getAddDateStr,
  getReq: getReq,
  delReq: delReq,
  postReq: postReq,
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo
}

