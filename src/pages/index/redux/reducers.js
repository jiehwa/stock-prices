import { combineReducers } from 'redux';


import {defaultPageData,defaultPopState} from './defaultData.js'

//页面初始化的操作
import {TOGGLE_RULES,UPDATE_PAGE} from './action'

/*弹窗相关*/
import {TOGGLE_RULEBOX} from './action'
import {TOGGLE_POPTOAST} from './action'

/*
* 页面初始加载相关reducer
* */
function pageData(state = defaultPageData, action) {
    switch (action.type) {
        case UPDATE_PAGE:
            return Object.assign({}, state, action.data);
        default:
            return state
    }
}

/*
* 弹窗相关reducer
* */
function popState(oldState = defaultPopState, action) {
    switch (action.type) {
        case TOGGLE_RULEBOX:
            return Object.assign({}, oldState, {ruleBox: action.data});
        case TOGGLE_POPTOAST:
            return Object.assign({}, oldState, {popState: action.data});
        default:
            return oldState;
    }
}

const reducerApp = combineReducers({
    pageData,
    popState
});

export default reducerApp