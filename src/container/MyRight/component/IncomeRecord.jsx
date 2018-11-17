import React from "react"
import { Icon, Button, Row, Col, DatePicker, message } from "antd"
import moment from "moment";
import "./IncomeRecord.less"
import Api from "../../../until/api"

const { RangePicker } = DatePicker;
class MyDeal extends React.Component{
    constructor(props) {
        super(props);
        // this.date = new Date()
        this.state = {
            startValue: null,
            endValue: null,
            incomeRecord:[]
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
    };

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

    getMyDeal(){
        if(!this.state.endValue||!this.state.startValue){
            message.warning("请先选择时间范围")
            return false
        }
        Api.lszjKh({bengin_day:moment(this.state.startValue).format('YYYY-MM-DD'),
            to_day:moment(this.state.endValue).format('YYYY-MM-DD')}).then(res => {
            this.setState({
                incomeRecord:res.data
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    render(){
        const { startValue, endValue, endOpen } = this.state;
        return(
            <div className="my-IncomeRecord-wrap">
                <div className="my-IncomeRecord-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>出入金记录</p>
                    <Icon type="sync" theme="outlined" />
                </div>
                <div className="my-IncomeRecord-content">
                    <div className="IncomeRecord-content-header">
                        <div>
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
                            <Button onClick={()=>this.getMyDeal()}>查询</Button>
                        </div>
                        {
                            this.state.incomeRecord.length?<ul>
                                {
                                    this.state.incomeRecord.map((item, index) => {
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
                            </ul>:null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyDeal