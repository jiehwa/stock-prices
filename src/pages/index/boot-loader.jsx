/**
 * Created by madlord on 16/5/4.
 */
import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './index.jsx';
import DPApp from "@cortex/dpapp";
import env from '@cortex/util-m-ua';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducerApp from './redux/reducers'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

let store = createStore(reducerApp);

var _ins;
class BootLoader {
    constructor(props) {
        if (!_ins) {
            _ins = this;
        }
        return _ins;
    }

    static getInstance() {
        if (!_ins) {
            _ins = new BootLoader();
        }
        return _ins;
    }
    is_dpapp(){
        var environment = env();
        return environment.type==='dpapp';
    }
    init() {
        injectTapEventPlugin();
        if(this.is_dpapp()){
            //0禁止反弹
            //DPApp.setBouncesEnabled({
            //    enable: 0,
            //    success: function(){
            //        console.log('禁止反弹sucess')
            //    }
            //});
            ////0禁止滚动
            //DPApp.setScrollEnabled({
            //    enable: 0,
            //    success: function(){
            //        console.log('禁止滚动sucess')
            //    }
            //});
        }
        ReactDom.render(
            <Provider store={store}>
                <MuiThemeProvider>
                    <Index />
                </MuiThemeProvider>
            </Provider>, document.getElementById('app')
        );
    }
}

BootLoader.getInstance().init();
