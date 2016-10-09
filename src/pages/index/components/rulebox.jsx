import React from 'react'
import {toggleRuleBox} from '../redux/action';
import {releaseBody} from '../../../common/js/lib/utils'


export default class RuleBox extends React.Component {
    constructor(props) {
        super(props);
    }

    close() {
        this.props.dispatch(toggleRuleBox(0));
        releaseBody();
    }

    render() {
        return (
            <div className="rule-boxes">
                <div className="content">
                    <div className="head">
                        活动规则
                        <div className="close-btn" onClick={()=>{this.close()}}></div>
                    </div>
                    <div className="wrap">
                        <p className="top-title">“活力吃货节”攒活力抽现金</p>
                        <ul>
                            <li><span className="blue">活动时间：</span>7月22日—7月27日</li>
                            <li><span className="blue">活动规则：</span>用户通过游戏可积攒活力值；每攒满5个活力值，即可获得1次抽现金券的机会，最高100元，100%有奖（抽奖次数无上限）。
                            </li>
                        </ul>

                        <p className="title blue">【如何攒活力】</p>

                        <ol>
                            <li>1.活动期间，用户每天均可通过游戏，积攒活力值；</li>
                            <li>2.每位用户每天有1次攒活力机会，分享至朋友圈或微信好友可再增加1次机会，机会仅当日有效；</li>
                            <li>3.每轮游戏所获得的活力值可在结果弹框上查看；</li>
                            <li>4.游戏所获得的活力值可累积，每5个活力值，可换一次抽奖机会。</li>
                        </ol>
                        <p className="title blue">【如何抽现金】</p>
                        <ol>
                            <li>1.游戏所获得的活力值可累积，每5个活力值，可换一次抽奖机会。</li>
                            <li>2.每5个活力值，可抽奖1次，无抽奖次数的限制；</li>
                            <li>3.奖券有全场通用现金券、品类现金券以及大牌菜品现金券，随机发放，100%有奖:<br/>
                                （1）全场通用现金券无使用门槛，且可累计使用；<br/>
                                （2）品类现金券限在线支付使用，不设找零、不可转让或折现，每张订单限使用1张；<br/>
                                （3）大牌菜品现金券限特定商户使用，不设找零、不可转让或折现，每张订单限使用1张；
                            </li>
                            <li>4.奖券直接发放到领券手机号绑定的大众点评账户中，可进入“我的卡券”查看。通过微信/QQ 参与活动的用户，请使用微信/QQ账号登录大众点评客户端查看；</li>
                            <li>5.同一设备/手机号/会员账号视为同一用户；</li>
                            <li>6.如发现任何作弊行为，大众点评将取消用户获得奖励的资格。</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}