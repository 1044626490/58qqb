import React from "react"
import { Icon, Button, Row, Col, DatePicker, Radio  } from "antd"
import moment from "moment";

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class StockPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="stock-page-wrap">
                <div className="stock-page-header">
                    <Icon type="left" theme="outlined" />
                    <p>买入开仓</p>
                </div>
                <div className="stock-info-content">
                    <div>
                        <Row>
                            <Col span={6}><span>合约标的</span></Col>
                            <Col span={10}><span>上证50ETF</span></Col>
                            <Col span={8}><span>2.594 3.47%</span></Col>
                        </Row>
                        <Row>
                            <Col span={6}><span>合约描述</span></Col>
                            <Col span={10}><span>50ETF沽11月2250</span></Col>
                            <Col span={8}><span>10001495</span></Col>
                        </Row>
                        <p>
                            <span>最新价0.0053</span>
                            <span>昨收价0.0108</span>
                            <span>涨跌幅-50.93%</span>
                        </p>
                    </div>
                    <div className="stock-chart">
                        <div>

                        </div>
                        <Row>
                            <Col span={8}><span>09:30</span></Col>
                            <Col span={8}><span>11:30-13:00</span></Col>
                            <Col span={8}><span>15:00</span></Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col span={6}><span>委托价格</span></Col>
                            <Col span={18}><span>-</span><span>0.1721</span><span>+</span></Col>
                        </Row>
                        <Row>
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Col span={4}>
                                    <RadioButton value="5">5</RadioButton>
                                </Col>
                                <Col span={4}>
                                    <RadioButton value="10">10</RadioButton>
                                </Col>
                                <Col span={4}>
                                    <RadioButton value="15">15</RadioButton>
                                </Col>
                                <Col span={4}>
                                    <RadioButton value="20">20</RadioButton>
                                </Col>
                                <Col span={4}>
                                    <RadioButton value="25">25</RadioButton>
                                </Col>
                                <Col span={4}>
                                    <RadioButton value="30">30</RadioButton>
                                </Col>
                            </RadioGroup>
                        </Row>
                        <Row>
                            <Col span={6}><span>交易数量</span></Col>
                            <Col span={18}><span>-</span><span>25</span><span>+</span></Col>
                        </Row>
                        <Row>
                            <Col span={6}><span>持仓数量</span></Col>
                            <Col span={18}><span>-</span><span>25</span><span>+</span></Col>
                        </Row>
                        <Row>
                            <Col span={6}><Button>买入</Button></Col>
                            <Col span={12}><Button>删除自选</Button></Col>
                            <Col span={6}><Button>卖出</Button></Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default StockPage