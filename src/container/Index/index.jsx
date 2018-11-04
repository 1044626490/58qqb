import React from "react"
import {Tabs, Icon, Table, DatePicker, Divider, Col, Row, Avatar} from 'antd';
import connect from "react-redux/es/connect/connect";
import {fetchPostsGetUser} from '~/action/getUserInfo';
import "./Index.less"

const { MonthPicker } = DatePicker;
const TabPane = Tabs.TabPane;
class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeKey:"1",
            date:"",
            userInfo:[]
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
        })
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
        let data = [
            {
                SubscribeOr:"23.99",
                SubscribeNew:0.3949,
                exercisePrice:"2.200",
                PutNew:"0.0036",
                PutOr:"-45.45%"

            },
            {
                SubscribeOr:"23.99",
                SubscribeNew:0.3949,
                exercisePrice:"2.200",
                PutNew:"0.0036",
                PutOr:"-45.45%"

            },
        ];
        return data
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
                            return <span key={text} onClick={()=>this.getData("123123123")}>
                                {record.SubscribeOr}
                                </span>
                        }
                    },
                    {
                        dataIndex: "SubscribeNew",
                        title: "最新",
                        key: "SubscribeNew",
                        render:(text, record)=>{
                            return <span key={text} onClick={()=>this.getData("123123123")}>
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
                            return <span key={text} onClick={()=>this.getData("sasdasdasd")}>
                                {record.PutNew}
                                </span>
                        }
                    },
                    {
                        dataIndex: "PutOr",
                        title: "涨跌",
                        key: "PutOr",
                        render:(text, record)=>{
                            return <span key={text} onClick={()=>this.getData("sasdasdasd")}>
                                {record.PutOr}
                                </span>
                        }
                    }
                ]
            }
            ]
        const userInfo = this.state.userInfo
        return(
            <div className="index-wrap">
                <Tabs animated={false} activeKey={this.state.activeKey} onChange={(value)=>{this.setState({activeKey:value})}}>
                    {/*<TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">*/}
                    <TabPane tab="自选" key="1">
                        <div className="optional-wrap">
                            <div className="optional-header-container">
                                <p>自选</p>
                                <Icon type="search" theme="outlined" />
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
                                <p>行情</p>
                                <MonthPicker dropdownClassName="market-date-picker" onChange={null} placeholder="11月" format="MM月"/>
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
                                        <p className="my-deal-info">
                                            <Row>
                                                <Col span={8}><Row>总权益</Row><Row>{userInfo.bal >= 0?userInfo.bal.toFixed(2):""}</Row></Col>
                                                <Col span={8}><Row>持仓市值</Row><Row>{userInfo.bal >= 0?(userInfo.bal-userInfo.aval).toFixed(2):""}</Row></Col>
                                                <Col span={8}><Row>持仓盈号</Row><Row>{userInfo.aval >= 0?userInfo.aval.toFixed(2):""}</Row></Col>
                                            </Row>
                                        </p>
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
                                <p className="my-info">
                                    <Row>
                                        <Col span={8}><Row>总权益</Row><Row>{userInfo.bal >= 0?userInfo.bal.toFixed(2):""}</Row></Col>
                                        <Col span={8}><Row>持仓市值</Row><Row>{userInfo.bal >= 0?(userInfo.bal-userInfo.aval).toFixed(2):""}</Row></Col>
                                        <Col span={8}><Row>持仓盈号</Row><Row>{userInfo.aval >= 0?userInfo.aval.toFixed(2):""}</Row></Col>
                                    </Row>
                                </p>
                            </div>
                            <div className="my-info-operation-content">
                                <ul>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyRight"}}><p>我的权益<Icon type="right" theme="outlined" /></p></li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyDeal"}}><p>我的成交<Icon type="right" theme="outlined" /></p></li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyEntrust"}}><p>我的委托<Icon type="right" theme="outlined" /></p></li>
                                    <li><p>我的客服<Icon type="right" theme="outlined" /></p></li>
                                    <li><p>版本号<Icon type="right" theme="outlined" /><span>v1.0.9</span></p></li>
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