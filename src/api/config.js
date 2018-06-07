export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const getPalyList = {
  picmid: 1,
  rnd: Math.random(),
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  format: 'jsonp',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  categoryId: '10000000',
  sortId: 5
}

export const options = {
  param: 'jsonpCallback'
}

export const getPlayListOptions = {
  param: 'jsonpCallback',
  name: 'getPlaylist'
}

export const ERR_OK = 0