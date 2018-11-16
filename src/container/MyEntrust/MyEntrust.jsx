import React from "react"
import { Icon, Button, Row, Col, DatePicker, Tabs, message } from "antd"
import moment from "moment";
import "./MyEntrust.less"
import Api from "../../until/api"

const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
class MyEntrust extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeKey:"1",
            MyEntrust:[],
            myDeal:[]
        }
    }

    componentDidMount(){
        console.log(1222233);
        this.getMyEntrust()
        this.getMyDeal()
    }

    getMyEntrust(){
        Api.wtKh().then(res => {
            console.log(res);
            this.setState({
                MyEntrust:res.data||[]
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    getMyDeal(){
        Api.cjKh().then(res => {
            this.setState({
                myDeal:res.data||[]
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    render(){
        return(
            <div className="my-entrust-wrap">
                <div className="my-entrust-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>我的委托</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                <div className="my-entrust-content">
                    <Tabs activeKey={this.state.activeKey} onChange={(value)=>{this.setState({activeKey:value})}}>
                        <TabPane tab="委托中" key="1">
                            {
                                this.state.MyEntrust.length?<ul>
                                    {
                                        this.state.MyEntrust.map((item, index) =>{
                                            return <li>
                                                <Row><Col className="sale-name" span={6}>{item.dir?"合约卖出":"合约买入"}</Col><Col span={10}>{item.inst}</Col><Col span={8}>10001500</Col></Row>
                                                <Row>
                                                    <Col span={6}>
                                                        <p>{item.day}</p>
                                                        <p>{item.time}</p>
                                                    </Col>
                                                    <Col span={10}>
                                                        <p className="deal-price">{item.price}</p>
                                                        <p>成交均价</p>
                                                    </Col>
                                                    <Col span={8}>
                                                        <p>{item.vol}</p>
                                                        <p>委托数量</p>
                                                    </Col>
                                                </Row>
                                            </li>
                                        })
                                    }
                                </ul>:<div className="no-info">
                                    <img src={require("../../layouts/image/noresume.png")} alt=""/>
                                    <p>暂无数据</p>
                                </div>
                            }
                        </TabPane>
                        <TabPane tab="已成交" key="2">
                            {
                                this.state.myDeal.length?<ul>
                                        {
                                            this.state.myDeal.map((item, index) =>{
                                                return <li>
                                                    <Row><Col className="sale-name" span={6}>{item.dir?"合约卖出":"合约买入"}</Col><Col span={10}>{item.inst}</Col><Col span={8}>10001500</Col></Row>
                                                    <Row>
                                                        <Col span={6}>
                                                            <p>{item.day}</p>
                                                            <p>{item.time}</p>
                                                        </Col>
                                                        <Col span={10}>
                                                            <p className="deal-price">{item.price}</p>
                                                            <p>成交均价</p>
                                                        </Col>
                                                        <Col span={8}>
                                                            <p>{item.vol}</p>
                                                            <p>委托数量</p>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            })
                                        }
                                    {/*<li>*/}
                                        {/*<Row><Col className="sale-name" span={6}>合约卖出</Col><Col span={10}>50ETF沽11月2200</Col><Col span={8}>10001500</Col></Row>*/}
                                        {/*<Row>*/}
                                            {/*<Col span={6}>*/}
                                                {/*<p>2018-11-02</p>*/}
                                                {/*<p>13:39:25</p>*/}
                                            {/*</Col>*/}
                                            {/*<Col span={10}>*/}
                                                {/*<p className="deal-price">0.0035</p>*/}
                                                {/*<p>成交均价</p>*/}
                                            {/*</Col>*/}
                                            {/*<Col span={8}>*/}
                                                {/*<p>1</p>*/}
                                                {/*<p>委托数量</p>*/}
                                            {/*</Col>*/}
                                        {/*</Row>*/}
                                    {/*</li>*/}
                                </ul>:<div className="no-info">
                                    <img src={require("../../layouts/image/noresume.png")} alt=""/>
                                    <p>暂无数据</p>
                                </div>
                            }
                        </TabPane>
                        <TabPane tab="已撤单" key="3">
                            <div className="no-info">
                                <img src={require("../../layouts/image/noresume.png")} alt=""/>
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