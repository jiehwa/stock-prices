import React from 'react'
import {getHost,beforeOperateLogic,fixBody} from '../../../common/js/lib/utils'
import DPApp from "@cortex/dpapp";
import Toast from '@cortex/util-m-toast';

import {updatePageData} from '../redux/action';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    btnClick() {
        Toast.toggle("test click", 3000);
    }

    render() {
        console.log("Contexts", this.context);
        return (
            <div className="header">
                <div onClick={()=>{this.btnClick()}}>
                    点我toast
                </div>
            </div>
        );
    }
}