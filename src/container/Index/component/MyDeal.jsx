import React from "react"
import { Icon, Button, Row, Col, DatePicker } from "antd"
import moment from "moment";

const { RangePicker } = DatePicker;
class MyDeal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
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
                            <RangePicker
                                placeholder={['开始时间', '结束时间']}
                                format="YYYY-MM-DD"
                                value={[
                                    moment("2018-11-03","YYYY-MM-DD"),
                                    moment("2018-11-04","YYYY-MM-DD")
                                ]}
                                // mode={mode}
                                onPanelChange={(value, mode)=>{
                                    this.handlePanelChange(value,mode,"addProjectExp",-1)
                                }}
                            />
                            <Button>查询</Button>
                        </p>
                        <ul>
                            <li>
                                <Row><Col span={6}>合约卖出</Col><Col span={10}>50ETF沽11月2200</Col><Col span={8}>10001500</Col></Row>
                                <Row>
                                    <Col span={6}>
                                        <p>2018-11-02</p>
                                        <p>13:39:25</p>
                                    </Col>
                                    <Col span={10}>
                                        <p>0.0035</p>
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