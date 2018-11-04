import React from "react"
import { Icon, Button, Row, Col, DatePicker, Tabs } from "antd"
import moment from "moment";
import "./MyEntrust.less"

const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
class MyEntrust extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeKey:"1"
        }
    }

    render(){
        return(
            <div className="my-entrust-wrap">
                <div className="my-entrust-header">
                    <Icon type="left" theme="outlined" />
                    <p>我的委托</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                <div className="my-entrust-content">
                    <Tabs activeKey={this.state.activeKey} onChange={(value)=>{this.setState({activeKey:value})}}>
                        <TabPane tab="委托中" key="1">
                            <div className="no-info">
                                <img src={require("../../../layouts/image/noresume.png")} alt=""/>
                                <p>暂无数据</p>
                            </div>
                        </TabPane>
                        <TabPane tab="已成交" key="2">
                            <ul>
                                <li>
                                    <Row><Col className="sale-name" span={6}>合约卖出</Col><Col span={10}>50ETF沽11月2200</Col><Col span={8}>10001500</Col></Row>
                                    <Row>
                                        <Col span={6}>
                                            <p>2018-11-02</p>
                                            <p>13:39:25</p>
                                        </Col>
                                        <Col span={10}>
                                            <p className="deal-price">0.0035</p>
                                            <p>成交均价</p>
                                        </Col>
                                        <Col span={8}>
                                            <p>1</p>
                                            <p>委托数量</p>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row><Col className="sale-name" span={6}>合约卖出</Col><Col span={10}>50ETF沽11月2200</Col><Col span={8}>10001500</Col></Row>
                                    <Row>
                                        <Col span={6}>
                                            <p>2018-11-02</p>
                                            <p>13:39:25</p>
                                        </Col>
                                        <Col span={10}>
                                            <p className="deal-price">0.0035</p>
                                            <p>成交均价</p>
                                        </Col>
                                        <Col span={8}>
                                            <p>1</p>
                                            <p>委托数量</p>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </TabPane>
                        <TabPane tab="已撤单" key="3">
                            <div>
                                <img src={require("../../../layouts/image/noresume.png")} alt=""/>
                                <p>暂无数据</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default MyEntrust