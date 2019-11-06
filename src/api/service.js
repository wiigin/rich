import axios from 'axios'
import api from './install'
import Vue from 'vue'

Vue.use(api)
let ajaxList = null
var config = {
    host: 'https://c.kdcer.com/dragon/',
};
// 获取本地配置文件
export default {
    install(Vue) {
        //使用接口post
        Vue.prototype.axiosajax = function (params, url) {
            console.log(process.env.NODE_ENV)
            if (process.env.NODE_ENV == 'development') {
                return new Promise((resolve, reject) => {
                    ajaxList = require('../../public/json/' + url);
                    resolve(ajaxList)
                })
            } else {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'get',
                        url: './json/' + url,
                        respondType: 'json',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json;charset-UTF-8'
                        }
                    })
                        .then(res => {
                            console.log(res)
                            resolve(res.data);
                        })
                        .catch(err => {
                            console.log(err)
                            reject(err);
                        });
                })
            }
        }
        Vue.prototype.getUrlParameter = function (name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        Vue.prototype.isPassive = function () {
            var supportsPassiveOption = false;
            try {
                addEventListener('test', null, Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassiveOption = true;
                    }
                }));
            } catch (e) {
            }
            return supportsPassiveOption;
        }
        Vue.prototype.wxConfig = function (share, callback) {
            axios.get(`${config.host}/wx_get_sdk_config?Url=${encodeURIComponent(window.location.href.split('#')[0])}`)
                .then(response => {
                    let data = response.data;
                    console.log( JSON.stringify(data))
                    wx.config({
                        debug: false,
                        appId: data.app_id,
                        timestamp: data.timestamp,
                        nonceStr: data.nonce_str,
                        signature: data.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: share.title,
                            desc: share.desc,
                            link: share.link,
                            imgUrl: share.imgUrl,
                            success: function () {
                                console.log(share.link);
                                callback && typeof callback === 'function' && callback();
                            },
                            cancel: function () {
                            }
                        });

                        wx.onMenuShareAppMessage({
                            title: share.title,
                            desc: share.desc,
                            link: share.link,
                            imgUrl: share.imgUrl,
                            success: function () {
                                console.log(share.link);
                                callback && typeof callback === 'function' && callback();
                            },
                            cancel: function () {
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
        Vue.prototype.wxScanQRCode = function (callback) {
            wx.scanQRCode({
                needResult: 0,
                scanType: ['qrCode', 'barCode'],
                success: function (res) {
                    // var result = res.resultStr;
                    callback && typeof callback === 'function' && callback(res);
                }
            });
        }
    }
}
