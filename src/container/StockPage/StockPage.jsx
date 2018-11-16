import React from "react"
import { Icon, Button, Row, Col, DatePicker, Radio, message  } from "antd"
import moment from "moment";
import Dynamic from "../../components/common/DynamicChart"
import Highcharts from 'highcharts'
import $ from "jquery"
import "./StockPage.less"
import Api from "../../until/api"

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let setI;
let chart;
class StockPage extends React.Component{
    constructor(props) {
        super(props);
        this.chart = null;
        this.setI = null;
        this.state = {
            id:null,
            date:null,
            tableInfo:[],
            chart:null,
            up:0,
            down:0,
            bidInfo:{},
            isMine:0,
            value:"0",
            num:1
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let dates = this.props.match.params.date;
        Api.smdTg({id,date:dates}).then(res => {
            this.setState({
                bidInfo:res.data
            });
            console.log(res);
        }).catch(err =>{
            console.log(err)
        })
        Api.optional({id}).then(res => {
            this.setState({
                isMine:res.data.is_optional
            })
        }).catch(err => {

        })
        Api.hmdTg({id,date:dates}).then(res => {
            console.log(res);
            localStorage.setItem("todayPrice",res.data.hmd.join(";"))
        }).catch(err =>{
            console.log(err)
        })
        if(id&&dates){
            this.setState({
                id,
                date:dates
            })
        }
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        function activeLastPointToolip(chart) {
            let points = chart.series[0].points;
            chart.tooltip.refresh(points[points.length - 1]);
        }
        let today = new Date(new Date().toLocaleDateString()).getTime();
        let date = today+54000000;
        let now = Date.now()-date;
        let date1 = today+72000000;
        if(now/1000 < 0){
            date = today+54000000-8460000;
            date1 = today+72000000-84600000;
        }
        let data = [];
        let storage = localStorage.getItem("todayPrice").split(";");
        if(now/1000 > 19800||now/1000 < 0){
            for (let i = -4800; i <= 0; i += 1) {
                data.push({
                    x: date + i * 4125,
                    y: storage[i+4800]/1
                });
            }
        }else {
            for(let i = -now/1000; i<=0;i++){
                data.push({
                    x: date + i * 4125,
                    y: storage[i+now/1000]
                });
            }
        }
        this.setI = setInterval(()=>{
            let  count = 0;
            // console.log(data);
            if(now/1000 > 19800||now/1000 < 0){
                if(data.length === 4801){
                    count++
                }
            }else {
                if(data.length === now/1000){
                    count++
                }
            }
            if(count === 1){
                this.chart = Highcharts.chart('chart_wrap', {
                    chart: {
                        // type: 'spline',
                        marginRight: 10,
                        events: {
                            load: function () {
                                let series = this.series[0],
                                    chart = this;
                                console.log(series)
                                let setI = setInterval(function () {
                                    let now = Date.now()-date;
                                    Api.smdTg({id,date:dates}).then(res => {
                                        console.log(res);
                                    }).catch(err =>{
                                        console.log(err)
                                    })
                                    if(now/1000 > 19800||now/1000 < 0){
                                        clearInterval(setI)
                                    }else {
                                        series.data.length = now/1000;
                                        let x = (new Date()).getTime(), // 当前时间
                                            y = -0.5;          // 随机值
                                        series.addPoint([x, y], true, true);
                                        console.log(Date.now(),series.data)
                                        localStorage.setItem("todayPrice",series)
                                    }
                                    // activeLastPointToolip(chart);
                                }, 4125);
                            }
                        }
                    },
                    title: {
                        text: '动态模拟实时数据'
                    },
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 1,
                        // min:date,
                        // max:date1,
                        tickWidth:0,    	//设置刻度标签宽度
                        lineColor:'#ccc',//设置坐标颜色
                        lineWidth:1,		//设置坐标宽度
                        labels: {
                            enabled: false
                        }
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
                        // type:'area',
                        name: '随机数据',
                        turboThreshold:4801,
                        data: (function () {
                            return data
                        })()
                    }]
                });
                clearInterval(this.setI)
            }
        },1000)
    }

    componentWillUnmount(){
        this.chart = null;
        clearInterval(this.setI)
    }

    editOptional(){
        Api.editOptional({id:this.state.id}).then(res => {
            message.success(res.msg)
        }).catch(err =>{
            message.warning(err.msg)
        })
    }

    render(){
        console.log(this.state.bidInfo)
        const values = ["5","10","15","20","25","30"]
        return(
            <div className="stock-page-wrap">
                <div className="stock-page-header">
                    <Icon onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>交易操作</p>
                </div>
                <div className="stock-info-content">
                    <div className="header-info">
                        {/*<Row>*/}
                            {/*<Col span={6}><span>合约标的</span></Col>*/}
                            {/*<Col span={10}><span>上证50ETF</span></Col>*/}
                            {/*<Col span={8}><span>2.594 3.47%</span></Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <Col span={6}><span>合约描述</span></Col>
                            <Col span={10}><span key={Math.random()}>{this.state.bidInfo.id?this.state.bidInfo.name:""}</span></Col>
                            <Col span={8}><span key={Math.random()}>{this.state.bidInfo.id?this.state.bidInfo.id:""}</span></Col>
                        </Row>
                        <p>
                            <span key={Math.random()}>最新价<i>{this.state.bidInfo.id?this.state.bidInfo.lp:0}</i></span>
                            <span key={Math.random()}>昨收价{this.state.bidInfo.id?this.state.bidInfo.yesterday_price:0}</span>
                            <span key={Math.random()}>涨跌幅<i>{this.state.bidInfo.id?(this.state.bidInfo.lp/this.state.bidInfo.yesterday_price-1).toFixed(4)*100:0.00}%</i></span>
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
                            <Col span={18}><Button className="add-cut"></Button><span className="add-value-cut">{this.state.bidInfo.id?this.state.bidInfo.lp:0}</span><Button className="add-cut"></Button></Col>
                        </Row>
                        <Row>
                            <RadioGroup onChange={(value)=>{this.setState({value:value.target.value})}} value={this.state.value}>
                                {
                                    values.map((item, index) => {
                                        return <Col span={4} key={index}>
                                            <RadioButton className={this.state.value === item?"isChecked":""} value={item}>{item}</RadioButton>
                                        </Col>
                                    })
                                }
                            </RadioGroup>
                        </Row>
                        <Row>
                            <Col span={6}><span>交易数量</span></Col>
                            <Col span={18}>
                                <Button onClick={()=>{this.setState({num:--this.state.num})}} className="add-cut"></Button>
                                <span className="add-value-cut">{this.state.num}</span>
                                <Button onClick={()=>{this.setState({num:++this.state.num})}} className="add-cut"></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}><span>持仓数量</span></Col>
                            <Col span={18}><span>0</span></Col>
                        </Row>
                    </div>
                    <Row className="operation-button">
                        <Col span={6}><Button>买入</Button></Col>
                        <Col span={12}><Button onClick={()=>this.editOptional()}>{this.state.isMine?"删除自选":"添加自选"}</Button></Col>
                        <Col span={6}><Button>卖出</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default StockPage