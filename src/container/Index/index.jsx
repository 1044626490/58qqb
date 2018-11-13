import React from "react"
import {Tabs, Icon, Table, DatePicker, Divider, Col, Row, Avatar, Select} from 'antd';
import connect from "react-redux/es/connect/connect";
import {fetchPostsGetUser} from '~/action/getUserInfo';
import Api from "../../until/api"
import "./index.less"
import moment from "moment";

const Option = Select.Option;
const { MonthPicker } = DatePicker;
const TabPane = Tabs.TabPane;
function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
class Index extends React.Component{
    constructor(props) {
        super(props);
        this.setI = null;
        this.state = {
            activeKey:this.props.activeKey,
            date:"",
            userInfo:[],
            now:new Date(),
            market:[],
            name:[],
            nowName:null,
            nowDate:null,
            exercisePrice:[],
            purchase:[],
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchPostsGetUser()).then(res =>{
            console.log(res)
            this.setState({
                userInfo:res.data
            })
        }).catch(err => {
            console.log(err)
            window.location.href = "#/Dashboard/Login"
        })
        Api.target().then(res => {
            this.setState({
                name:res.data.name,
                market:res.data.date,
                nowName:res.data.name[0].tg,
                nowDate:res.data.date[0].ym,
            });
            // Api.dateTg({tg:res.data.name[0].tg,date:res.data.date[0].ym}).then(res => {
            //     console.log(res)
            // }).catch(err =>{
            //     console.log(err)
            // })
            // Api.statTg({tg:res.data.name[0].tg,date:res.data.date[0].ym}).then(res => {
            //     console.log(res)
            // }).catch(err =>{
            //     console.log(err)
            // })
            this.setI = setInterval(this.getMarket(),1000);
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }

    componentWillUnmount(){
        clearInterval(this.setI)
    }

    getMarket(){
        Api.mdTg({tg:this.state.nowName,date:this.state.nowDate}).then(res => {
            console.log(res.data.purchase)
            this.setState({
                purchase:res.data.purchase,
                sell:res.data.sell
            })
        }).catch(err =>{
        });
        Api.execTg({tg:this.state.nowName,date:this.state.nowDate}).then(res => {
            console.log(res.data.exec)
            this.setState({
                exercisePrice:res.data.exec
            })
        }).catch(err =>{
        });
    }

    getOptionalTableData(){
        let data = [
            {
                contractName:"50ETF购11月2200",
                recentQuotation:0.3949,
                priceLimit:"23.99%",
                exercisePrice:"2.200"
            },
            {
                contractName:"50ETF购11月2100",
                recentQuotation:0.3003,
                priceLimit:"25%",
                exercisePrice:"2.100"
            }
        ]
        return data
    }

    getMarketTableData(){
        let arr1 = this.state.exercisePrice;
        let arr2 = this.state.purchase;
        let arr4 = this.state.sell;
        let arr3 = [];
        if(this.state.purchase.length&&this.state.exercisePrice.length){
            for(let i=0;i<arr1.length;i++){
                let item = null;
                let item1 = null;
                for(let j=0;j<arr2.length;j++){
                    if(arr1[i].price/1 === arr2[j].exec/1){
                        item = arr2[j]
                        item1 = arr4[j]
                    }
                }
                arr3.push({
                    id1:item.id,
                    SubscribeOr:(item.up_down*10).toFixed(2)+"%",
                    SubscribeNew:item.lp,
                    exercisePrice:arr1[i].price,
                    PutNew:item1.lp,
                    PutOr:(item1.up_down).toFixed(2)+"%",
                    id2:item.id
                })
            }
        }
        return arr3
    }

    getData(data){
        console.log(data)
    }

    click(){
        window.location.href = "#/Dashboard/StockPage"
    }

    render(){
        const optionalTable = [
            {
                dataIndex: "contractName",
                title: "合约简称",
                key: "contractName"
            },
            {
                dataIndex: "recentQuotation",
                title: "最新价",
                key: "recentQuotation"
            },
            {
                dataIndex: "priceLimit",
                title: "涨跌幅",
                key: "priceLimit"
            },
            {
                dataIndex: "exercisePrice",
                title: "行权价",
                key: "exercisePrice"
            }
          //   ,
          //   {
          //       dataIndex: "action",
          //       title: "操作",
          //       key: "action",
          //       render: (text, record) => (
          //           <span>
          //   <a
          //       href="javascript:;"
          //       onClick={() => {
          //           this.showRecordDetails(record);
          //       }}
          //   >
          //     查看记录
          //   </a>
          //               {/* <Divider type="vertical" />
          //   <a
          //     href="javascript:;"
          //     onClick={() => this.changeStatus(record.id, record.status)}
          //   >
          //     {record.status === 1 ? "禁用" : "恢复"}
          //   </a> */}
          // </span>
          //       )
          //   }
        ];
        const marketTable = [
            {
                title:"认购",
                children:[
                    {
                        dataIndex: "SubscribeOr",
                        title: "涨跌",
                        key: "SubscribeOr",
                        render:(text, record)=>{
                            return <span key={text} className={record.SubscribeOr.indexOf("-") >= 0?
                                "down-price":"up-price"}
                                         onClick={()=>{window.location.href = "#/Dashboard/StockPage/"+record.id1+"/"+this.state.nowDate}}>
                                {record.SubscribeOr}
                                </span>
                        }
                    },
                    {
                        dataIndex: "SubscribeNew",
                        title: "最新",
                        key: "SubscribeNew",
                        render:(text, record)=>{
                            return <span key={text}  className={record.SubscribeOr.indexOf("-") >= 0?
                                "down-price":"up-price"}
                                         onClick={()=>{window.location.href = "#/Dashboard/StockPage/"+record.id1+"/"+this.state.nowDate}}>
                                {record.SubscribeNew}
                                </span>
                        }
                    }
                ]
            },
            {
                title:"",
                children:[
                    {
                        dataIndex: "exercisePrice",
                        title: "行权价",
                        key: "exercisePrice"
                    }
                ]
            },
            {
                title:"认沽",
                children:[
                    {
                        dataIndex: "PutNew",
                        title: "最新",
                        key: "PutNew",
                        render:(text, record)=>{
                            return <span key={text}  className={record.PutOr.indexOf("-") >= 0?
                                "down-price":"up-price"}
                                         onClick={()=>{window.location.href = "#/Dashboard/StockPage/"+record.id2+"/"+this.state.nowDate}}>
                                {record.PutNew}
                                </span>
                        }
                    },
                    {
                        dataIndex: "PutOr",
                        title: "涨跌",
                        key: "PutOr",
                        render:(text, record)=>{
                            return <span key={text}  className={record.PutOr.indexOf("-") >= 0?
                                "down-price":"up-price"}
                                         onClick={()=>{window.location.href = "#/Dashboard/StockPage/"+record.id2+"/"+this.state.nowDate}}>
                                {record.PutOr}
                                </span>
                        }
                    }
                ]
            }
            ]
        const userInfo = this.state.userInfo;
        let now = this.state.now;
        return(
            <div className="index-wrap">
                <Tabs animated={false} activeKey={this.state.activeKey} onChange={this.props.onChange}>
                    {/*<TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">*/}
                    <TabPane tab="自选" key="1">
                        <div className="optional-wrap">
                            <div className="optional-header-container">
                                <p>自选</p>
                                <Icon onClick={()=>{window.location.href = "#/Dashboard/ContractSearch"}} type="search" theme="outlined" />
                            </div>
                            <div className="optional-content-container">
                                <Table
                                    // onClick={()=>{}}
                                    columns={optionalTable} //th菜单项
                                    rowKey={Math.random()}
                                    // onClick={()=>{window.location.href = "#/Dashboard/StockPage"}}
                                    onRow={(record,rowkey)=>{
                                        return{
                                            onClick : this.click.bind(this,record,rowkey)    //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
                                        }
                                    }}
                                    // rowKey={record => {
                                    //     return record.id;
                                    // }} //给每行绑定一个key
                                    dataSource={this.getOptionalTableData()} //数据源
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="行情" key="2">
                        <div className="market-wrap">
                            <div className="market-header-container">
                                <Select className="market-date-picker" value={this.state.nowName} onChange={null}>
                                    {
                                        this.state.name.map((item, index) =>{
                                            return <Option key={index} value={item.tg}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                                <p>行情</p>
                                <Select className="market-date-picker" value={this.state.nowDate} onChange={null}>
                                    {
                                        this.state.market.map((item, index) =>{
                                            return <Option key={index} value={item.ym}>{item.ym}</Option>
                                        })
                                    }
                                </Select>
                                {/*<MonthPicker dropdownClassName="market-date-picker" onChange={(value)=>{this.setState({now:value})}}*/}
                                             {/*value={moment(now,"MM月")}*/}
                                             {/*format="MM月"/>*/}
                            </div>
                            <div className="market-content-container">
                                <div>
                                    <p className="now-market-info">
                                        <span>当前价：<i>2.594</i></span><span>涨跌：<i>0.087</i></span><span>幅度：<i>3.47%</i></span>
                                    </p>
                                </div>
                                <Table
                                    columns={marketTable} //th菜单项
                                    rowKey={Math.random()}
                                    // rowKey={record => {
                                    //     return record.id;
                                    // }} //给每行绑定一个key
                                    dataSource={this.getMarketTableData()} //数据源
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="交易" key="3">
                        <div className="deal-wrap">
                            <div className="deal-header-container">
                                <p>交易</p>
                            </div>
                            <div className="deal-content-container">
                                <div className="my-deal">
                                    <div className="deal-content">
                                        <p>
                                            <span>交易账号：{userInfo.up_uid}</span><Icon type="eye" theme="outlined" />
                                        </p>
                                        <div className="my-deal-info">
                                            <Row>
                                                <Col span={8}><Row>总权益</Row><Row>{userInfo.bal >= 0?userInfo.bal.toFixed(2):""}</Row></Col>
                                                <Col span={8}><Row>持仓市值</Row><Row>{userInfo.bal >= 0?(userInfo.bal-userInfo.aval).toFixed(2):""}</Row></Col>
                                                <Col span={8}><Row>持仓盈号</Row><Row>{userInfo.aval >= 0?userInfo.aval.toFixed(2):""}</Row></Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-deal-operation-cpntainer">
                                <Row>
                                    <Col onClick={()=>{window.location.href = "#/Dashboard/StockPage"}} span={6}>
                                        <Row><img src="" alt=""/></Row>
                                        <Row><span>买入开仓</span></Row>
                                    </Col>
                                    <Col onClick={()=>{window.location.href = "#/Dashboard/MyEntrust"}} span={6}>
                                        <Row><img src="" alt=""/></Row>
                                        <Row><span>我的委托</span></Row>
                                    </Col>
                                    <Col span={6}>
                                        <Row><img src="" alt=""/></Row>
                                        <Row><span>我的持仓</span></Row>
                                    </Col>
                                    <Col onClick={()=>{window.location.href = "#/Dashboard/MyDeal"}} span={6}>
                                        <Row><img src="" alt=""/></Row>
                                        <Row><span>我的成交</span></Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="我的" key="4">
                        <div className="my-index-wrap">
                            <div className="my-index-header-container">
                                <p><Icon onClick={()=>{window.location.href = "#/Dashboard/MyInfo"}} type="setting" theme="outlined" /></p>
                                <p><Avatar size={64} icon="user" src={userInfo.avatar||""} /></p>
                                <p><span>{userInfo.up_uid||""}</span></p>
                                <p><span>{userInfo.name||""}</span></p>
                                <div className="my-info">
                                    <Row>
                                        <Col span={8}><Row>总权益</Row><Row>{userInfo.bal >= 0?userInfo.bal.toFixed(2):""}</Row></Col>
                                        <Col span={8}><Row>持仓市值</Row><Row>{userInfo.bal >= 0?(userInfo.bal-userInfo.aval).toFixed(2):""}</Row></Col>
                                        <Col span={8}><Row>可用权益</Row><Row>{userInfo.aval >= 0?userInfo.aval.toFixed(2):""}</Row></Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="my-info-operation-content">
                                <ul>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyRight"}}>
                                        <Icon type="dollar" theme="outlined" />
                                        <p>我的权益<Icon type="right" theme="outlined" /></p></li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyDeal"}}>
                                        <Icon type="file-done" theme="outlined" />
                                        <p>我的成交<Icon type="right" theme="outlined" /></p></li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyEntrust"}}>
                                        <Icon type="team" theme="outlined" />
                                        <p>我的委托<Icon type="right" theme="outlined" /></p></li>
                                    <li><Icon type="mobile" theme="outlined" />
                                        <p>我的客服<Icon type="right" theme="outlined" /></p></li>
                                    <li><Icon type="check-circle" theme="outlined" />
                                        <p>版本号<span>v1.0.9</span></p></li>
                                </ul>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Index)