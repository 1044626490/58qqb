import 'whatwg-fetch';
import * as C from '~/constants/api';
// import employApi from "./employApi"
import {post, request, getDateOrTime} from "./apiMethod";


export default {
    getDateOrTime,
    // getLoginCaptcha: (params, headers) => request(C.GET_LOGIN_CAPTCHA, params, headers),
    login: (params) =>request(C.LOGIN, params),
    logout: (params) =>request(C.LOGOUT, params),
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
    optionalList: (params) =>post(C.OPTIONAL_LIST, params),
    editOptional: (params) =>post(C.EDIT_OPTIONAL, params),
    cjKh: (params) =>post(C.CJ_KH, params),
    wtKh: (params) =>post(C.WT_KH, params),
    ccKh: (params) =>post(C.CC_KH, params),
    mgKh: (params) =>post(C.MG_KH, params),
    cjFrom: (params) =>post(C.CJ_FROM, params),
    wtFrom: (params) =>post(C.WT_FROM, params),
    lscjKh: (params) =>post(C.LSCJ_KH, params),
    lszjKh: (params) =>post(C.LSZJ_KH, params),
    addKh: (params) =>post(C.ADDKH, params),
    khInfo: (params) =>post(C.KHINFO, params),
    editKhName: (params) =>post(C.EDITKH_NAME, params),
    changePass: (params) =>post(C.CHANGE_PASS, params),
    upLoad: (params) =>post(C.UPLOAD, params),
    weiTuoKh: (params) =>post(C.WEITUO_KH, params),
    cheDanKh: (params) =>post(C.CHEDAN_KH, params),
    setBank: (params) =>post(C.SETBANK, params),
    withDrawalKh: (params) =>post(C.WITHDRAWAL_KH, params),
    depositKh: (params) =>post(C.DEPOSIT_KH, params),
    reflect: (params) =>post(C.REFLECT, params),


    // logout: (params) => post(C.LOGOUT, params),
    // register: (params) => post(C.REGISTER, params),
    // sendRandomCaptcha: (params) => post(C.SENDCAPTCHA, params),
    // forgetPassword: (params) => post(C.FORGETPASSWORD, params),
    // ...employApi,
}