import Cookies from 'js-cookie'

export function getToken() {
  // console.log(Cookies.get('usershare2'))
  const local = decodeURIComponent(window.location.href);
  let token = ''

  // 判断链接里是否有token字眼，如果有的话说明链接里带token参数
  if (local.match('token')) {
    const href = local.split("?")[1];
    const param = href.split("=")[1];
    token = param.split("#")[0];
  } else if (Cookies.get('usershare2')) {
    // 如果链接里没有带token参数，获得cookies里的usershare2字段
    token = Cookies.get('usershare2')
  } else if (token === undefined) {
    token = ''
  }
  Cookies.set('token', token)
  return Cookies.get('token')
}

export function setToken(token) {
  // console.log('set')
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}
