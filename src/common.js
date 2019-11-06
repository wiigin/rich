import config from './config.js';
import axios from 'axios';

let common = {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    isPassive() {
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
    },
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    wxConfig(share, callback) {
        axios
            .get(`${config.host}/wx_get_sdk_config?Url=${encodeURIComponent(window.location.href.split('#')[0])}`)
            .then(response => {
                let data = response.data;
                // console.log(share.desc,share.link,share.imgUrl)

                wx.config({
                    debug: false,
                    appId: data.app_id,
                    timestamp: data.timestamp,
                    nonceStr: data.nonce_str,
                    signature: data.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });
                wx.ready(function () {
                    // var audio = document.getElementById("audio");
                    // console.log(audio)
                    // audio&&audio.play();
                    wx.onMenuShareTimeline({
                        title: share.title,
                        link: share.link,
                        imgUrl: share.imgUrl,
                        success: function () {
                            callback && typeof callback === 'function' && callback();
                        }
                    })
                    wx.onMenuShareAppMessage({
                        title: share.title,
                        desc: share.desc,
                        link: share.link,
                        imgUrl: share.imgUrl,
                        success: function () {
                            callback && typeof callback === 'function' && callback();
                        }
                    })
                });
            })
            .catch(error => {
                console.log(error);
            });
    },
    wxScanQRCode(callback) {
        wx.scanQRCode({
            needResult: 0,
            scanType: ['qrCode', 'barCode'],
            success: function (res) {
                // var result = res.resultStr;
                callback && typeof callback === 'function' && callback(res);
            }
        });
    }
};

export default common;
