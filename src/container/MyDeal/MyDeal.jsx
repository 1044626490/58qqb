import React from "react"
import { Icon, Button, Row, Col, DatePicker, message } from "antd"
import moment from "moment";
import "./MyDeal.less"
import Api from "../../until/api"

const { RangePicker } = DatePicker;
class MyDeal extends React.Component{
    constructor(props) {
        super(props);
        // this.date = new Date()
        this.state = {
            startValue: null,
            endValue: null,
            myDeal:[]
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
        console.log(value)
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
        Api.lscjKh({bengin_day:moment(this.state.startValue).format('YYYY-MM-DD'),
            to_day:moment(this.state.endValue).format('YYYY-MM-DD')}).then(res => {
            this.setState({
                myDeal:res.data
            })
        }).catch(err => {
            message.warning(err.msg)
        })
    }

    render(){
        const { startValue, endValue, endOpen } = this.state;
        return(
            <div className="my-deal-wrap">
                <div className="my-deal-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
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
                            <Button onClick={()=>this.getMyDeal()}>查询</Button>
                        </p>
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
                            </ul>:null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyDeal