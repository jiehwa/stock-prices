import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload'

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        /*
         * 初始化state
         * */
    }

    componentDidMount() {
    }

    render() {
        const {shopDataList,dispatch,userInfo}=this.props;
        return (
            <div className="section">
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shopDataList: state.pageData,
        userInfo: state.pageData
    }
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(ItemList)

