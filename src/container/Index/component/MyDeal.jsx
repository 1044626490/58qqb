import React from "react"
import { Icon, Button, Row, Col, DatePicker } from "antd"
import moment from "moment";
import "./MyDeal.less"

const { RangePicker } = DatePicker;
class MyDeal extends React.Component{
    constructor(props) {
        super(props);
        // this.date = new Date()
        this.state = {
            startValue: null,
            endValue: null,
        }
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    // handleStartOpenChange = (open) => {
    //     if (!open) {
    //         this.setState({ endOpen: true });
    //     }
    // }
    //
    // handleStartOpenChange = (open) => {
    //     if (!open) {
    //         this.setState({ endOpen: true });
    //     }
    // }

    render(){
        const { startValue, endValue, endOpen } = this.state;
        return(
            <div className="my-deal-wrap">
                <div className="my-deal-header">
                    <Icon type="left" theme="outlined" />
                    <p>我的成交</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                <div className="my-deal-content">
                    <div className="deal-content-header">
                        <p>
                            <span>选择日期</span>
                            <div className="date-picker-wrap-content">
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    // showTime
                                    format="YYYY-MM-DD"
                                    value={startValue}
                                    placeholder="开始时间"
                                    onChange={this.onStartChange}
                                />-
                                <DatePicker
                                    disabledDate={this.disabledEndDate}
                                    // showTime
                                    format="YYYY-MM-DD"
                                    value={endValue}
                                    placeholder="结束时间"
                                    onChange={this.onEndChange}
                                />
                            </div>
                            <Button>查询</Button>
                        </p>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default MyDeal