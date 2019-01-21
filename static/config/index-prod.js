/**
 * 生产环境
 */
; (function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://khjc.com.cn:8088/open/';

  window.SITE_CONFIG['imgUrl'] = 'http://khjc.com.cn:8180/'; //军哥图片地址
  window.SITE_CONFIG['zxaImgUrl'] = 'http://khjc.com.cn:8081/';//张新安图片地址
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})();
