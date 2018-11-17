import React from "react"
import { Icon, Button, Row, Col } from "antd"
import "./MyRight.less"
import connect from "react-redux/es/connect/connect";

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
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>我的权益</p>
                </div>
                <div className="my-right-container">
                    <div className="content-top">
                        <p>￥{this.props.userInfo.data.aval.toFixed(2)}</p>
                        <Row>
                            <Col span={8}><Button onClick={()=>{window.location.href = "#/Dashboard/RechargeAndExpend/0"}}>充值</Button></Col>
                            <Col span={8}></Col>
                            <Col span={8}><Button onClick={()=>{window.location.href = "#/Dashboard/RechargeAndExpend/1"}}>提现</Button></Col>
                        </Row>
                    </div>
                    <div>
                        <p className="water-gold" onClick={()=>{window.location.href = "#/Dashboard/IncomeRecord"}}>
                            <span>权益金流水</span>
                            <Icon type="right" theme="outlined" />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(MyRight)
// export default MyRight