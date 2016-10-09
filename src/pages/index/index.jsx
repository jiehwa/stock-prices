/**
 * Created by jianhua.zhong on 16/7/28.
 * 如遇到问题联系jianhua.zhong
 */
import Hippo from '@cortex/hippo';//对于cortex包的引入,需在包名前加上@cortex/的前缀以示区分
import HuaTuo from '@cortex/huatuo';

import './assets/styles/global.less';//以*.less为后缀的样式文件将以全局作用域模式载入到DOM中
import React from 'react';
import $ from '@cortex/zepto'
import { connect } from 'react-redux';

import RLU from 'rlu';//response layout util
import styles from './assets/styles/index.less';//css module

import LazyLoad from 'react-lazyload';//懒加载react组件
//使用:https://github.com/jasonslyvia/react-lazyload

import {updatePageData} from './redux/action'


import Header from './components/header.jsx'
import PopToast from './components/poptoast.jsx'
import RuleBox from './components/rulebox.jsx'
import RaisedButton from 'material-ui/RaisedButton';


class Index extends React.Component {
    constructor(props) {
        super(props);
        /*
         * hippo打点,根据需要接入
         * */
        //_hip.push(['_setPageId', 2010120]);
        //_hip.push(['pv']);
        //new HuaTuo(352, true);
        /*
         * 响应式布局
         * */
        RLU.init(320);//375 or 320 视觉基准宽度
    }

    componentDidMount() {
    }

    render() {
        const {pageData,popState}=this.props;
        console.log("pageData", pageData);
        return (
            <div>
                <RaisedButton label="Google" />
                <Header {...this.props}></Header>
                {
                    popState.ruleBox === 1 ? <RuleBox {...this.props}></RuleBox> : null
                }
                {
                    popState.popState.show ? <PopToast {...this.props}></PopToast> : null
                }
            </div>
        );
    }
}


// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
    //注入方式只需要将你会用到的state加在下面,不需要也不建议将所有state内容注入
    //一个项目里可有有多个注入入口,如果该组件相对独立,例子放在container里了
    return {
        pageData: state.pageData,
        popState: state.popState
    }
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(mapStateToProps)(App) 中；

export default connect(mapStateToProps)(Index)