import React from "react"
import { Icon, Button, Row, Col, DatePicker, Radio  } from "antd"
import moment from "moment";
import Dynamic from "../../components/common/DynamicChart"
import Highcharts from 'highcharts'
import $ from "jquery"
import "./StockPage.less"

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let setI;
let chart;
class StockPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        function activeLastPointToolip(chart) {
            let points = chart.series[0].points;
            chart.tooltip.refresh(points[points.length -1]);
        }
        let today = new Date(new Date().toLocaleDateString()).getTime();
        // let date = today+34200000;
        let date = today+54000000;
        let date1 = today+72000000;
            let chart = Highcharts.chart('chart_wrap', {
                chart: {
                    // type: 'spline',
                    marginRight: 10,
                    events: {
                        load: function () {
                            var series = this.series[0],
                                chart = this;
                            // activeLastPointToolip(chart);
                            setInterval(function () {
                                let now = Date.now()-date;
                                series.data.length = Math.round(now/1000);
                                var x = (new Date()).getTime(), // 当前时间
                                    y = -0.5;          // 随机值
                                series.addPoint([x, y], true, true);
                                // activeLastPointToolip(chart);
                            }, 1000);
                        }
                    }
                },
                title: {
                    text: '动态模拟实时数据'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150,
                    min:date,
                    max:date1
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                rangeSelector : {
                    buttons : [{
                        type : 'hour',
                        count : 1,
                        text : '1h'
                    }],
                    selected : 1,
                    inputEnabled : false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    type:'area',
                    name: '随机数据',
                    data: (function () {
                        // 生成随机值
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
            });
    }

    render(){
        return(
            <div className="stock-page-wrap">
                <div className="stock-page-header">
                    <Icon onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
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
                            {/*<Dynamic />*/}
                            <div id="chart_wrap">
                            {/*<ReactHighstock  config={this.state.config} />*/}
                            </div>
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