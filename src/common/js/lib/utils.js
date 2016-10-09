import $ from '@cortex/zepto';
import React from 'react'
import DPApp from "@cortex/dpapp"
import Toast from '@cortex/util-m-toast';

import WhereAmI from '@cortex/whereami';

import {togglePopToast,updatePageData} from '../../../pages/index/redux/action'

const activityURL = "http://evt.dianping.com/synthesislink/8246.html";//综合链接
export const isApp = /dp\/com\.dianping/.test(navigator.userAgent);


/*
 * 获取本机服务器域名
 */
export function getHost(type) {
    //根据type 来区分是M站还是h5站点,传入字符串'm'或者'h5'
    if (type !== 'm' && type !== 'h5') {
        Toast.toggle("获取服务器地址传入的参数错误");
        return false;
    }
    let result = "http://" + window.location.hostname + ":8080";
    if (location.href.indexOf('localhost') != -1) {
        result = "http://localhost:808" + (type === 'm' ? '0' : '8');
        //result = "http://m.51ping.com";
    } else if (location.href.indexOf("51ping") != -1) {
        result = "http://" + type + ".51ping.com";
    } else if (location.href.indexOf("ppe") != -1) {
        result = "http://ppe." + type + ".dianping.com";
    } else if (location.href.indexOf("dianping") != -1) {
        result = "http://" + type + ".dianping.com";
    }
    return result;
}


/*
 *
 * 获取url参数值
 * */

export function getUrlParam(paramName) {
    var paramString = window.location.href.split("?")[1] || '';
    if (!paramName || paramString.indexOf(paramName) == -1) {
        return '';
    }
    var paramList = paramString.split("&");
    for (let current = 0; current < paramList.length; current++) {
        if (paramList[current].split("=")[0] == paramName) {
            return paramList[current].split("=")[1];
        }
        ;
    }
}

/*
 * 获取用户信息
 *
 * */
export function getUserInfo() {
    return new Promise((resolve, reject)=> {
        let isInApp = /dp\/com\.dianping/.test(navigator.userAgent);
        if (isInApp) {
            //获取用户信息,同步调用接口
            DPApp.all([
                DPApp.getUserInfo(),
                DPApp.getUA(),
                DPApp.getCX({
                    business: "app-your-appname"
                }),
                DPApp.getCity(),
                DPApp.getLocation()
            ]).then((results)=> {
                let [info,ua,cx,cityId,location]=[...results];
                resolve({
                    version: ua.appVersion,
                    dpId: info.dpid,
                    userId: info.userId,
                    token: info.token,
                    isLogin: info.userId > 0 && !!info.token,
                    cx: cx.cx,
                    cityId: cityId.cityId,
                    lat: location.lat,
                    lng: location.lng
                });
            }).catch((err)=> {
                // handle error
                reject({
                    //version: "8.1.4",
                    //dpId: 1,
                    //userId: 1,
                    //token: '',
                    //isLogin: info.userId > 0 && !!info.token,
                    //cx: cx.cx,
                    //cityId: cityId.cityId,
                    //lat: location.lat,
                    //lng: location.lng
                });
            });
        } else {
            resolve({
                isLogin: true,
                cityId: 1
            });
            //resolve({
            //    version: "8.1.4",
            //    dpId: 1,
            //    userId: 1,
            //    token: '!',
            //    isLogin: true,
            //    cx: "",
            //    cityId: 1,
            //    lat: "125",
            //    lng: "188"
            //});
        }
    })
}


export function fetchData(config) {
    return new Promise((resolve, reject)=> {
        $.ajax({
            url: config.url,
            type: config.type,
            xhrFields: {
                withCredentials: true//POST跨域后支持cookie操作
            },
            data: config.sendData,
            success: res=> {
                if (res.code == 200) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            },
            error: ()=> {
                reject('服务器繁忙')
            }
        })
    })

}

/*
 * 根据环境跳转登录操作
 *
 */
export function beforeOperateLogic(isLogin) {
    //不在APP:跳APP, 然后如果未登录,跳登录
    if (!isApp) {
        //跳转综合链接
        location.href = activityURL;
        return false;
    } else if (!isLogin) {
        //Toast.toggle('用户未登录',3000);

        DPApp.login({
            success: function (user) {
                setTimeout(()=> {
                    location.reload();
                }, 100)
            }
        });
        return false;
    }
    return true;
}

/*固定弹窗背景*/
export function fixBody() {
    $("body").addClass('Fixed');
}
/*释放固定弹窗背景*/
export function releaseBody() {
    $("body").removeClass('Fixed');
}

export function getLocation() {
    return new Promise((resolve, reject)=> {
        WhereAmI(res=> {
            //成功回调, res.lat, res.lng 获取经纬度..
            resolve(res);
            console.log(res);
        }, e=> {
            reject(e);
        });
    })
}


export function validator(name, value) {
    //默认验证规则
    let defaultRules = {
        verifyCodeChange: {
            regex: /^[0-9]{0,6}$/,
            message: '请输入正确的验证码'
        },
        verifyCode: {
            regex: /^[0-9]{6}$/,
            message: '请输入正确的验证码'
        },
        cname: {
            regex: /^[\u4e00-\u9fa5]{2,4}$/,
            message: '请填写正确的中文姓名'
        },
        email: {
            regex: /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i,
            message: ''
        },
        idcard: {
            regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '请填写正确的身份证信息！'
        },
        phone: {
            regex: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请填写正确的手机号'
        },
        url: {
            regex: /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i,
            message: ''
        }
    }
    if (defaultRules.hasOwnProperty(name)) {
        var result = defaultRules[name].regex.test(value);
        if (!result) {
            Toast(defaultRules[name].message);
        }
        return result;
    }
    else {
        return false;
    }
}


export function isUndefined(base, name, undefinedShowName) {
    //判断极端情况数据嵌套多时候,没有对应子属性的名称导致undefined报错
    var nameArr = name.split(".");
    var baseObj = base;
    for (let i = 0; i < nameArr.length; i++) {
        if (baseObj.hasOwnProperty(nameArr[i]) && baseObj[nameArr[i]] !== null && baseObj[nameArr[i]] !== '') {
            baseObj = baseObj[nameArr[i]];
            if (i == nameArr.length - 1) {
                return baseObj;
            }
        } else {
            if (typeof undefinedShowName == 'undefined') {
                return '';
            }
            return undefinedShowName;
        }
    }
}