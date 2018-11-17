import React from "react"
import { Icon, Button, Row, Col, DatePicker, Tabs, message } from "antd"
import moment from "moment";
import "./MoneyRecord.less"
import Api from "../../../until/api"

const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
class MoneyRecord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            MoneyRecord:[],
            id:this.props.match.params.id
        }
    }

    componentDidMount(){
        this.getMyEntrust();
    }

    getMyEntrust(){
        let name = this.state.id === "1"?"withDrawalKh":"depositKh"
        Api[name]().then(res => {
            this.setState({
                MoneyRecord:res.data||[]
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    render(){
        return(
            <div className="my-money-record-wrap">
                <div className="my-money-record-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>{this.state.id === "1"?"提现记录":"充值记录"}</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                {
                    this.state.MoneyRecord.length ?<div className="my-money-record-content">
                        <ul>
                            {
                                this.state.MoneyRecord.map((item, index) => {
                                    return <li>
                                        <p>{item.type === 0?"网点入金":item.type === 1?"买券":item.type === 2?"卖券":"系统直入"}</p>
                                        <Row>
                                            <Col span={9}>
                                                <Row>{item.day}</Row>
                                                <Row>{item.time}</Row>
                                            </Col>
                                            <Col span={15}>
                                                <Row>{item.cash}元</Row>
                                                <Row>发生金额</Row>
                                            </Col>
                                        </Row>
                                    </li>
                                })
                            }
                        </ul>
                    </div> : <div className="no-info">
                        <img src={require("../../../layouts/image/noresume.png")} alt=""/>
                        <p>暂无数据</p>
                    </div>
                }
            </div>
        )
    }
}

export default MoneyRecord