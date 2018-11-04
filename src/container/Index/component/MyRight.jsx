import React from "react"
import { Icon, Button, Row, Col } from "antd"
import "./MyRight.less"

class MyRight extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="my-right-wrap">
                <div className="my-right-header">
                    <Icon type="left" theme="outlined" />
                    <p>我的权益</p>
                </div>
                <div className="my-right-container">
                    <div className="content-top">
                        <p>￥977.00</p>
                        <Row>
                            <Col span={8}><Button>充值</Button></Col>
                            <Col span={8}></Col>
                            <Col span={8}><Button>提现</Button></Col>
                        </Row>
                    </div>
                    <div>
                        <p className="water-gold">
                            <span>权益金流水</span>
                            <Icon type="right" theme="outlined" />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyRight