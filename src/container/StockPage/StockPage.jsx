import React from "react"
import { Icon, Button, Row, Col, DatePicker, Radio  } from "antd"
import moment from "moment";
import Dynamic from "../../components/common/DynamicChart"
import "./StockPage.less"

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
                    <p>交易操作</p>
                </div>
                <div className="stock-info-content">
                    <div className="header-info">
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
                            <span>最新价<i>0.0053</i></span>
                            <span>昨收价0.0108</span>
                            <span>涨跌幅<i>-50.93%</i></span>
                        </p>
                    </div>
                    <div className="stock-chart">
                        <div>
                            <Dynamic />
                            <Row>
                                <Col span={8}><span>09:30</span></Col>
                                <Col span={8}><span>11:30-13:00</span></Col>
                                <Col span={8}><span>15:00</span></Col>
                            </Row>
                        </div>
                    </div>
                    <div className="price-control">
                        <Row>
                            <Col span={6}><span>委托价格</span></Col>
                            <Col span={18}><Button className="add-cut"></Button><span className="add-value-cut">0.1721</span><Button className="add-cut"></Button></Col>
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
                            <Col span={18}>
                                <Button className="add-cut"></Button>
                                <span className="add-value-cut">25</span>
                                <Button className="add-cut"></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}><span>持仓数量</span></Col>
                            <Col span={18}><span>0</span></Col>
                        </Row>
                    </div>
                    <Row className="operation-button">
                        <Col span={6}><Button>买入</Button></Col>
                        <Col span={12}><Button>删除自选</Button></Col>
                        <Col span={6}><Button>卖出</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default StockPage