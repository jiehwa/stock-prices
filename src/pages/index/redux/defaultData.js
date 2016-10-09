//初始化页面数据
export const defaultPageData = {
    "userInfo": {},
    "isLogin": -1,
    "pushSwitch":false,
    "share": {}
};


/*
* 初始化弹窗信息
* */
export const defaultPopState = {
    ruleBox: 0,//默认不显示
    popState: {
        show:false,
        //hideHeadImg:true,
        popTitle:'',
        type: 1,//0表示红包奖励,1表示抽奖弹窗
        obtainEnergyCount: 5,//红包雨奖励
        status: 1,//1表示成功样式,0表示失败
        title: "恭喜!成功抽中现金券",
        btns: [{
            type: "double-blue",//1.蓝色小按钮 2.红色小按钮 3.红色长按钮
            text: "分享再玩一次",
            click: ()=> {
                console.log("按钮1");
            }
        }, {
            type: "double-red",//1.蓝色小按钮 2.红色小按钮 3.红色长按钮
            text: "分享再玩一次",
            click: ()=> {
                console.log("按钮2");
            }
        }]
    }
}
