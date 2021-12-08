/**
 * 生产环境
 */
; (function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = '/open/';
  window.SITE_CONFIG['imgUrl'] = 'http://127.0.0.1:9191/';
  window.SITE_CONFIG['zxaImgUrl'] = 'http://127.0.0.1:8081/';

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://172.16.20.32:9999/open/';
  // window.SITE_CONFIG['imgUrl'] = 'http://172.16.20.32:9191/';
  // window.SITE_CONFIG['zxaImgUrl'] = 'http://172.16.20.32:8081/';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})();
