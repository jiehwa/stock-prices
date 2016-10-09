/*
 * action 类型
 */
export const UPDATE_PAGE = 'UPDATE_PAGE';//加载初始数据

export function updatePageData(ajaxData) {
    return {type: UPDATE_PAGE, data: ajaxData}
}


/*弹窗相关*/
export const TOGGLE_RULEBOX = 'TOGGLE_RULEBOX';//规则弹窗
export const TOGGLE_POPTOAST = 'TOGGLE_POPTOAST';//提示弹窗

export function toggleRuleBox(state) {
    return {type: TOGGLE_RULEBOX, data: state}
}
export function togglePopToast(state) {
    return {type: TOGGLE_POPTOAST, data: state}
}


