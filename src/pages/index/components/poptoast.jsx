import React from 'react';

export default class PopToast extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.popState.popState;
        return (
            <div className="pop-boxes">
                <div className="content">
                    <div className="head">
                        <div className="close-btn" onClick={()=>{data.close()}}></div>
                    </div>
                    <div className="content-wrap">
                        <div>这里是弹窗内容</div>
                        <div className="foot">
                            {
                                data.btns.map((item, index)=> {
                                    return <div key={index} onClick={()=>{item.click()}}
                                                className={item.type+" btns"}>{item.text}</div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}