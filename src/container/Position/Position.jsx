import React from "react"
import { Icon, Button, Row, Col, DatePicker, Tabs, message } from "antd"
import moment from "moment";
import "./Position.less"
import Api from "../../until/api"

const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
class MyEntrust extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            MyEntrust:[]
        }
    }

    componentDidMount(){
        this.getMyEntrust();
    }

    getMyEntrust(){
        Api.ccKh().then(res => {
            this.setState({
                MyEntrust:res.data.khcc||[]
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    render(){
        return(
            <div className="my-position-wrap">
                <div className="my-position-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>我的持仓</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                {
                    this.state.MyEntrust.length ?<div className="my-position-content">
                        <ul>
                            {
                                this.state.MyEntrust.map((item, index) => {
                                    return <li>
                                        <Row className="first-Row"><Col className="sale-name" span={6}>{item.dir ? "合约卖出" : "合约买入"}</Col><Col
                                            span={10}>{item.inst}</Col><Col span={8}>{item.val}</Col></Row>
                                        <Row className="last-Row">
                                            <Col span={6}>
                                                <p>{item.cost}</p>
                                                <p>开仓成本</p>
                                            </Col>
                                            <Col span={10}>
                                                <p className="deal-price">{item.pos}</p>
                                                <p>持仓数量</p>
                                            </Col>
                                            <Col span={8}>
                                                <p>{item.aval}</p>
                                                <p>平仓数量</p>
                                            </Col>
                                        </Row>
                                    </li>
                                })
                            }
                        </ul>
                        </div>  : <div className="no-info">
                        <img src={require("../../layouts/image/noresume.png")} alt=""/>
                        <p>暂无数据</p>
                    </div>
                }
            </div>
        )
    }
}

export default MyEntrust