import 'whatwg-fetch';
import * as C from '~/constants/api';
// import employApi from "./employApi"
import {post, request, getDateOrTime} from "./apiMethod";


export default {
    getDateOrTime,
    // getLoginCaptcha: (params, headers) => request(C.GET_LOGIN_CAPTCHA, params, headers),
    login: (params) =>request(C.LOGIN, params),
    getUserInfo: (params) =>request(C.GET_USER_INFO, params),
    register: (params) =>post(C.REGISTER, params),
    sendVerifiCode: (params) =>request(C.SEND_VERIFI_CODE, params),
    realQuotes: (params) =>post(C.REAL_QUOTES, params),
    target: (params) =>post(C.TARGET, params),
    dateTg: (params) =>post(C.DATE_TG, params),
    execTg: (params) =>post(C.EXEC_TG, params),
    statTg: (params) =>post(C.STAT_TG, params),
    mdTg: (params) =>post(C.MD_TG, params),
    smdTg: (params) =>post(C.SMD_TG, params),
    hmdTg: (params) =>post(C.HMD_TG, params),
    optional: (params) =>post(C.OPTIONAL, params),
    editOptional: (params) =>post(C.EDIT_OPTIONAL, params),


    // logout: (params) => post(C.LOGOUT, params),
    // register: (params) => post(C.REGISTER, params),
    // sendRandomCaptcha: (params) => post(C.SENDCAPTCHA, params),
    // forgetPassword: (params) => post(C.FORGETPASSWORD, params),
    // ...employApi,
}