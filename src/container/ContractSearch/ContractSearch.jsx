import React from "react"
import { Row, Col, Button, Icon, Input, DatePicker } from "antd"
import 'moment/locale/zh-cn';
import "./ContractSearch.less"

const { MonthPicker } = DatePicker;
class ContractSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="contract-search-wrap">
                <div className="stock-page-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>合约搜索</p>
                </div>
                <div className="contract-search-content">
                    <div className="contract-search-header">
                        <Row>
                            <Col span={6}><span>委托价格</span></Col>
                            <Col span={18}><Input placeHolder="输入合约代码"/></Col>
                        </Row>
                        <Row>
                            <Col span={6}><span>委托价格</span></Col>
                            <Col span={18}>
                                <MonthPicker dropdownClassName="market-date-picker" onChange={null} placeholder="请选择日期" format="YYYY年MM月"/></Col>
                        </Row>
                    </div>
                    <div className="search-content">
                        <p>搜索结果</p>
                        <ul>
                            <li>
                                <Row>
                                    <Col span={4}><span>201811</span></Col>
                                    <Col span={6}>10001499</Col>
                                    <Col span={8}>50ETF购11月2200</Col>
                                    <Col span={6}><Icon type="plus-circle" theme="outlined" /></Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContractSearch